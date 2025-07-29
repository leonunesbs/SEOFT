"use client";

import {
  AlertTriangle,
  Calendar,
  Check,
  Clock,
  Edit,
  Eye,
  Phone,
  Users,
  X,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { DatePicker } from "~/components/ui/date-picker";
import Link from "next/link";
import { api } from "~/trpc/react";
import { useToast } from "~/hooks/use-toast";

// Função para obter variante do badge baseado no status
const getStatusVariant = (
  status: string,
): "default" | "secondary" | "destructive" | "outline" => {
  switch (status) {
    case "PENDING":
    case "PENDING_NIR":
      return "secondary";
    case "APPROVED":
    case "SCHEDULED":
    case "COMPLETED":
      return "default";
    case "REJECTED":
    case "CANCELLED":
      return "destructive";
    default:
      return "outline";
  }
};

// Função para obter variante do badge baseado na prioridade
const getPriorityVariant = (
  classification: string,
): "default" | "secondary" | "destructive" | "outline" => {
  switch (classification) {
    case "A1":
      return "destructive";
    case "A2":
      return "secondary";
    case "B":
    case "C":
      return "outline";
    case "D":
      return "default";
    default:
      return "outline";
  }
};

export default function NirEvaluationPage() {
  const { toast } = useToast();
  const [selectedIndication, setSelectedIndication] = useState<any>(null);
  const [isRescheduleDialogOpen, setIsRescheduleDialogOpen] = useState(false);
  const [updatedDates, setUpdatedDates] = useState<Record<string, string>>({});
  const [nirNotes, setNirNotes] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedShift, setSelectedShift] = useState<"MORNING" | "AFTERNOON">(
    "MORNING",
  );
  const [visibleDays, setVisibleDays] = useState<number>(21); // Mostrar mais cards inicialmente para garantir scroll
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  // TRPC queries
  const { data: pendingIndications, refetch: refetchPending } =
    api.indication.getPendingNir.useQuery();
  const { data: processedIndications, refetch: refetchProcessed } =
    api.indication.getProcessedIndications.useQuery();

  // Query para buscar todas as indicações (debug)
  // const { data: allIndications } = api.indication.getAll.useQuery();

  // Query para verificar disponibilidade de datas
  const { data: availabilityData } = api.schedule.checkAvailability.useQuery(
    { date: selectedDate },
    { enabled: !!selectedDate },
  );

  // Query para buscar agendamentos da data selecionada
  // const { data: appointmentsData } = api.appointment.getByDate.useQuery(
  //   { date: selectedDate },
  //   { enabled: !!selectedDate },
  // );

  // TRPC mutations
  const approveMutation = api.indication.approveIndication.useMutation({
    onSuccess: (data) => {
      const injectionCount = data.injections?.length || 0;
      const patientName = data.patient?.name || "Paciente";

      toast({
        title: "Sucesso!",
        description: `${patientName}: ${injectionCount} agendamentos criados automaticamente. Você pode ajustar as datas conforme necessário.`,
        variant: "default",
      });
      refetchPending();
      refetchProcessed();
      setNirNotes("");
    },
    onError: (error) => {
      toast({
        title: "Erro",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const rejectMutation = api.indication.rejectIndication.useMutation({
    onSuccess: () => {
      toast({
        title: "Sucesso!",
        description: "Indicação rejeitada com sucesso",
        variant: "default",
      });
      refetchPending();
      refetchProcessed();
      setNirNotes("");
    },
    onError: (error) => {
      toast({
        title: "Erro",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const rescheduleMutation = api.indication.rescheduleIndication.useMutation({
    onSuccess: () => {
      toast({
        title: "Sucesso!",
        description: "Reagendamento salvo com sucesso",
        variant: "default",
      });
      refetchPending();
      refetchProcessed();
      setIsRescheduleDialogOpen(false);
      setUpdatedDates({});
      setNirNotes("");
    },
    onError: (error) => {
      toast({
        title: "Erro",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const updateInjectionDateMutation =
    api.indication.updateInjectionDate.useMutation({
      onSuccess: () => {
        toast({
          title: "Sucesso!",
          description: "Data atualizada com sucesso",
          variant: "default",
        });
        refetchPending();
        refetchProcessed();
      },
      onError: (error) => {
        toast({
          title: "Erro",
          description: error.message,
          variant: "destructive",
        });
      },
    });

  const handleApprove = (indicationId: string) => {
    approveMutation.mutate({
      indicationId,
      nirNotes: nirNotes || undefined,
    });
  };

  const handleReject = (indicationId: string) => {
    rejectMutation.mutate({
      indicationId,
      nirNotes: nirNotes || undefined,
    });
  };

  const handleReschedule = (indication: any) => {
    setSelectedIndication(indication);
    setIsRescheduleDialogOpen(true);
  };

  const handleUpdateInjectionDate = (injectionId: string, newDate: string) => {
    // Verificar se a data é válida
    if (!newDate) {
      toast({
        title: "Erro",
        description: "Data inválida",
        variant: "destructive",
      });
      return;
    }

    // Verificar disponibilidade da data antes de atualizar
    const availability = getAvailabilityStatus();
    if (!availability.available) {
      toast({
        title: "Data não disponível",
        description: `A data ${new Date(newDate).toLocaleDateString("pt-BR")} não possui vagas disponíveis (${availability.booked}/${availability.capacity} vagas ocupadas)`,
        variant: "destructive",
      });
      return;
    }

    updateInjectionDateMutation.mutate({
      injectionId,
      newDate,
    });
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "PENDING":
        return "Pendente";
      case "PENDING_NIR":
        return "Aguardando NIR";
      case "APPROVED":
        return "Aprovado";
      case "REJECTED":
        return "Rejeitado";
      case "SCHEDULED":
        return "Agendado";
      case "COMPLETED":
        return "Concluído";
      case "CANCELLED":
        return "Cancelado";
      default:
        return status;
    }
  };

  const getPriorityText = (classification: string) => {
    switch (classification) {
      case "A1":
        return "A1 - Risco iminente";
      case "A2":
        return "A2 - Atividades prejudicadas";
      case "B":
        return "B - Prejuízo acentuado";
      case "C":
        return "C - Prejuízo mínimo";
      case "D":
        return "D - Sem prejuízo";
      default:
        return classification;
    }
  };

  const getEyeLabel = (eye: string) => {
    return eye === "OD" ? "Olho Direito" : "Olho Esquerdo";
  };

  const getEyeIcon = (eye: string) => {
    return eye === "OD" ? "👁️" : "👁️‍🗨️";
  };

  const isUrgent = (classification: string) => {
    return classification === "A1" || classification === "A2";
  };

  const getAvailabilityStatus = () => {
    if (!availabilityData)
      return { available: true, capacity: 30, booked: 0, availableSlots: 30 };

    // availabilityData is a single object, not an array
    return {
      available: availabilityData.available,
      capacity: availabilityData.capacity,
      booked: availabilityData.booked,
      availableSlots: availabilityData.capacity - availabilityData.booked,
    };
  };

  const getInjectionsForDate = (date: string) => {
    if (!processedIndications) return [];

    const allInjections = processedIndications
      .filter((i) => i.status === "SCHEDULED")
      .flatMap((i) => i.injections || []);

    return allInjections.filter((injection) => {
      const injectionDate = new Date(injection.scheduledDate)
        .toISOString()
        .split("T")[0];
      return injectionDate === date;
    });
  };

  // Função para verificar se um dia está disponível para agendamentos
  const isDateAvailable = useCallback((date: Date) => {
    const dayOfWeek = date.getUTCDay(); // 0 = Domingo, 1 = Segunda, 2 = Terça, 3 = Quarta, 4 = Quinta, 5 = Sexta, 6 = Sábado
    // Apenas Segunda (1), Terça (2) e Quinta (4) estão disponíveis
    // Bloqueados: Domingo (0), Quarta (3), Sexta (5), Sábado (6)
    return dayOfWeek === 1 || dayOfWeek === 2 || dayOfWeek === 4;
  }, []);

  // Gerar array de datas para o scroll infinito
  const generateDates = useCallback(
    (count: number) => {
      return Array.from({ length: count }, (_, i) => {
        const today = new Date();
        const date = new Date(
          today.getFullYear(),
          today.getMonth(),
          today.getDate() + i,
        );
        const dateStr = date.toISOString().split("T")[0]!;
        return {
          date,
          dateStr,
          isToday: i === 0,
          isAvailable: isDateAvailable(date),
        };
      });
    },
    [isDateAvailable],
  );

  // Memoizar as datas visíveis para otimização
  const visibleDates = useMemo(
    () => generateDates(visibleDays),
    [generateDates, visibleDays],
  );

  // Função para carregar mais datas
  const loadMoreDates = useCallback(() => {
    if (isLoadingMore) return; // Prevenir múltiplas chamadas

    setIsLoadingMore(true);
    setTimeout(() => {
      setVisibleDays((prev) => prev + 7);
      setIsLoadingMore(false);
    }, 300); // Simular um pequeno delay para melhor UX
  }, [isLoadingMore]);

  // Função para voltar ao início (hoje)
  const scrollToToday = useCallback(() => {
    const container = scrollContainerRef.current;
    if (container) {
      container.scrollTo({ left: 0, behavior: "smooth" });
      setSelectedDate(new Date().toISOString().split("T")[0]!);
    }
  }, []);

  // Detectar scroll horizontal e carregar mais dados
  const handleScroll = useCallback(() => {
    const container = scrollContainerRef.current;
    if (!container || isLoadingMore) return;

    const { scrollLeft, scrollWidth, clientWidth } = container;

    // Calcular quantos pixels restam para o fim
    const pixelsFromEnd = scrollWidth - (scrollLeft + clientWidth);

    // Para telas pequenas, usar um threshold menor em pixels
    const isMobile = clientWidth < 768; // Tailwind sm breakpoint
    const threshold = isMobile ? 80 : 200; // pixels from end

    // Carregar mais quando estiver próximo do fim
    if (pixelsFromEnd < threshold && !isLoadingMore) {
      loadMoreDates();
    }
  }, [loadMoreDates, isLoadingMore]);

  // Adicionar listener de scroll
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    // Usar passive para melhor performance
    container.addEventListener("scroll", handleScroll, { passive: true });

    // Adicionar suporte para touch events em dispositivos móveis
    let touchStartX = 0;
    let touchEndX = 0;

    const handleTouchStart = (e: TouchEvent) => {
      touchStartX = e.changedTouches[0]?.clientX || 0;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      touchEndX = e.changedTouches[0]?.clientX || 0;
      // Se houve um swipe horizontal, disparar o handleScroll
      if (Math.abs(touchEndX - touchStartX) > 10) {
        handleScroll();
      }
    };

    container.addEventListener("touchstart", handleTouchStart, {
      passive: true,
    });
    container.addEventListener("touchend", handleTouchEnd, { passive: true });

    return () => {
      container.removeEventListener("scroll", handleScroll);
      container.removeEventListener("touchstart", handleTouchStart);
      container.removeEventListener("touchend", handleTouchEnd);
    };
  }, [handleScroll]);

  // Verificar se há scroll suficiente e carregar mais se necessário
  useEffect(() => {
    const checkScrollWidth = () => {
      const container = scrollContainerRef.current;
      if (!container) return;

      const { scrollWidth, clientWidth } = container;
      // Se não há scroll suficiente (conteúdo não ultrapassa a largura visível)
      if (scrollWidth <= clientWidth && visibleDays < 50) {
        setVisibleDays((prev) => Math.min(prev + 14, 50)); // Carregar mais, máximo 50 dias
      }
    };

    // Verificar após um pequeno delay para garantir que o DOM foi renderizado
    const timer = setTimeout(checkScrollWidth, 100);
    return () => clearTimeout(timer);
  }, [visibleDays]);

  if (!pendingIndications || !processedIndications) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-center">
          <div className="mx-auto h-8 w-8 animate-spin rounded-full border-b-2 border-gray-900"></div>
          <p className="mt-2 text-gray-600">Carregando...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 px-4 sm:px-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Gerenciamento de Agendamentos NIR
          </h2>
          <p className="text-sm text-muted-foreground sm:text-base">
            Controle a quantidade e distribuição de pacientes ao longo das datas
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant="secondary">
            {pendingIndications.length} Pendentes
          </Badge>
        </div>
      </div>

      {/* Dashboard de Métricas */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-2 lg:grid-cols-4 lg:gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs font-medium sm:text-sm">
              Total de Agendamentos
            </CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold sm:text-2xl">
              {processedIndications
                .filter((i) => i.status === "SCHEDULED")
                .reduce(
                  (total, indication) =>
                    total + (indication.injections?.length || 0),
                  0,
                )}
            </div>
            <p className="text-xs text-muted-foreground">
              Agendamentos criados
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs font-medium sm:text-sm">
              Pendentes de Avaliação
            </CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold sm:text-2xl">
              {pendingIndications.length}
            </div>
            <p className="text-xs text-muted-foreground">
              Aguardando aprovação NIR
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs font-medium sm:text-sm">
              Urgências
            </CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold text-destructive sm:text-2xl">
              {
                pendingIndications.filter((i) =>
                  isUrgent(i.swalisClassification),
                ).length
              }
            </div>
            <p className="text-xs text-muted-foreground">Classificação A1/A2</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs font-medium sm:text-sm">
              Reagendamentos
            </CardTitle>
            <Edit className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold sm:text-2xl">
              {processedIndications
                .filter((i) => i.status === "SCHEDULED")
                .reduce(
                  (total, indication) =>
                    total +
                    (indication.injections?.filter(
                      (inj: any) => inj.status === "RESCHEDULED",
                    ).length || 0),
                  0,
                )}
            </div>
            <p className="text-xs text-muted-foreground">Datas modificadas</p>
          </CardContent>
        </Card>
      </div>

      {/* Filtros de Data e Turno */}
      <Card className="border-border/50 bg-card dark:border-border/30 dark:bg-card/50">
        <CardHeader>
          <CardTitle className="text-lg text-foreground dark:text-foreground/90 sm:text-xl">
            Filtros de Agendamento
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-medium leading-none text-foreground peer-disabled:cursor-not-allowed peer-disabled:opacity-70 dark:text-foreground/90">
                Data
              </label>
              <DatePicker
                date={selectedDate ? new Date(selectedDate) : undefined}
                onDateChange={(date) => {
                  setSelectedDate(
                    date ? date.toISOString().split("T")[0]! : "",
                  );
                }}
                placeholder="Selecione uma data"
                className="w-full"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium leading-none text-foreground peer-disabled:cursor-not-allowed peer-disabled:opacity-70 dark:text-foreground/90">
                Turno
              </label>
              <Select
                value={selectedShift}
                onValueChange={(value: "MORNING" | "AFTERNOON") =>
                  setSelectedShift(value)
                }
              >
                <SelectTrigger className="border-border/50 dark:border-border/30">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="MORNING">Manhã</SelectItem>
                  <SelectItem value="AFTERNOON">Tarde</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {selectedDate && (
            <div className="mt-4 rounded-lg border border-border/50 bg-muted/50 p-4 dark:border-border/30 dark:bg-muted/30">
              <h4 className="mb-2 font-medium text-foreground dark:text-foreground/90">
                Disponibilidade -{" "}
                {new Date(selectedDate).toLocaleDateString("pt-BR")}
              </h4>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground dark:text-muted-foreground/70">
                    Manhã
                  </p>
                  <div className="flex items-center space-x-2">
                    <Users className="h-4 w-4 text-muted-foreground dark:text-muted-foreground/70" />
                    <span className="font-medium text-foreground dark:text-foreground/90">
                      {getAvailabilityStatus().availableSlots} /{" "}
                      {getAvailabilityStatus().capacity} vagas
                    </span>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground dark:text-muted-foreground/70">
                    Tarde
                  </p>
                  <div className="flex items-center space-x-2">
                    <Users className="h-4 w-4 text-muted-foreground dark:text-muted-foreground/70" />
                    <span className="font-medium text-foreground dark:text-foreground/90">
                      {getAvailabilityStatus().availableSlots} /{" "}
                      {getAvailabilityStatus().capacity} vagas
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Visualização de Distribuição de Pacientes */}
      <Card className="border-border/50 bg-card dark:border-border/30 dark:bg-card/50">
        <CardHeader>
          <div className="flex flex-col space-y-2 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
            <div className="min-w-0 flex-1">
              <CardTitle className="text-lg text-foreground dark:text-foreground/90 sm:text-xl">
                Distribuição de Pacientes por Data
              </CardTitle>
              <p className="text-sm text-muted-foreground dark:text-muted-foreground/70">
                Role horizontalmente para ver mais datas • {visibleDays} dias
                carregados • Toque em &quot;Carregar mais&quot; se necessário
              </p>
              <div className="mt-2 flex flex-col gap-2 text-xs sm:flex-row sm:items-center sm:gap-4">
                <div className="flex items-center gap-1">
                  <div className="h-3 w-3 rounded border border-primary bg-primary/20 dark:border-primary/50 dark:bg-primary/10"></div>
                  <span className="text-muted-foreground dark:text-muted-foreground/70">
                    Disponíveis: Segunda, Terça, Quinta
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="h-3 w-3 rounded border border-muted-foreground/20 bg-muted dark:border-muted-foreground/30 dark:bg-muted/50"></div>
                  <span className="text-muted-foreground dark:text-muted-foreground/70">
                    Bloqueados: Quarta, Sexta, Sábado, Domingo
                  </span>
                </div>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={scrollToToday}
              className="w-full border-border/50 hover:bg-muted/50 dark:border-border/30 dark:hover:bg-muted/30 sm:w-auto"
            >
              <Calendar className="mr-1 h-3 w-3" />
              Hoje
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Container com scroll horizontal infinito */}
            <div
              ref={scrollContainerRef}
              className="scrollbar-thin flex min-w-0 gap-2 overflow-x-auto p-2 pb-4 sm:gap-3"
              style={{
                scrollBehavior: "smooth",
                // Garantir que sempre haverá scroll em dispositivos touch
                WebkitOverflowScrolling: "touch",
              }}
            >
              {visibleDates.map(({ date, dateStr, isToday, isAvailable }) => {
                const injections = getInjectionsForDate(dateStr);
                const availability = getAvailabilityStatus();
                const isSelected = selectedDate === dateStr;

                return (
                  <div
                    key={dateStr}
                    className={`flex h-20 w-20 flex-shrink-0 flex-col justify-between rounded-lg border p-1.5 text-center transition-all duration-200 sm:h-24 sm:w-24 sm:p-2 md:h-28 md:w-28 ${
                      !isAvailable
                        ? "cursor-not-allowed border-muted bg-muted/50 opacity-60"
                        : `cursor-pointer hover:border-primary/50 hover:shadow-md ${
                            isSelected
                              ? "border-primary bg-primary/5 shadow-lg"
                              : "border-border"
                          }`
                    } ${isToday && isAvailable ? "ring-2 ring-primary/20" : ""}`}
                    onClick={() => isAvailable && setSelectedDate(dateStr)}
                  >
                    {/* Header da data */}
                    <div className="text-center">
                      <div
                        className={`text-xs font-medium uppercase ${
                          !isAvailable
                            ? "text-muted-foreground"
                            : "text-muted-foreground"
                        }`}
                      >
                        {date.toLocaleDateString("pt-BR", {
                          weekday: "short",
                          timeZone: "UTC",
                        })}
                      </div>
                      <div
                        className={`text-sm font-bold sm:text-base ${
                          !isAvailable
                            ? "text-muted-foreground"
                            : "text-foreground"
                        }`}
                      >
                        {date.getUTCDate()}
                      </div>
                      <div
                        className={`text-xs ${
                          !isAvailable
                            ? "text-muted-foreground"
                            : "text-muted-foreground"
                        }`}
                      >
                        {date.toLocaleDateString("pt-BR", {
                          month: "short",
                          timeZone: "UTC",
                        })}
                      </div>
                    </div>

                    {/* Indicadores de status */}
                    <div className="mb-1 flex min-h-[12px] justify-center sm:min-h-[16px]">
                      {isToday && isAvailable && (
                        <Badge
                          variant="secondary"
                          className="px-1 py-0 text-xs"
                        >
                          Hoje
                        </Badge>
                      )}
                      {!isAvailable && (
                        <Badge variant="outline" className="px-1 py-0 text-xs">
                          Indisponível
                        </Badge>
                      )}
                    </div>

                    {/* Informações de injeções */}
                    <div className="space-y-1">
                      {isAvailable ? (
                        <>
                          <div className="text-xs font-medium">
                            {injections.length} injeções
                          </div>

                          <div className="text-xs text-muted-foreground">
                            {availability.booked}/{availability.capacity}
                          </div>

                          {/* Barra de progresso */}
                          <div className="h-1 w-full rounded-full bg-muted">
                            <div
                              className={`h-1 rounded-full transition-all duration-300 ${
                                availability.booked / availability.capacity >
                                0.8
                                  ? "bg-destructive"
                                  : availability.booked /
                                        availability.capacity >
                                      0.6
                                    ? "bg-yellow-500"
                                    : "bg-primary"
                              }`}
                              style={{
                                width: `${Math.min((availability.booked / availability.capacity) * 100, 100)}%`,
                              }}
                            />
                          </div>

                          {/* Badges de status */}
                          <div className="flex flex-wrap justify-center gap-1">
                            {injections.length > 0 && (
                              <Badge
                                variant="outline"
                                className="px-1 py-0 text-xs"
                              >
                                {injections.length}p
                              </Badge>
                            )}
                            {injections.some(
                              (inj) => inj.status === "RESCHEDULED",
                            ) && (
                              <Badge
                                variant="secondary"
                                className="px-1 py-0 text-xs"
                              >
                                R
                              </Badge>
                            )}
                            {!availability.available && (
                              <Badge
                                variant="destructive"
                                className="px-1 py-0 text-xs"
                              >
                                !
                              </Badge>
                            )}
                          </div>
                        </>
                      ) : (
                        <div className="text-xs font-medium text-muted-foreground">
                          Sem atendimentos
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}

              {/* Indicador de carregamento */}
              <div className="flex h-20 w-20 flex-shrink-0 items-center justify-center rounded-lg border border-dashed text-muted-foreground sm:h-24 sm:w-24 md:h-28 md:w-28">
                <div className="text-center">
                  {isLoadingMore ? (
                    <>
                      <div className="mx-auto h-6 w-6 animate-spin rounded-full border-b-2 border-primary"></div>
                      <div className="mt-2 text-xs">Carregando...</div>
                    </>
                  ) : (
                    <button
                      onClick={loadMoreDates}
                      className="flex flex-col items-center justify-center rounded p-2 transition-colors hover:bg-muted/50"
                    >
                      <div className="text-xs">Carregar</div>
                      <div className="text-xs">mais</div>
                      <div className="mt-1 animate-pulse text-xl">→</div>
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Estatísticas */}
            <div className="mt-4 rounded-lg border bg-muted/50 p-4">
              <h4 className="mb-3 text-sm font-medium sm:text-base">
                Estatísticas dos Próximos{" "}
                {visibleDates.filter((d) => d.isAvailable).length} Dias Úteis
              </h4>
              <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">
                    Total de Injeções
                  </p>
                  <p className="text-lg font-bold sm:text-xl">
                    {visibleDates
                      .filter((d) => d.isAvailable)
                      .reduce(
                        (total, { dateStr }) =>
                          total + getInjectionsForDate(dateStr).length,
                        0,
                      )}
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">
                    Dia Mais Ocupado
                  </p>
                  <p className="text-lg font-bold sm:text-xl">
                    {(() => {
                      const availableDates = visibleDates.filter(
                        (d) => d.isAvailable,
                      );
                      const dayStats = availableDates.map(
                        ({ date, dateStr }) => ({
                          date: dateStr,
                          count: getInjectionsForDate(dateStr).length,
                          displayDate: `${date.getUTCDate()}/${date.getUTCMonth() + 1}`,
                        }),
                      );
                      const maxDay = dayStats.reduce((max, day) =>
                        day.count > max.count ? day : max,
                      );
                      return maxDay.count > 0
                        ? `${maxDay.count} (${maxDay.displayDate})`
                        : "Nenhum";
                    })()}
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">Dias Livres</p>
                  <p className="text-lg font-bold text-primary sm:text-xl">
                    {
                      visibleDates
                        .filter((d) => d.isAvailable)
                        .filter(
                          ({ dateStr }) =>
                            getInjectionsForDate(dateStr).length === 0,
                        ).length
                    }
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">Média Diária</p>
                  <p className="text-lg font-bold sm:text-xl">
                    {(() => {
                      const availableDays = visibleDates.filter(
                        (d) => d.isAvailable,
                      );
                      const totalInjections = availableDays.reduce(
                        (total, { dateStr }) =>
                          total + getInjectionsForDate(dateStr).length,
                        0,
                      );
                      return availableDays.length > 0
                        ? (totalInjections / availableDays.length).toFixed(1)
                        : "0.0";
                    })()}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Agendamentos da Data Selecionada */}
      {selectedDate && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg sm:text-xl">
              Injeções Programadas -{" "}
              <span className="break-words">
                {new Date(selectedDate).toLocaleDateString("pt-BR", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {(() => {
              const injections = getInjectionsForDate(selectedDate);
              return injections.length > 0 ? (
                <div className="space-y-4">
                  <div className="space-y-3">
                    {injections.map((injection: any, index: number) => (
                      <div
                        key={injection.id}
                        className="rounded-lg border p-4 transition-colors hover:bg-muted/50"
                      >
                        <div className="flex items-start justify-between">
                          <div className="min-w-0 flex-1 space-y-1 pr-4">
                            <p className="break-words font-medium">
                              {injection.indication?.patient?.name ||
                                "Paciente"}
                            </p>
                            <p className="break-words text-sm text-muted-foreground">
                              {getEyeIcon(injection.eye)}{" "}
                              {getEyeLabel(injection.eye)} -{" "}
                              {injection.indication?.collaborator?.name ||
                                "Médico"}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              Dose {index + 1} de{" "}
                              {injection.indication?.injections?.length || 0}
                            </p>
                          </div>
                          <div className="flex flex-col items-end space-y-1">
                            <Badge variant="outline" className="text-xs">
                              {injection.status}
                            </Badge>
                            {injection.status === "RESCHEDULED" && (
                              <Badge variant="secondary" className="text-xs">
                                Reagendado
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Resumo */}
                  <div className="mt-6 rounded-lg border bg-muted/50 p-4">
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                      <div className="min-w-0 flex-1">
                        <p className="font-medium">Resumo do Dia</p>
                        <p className="break-words text-sm text-muted-foreground">
                          {injections.length} injeções programadas •{" "}
                          {
                            injections.filter(
                              (inj: any) => inj.status === "CONFIRMED",
                            ).length
                          }{" "}
                          confirmadas •{" "}
                          {
                            injections.filter(
                              (inj: any) => inj.status === "COMPLETED",
                            ).length
                          }{" "}
                          concluídas
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium">Capacidade</p>
                        <p className="text-sm text-muted-foreground">
                          {getAvailabilityStatus().booked} /{" "}
                          {getAvailabilityStatus().capacity} vagas ocupadas
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="py-12 text-center">
                  <Calendar className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
                  <p className="text-muted-foreground">
                    Nenhuma injeção programada para esta data
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {getAvailabilityStatus().capacity} vagas disponíveis
                  </p>
                </div>
              );
            })()}
          </CardContent>
        </Card>
      )}

      {/* Lista de Indicações Pendentes */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg sm:text-xl">
            Indicações Pendentes de Avaliação
          </CardTitle>
          <div className="mt-2 text-sm text-muted-foreground">
            <p>
              <strong>Como funciona:</strong> Ao aprovar uma indicação, o
              sistema automaticamente cria agendamentos para todas as datas
              programadas. Você pode modificar as datas dos agendamentos
              diretamente nos campos de data abaixo.
            </p>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {pendingIndications.length === 0 ? (
              <div className="py-12 text-center">
                <p className="text-muted-foreground">
                  Nenhuma indicação pendente de avaliação
                </p>
              </div>
            ) : (
              pendingIndications.map((indication) => (
                <Card
                  key={indication.id}
                  className={`${
                    isUrgent(indication.swalisClassification)
                      ? "border-l-destructive"
                      : "border-l-primary"
                  } border-l-4`}
                >
                  <CardContent className="p-4 sm:p-6">
                    <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
                      {/* Informações do Paciente */}
                      <div className="min-w-0 space-y-4">
                        <div>
                          <h3 className="break-words text-lg font-semibold">
                            {indication.patient.name}
                          </h3>
                          <p className="break-words text-muted-foreground">
                            ID: {indication.patient.refId}
                          </p>
                          <p className="flex items-center text-muted-foreground">
                            <Phone className="mr-1 h-4 w-4" />
                            (11) 99999-9999
                          </p>
                        </div>

                        <div className="space-y-2">
                          <div className="flex flex-wrap items-center gap-2">
                            <Badge
                              variant={getPriorityVariant(
                                indication.swalisClassification,
                              )}
                            >
                              {getPriorityText(indication.swalisClassification)}
                            </Badge>
                            {isUrgent(indication.swalisClassification) && (
                              <Badge variant="destructive">Urgente</Badge>
                            )}
                          </div>
                          <div className="flex flex-wrap items-center gap-2">
                            <Badge variant="outline" className="text-xs">
                              {indication.injections.length} agendamentos
                              programados
                            </Badge>
                            {indication.injections.some(
                              (inj: any) => inj.status === "RESCHEDULED",
                            ) && (
                              <Badge variant="secondary" className="text-xs">
                                Datas modificadas
                              </Badge>
                            )}
                          </div>
                          <div className="space-y-1 text-sm">
                            <p className="break-words">
                              <strong>Diagnóstico:</strong>{" "}
                              {indication.indication}
                            </p>
                            <p className="break-words">
                              <strong>Medicamento:</strong>{" "}
                              {indication.medication}
                            </p>
                            <p className="break-words">
                              <strong>Médico:</strong>{" "}
                              {indication.collaborator.name}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Programação de Doses */}
                      <div className="space-y-4">
                        <h4 className="font-medium">Programação de Doses</h4>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-sm">👁️ Olho Direito:</span>
                            <Badge variant="outline">
                              {indication.totalOD} doses
                            </Badge>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm">👁️‍🗨️ Olho Esquerdo:</span>
                            <Badge variant="outline">
                              {indication.totalOS} doses
                            </Badge>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm">Início:</span>
                            <Badge variant="outline">
                              {getEyeIcon(indication.startEye)}{" "}
                              {getEyeLabel(indication.startEye)}
                            </Badge>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm">Data de Início:</span>
                            <span className="text-sm font-medium">
                              {new Date(
                                indication.treatmentStartDate,
                              ).toLocaleDateString("pt-BR")}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Ações */}
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">
                            Enviado em:{" "}
                            {new Date(indication.createdAt).toLocaleDateString(
                              "pt-BR",
                            )}
                          </span>
                        </div>

                        <div className="space-y-2">
                          <Button
                            size="sm"
                            className="w-full"
                            onClick={() => handleApprove(indication.id)}
                            disabled={approveMutation.isPending}
                          >
                            <Check className="mr-2 h-4 w-4" />
                            {approveMutation.isPending
                              ? "Aprovando..."
                              : "Aprovar"}
                          </Button>

                          <Button
                            size="sm"
                            variant="outline"
                            className="w-full"
                            onClick={() => handleReschedule(indication)}
                            disabled={rescheduleMutation.isPending}
                          >
                            <Edit className="mr-2 h-4 w-4" />
                            Reagendar
                          </Button>

                          <Button
                            size="sm"
                            variant="outline"
                            className="w-full text-destructive hover:text-destructive"
                            onClick={() => handleReject(indication.id)}
                            disabled={rejectMutation.isPending}
                          >
                            <X className="mr-2 h-4 w-4" />
                            {rejectMutation.isPending
                              ? "Rejeitando..."
                              : "Rejeitar"}
                          </Button>
                        </div>
                      </div>
                    </div>

                    {/* Cronograma de Aplicações */}
                    <div className="mt-6">
                      <h4 className="mb-3 font-medium">
                        Cronograma de Aplicações
                      </h4>
                      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                        {indication.injections.map((injection: any) => (
                          <div
                            key={injection.id}
                            className="space-y-2 rounded-lg border p-3"
                          >
                            <div className="flex items-center justify-between">
                              <Badge variant="outline" className="text-xs">
                                {getEyeIcon(injection.eye)}{" "}
                                {getEyeLabel(injection.eye)}
                              </Badge>
                              <Badge variant="secondary" className="text-xs">
                                Dose{" "}
                                {indication.injections.findIndex(
                                  (i: any) => i.id === injection.id,
                                ) + 1}
                              </Badge>
                            </div>
                            <div className="space-y-2">
                              <DatePicker
                                date={new Date(injection.scheduledDate)}
                                onDateChange={(date) => {
                                  if (date) {
                                    const dateStr = date
                                      .toISOString()
                                      .split("T")[0];
                                    if (dateStr) {
                                      handleUpdateInjectionDate(
                                        injection.id,
                                        dateStr,
                                      );
                                    }
                                  }
                                }}
                                className={`w-full text-sm ${(() => {
                                  const dateStr = new Date(
                                    injection.scheduledDate,
                                  )
                                    .toISOString()
                                    .split("T")[0];
                                  if (!dateStr) return "";
                                  const availability = getAvailabilityStatus();
                                  return !availability.available
                                    ? "border-destructive"
                                    : "";
                                })()}`}
                              />
                              {updateInjectionDateMutation.isPending && (
                                <div className="flex justify-center">
                                  <div className="h-4 w-4 animate-spin rounded-full border-b-2 border-primary"></div>
                                </div>
                              )}
                              <div className="break-words text-xs text-muted-foreground">
                                {new Date(
                                  injection.scheduledDate,
                                ).toLocaleDateString("pt-BR", {
                                  weekday: "long",
                                  timeZone: "UTC",
                                })}
                              </div>
                              <div className="flex items-center justify-between">
                                {injection.status === "RESCHEDULED" && (
                                  <Badge
                                    variant="secondary"
                                    className="text-xs"
                                  >
                                    Reagendado
                                  </Badge>
                                )}
                                <div className="text-xs text-muted-foreground">
                                  {(() => {
                                    const dateStr = new Date(
                                      injection.scheduledDate,
                                    )
                                      .toISOString()
                                      .split("T")[0];
                                    if (!dateStr) return "Data inválida";
                                    const availability =
                                      getAvailabilityStatus();
                                    return `${availability.availableSlots}/${availability.capacity} vagas`;
                                  })()}
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Observações do NIR */}
                    <div className="mt-4">
                      <textarea
                        placeholder="Observações do NIR (opcional)"
                        value={nirNotes}
                        onChange={(e) => setNirNotes(e.target.value)}
                        className="w-full resize-none rounded-lg border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                        rows={3}
                      />
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </CardContent>
      </Card>

      {/* Indicações Processadas */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg sm:text-xl">
            Indicações Processadas
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Versão mobile: Cards empilhados */}
          <div className="block sm:hidden">
            <div className="space-y-4">
              {processedIndications.length === 0 ? (
                <div className="py-8 text-center">
                  <p className="text-muted-foreground">
                    Nenhuma indicação processada
                  </p>
                </div>
              ) : (
                processedIndications.map((indication) => (
                  <Card key={indication.id} className="p-4">
                    <div className="space-y-3">
                      <div className="flex items-start justify-between">
                        <div className="min-w-0 flex-1 pr-4">
                          <div className="break-words font-medium">
                            {indication.patient.name}
                          </div>
                          <div className="break-words text-sm text-muted-foreground">
                            {indication.patient.refId}
                          </div>
                        </div>
                        <Button size="sm" variant="outline" asChild>
                          <Link href={`/antivegf/indications/${indication.id}`}>
                            <Eye className="h-4 w-4" />
                          </Link>
                        </Button>
                      </div>

                      <div className="space-y-2">
                        <div>
                          <span className="text-sm font-medium">
                            Diagnóstico:{" "}
                          </span>
                          <span className="break-words text-sm">
                            {indication.indication}
                          </span>
                        </div>
                        <div>
                          <span className="text-sm font-medium">
                            Medicamento:{" "}
                          </span>
                          <span className="break-words text-sm">
                            {indication.medication}
                          </span>
                        </div>
                        <div>
                          <span className="text-sm font-medium">Médico: </span>
                          <span className="break-words text-sm">
                            {indication.collaborator.name}
                          </span>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        <Badge variant={getStatusVariant(indication.status)}>
                          {getStatusText(indication.status)}
                        </Badge>
                        <Badge
                          variant={getPriorityVariant(
                            indication.swalisClassification,
                          )}
                        >
                          {getPriorityText(indication.swalisClassification)}
                        </Badge>
                      </div>

                      <div className="text-sm text-muted-foreground">
                        Avaliado em:{" "}
                        {new Date(indication.updatedAt).toLocaleDateString(
                          "pt-BR",
                        )}
                      </div>
                    </div>
                  </Card>
                ))
              )}
            </div>
          </div>

          {/* Versão desktop: Tabela */}
          <div className="hidden overflow-x-auto sm:block">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Paciente</TableHead>
                  <TableHead className="hidden md:table-cell">
                    Diagnóstico
                  </TableHead>
                  <TableHead className="hidden lg:table-cell">
                    Medicamento
                  </TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="hidden md:table-cell">
                    Prioridade
                  </TableHead>
                  <TableHead className="hidden lg:table-cell">Médico</TableHead>
                  <TableHead className="hidden xl:table-cell">
                    Data de Avaliação
                  </TableHead>
                  <TableHead>Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {processedIndications.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="py-8 text-center">
                      <p className="text-muted-foreground">
                        Nenhuma indicação processada
                      </p>
                    </TableCell>
                  </TableRow>
                ) : (
                  processedIndications.map((indication) => (
                    <TableRow key={indication.id}>
                      <TableCell>
                        <div className="min-w-0">
                          <div className="break-words font-medium">
                            {indication.patient.name}
                          </div>
                          <div className="break-words text-sm text-muted-foreground">
                            {indication.patient.refId}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        <div className="break-words">
                          {indication.indication}
                        </div>
                      </TableCell>
                      <TableCell className="hidden lg:table-cell">
                        <div className="break-words">
                          {indication.medication}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={getStatusVariant(indication.status)}>
                          {getStatusText(indication.status)}
                        </Badge>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        <Badge
                          variant={getPriorityVariant(
                            indication.swalisClassification,
                          )}
                        >
                          {getPriorityText(indication.swalisClassification)}
                        </Badge>
                      </TableCell>
                      <TableCell className="hidden lg:table-cell">
                        <div className="break-words">
                          {indication.collaborator.name}
                        </div>
                      </TableCell>
                      <TableCell className="hidden xl:table-cell">
                        {new Date(indication.updatedAt).toLocaleDateString(
                          "pt-BR",
                        )}
                      </TableCell>
                      <TableCell>
                        <Button size="sm" variant="outline" asChild>
                          <Link href={`/antivegf/indications/${indication.id}`}>
                            <Eye className="h-4 w-4" />
                          </Link>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Dialog de Reagendamento */}
      <Dialog
        open={isRescheduleDialogOpen}
        onOpenChange={setIsRescheduleDialogOpen}
      >
        <DialogContent className="max-h-[90vh] w-[calc(100vw-2rem)] max-w-2xl overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-lg sm:text-xl">
              Reagendar Indicação
            </DialogTitle>
          </DialogHeader>
          {selectedIndication && (
            <div className="space-y-4">
              <div className="rounded-lg border bg-muted/50 p-4">
                <h4 className="mb-2 break-words font-medium">
                  {selectedIndication.patient.name} -{" "}
                  {selectedIndication.indication}
                </h4>
                <p className="text-sm text-muted-foreground">
                  Reagende as datas das aplicações conforme necessário
                </p>
              </div>

              <div className="space-y-4">
                {selectedIndication.injections.map((injection: any) => (
                  <div
                    key={injection.id}
                    className="flex flex-col space-y-2 sm:flex-row sm:items-center sm:space-x-4 sm:space-y-0"
                  >
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <Badge variant="outline" className="text-xs">
                          {getEyeIcon(injection.eye)}{" "}
                          {getEyeLabel(injection.eye)}
                        </Badge>
                        <Badge variant="secondary" className="text-xs">
                          Dose{" "}
                          {selectedIndication.injections.findIndex(
                            (i: any) => i.id === injection.id,
                          ) + 1}
                        </Badge>
                      </div>
                    </div>
                    <div className="w-full sm:w-40">
                      <DatePicker
                        date={
                          new Date(
                            updatedDates[injection.id] ||
                              injection.scheduledDate,
                          )
                        }
                        onDateChange={(date) => {
                          if (date) {
                            setUpdatedDates((prev) => ({
                              ...prev,
                              [injection.id]: date.toISOString().split("T")[0]!,
                            }));
                          }
                        }}
                        className="w-full"
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex flex-col gap-2 sm:flex-row sm:justify-end sm:gap-2">
                <Button
                  variant="outline"
                  onClick={() => setIsRescheduleDialogOpen(false)}
                  className="w-full sm:w-auto"
                >
                  Cancelar
                </Button>
                <Button
                  onClick={() => {
                    rescheduleMutation.mutate({
                      indicationId: selectedIndication.id,
                      updatedDates,
                      nirNotes: nirNotes || undefined,
                    });
                  }}
                  disabled={rescheduleMutation.isPending}
                  className="w-full sm:w-auto"
                >
                  {rescheduleMutation.isPending
                    ? "Salvando..."
                    : "Confirmar Reagendamento"}
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
