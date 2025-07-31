"use client";

import {
  AlertCircle,
  Calendar,
  Clock,
  Edit,
  MapPin,
  Plus,
  Trash2,
  User,
} from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "~/components/ui/alert-dialog";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";
import {
  STATUS_COLORS,
  SWALIS_COLORS,
  formatDateAndWeekday,
  formatDateForAPI,
  formatDateForDisplay,
  getAvailableDaysInfo,
  getEyeIcon,
  getEyeLabel,
  getPriorityText,
  getStatusText,
  isValidAppointmentDate,
} from "~/lib/utils/antivegf";
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

import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { Label } from "~/components/ui/label";
import Link from "next/link";
import { ScheduleDatePicker } from "~/components/ui/schedule-date-picker";
import { Textarea } from "~/components/ui/textarea";
import { api } from "~/trpc/react";
import { useState } from "react";
import { useToast } from "~/hooks/use-toast";

// Tipos para os agendamentos
interface Appointment {
  id: string;
  patientName: string;
  patientId: string;
  patientPhone: string;
  date: string | undefined;
  time: string;
  duration: number;
  doctor: string;
  room: string;
  status: "pending" | "rescheduled" | "confirmed" | "completed";
  medication: string;
  priority: "low" | "medium" | "high";
  notes?: string;
  eye: "OD" | "OS";
  doseNumber: number;
}

