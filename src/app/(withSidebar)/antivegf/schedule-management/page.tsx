"use client";

import {
  Calendar,
  Clock,
  Edit,
  MapPin,
  Phone,
  Plus,
  Trash2,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
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
import Link from "next/link";
import { useState } from "react";

// Tipos para os agendamentos
interface Appointment {
  id: string;
  patientName: string;
  patientId: string;
  patientPhone: string;
  date: string;
  time: string;
  duration: number;
  doctor: string;
  room: string;
  status: "scheduled" | "confirmed" | "completed" | "cancelled" | "no-show";
  medication: string;
  priority: "low" | "medium" | "high";
  notes?: string;
}

// Dados mockados para demonstração
const mockAppointments: Appointment[] = [
  {
    id: "1",
    patientName: "Maria Silva",
    patientId: "P001",
    patientPhone: "(11) 99999-9999",
    date: "2024-01-20",
    time: "09:00",
    duration: 30,
    doctor: "Dr. João Santos",
    room: "Sala 1",
    status: "confirmed",
    medication: "Aflibercept",
    priority: "high",
    notes: "Primeira aplicação",
  },
  {
    id: "2",
    patientName: "José Oliveira",
    patientId: "P002",
    patientPhone: "(11) 88888-8888",
    date: "2024-01-20",
    time: "10:00",
    duration: 30,
    doctor: "Dra. Ana Costa",
    room: "Sala 2",
    status: "scheduled",
    medication: "Ranibizumab",
    priority: "medium",
  },
  {
    id: "3",
    patientName: "Lucia Ferreira",
    patientId: "P003",
    patientPhone: "(11) 77777-7777",
    date: "2024-01-21",
    time: "14:00",
    duration: 30,
    doctor: "Dr. Carlos Lima",
    room: "Sala 1",
    status: "scheduled",
    medication: "Bevacizumab",
    priority: "high",
  },
];

const statusColors = {
  scheduled: "bg-blue-100 text-blue-800",
  confirmed: "bg-green-100 text-green-800",
  completed: "bg-gray-100 text-gray-800",
  cancelled: "bg-red-100 text-red-800",
  "no-show": "bg-orange-100 text-orange-800",
};

const priorityColors = {
  low: "bg-gray-100 text-gray-800",
  medium: "bg-yellow-100 text-yellow-800",
  high: "bg-red-100 text-red-800",
};

export default function ScheduleManagementPage() {
  const [selectedDate, setSelectedDate] = useState<string>("2024-01-20");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [doctorFilter, setDoctorFilter] = useState<string>("all");

  // Função auxiliar para formatar data sem problemas de fuso horário
  const formatDateForAPI = (date: Date): string => {
    try {
      // Usar UTC para evitar problemas de fuso horário
      const year = date.getUTCFullYear();
      const month = String(date.getUTCMonth() + 1).padStart(2, "0");
      const day = String(date.getUTCDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    } catch (error) {
      console.error("Erro ao formatar data:", error, date);
      return "";
    }
  };

  // Função para verificar se a data selecionada é válida (Segunda T, Terça T ou Quinta M)
  const isSelectedDateValid = () => {
    const date = new Date(selectedDate);
    const dayOfWeek = date.getDay(); // 0 = Domingo (início da semana), 1 = Segunda, 2 = Terça, 4 = Quinta

    // Segunda-feira (1), Terça-feira (2) ou Quinta-feira (4)
    return dayOfWeek === 1 || dayOfWeek === 2 || dayOfWeek === 4;
  };

  // Função para obter a próxima data válida
  const getNextValidDate = () => {
    const date = new Date(selectedDate);
    const nextDate = new Date(date);

    // Se a data atual já é válida, retornar ela mesma
    if (isSelectedDateValid()) {
      return selectedDate;
    }

    // Procurar a próxima data válida
    let attempts = 0;
    const maxAttempts = 30;

    while (attempts < maxAttempts) {
      nextDate.setDate(nextDate.getDate() + 1);
      const dayOfWeek = nextDate.getDay();

      if (dayOfWeek === 1 || dayOfWeek === 2 || dayOfWeek === 4) {
        return formatDateForAPI(nextDate);
      }

      attempts++;
    }

    return selectedDate;
  };

  const filteredAppointments = mockAppointments.filter((appointment) => {
    const matchesDate = appointment.date === selectedDate;
    const matchesStatus =
      statusFilter === "all" || appointment.status === statusFilter;
    const matchesDoctor =
      doctorFilter === "all" || appointment.doctor === doctorFilter;

    return matchesDate && matchesStatus && matchesDoctor;
  });

  const getAppointmentsByDate = (date: string) => {
    return mockAppointments.filter((appointment) => appointment.date === date);
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "scheduled":
        return "Agendado";
      case "confirmed":
        return "Confirmado";
      case "completed":
        return "Concluído";
      case "cancelled":
        return "Cancelado";
      case "no-show":
        return "Não Compareceu";
      default:
        return status;
    }
  };

  const getPriorityText = (priority: string) => {
    switch (priority) {
      case "low":
        return "Baixa";
      case "medium":
        return "Média";
      case "high":
        return "Alta";
      default:
        return priority;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
        <div className="min-w-0 flex-1">
          <h2 className="text-xl font-bold text-foreground sm:text-2xl lg:text-3xl">
            Gerenciamento de Agendamentos
          </h2>
          <p className="mt-1 text-sm text-muted-foreground sm:text-base">
            Gerencie os horários e agendamentos de injeções AntiVEGF
          </p>
        </div>
        <Button asChild className="w-full sm:w-auto">
          <Link href="/antivegf/schedule-management/new">
            <Plus className="mr-2 h-4 w-4" />
            <span className="hidden sm:inline">Novo Agendamento</span>
            <span className="sm:hidden">Novo</span>
          </Link>
        </Button>
      </div>

      {/* Informações sobre dias disponíveis */}
      <Card className="border-border/50 bg-card dark:border-border/30 dark:bg-card/50">
        <CardHeader>
          <CardTitle className="flex items-center text-foreground dark:text-foreground/90">
            <Calendar className="mr-2 h-5 w-5" />
            Dias Disponíveis para Agendamento
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-2 md:grid-cols-3">
            <div className="rounded-lg bg-blue-50/50 p-3 dark:border-blue-800/30 dark:bg-blue-950/20">
              <div className="font-medium text-blue-800 dark:text-blue-200">
                Segunda-feira
              </div>
              <div className="text-sm text-blue-600 dark:text-blue-300">
                Período da Tarde (T)
              </div>
            </div>
            <div className="rounded-lg bg-green-50/50 p-3 dark:border-green-800/30 dark:bg-green-950/20">
              <div className="font-medium text-green-800 dark:text-green-200">
                Terça-feira
              </div>
              <div className="text-sm text-green-600 dark:text-green-300">
                Período da Tarde (T)
              </div>
            </div>
            <div className="rounded-lg bg-purple-50/50 p-3 dark:border-purple-800/30 dark:bg-purple-950/20">
              <div className="font-medium text-purple-800 dark:text-purple-200">
                Quinta-feira
              </div>
              <div className="text-sm text-purple-600 dark:text-purple-300">
                Período da Manhã (M)
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Filtros */}
      <Card className="border-border/50 bg-card dark:border-border/30 dark:bg-card/50">
        <CardHeader>
          <CardTitle className="text-foreground dark:text-foreground/90">
            Filtros
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
            <div>
              <label className="mb-2 block text-sm font-medium text-foreground dark:text-foreground/90">
                Data
              </label>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full rounded-md border border-border bg-background px-3 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary dark:border-border/30 dark:bg-background/50"
              />
              {!isSelectedDateValid() && (
                <div className="mt-2 text-sm text-orange-600 dark:text-orange-400">
                  <p>Data não disponível para agendamento.</p>
                  <p>Próxima data válida: {getNextValidDate()}</p>
                </div>
              )}
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-foreground dark:text-foreground/90">
                Status
              </label>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="border-border/50 dark:border-border/30">
                  <SelectValue placeholder="Todos os status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos os status</SelectItem>
                  <SelectItem value="scheduled">Agendado</SelectItem>
                  <SelectItem value="confirmed">Confirmado</SelectItem>
                  <SelectItem value="completed">Concluído</SelectItem>
                  <SelectItem value="cancelled">Cancelado</SelectItem>
                  <SelectItem value="no-show">Não Compareceu</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-foreground dark:text-foreground/90">
                Médico
              </label>
              <Select value={doctorFilter} onValueChange={setDoctorFilter}>
                <SelectTrigger className="border-border/50 dark:border-border/30">
                  <SelectValue placeholder="Todos os médicos" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos os médicos</SelectItem>
                  <SelectItem value="Dr. João Santos">
                    Dr. João Santos
                  </SelectItem>
                  <SelectItem value="Dra. Ana Costa">Dra. Ana Costa</SelectItem>
                  <SelectItem value="Dr. Carlos Lima">
                    Dr. Carlos Lima
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-end">
              <Button
                variant="outline"
                onClick={() => {
                  setSelectedDate("2024-01-20");
                  setStatusFilter("all");
                  setDoctorFilter("all");
                }}
                className="w-full border-border/50 hover:bg-muted/50 dark:border-border/30 dark:hover:bg-muted/30"
              >
                Limpar Filtros
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Resumo do Dia */}
      <Card className="border-border/50 bg-card dark:border-border/30 dark:bg-card/50">
        <CardHeader>
          <CardTitle className="flex items-center text-foreground dark:text-foreground/90">
            <Calendar className="mr-2 h-5 w-5" />
            Resumo do Dia - {new Date(selectedDate).toLocaleDateString("pt-BR")}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
            <div className="rounded-lg bg-blue-50/50 p-4 text-center dark:border-blue-800/30 dark:bg-blue-950/20">
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                {getAppointmentsByDate(selectedDate).length}
              </div>
              <div className="text-sm text-muted-foreground dark:text-muted-foreground/70">
                Total de Agendamentos
              </div>
            </div>
            <div className="rounded-lg bg-green-50/50 p-4 text-center dark:border-green-800/30 dark:bg-green-950/20">
              <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                {
                  getAppointmentsByDate(selectedDate).filter(
                    (a) => a.status === "confirmed",
                  ).length
                }
              </div>
              <div className="text-sm text-muted-foreground dark:text-muted-foreground/70">
                Confirmados
              </div>
            </div>
            <div className="rounded-lg bg-yellow-50/50 p-4 text-center dark:border-yellow-800/30 dark:bg-yellow-950/20">
              <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
                {
                  getAppointmentsByDate(selectedDate).filter(
                    (a) => a.status === "scheduled",
                  ).length
                }
              </div>
              <div className="text-sm text-muted-foreground dark:text-muted-foreground/70">
                Pendentes
              </div>
            </div>
            <div className="rounded-lg bg-red-50/50 p-4 text-center dark:border-red-800/30 dark:bg-red-950/20">
              <div className="text-2xl font-bold text-red-600 dark:text-red-400">
                {
                  getAppointmentsByDate(selectedDate).filter(
                    (a) => a.status === "cancelled" || a.status === "no-show",
                  ).length
                }
              </div>
              <div className="text-sm text-muted-foreground dark:text-muted-foreground/70">
                Cancelados/Não Compareceu
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Lista de Agendamentos */}
      <Card className="border-border/50 bg-card dark:border-border/30 dark:bg-card/50">
        <CardHeader>
          <CardTitle className="text-foreground dark:text-foreground/90">
            Agendamentos ({filteredAppointments.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-border/50 dark:border-border/30">
                  <TableHead className="text-foreground dark:text-foreground/90">
                    Horário
                  </TableHead>
                  <TableHead className="text-foreground dark:text-foreground/90">
                    Paciente
                  </TableHead>
                  <TableHead className="hidden text-foreground dark:text-foreground/90 md:table-cell">
                    Médico
                  </TableHead>
                  <TableHead className="hidden text-foreground dark:text-foreground/90 lg:table-cell">
                    Sala
                  </TableHead>
                  <TableHead className="hidden text-foreground dark:text-foreground/90 sm:table-cell">
                    Medicamento
                  </TableHead>
                  <TableHead className="text-foreground dark:text-foreground/90">
                    Status
                  </TableHead>
                  <TableHead className="hidden text-foreground dark:text-foreground/90 lg:table-cell">
                    Prioridade
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
                      <div className="flex items-center">
                        <Clock className="mr-1 h-4 w-4 text-muted-foreground dark:text-muted-foreground/70" />
                        {appointment.time}
                      </div>
                    </TableCell>
                    <TableCell className="text-foreground dark:text-foreground/90">
                      <div>
                        <div className="font-medium text-foreground dark:text-foreground/90">
                          {appointment.patientName}
                        </div>
                        <div className="text-sm text-muted-foreground dark:text-muted-foreground/70">
                          {appointment.patientId}
                        </div>
                        <div className="flex items-center text-sm text-muted-foreground dark:text-muted-foreground/70">
                          <Phone className="mr-1 h-3 w-3" />
                          {appointment.patientPhone}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="hidden text-foreground dark:text-foreground/90 md:table-cell">
                      {appointment.doctor}
                    </TableCell>
                    <TableCell className="hidden text-foreground dark:text-foreground/90 lg:table-cell">
                      <div className="flex items-center">
                        <MapPin className="mr-1 h-4 w-4 text-muted-foreground dark:text-muted-foreground/70" />
                        {appointment.room}
                      </div>
                    </TableCell>
                    <TableCell className="hidden text-foreground dark:text-foreground/90 sm:table-cell">
                      {appointment.medication}
                    </TableCell>
                    <TableCell>
                      <Badge
                        className={`${statusColors[appointment.status]} border-border/50 dark:border-border/30`}
                      >
                        {getStatusText(appointment.status)}
                      </Badge>
                    </TableCell>
                    <TableCell className="hidden lg:table-cell">
                      <Badge
                        className={`${priorityColors[appointment.priority]} border-border/50 dark:border-border/30`}
                      >
                        {getPriorityText(appointment.priority)}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end space-x-2">
                        <Button
                          size="sm"
                          variant="outline"
                          asChild
                          className="border-border/50 hover:bg-muted/50 dark:border-border/30 dark:hover:bg-muted/30"
                        >
                          <Link
                            href={`/antivegf/schedule-management/${appointment.id}/edit`}
                          >
                            <Edit className="h-4 w-4" />
                          </Link>
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-border/50 text-red-600 hover:bg-red-50 hover:text-red-700 dark:border-border/30 dark:text-red-400 dark:hover:bg-red-950/20 dark:hover:text-red-300"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
