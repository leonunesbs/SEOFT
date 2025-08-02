"use client";

import {
  AlertCircle,
  Calendar,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  Clock,
  Sun,
  Sunset,
} from "lucide-react";
import type {
  Appointment,
  Clinic,
  Collaborator,
  Patient,
} from "@prisma/client";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import React, { useCallback, useMemo, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";

import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import Link from "next/link";
import { TooltipProvider } from "~/components/ui/tooltip";
import { api } from "~/trpc/react";
import { formatDateForAPI } from "~/lib/utils";

// Tipos baseados no Prisma
type AppointmentWithRelations = Appointment & {
  patient: Pick<Patient, "name" | "refId">;
  clinic: Pick<Clinic, "name"> | null;
  collaborator: Pick<Collaborator, "name">;
};

type ShiftType = "MORNING" | "AFTERNOON";

type ShiftInfo = {
  name: string;
  icon: "Sun" | "Sunset";
  time: string;
};

type VirtualizedShiftListProps = {
  appointments: AppointmentWithRelations[];
  shiftName: string;
  shiftIcon: "Sun" | "Sunset";
  maxHeight?: number;
};

type AppointmentCardProps = {
  appointment: AppointmentWithRelations;
  formatTime: (date: Date) => string;
  getStatusBadge: (status: string) => React.ReactNode;
};

// Componente de card de agendamento otimizado
const AppointmentCard = React.memo<AppointmentCardProps>(
  ({ appointment, formatTime, getStatusBadge }) => (
    <div className="cursor-pointer rounded border p-1.5 text-xs transition-colors hover:bg-muted/50">
      <div className="flex items-center justify-between gap-1">
        <span className="truncate font-medium">{appointment.patient.name}</span>
        {getStatusBadge(appointment.status)}
      </div>
      <div className="text-xs text-muted-foreground">
        <div className="flex items-center gap-1">
          <Clock className="h-2.5 w-2.5" />
          {formatTime(appointment.scheduledDate)}
        </div>
        {appointment.clinic?.name && (
          <div className="flex items-center gap-1">
            <Calendar className="h-2.5 w-2.5" />
            <span className="truncate">{appointment.clinic.name}</span>
          </div>
        )}
      </div>
    </div>
  ),
);

AppointmentCard.displayName = "AppointmentCard";

// Função para obter cor baseada na quantidade - atualizada para dark mode
function getCapacityColor(count: number): string {
  if (count > 80)
    return "text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/20 border-red-200 dark:border-red-800";
  if (count >= 51)
    return "text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-950/20 border-orange-200 dark:border-orange-800";
  if (count >= 31)
    return "text-yellow-600 dark:text-yellow-400 bg-yellow-50 dark:bg-yellow-950/20 border-yellow-200 dark:border-yellow-800";
  return "text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-800";
}

// Componente de lista virtualizada para turnos
const VirtualizedShiftList: React.FC<VirtualizedShiftListProps> = ({
  appointments,
  shiftName,
  shiftIcon,
  maxHeight = 128,
}) => {
  const [visibleCount, setVisibleCount] = useState(8);
  const [isExpanded, setIsExpanded] = useState(false);

  const visibleAppointments = appointments.slice(0, visibleCount);
  const hasMore = appointments.length > visibleCount;

  const handleShowMore = useCallback(() => {
    if (isExpanded) {
      setVisibleCount(8);
      setIsExpanded(false);
    } else {
      setVisibleCount(Math.min(appointments.length, 20));
      setIsExpanded(true);
    }
  }, [appointments.length, isExpanded]);

  const formatTime = useCallback((date: Date) => {
    return new Intl.DateTimeFormat("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  }, []);

  const getStatusBadge = useCallback((status: string) => {
    switch (status) {
      case "COMPLETED":
        return (
          <Badge
            variant="default"
            className="bg-green-100 px-1 py-0 text-xs text-green-800 dark:bg-green-900/20 dark:text-green-400"
          >
            ✓
          </Badge>
        );
      case "CANCELLED":
        return (
          <Badge variant="destructive" className="px-1 py-0 text-xs">
            ✗
          </Badge>
        );
      case "NO_SHOW":
        return (
          <Badge variant="destructive" className="px-1 py-0 text-xs">
            ❌
          </Badge>
        );
      case "CONFIRMED":
        return (
          <Badge
            variant="default"
            className="bg-blue-100 px-1 py-0 text-xs text-blue-800 dark:bg-blue-900/20 dark:text-blue-400"
          >
            ✓
          </Badge>
        );
      default:
        return (
          <Badge variant="outline" className="px-1 py-0 text-xs">
            ⏳
          </Badge>
        );
    }
  }, []);

  const renderShiftIcon = () => {
    switch (shiftIcon) {
      case "Sun":
        return <Sun className="h-3 w-3" />;
      case "Sunset":
        return <Sunset className="h-3 w-3" />;
      default:
        return <Sun className="h-3 w-3" />;
    }
  };

  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between text-xs font-medium">
        <div className="flex items-center gap-1 text-muted-foreground">
          {renderShiftIcon()}
          <span>{shiftName}</span>
        </div>
        <Badge
          variant="outline"
          className={`px-2 py-0 text-xs ${getCapacityColor(appointments.length)}`}
        >
          {appointments.length}
        </Badge>
      </div>
      <div
        className="space-y-1"
        style={{ maxHeight: `${maxHeight}px`, overflowY: "auto" }}
      >
        {visibleAppointments.map((appointment) => (
          <AppointmentCard
            key={appointment.id}
            appointment={appointment}
            formatTime={formatTime}
            getStatusBadge={getStatusBadge}
          />
        ))}
        {hasMore && (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleShowMore}
            className="h-6 w-full text-xs"
          >
            {isExpanded
              ? "Mostrar menos"
              : `+${appointments.length - visibleCount} mais`}
          </Button>
        )}
      </div>
    </div>
  );
};

// Função para determinar o turno baseado no horário
function getShiftFromTime(date: Date): ShiftType {
  const hour = date.getHours();
  if (hour >= 6 && hour < 12) {
    return "MORNING";
  } else if (hour >= 12 && hour < 18) {
    return "AFTERNOON";
  } else {
    return hour >= 18 ? "AFTERNOON" : "MORNING";
  }
}

// Função para obter informações do turno
function getShiftInfo(shift: ShiftType): ShiftInfo {
  switch (shift) {
    case "MORNING":
      return { name: "Manhã", icon: "Sun", time: "06:00-12:00" };
    case "AFTERNOON":
      return { name: "Tarde", icon: "Sunset", time: "12:00-18:00" };
    default:
      return { name: "Tarde", icon: "Sunset", time: "12:00-18:00" };
  }
}

// Componente principal otimizado
export default function AgendaCalendarPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [viewMode, setViewMode] = useState<"calendar" | "list">("calendar");
  const [currentWeek, setCurrentWeek] = useState(0); // 0 = current week, 1 = next week, -1 = previous week
  const itemsPerPage = 20;

  // Buscar dados via tRPC
  const {
    data: appointments = [],
    isLoading,
    error,
  } = api.appointment.getWeekAppointments.useQuery({});

  // Paginação otimizada - agora usando todos os appointments sem filtros
  const paginatedAppointments = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return appointments.slice(startIndex, startIndex + itemsPerPage);
  }, [appointments, currentPage]);

  const totalPages = Math.ceil(appointments.length / itemsPerPage);

  // Agrupar agendamentos por dia e turno (otimizado)
  const appointmentsByDayAndShift = useMemo(() => {
    return appointments.reduce(
      (acc, appointment) => {
        const date = formatDateForAPI(appointment.scheduledDate);
        const shift = getShiftFromTime(appointment.scheduledDate);

        if (!acc[date]) {
          acc[date] = { MORNING: [], AFTERNOON: [] };
        }
        acc[date][shift].push(appointment);
        return acc;
      },
      {} as Record<
        string,
        {
          MORNING: AppointmentWithRelations[];
          AFTERNOON: AppointmentWithRelations[];
        }
      >,
    );
  }, [appointments]);

  // Gerar semana atual (domingo a sábado)
  const weekDays = useMemo(() => {
    const today = new Date();
    const currentDayOfWeek = today.getDay(); // 0 = domingo, 1 = segunda, etc.

    // Calcular o domingo da semana atual
    const sunday = new Date(today);
    sunday.setDate(today.getDate() - currentDayOfWeek + currentWeek * 7);

    // Gerar os 7 dias da semana (domingo a sábado)
    return Array.from({ length: 7 }, (_, i) => {
      const date = new Date(sunday);
      date.setDate(sunday.getDate() + i);
      return date;
    });
  }, [currentWeek]);

  const getStatusBadge = useCallback((status: string) => {
    switch (status) {
      case "COMPLETED":
        return (
          <Badge
            variant="default"
            className="bg-green-100 px-1 py-0 text-xs text-green-800 dark:bg-green-900/20 dark:text-green-400"
          >
            ✓
          </Badge>
        );
      case "CANCELLED":
        return (
          <Badge variant="destructive" className="px-1 py-0 text-xs">
            ✗
          </Badge>
        );
      case "NO_SHOW":
        return (
          <Badge variant="destructive" className="px-1 py-0 text-xs">
            ❌
          </Badge>
        );
      case "CONFIRMED":
        return (
          <Badge
            variant="default"
            className="bg-blue-100 px-1 py-0 text-xs text-blue-800 dark:bg-blue-900/20 dark:text-blue-400"
          >
            ✓
          </Badge>
        );
      default:
        return (
          <Badge variant="outline" className="px-1 py-0 text-xs">
            ⏳
          </Badge>
        );
    }
  }, []);

  const formatDate = useCallback((date: Date) => {
    return new Intl.DateTimeFormat("pt-BR", {
      weekday: "short",
      day: "numeric",
      month: "short",
    }).format(date);
  }, []);

  const formatTime = useCallback((date: Date) => {
    return new Intl.DateTimeFormat("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  }, []);

  // Estatísticas otimizadas
  const stats = useMemo(() => {
    const today = new Date();
    const todayAppointments = appointments.filter(
      (a: AppointmentWithRelations) => {
        const appointmentDate = new Date(a.scheduledDate);
        return (
          appointmentDate.getDate() === today.getDate() &&
          appointmentDate.getMonth() === today.getMonth() &&
          appointmentDate.getFullYear() === today.getFullYear()
        );
      },
    );

    return {
      total: appointments.length,
      today: todayAppointments.length,
      confirmed: appointments.filter(
        (a: AppointmentWithRelations) => a.status === "CONFIRMED",
      ).length,
      pending: appointments.filter(
        (a: AppointmentWithRelations) => a.status === "SCHEDULED",
      ).length,
    };
  }, [appointments]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-center">
          <div className="mx-auto h-8 w-8 animate-spin rounded-full border-b-2 border-primary"></div>
          <p className="mt-2 text-muted-foreground">
            Carregando agendamentos...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-center">
          <AlertCircle className="mx-auto h-8 w-8 text-destructive" />
          <p className="mt-2 text-destructive">Erro ao carregar agendamentos</p>
          <p className="text-sm text-muted-foreground">{error.message}</p>
        </div>
      </div>
    );
  }

  return (
    <TooltipProvider>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Calendário de Agendamentos</h1>
            <p className="text-muted-foreground">
              Visualize e gerencie os agendamentos da semana
            </p>
          </div>
          <Button asChild>
            <Link href="/patients/search">
              <Calendar className="mr-2 h-4 w-4" />
              Novo Agendamento
            </Link>
          </Button>
        </div>

        {/* Navegação semanal */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <Button
                variant="outline"
                onClick={() => setCurrentWeek(currentWeek - 1)}
                className="flex items-center gap-2"
              >
                <ChevronLeft className="h-4 w-4" />
                Semana Anterior
              </Button>

              <div className="text-center">
                <h3 className="text-lg font-semibold">
                  {currentWeek === 0
                    ? "Esta Semana"
                    : currentWeek > 0
                      ? `${currentWeek} Semana${currentWeek > 1 ? "s" : ""} à Frente`
                      : `${Math.abs(currentWeek)} Semana${Math.abs(currentWeek) > 1 ? "s" : ""} Atrás`}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {weekDays[0] && formatDate(weekDays[0])} -{" "}
                  {weekDays[6] && formatDate(weekDays[6])}
                </p>
              </div>

              <Button
                variant="outline"
                onClick={() => setCurrentWeek(currentWeek + 1)}
                className="flex items-center gap-2"
              >
                Próxima Semana
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Estatísticas rápidas */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.total}</div>
              <p className="text-xs text-muted-foreground">Esta semana</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Hoje</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.today}</div>
              <p className="text-xs text-muted-foreground">Agendamentos hoje</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Confirmados</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.confirmed}</div>
              <p className="text-xs text-muted-foreground">Status confirmado</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pendentes</CardTitle>
              <AlertCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.pending}</div>
              <p className="text-xs text-muted-foreground">
                Aguardando confirmação
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Tabs para diferentes visualizações */}
        <Tabs
          value={viewMode}
          onValueChange={(value) => setViewMode(value as "calendar" | "list")}
        >
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="calendar">Vista Calendário</TabsTrigger>
            <TabsTrigger value="list">Vista Lista</TabsTrigger>
          </TabsList>

          <TabsContent value="calendar" className="space-y-4">
            {/* Calendário semanal otimizado */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-7">
              {weekDays.map((date) => {
                const dateKey = formatDateForAPI(date);
                const dayAppointments = appointmentsByDayAndShift[dateKey] || {
                  MORNING: [],
                  AFTERNOON: [],
                };
                const isToday =
                  date.toDateString() === new Date().toDateString();
                const totalAppointments =
                  dayAppointments.MORNING.length +
                  dayAppointments.AFTERNOON.length;

                return (
                  <Card
                    key={dateKey}
                    className={isToday ? "ring-2 ring-primary" : ""}
                  >
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">
                        {formatDate(date)}
                      </CardTitle>
                      {isToday && (
                        <Badge variant="secondary" className="w-fit text-xs">
                          Hoje
                        </Badge>
                      )}
                    </CardHeader>
                    <CardContent className="space-y-2">
                      {totalAppointments === 0 ? (
                        <p className="py-4 text-center text-xs text-muted-foreground">
                          Nenhum agendamento
                        </p>
                      ) : (
                        <>
                          {dayAppointments.MORNING.length > 0 && (
                            <VirtualizedShiftList
                              appointments={dayAppointments.MORNING}
                              shiftName="Manhã"
                              shiftIcon="Sun"
                              maxHeight={128}
                            />
                          )}

                          {dayAppointments.AFTERNOON.length > 0 && (
                            <VirtualizedShiftList
                              appointments={dayAppointments.AFTERNOON}
                              shiftName="Tarde"
                              shiftIcon="Sunset"
                              maxHeight={128}
                            />
                          )}
                        </>
                      )}
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          <TabsContent value="list" className="space-y-4">
            {/* Lista detalhada com paginação otimizada */}
            <Card>
              <CardHeader>
                <CardTitle>
                  Agendamentos Detalhados ({appointments.length} resultados)
                </CardTitle>
              </CardHeader>
              <CardContent>
                {appointments.length === 0 ? (
                  <div className="py-8 text-center text-muted-foreground">
                    <Calendar className="mx-auto h-12 w-12 opacity-50" />
                    <p className="mt-2">Nenhum agendamento encontrado</p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {paginatedAppointments.map((appointment) => {
                      const shift = getShiftFromTime(appointment.scheduledDate);
                      const shiftInfo = getShiftInfo(shift);

                      return (
                        <div
                          key={appointment.id}
                          className="flex items-center justify-between rounded-lg border p-2 transition-colors hover:bg-muted/50"
                        >
                          <div className="min-w-0 flex-1 space-y-1">
                            <div className="flex flex-wrap items-center gap-2">
                              <Badge variant="outline" className="text-xs">
                                #{appointment.patient.refId}
                              </Badge>
                              <span className="truncate font-medium">
                                {appointment.patient.name}
                              </span>
                              {getStatusBadge(appointment.status)}
                              <Badge variant="secondary" className="text-xs">
                                {shiftInfo.icon === "Sun" ? (
                                  <Sun className="mr-1 h-3 w-3" />
                                ) : (
                                  <Sunset className="mr-1 h-3 w-3" />
                                )}
                                {shiftInfo.name}
                              </Badge>
                            </div>
                            <p className="truncate text-sm text-muted-foreground">
                              {appointment.clinic?.name &&
                                `${appointment.clinic.name} • `}
                              {formatDate(appointment.scheduledDate)} às{" "}
                              {formatTime(appointment.scheduledDate)}
                            </p>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            asChild
                            className="ml-2 flex-shrink-0"
                          >
                            <Link href={`/agenda/${appointment.id}`}>Ver</Link>
                          </Button>
                        </div>
                      );
                    })}

                    {/* Paginação */}
                    {totalPages > 1 && (
                      <div className="flex items-center justify-between pt-4">
                        <p className="text-sm text-muted-foreground">
                          Página {currentPage} de {totalPages} (
                          {appointments.length} resultados)
                        </p>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() =>
                              setCurrentPage(Math.max(1, currentPage - 1))
                            }
                            disabled={currentPage === 1}
                          >
                            <ChevronLeft className="h-4 w-4" />
                          </Button>
                          <span className="text-sm">
                            {currentPage} / {totalPages}
                          </span>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() =>
                              setCurrentPage(
                                Math.min(totalPages, currentPage + 1),
                              )
                            }
                            disabled={currentPage === totalPages}
                          >
                            <ChevronRight className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </TooltipProvider>
  );
}