export default function AppointmentsPage() {
  const { toast } = useToast();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    new Date(),
  );
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [editingAppointment, setEditingAppointment] =
    useState<Appointment | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  // Função para obter a próxima data válida
  const getNextValidDate = () => {
    if (!selectedDate) return new Date();
    const date = new Date(selectedDate);
    const nextDate = new Date(date);

    // Se a data atual já é válida, retornar ela mesma
    if (isValidAppointmentDate(selectedDate)) {
      return selectedDate;
    }

    // Procurar a próxima data válida
    let attempts = 0;
    const maxAttempts = 30;

    while (attempts < maxAttempts) {
      nextDate.setDate(nextDate.getDate() + 1);
      const dayOfWeek = nextDate.getDay();

      if (dayOfWeek === 1 || dayOfWeek === 2 || dayOfWeek === 4) {
        return nextDate;
      }

      attempts++;
    }

    return selectedDate;
  };

  // Query para verificar disponibilidade da data selecionada
  const availabilityQuery = api.schedule.checkAvailability.useQuery(
    { date: formatDateForAPI(selectedDate) },
    {
      enabled: !!selectedDate,
      refetchInterval: 30000, // Refetch a cada 30 segundos
    },
  );

  // Query para buscar agendamentos da data selecionada
  const appointmentsQuery = api.appointment.getByDate.useQuery(
    { date: formatDateForAPI(selectedDate) },
    {
      enabled: !!selectedDate && isValidAppointmentDate(selectedDate),
      refetchInterval: 30000, // Refetch a cada 30 segundos
    },
  );

  // Mutations para gerenciar agendamentos
  const updateAppointmentMutation = api.appointment.update.useMutation({
    onSuccess: () => {
      toast({
        title: "Sucesso!",
        description: "Agendamento atualizado com sucesso",
        variant: "default",
      });
      appointmentsQuery.refetch();
    },
    onError: (error) => {
      toast({
        title: "Erro",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const deleteAppointmentMutation = api.appointment.delete.useMutation({
    onSuccess: () => {
      toast({
        title: "Sucesso!",
        description: "Agendamento removido com sucesso",
        variant: "default",
      });
      appointmentsQuery.refetch();
    },
    onError: (error) => {
      toast({
        title: "Erro",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const handleDeleteAppointment = (appointmentId: string) => {
    deleteAppointmentMutation.mutate({ id: appointmentId });
  };

  const handleEditAppointment = (appointment: Appointment) => {
    setEditingAppointment(appointment);
    setIsEditDialogOpen(true);
  };

  const handleSaveEdit = () => {
    if (!editingAppointment) return;

    // Converter status do frontend para o formato do backend
    const statusMap: Record<
      string,
      "PENDING" | "RESCHEDULED" | "CONFIRMED" | "COMPLETED"
    > = {
      pending: "PENDING",
      rescheduled: "RESCHEDULED",
      confirmed: "CONFIRMED",
      completed: "COMPLETED",
    };

    const backendStatus = statusMap[editingAppointment.status] || "PENDING";

    updateAppointmentMutation.mutate({
      id: editingAppointment.id,
      status: backendStatus,
      scheduledDate: new Date(
        editingAppointment.date + "T" + editingAppointment.time,
      ),
    });

    setIsEditDialogOpen(false);
    setEditingAppointment(null);
  };

  const filteredAppointments = (appointmentsQuery.data || []).filter(
    (appointment) =>
      statusFilter === "all" || appointment.status === statusFilter,
  );
  const availableDays = getAvailableDaysInfo();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
        <div className="min-w-0 flex-1">
          <h1 className="text-xl font-bold tracking-tight text-foreground sm:text-2xl lg:text-3xl">
            Gerenciar Agendamentos
          </h1>
          <p className="mt-1 text-sm text-muted-foreground sm:text-base">
            Visualize e gerencie os agendamentos por data
          </p>
        </div>
        <Button
          variant="outline"
          asChild
          className="w-full border-border/50 hover:bg-muted/50 dark:border-border/30 dark:hover:bg-muted/30 sm:w-auto"
        >
          <Link href="/antivegf/schedule-management">
            <Plus className="mr-2 h-4 w-4" />
            <span className="hidden sm:inline">Gerenciar Horários</span>
            <span className="sm:hidden">Horários</span>
          </Link>
        </Button>
      </div>

      {/* Seletor de Data */}
      <Card className="border-border/50 bg-card dark:border-border/30 dark:bg-card/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-foreground dark:text-foreground/90">
            <Calendar className="h-5 w-5" />
            Selecionar Data
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex flex-col gap-4 md:flex-row md:items-center">
              <div className="flex-1">
                <Label
                  htmlFor="date-picker"
                  className="text-foreground dark:text-foreground/90"
                >
                  Data do Agendamento
                </Label>
                <ScheduleDatePicker
                  date={selectedDate}
                  onDateChange={setSelectedDate}
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label className="text-foreground dark:text-foreground/90">
                  Data selecionada:
                </Label>
                <p className="text-sm font-medium text-foreground dark:text-foreground/90">
                  {selectedDate
                    ? formatDateAndWeekday(selectedDate)
                    : "Nenhuma data selecionada"}
                </p>
              </div>
            </div>

            {/* Validação da Data */}
            {selectedDate && !isValidAppointmentDate(selectedDate) && (
              <div className="rounded-md border border-yellow-200/50 bg-yellow-50/50 p-4 dark:border-yellow-800/30 dark:bg-yellow-950/20">
                <div className="flex">
                  <AlertCircle className="h-5 w-5 text-yellow-400 dark:text-yellow-300" />
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-yellow-800 dark:text-yellow-200">
                      Data não disponível para agendamentos
                    </h3>
                    <div className="mt-2 text-sm text-yellow-700 dark:text-yellow-300">
                      <p>
                        Os agendamentos só estão disponíveis nos seguintes dias:
                      </p>
                      <ul className="mt-1 list-inside list-disc">
                        <li>{availableDays.monday}</li>
                        <li>{availableDays.tuesday}</li>
                        <li>{availableDays.thursday}</li>
                      </ul>
                      <Button
                        variant="outline"
                        size="sm"
                        className="mt-2 border-border/50 hover:bg-muted/50 dark:border-border/30 dark:hover:bg-muted/30"
                        onClick={() => setSelectedDate(getNextValidDate())}
                      >
                        Ir para próxima data válida
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Informações de Disponibilidade */}
            {selectedDate && isValidAppointmentDate(selectedDate) && (
              <div className="rounded-md border border-blue-200/50 bg-blue-50/50 p-4 dark:border-blue-800/30 dark:bg-blue-950/20">
                <div className="flex items-center">
                  <Calendar className="h-5 w-5 text-blue-500 dark:text-blue-400" />
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-blue-800 dark:text-blue-200">
                      Disponibilidade para {formatDateForDisplay(selectedDate)}
                    </h3>
                    {availabilityQuery.data && (
                      <div className="mt-1 text-sm text-blue-700 dark:text-blue-300">
                        <p>
                          Capacidade: {availabilityQuery.data.capacity} |{" "}
                          Agendados: {availabilityQuery.data.booked} |{" "}
                          Disponíveis:{" "}
                          {availabilityQuery.data.capacity -
                            availabilityQuery.data.booked}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Lista de Agendamentos */}
      {selectedDate && isValidAppointmentDate(selectedDate) && (
        <Card className="border-border/50 bg-card dark:border-border/30 dark:bg-card/50">
          <CardHeader>
            <CardTitle className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
              <span className="text-foreground dark:text-foreground/90">
                Agendamentos para {formatDateForDisplay(selectedDate)}
              </span>
              <div className="flex gap-2">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-full border-border/50 dark:border-border/30 sm:w-[180px]">
                    <SelectValue placeholder="Filtrar por status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos os status</SelectItem>
                    <SelectItem value="pending">Pendente</SelectItem>
                    <SelectItem value="rescheduled">Reagendado</SelectItem>
                    <SelectItem value="confirmed">Confirmado</SelectItem>
                    <SelectItem value="completed">Concluído</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {appointmentsQuery.isLoading ? (
              <div className="flex items-center justify-center py-8">
                <div className="text-sm text-muted-foreground dark:text-muted-foreground/70">
                  Carregando agendamentos...
                </div>
              </div>
            ) : filteredAppointments.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-8">
                <Calendar className="h-12 w-12 text-muted-foreground dark:text-muted-foreground/70" />
                <h3 className="mt-4 text-lg font-semibold text-foreground dark:text-foreground/90">
                  Nenhum agendamento encontrado
                </h3>
                <p className="text-sm text-muted-foreground dark:text-muted-foreground/70">
                  Não há agendamentos para esta data.
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="border-border/50 dark:border-border/30">
                      <TableHead className="text-foreground dark:text-foreground/90">
                        Paciente
                      </TableHead>
                      <TableHead className="text-foreground dark:text-foreground/90">
                        Horário
                      </TableHead>
                      <TableHead className="hidden text-foreground dark:text-foreground/90 md:table-cell">
                        Medicação
                      </TableHead>
                      <TableHead className="text-foreground dark:text-foreground/90">
                        Olho
                      </TableHead>
                      <TableHead className="hidden text-foreground dark:text-foreground/90 sm:table-cell">
                        Dose
                      </TableHead>
                      <TableHead className="text-foreground dark:text-foreground/90">
                        Status
                      </TableHead>
                      <TableHead className="hidden text-foreground dark:text-foreground/90 lg:table-cell">
                        Prioridade
                      </TableHead>
                      <TableHead className="hidden text-foreground dark:text-foreground/90 lg:table-cell">
                        Médico
                      </TableHead>
                      <TableHead className="hidden text-foreground dark:text-foreground/90 md:table-cell">
                        Sala
                      </TableHead>
                      <TableHead className="hidden text-foreground dark:text-foreground/90 xl:table-cell">
                        Observações
                      </TableHead>
                      <TableHead className="text-right text-foreground dark:text-foreground/90">
                        Ações
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredAppointments.map((appointment) => (
                      <TableRow
                        key={appointment.id}
                        className="border-border/30 hover:bg-muted/50 dark:border-border/20 dark:hover:bg-muted/30"
                      >
                        <TableCell className="text-foreground dark:text-foreground/90">
                          <div className="flex items-center space-x-3">
                            <User className="h-4 w-4 text-muted-foreground dark:text-muted-foreground/70" />
                            <div>
                              <div className="font-medium text-foreground dark:text-foreground/90">
                                {appointment.patientName}
                              </div>
                              <div className="text-sm text-muted-foreground dark:text-muted-foreground/70">
                                {appointment.patientPhone}
                              </div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="text-foreground dark:text-foreground/90">
                          <div className="flex items-center space-x-2">
                            <Clock className="h-4 w-4 text-muted-foreground dark:text-muted-foreground/70" />
                            <span>{appointment.time}</span>
                          </div>
                        </TableCell>
                        <TableCell className="hidden text-foreground dark:text-foreground/90 md:table-cell">
                          {appointment.medication}
                        </TableCell>
                        <TableCell className="text-foreground dark:text-foreground/90">
                          <div className="flex items-center space-x-2">
                            <span>{getEyeIcon(appointment.eye)}</span>
                            <span className="hidden sm:inline">
                              {getEyeLabel(appointment.eye)}
                            </span>
                            <span className="sm:hidden">{appointment.eye}</span>
                          </div>
                        </TableCell>
                        <TableCell className="hidden sm:table-cell">
                          <Badge
                            variant="outline"
                            className="border-border/50 dark:border-border/30"
                          >
                            {appointment.doseNumber}ª dose
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge
                            className={`${STATUS_COLORS[appointment.status as keyof typeof STATUS_COLORS]} border-border/50 dark:border-border/30`}
                          >
                            {getStatusText(appointment.status)}
                          </Badge>
                        </TableCell>
                        <TableCell className="hidden lg:table-cell">
                          <Badge
                            className={`${SWALIS_COLORS[appointment.priority as keyof typeof SWALIS_COLORS]} border-border/50 dark:border-border/30`}
                          >
                            {getPriorityText(appointment.priority)}
                          </Badge>
                        </TableCell>
                        <TableCell className="hidden text-foreground dark:text-foreground/90 lg:table-cell">
                          {appointment.doctor}
                        </TableCell>
                        <TableCell className="hidden text-foreground dark:text-foreground/90 md:table-cell">
                          <div className="flex items-center space-x-2">
                            <MapPin className="h-4 w-4 text-muted-foreground dark:text-muted-foreground/70" />
                            <span>{appointment.room}</span>
                          </div>
                        </TableCell>
                        <TableCell className="hidden xl:table-cell">
                          <div className="max-w-xs truncate text-sm text-muted-foreground dark:text-muted-foreground/70">
                            {appointment.notes || "-"}
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end space-x-1">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleEditAppointment(appointment)}
                              className="hover:bg-muted/50 dark:hover:bg-muted/30"
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="hover:bg-muted/50 dark:hover:bg-muted/30"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent className="border-border/50 bg-background dark:border-border/30 dark:bg-background/50">
                                <AlertDialogHeader>
                                  <AlertDialogTitle className="text-foreground dark:text-foreground/90">
                                    Confirmar exclusão
                                  </AlertDialogTitle>
                                  <AlertDialogDescription className="text-muted-foreground dark:text-muted-foreground/70">
                                    Tem certeza que deseja excluir este
                                    agendamento? Esta ação não pode ser
                                    desfeita.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel className="border-border/50 hover:bg-muted/50 dark:border-border/30 dark:hover:bg-muted/30">
                                    Cancelar
                                  </AlertDialogCancel>
                                  <AlertDialogAction
                                    onClick={() =>
                                      handleDeleteAppointment(appointment.id)
                                    }
                                    className="bg-destructive text-destructive-foreground hover:bg-destructive/90 dark:bg-destructive/80 dark:hover:bg-destructive/70"
                                  >
                                    Excluir
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Dialog de Edição */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-md border-border/50 bg-background dark:border-border/30 dark:bg-background/50">
          <DialogHeader>
            <DialogTitle className="text-foreground dark:text-foreground/90">
              Editar Agendamento
            </DialogTitle>
            <DialogDescription className="text-muted-foreground dark:text-muted-foreground/70">
              Atualize as informações do agendamento.
            </DialogDescription>
          </DialogHeader>
          {editingAppointment && (
            <div className="space-y-4">
              <div>
                <Label
                  htmlFor="edit-status"
                  className="text-foreground dark:text-foreground/90"
                >
                  Status
                </Label>
                <Select
                  value={editingAppointment.status}
                  onValueChange={(value) =>
                    setEditingAppointment({
                      ...editingAppointment,
                      status: value as any,
                    })
                  }
                >
                  <SelectTrigger className="border-border/50 dark:border-border/30">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">Pendente</SelectItem>
                    <SelectItem value="rescheduled">Reagendado</SelectItem>
                    <SelectItem value="confirmed">Confirmado</SelectItem>
                    <SelectItem value="completed">Concluído</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label
                  htmlFor="edit-notes"
                  className="text-foreground dark:text-foreground/90"
                >
                  Observações
                </Label>
                <Textarea
                  id="edit-notes"
                  value={editingAppointment.notes || ""}
                  onChange={(e) =>
                    setEditingAppointment({
                      ...editingAppointment,
                      notes: e.target.value,
                    })
                  }
                  placeholder="Adicione observações sobre o agendamento..."
                  className="border-border/50 bg-background dark:border-border/30 dark:bg-background/50"
                />
              </div>

              <div className="flex justify-end space-x-2">
                <Button
                  variant="outline"
                  onClick={() => setIsEditDialogOpen(false)}
                  className="border-border/50 hover:bg-muted/50 dark:border-border/30 dark:hover:bg-muted/30"
                >
                  Cancelar
                </Button>
                <Button onClick={handleSaveEdit}>Salvar</Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
