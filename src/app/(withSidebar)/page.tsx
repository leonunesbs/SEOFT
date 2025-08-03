// app/dashboard/page.tsx

import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import {
  MdOutlineAccessTime,
  MdOutlineArchive,
  MdOutlineCalendarToday,
  MdOutlineCheckCircle,
  MdOutlineEvent,
  MdOutlineGroup,
  MdOutlineLocalHospital,
  MdOutlinePending,
  MdOutlinePersonAdd,
  MdOutlineSchedule,
} from "react-icons/md";
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
import { DashboardCharts } from "~/components/organisms/dashboard-charts";
import { DashboardMetrics } from "~/components/organisms/dashboard-metrics";
import { DashboardQuickActions } from "~/components/organisms/dashboard-quick-actions";
import { HydrateClient } from "~/trpc/server";
import Link from "next/link";
import { cookies } from "next/headers";
import { db } from "~/server/db";

export default async function Dashboard() {
  const cookieStore = await cookies();
  const collaboratorId =
    cookieStore.get("selected-collaborator")?.value ?? null;

  // Métricas básicas
  const patientsCount = await db.patient.count();
  const clinicsCount = await db.clinic.count();
  const collaboratorsCount = await db.collaborator.count();
  const evaluationsCount = await db.evaluation.count();

  // Métricas por status
  const completedEvaluations = await db.evaluation.count({
    where: { done: true },
  });

  const pendingEvaluations = await db.evaluation.count({
    where: { done: false },
  });

  // Métricas de agendamentos
  const [
    totalScheduled,
    todayAppointments,
    completedToday,
    myTodayAppointments,
  ] = await Promise.all([
    db.appointment.count({
      where: { status: "SCHEDULED" },
    }),
    db.appointment.count({
      where: {
        scheduledDate: {
          gte: new Date(new Date().setHours(0, 0, 0, 0)),
          lt: new Date(new Date().setHours(23, 59, 59, 999)),
        },
        status: {
          in: ["SCHEDULED", "CONFIRMED"],
        },
      },
    }),
    db.appointment.count({
      where: {
        scheduledDate: {
          gte: new Date(new Date().setHours(0, 0, 0, 0)),
          lt: new Date(new Date().setHours(23, 59, 59, 999)),
        },
        status: "COMPLETED",
      },
    }),
    collaboratorId
      ? db.appointment.count({
          where: {
            collaboratorId,
            scheduledDate: {
              gte: new Date(new Date().setHours(0, 0, 0, 0)),
              lt: new Date(new Date().setHours(23, 59, 59, 999)),
            },
            status: {
              in: ["SCHEDULED", "CONFIRMED"],
            },
          },
        })
      : Promise.resolve(0),
  ]);

  // Métricas temporais (últimos 30 dias)
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  const evaluationsLast30Days = await db.evaluation.count({
    where: {
      createdAt: {
        gte: thirtyDaysAgo,
      },
    },
  });

  const patientsLast30Days = await db.patient.count({
    where: {
      createdAt: {
        gte: thirtyDaysAgo,
      },
    },
  });

  // Métricas por ambulatório
  const evaluationsByClinic = await db.evaluation.groupBy({
    by: ["clinicId"],
    _count: {
      id: true,
    },
    where: {
      createdAt: {
        gte: thirtyDaysAgo,
      },
    },
  });

  const clinicNames = await db.clinic.findMany({
    select: { id: true, name: true },
  });

  const clinicData = evaluationsByClinic.map((item) => ({
    clinicId: item.clinicId,
    name:
      clinicNames.find((c) => c.id === item.clinicId)?.name ||
      "Sem ambulatório",
    count: item._count.id,
  }));

  // Top médicos por avaliações
  const topCollaborators = await db.evaluation.groupBy({
    by: ["collaboratorId"],
    _count: {
      id: true,
    },
    where: {
      createdAt: {
        gte: thirtyDaysAgo,
      },
    },
    orderBy: {
      _count: {
        id: "desc",
      },
    },
    take: 5,
  });

  const collaboratorNames = await db.collaborator.findMany({
    select: { id: true, name: true, role: true },
  });

  const collaboratorData = topCollaborators.map((item) => ({
    collaboratorId: item.collaboratorId,
    name:
      collaboratorNames.find((c) => c.id === item.collaboratorId)?.name ||
      "N/A",
    role:
      collaboratorNames.find((c) => c.id === item.collaboratorId)?.role ||
      "N/A",
    count: item._count.id,
  }));

  // Avaliações recentes com mais detalhes
  const recentEvaluations = await db.evaluation.findMany({
    take: 10,
    orderBy: { createdAt: "desc" },
    include: {
      patient: { select: { name: true } },
      collaborator: { select: { name: true, role: true } },
      clinic: { select: { name: true } },
    },
  });

  // Agendamentos de hoje
  const todayAppointmentsList = await db.appointment.findMany({
    where: {
      scheduledDate: {
        gte: new Date(new Date().setHours(0, 0, 0, 0)),
        lt: new Date(new Date().setHours(23, 59, 59, 999)),
      },
      status: {
        in: ["SCHEDULED", "CONFIRMED"],
      },
    },
    include: {
      patient: {
        select: {
          name: true,
          refId: true,
        },
      },
      collaborator: {
        select: {
          name: true,
        },
      },
      clinic: {
        select: {
          name: true,
        },
      },
    },
    orderBy: {
      scheduledDate: "asc",
    },
    take: 5,
  });

  // Próximos agendamentos
  const upcomingAppointmentsList = await db.appointment.findMany({
    where: {
      scheduledDate: {
        gte: new Date(),
      },
      status: {
        in: ["SCHEDULED", "CONFIRMED"],
      },
    },
    include: {
      patient: {
        select: {
          name: true,
          refId: true,
        },
      },
      collaborator: {
        select: {
          name: true,
        },
      },
      clinic: {
        select: {
          name: true,
        },
      },
    },
    orderBy: {
      scheduledDate: "asc",
    },
    take: 5,
  });

  // Dados para gráficos
  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setUTCDate(date.getUTCDate() - i);
    // Usar UTC para evitar problemas de fuso horário
    const year = date.getUTCFullYear();
    const month = String(date.getUTCMonth() + 1).padStart(2, "0");
    const day = String(date.getUTCDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }).reverse();

  const evaluationsByDay = await Promise.all(
    last7Days.map(async (date) => {
      if (!date) return { date: "", evaluations: 0 };

      const startDate = new Date(date);
      const endDate = new Date(date);
      endDate.setDate(endDate.getDate() + 1);

      const count = await db.evaluation.count({
        where: {
          createdAt: {
            gte: startDate,
            lt: endDate,
          },
        },
      });

      return {
        date: new Date(date).toLocaleDateString("pt-BR", {
          day: "2-digit",
          month: "2-digit",
        }),
        evaluations: count,
      };
    }),
  );

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "COMPLETED":
        return (
          <Badge variant="default" className="bg-green-100 text-green-800">
            Concluído
          </Badge>
        );
      case "CANCELLED":
        return <Badge variant="destructive">Cancelado</Badge>;
      case "NO_SHOW":
        return <Badge variant="destructive">Não Compareceu</Badge>;
      case "CONFIRMED":
        return (
          <Badge variant="default" className="bg-blue-100 text-blue-800">
            Confirmado
          </Badge>
        );
      default:
        return <Badge variant="outline">Agendado</Badge>;
    }
  };

  return (
    <HydrateClient>
      <div className="space-y-6">
        {/* Header com título e período */}
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">
              Painel de Controle
            </h1>
            <p className="text-muted-foreground">
              Visão geral das atividades dos últimos 30 dias
            </p>
          </div>
          <div>
            <Badge variant="outline" className="w-fit">
              <MdOutlineCalendarToday className="mr-1 h-4 w-4" />
              {new Date().toLocaleDateString("pt-BR")}
            </Badge>
          </div>
        </div>

        {/* Métricas Principais */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total de Pacientes
              </CardTitle>
              <MdOutlineGroup className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {patientsCount.toLocaleString("pt-BR")}
              </div>
              <p className="text-xs text-muted-foreground">
                +{patientsLast30Days} nos últimos 30 dias
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avaliações</CardTitle>
              <MdOutlineArchive className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {evaluationsCount.toLocaleString("pt-BR")}
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <MdOutlineCheckCircle className="h-3 w-3 text-green-600" />
                  {completedEvaluations} finalizadas
                </span>
                <span className="flex items-center gap-1">
                  <MdOutlinePending className="h-3 w-3 text-orange-600" />
                  {pendingEvaluations} pendentes
                </span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Ambulatórios
              </CardTitle>
              <MdOutlineLocalHospital className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{clinicsCount}</div>
              <p className="text-xs text-muted-foreground">
                {clinicData.length} ativos este mês
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Médicos</CardTitle>
              <MdOutlineGroup className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{collaboratorsCount}</div>
              <p className="text-xs text-muted-foreground">
                {collaboratorData.length} ativos este mês
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Métricas de Agenda */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Agendamentos
              </CardTitle>
              <MdOutlineSchedule className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {totalScheduled.toLocaleString("pt-BR")}
              </div>
              <p className="text-xs text-muted-foreground">
                Total de agendamentos ativos
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Agendamentos Hoje
              </CardTitle>
              <MdOutlineEvent className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {todayAppointments.toLocaleString("pt-BR")}
              </div>
              <p className="text-xs text-muted-foreground">
                {completedToday} já concluídos
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Meus Agendamentos
              </CardTitle>
              <MdOutlinePersonAdd className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {myTodayAppointments.toLocaleString("pt-BR")}
              </div>
              <p className="text-xs text-muted-foreground">
                Seus agendamentos hoje
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Próximos</CardTitle>
              <MdOutlineAccessTime className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {upcomingAppointmentsList.length}
              </div>
              <p className="text-xs text-muted-foreground">
                Próximos agendamentos
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Ações Rápidas */}
        <DashboardQuickActions />

        {/* Seção de Agenda */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Ações rápidas de agenda */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MdOutlineSchedule className="h-5 w-5" />
                Ações de Agenda
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button asChild className="w-full justify-start">
                <Link href="/patients/search">
                  <MdOutlinePersonAdd className="mr-2 h-4 w-4" />
                  Novo Agendamento
                </Link>
              </Button>

              <Button
                asChild
                variant="outline"
                className="w-full justify-start"
              >
                <Link href="/agenda/calendar">
                  <MdOutlineCalendarToday className="mr-2 h-4 w-4" />
                  Ver Calendário
                </Link>
              </Button>

              <Button
                asChild
                variant="outline"
                className="w-full justify-start"
              >
                <Link href="/agenda">
                  <MdOutlineEvent className="mr-2 h-4 w-4" />
                  Gerenciar Agenda
                </Link>
              </Button>
            </CardContent>
          </Card>

          {/* Agendamentos de hoje */}
          <Card className="lg:col-span-2">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <MdOutlineEvent className="h-5 w-5" />
                Agendamentos de Hoje
              </CardTitle>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/agenda/calendar">
                  Ver calendário
                  <MdOutlineAccessTime className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </CardHeader>
            <CardContent>
              {todayAppointmentsList.length === 0 ? (
                <div className="py-8 text-center text-muted-foreground">
                  <MdOutlineEvent className="mx-auto h-12 w-12 opacity-50" />
                  <p className="mt-2">Nenhum agendamento para hoje</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {todayAppointmentsList.map((appointment) => (
                    <div
                      key={appointment.id}
                      className="flex items-center justify-between rounded-lg border p-3 hover:bg-muted/50"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="text-xs">
                            #{appointment.patient.refId}
                          </Badge>
                          <span className="font-medium">
                            {appointment.patient.name}
                          </span>
                          {getStatusBadge(appointment.status)}
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {appointment.collaborator.name} •{" "}
                          {appointment.clinic?.name} •{" "}
                          {new Date(
                            appointment.scheduledDate,
                          ).toLocaleTimeString("pt-BR", {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </p>
                      </div>
                      <Button variant="ghost" size="sm" asChild>
                        <Link href={`/agenda/${appointment.id}`}>
                          Ver
                          <MdOutlineAccessTime className="ml-1 h-3 w-3" />
                        </Link>
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Gráficos e Métricas Detalhadas */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <DashboardCharts
            evaluationsByDay={evaluationsByDay}
            clinicData={clinicData}
            collaboratorData={collaboratorData}
          />

          <DashboardMetrics
            evaluationsLast30Days={evaluationsLast30Days}
            patientsLast30Days={patientsLast30Days}
            completedEvaluations={completedEvaluations}
            pendingEvaluations={pendingEvaluations}
            totalEvaluations={evaluationsCount}
            totalPatients={patientsCount}
          />
        </div>

        {/* Próximos Agendamentos */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <MdOutlineAccessTime className="h-5 w-5" />
              Próximos Agendamentos
            </CardTitle>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/agenda/calendar">
                Ver todos
                <MdOutlineAccessTime className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            {upcomingAppointmentsList.length === 0 ? (
              <div className="py-8 text-center text-muted-foreground">
                <MdOutlineEvent className="mx-auto h-12 w-12 opacity-50" />
                <p className="mt-2">Nenhum agendamento futuro</p>
              </div>
            ) : (
              <div className="space-y-3">
                {upcomingAppointmentsList.map((appointment) => (
                  <div
                    key={appointment.id}
                    className="flex items-center justify-between rounded-lg border p-3 hover:bg-muted/50"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-xs">
                          #{appointment.patient.refId}
                        </Badge>
                        <span className="font-medium">
                          {appointment.patient.name}
                        </span>
                        {getStatusBadge(appointment.status)}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {appointment.clinic?.name} •{" "}
                        {new Date(appointment.scheduledDate).toLocaleDateString(
                          "pt-BR",
                        )}{" "}
                        às{" "}
                        {new Date(appointment.scheduledDate).toLocaleTimeString(
                          "pt-BR",
                          { hour: "2-digit", minute: "2-digit" },
                        )}
                      </p>
                    </div>
                    <Button variant="ghost" size="sm" asChild>
                      <Link href={`/agenda/${appointment.id}`}>
                        Ver
                        <MdOutlineAccessTime className="ml-1 h-3 w-3" />
                      </Link>
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Avaliações Recentes */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MdOutlineAccessTime className="h-5 w-5" />
              Avaliações Recentes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Paciente</TableHead>
                  <TableHead>Médico</TableHead>
                  <TableHead>Ambulatório</TableHead>
                  <TableHead>Data</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentEvaluations.map((evaluation) => (
                  <TableRow key={evaluation.id}>
                    <TableCell>
                      <Link
                        href={`/evaluations/${evaluation.id}`}
                        className="font-semibold hover:underline"
                      >
                        {evaluation.patient?.name || "N/A"}
                      </Link>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">
                          {evaluation.collaborator?.name}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {evaluation.collaborator?.role}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{evaluation.clinic?.name ?? "N/A"}</TableCell>
                    <TableCell>
                      {new Date(evaluation.createdAt).toLocaleDateString(
                        "pt-BR",
                        {
                          timeZone: "UTC",
                        },
                      )}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={evaluation.done ? "default" : "secondary"}
                      >
                        {evaluation.done ? "Finalizada" : "Pendente"}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </HydrateClient>
  );
}
