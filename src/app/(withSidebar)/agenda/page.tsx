import {
  ArrowRight,
  Calendar,
  CheckCircle,
  Clock,
  Plus,
  TrendingUp,
  Users,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";

import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import Link from "next/link";
import { cookies } from "next/headers";
import { db } from "~/server/db";

// Componente para métricas rápidas
function MetricCard({
  title,
  value,
  description,
  icon: Icon,
  trend,
  href,
}: {
  title: string;
  value: string | number;
  description: string;
  icon: any;
  trend?: string;
  href?: string;
}) {
  const content = (
    <Card
      className={href ? "cursor-pointer transition-shadow hover:shadow-lg" : ""}
    >
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground">
          {description}
          {trend && (
            <span className="ml-1 text-green-600">
              <TrendingUp className="inline h-3 w-3" /> {trend}
            </span>
          )}
        </p>
      </CardContent>
    </Card>
  );

  return href ? <Link href={href}>{content}</Link> : content;
}

export default async function AgendaPage() {
  const cookieStore = await cookies();
  const collaboratorId =
    cookieStore.get("selected-collaborator")?.value ?? null;

  // Buscar estatísticas de agendamentos
  const [totalScheduled, todayAppointments, completedToday] = await Promise.all(
    [
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
    ],
  );

  // Buscar agendamentos do colaborador selecionado
  const myTodayAppointments = collaboratorId
    ? await db.appointment.count({
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
    : 0;

  // Buscar próximos agendamentos
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
    take: 10,
  });

  // Buscar agendamentos de hoje
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
    <div className="space-y-6">
      {/* Métricas principais */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Agendados"
          value={totalScheduled}
          description="Total de agendamentos"
          icon={Calendar}
        />

        <MetricCard
          title="Hoje"
          value={todayAppointments}
          description="Agendamentos de hoje"
          icon={Clock}
        />

        <MetricCard
          title="Meus Hoje"
          value={myTodayAppointments}
          description="Seus agendamentos hoje"
          icon={Users}
        />

        <MetricCard
          title="Concluídos Hoje"
          value={completedToday}
          description="Agendamentos finalizados"
          icon={CheckCircle}
        />
      </div>

      {/* Ações rápidas e agendamentos */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Ações rápidas */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Ações Rápidas</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button asChild className="w-full justify-start">
              <Link href="/patients/search">
                <Plus className="mr-2 h-4 w-4" />
                Novo Agendamento
              </Link>
            </Button>

            <Button asChild variant="outline" className="w-full justify-start">
              <Link href="/agenda/calendar">
                <Calendar className="mr-2 h-4 w-4" />
                Ver Calendário
              </Link>
            </Button>

            <Button asChild variant="outline" className="w-full justify-start">
              <Link href="/patients/search">
                <Users className="mr-2 h-4 w-4" />
                Buscar Paciente
              </Link>
            </Button>
          </CardContent>
        </Card>

        {/* Agendamentos de hoje */}
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Agendamentos de Hoje</CardTitle>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/agenda/calendar">
                Ver calendário
                <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            {todayAppointmentsList.length === 0 ? (
              <div className="py-8 text-center text-muted-foreground">
                <Calendar className="mx-auto h-12 w-12 opacity-50" />
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
                        {new Date(appointment.scheduledDate).toLocaleTimeString(
                          "pt-BR",
                          { hour: "2-digit", minute: "2-digit" },
                        )}
                      </p>
                    </div>
                    <Button variant="ghost" size="sm" asChild>
                      <Link href={`/agenda/${appointment.id}`}>
                        Ver
                        <ArrowRight className="ml-1 h-3 w-3" />
                      </Link>
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Próximos agendamentos */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Próximos Agendamentos</CardTitle>
          <Button variant="ghost" size="sm" asChild>
            <Link href="/agenda/calendar">
              Ver todos
              <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </Button>
        </CardHeader>
        <CardContent>
          {upcomingAppointmentsList.length === 0 ? (
            <div className="py-8 text-center text-muted-foreground">
              <Calendar className="mx-auto h-12 w-12 opacity-50" />
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
                      <ArrowRight className="ml-1 h-3 w-3" />
                    </Link>
                  </Button>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Dicas e informações */}
      <Card>
        <CardHeader>
          <CardTitle>Dicas de Gestão de Agenda</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <h4 className="font-medium">📅 Organização</h4>
              <p className="text-sm text-muted-foreground">
                Mantenha sua agenda organizada com horários bem definidos para
                cada paciente.
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium">⏰ Pontualidade</h4>
              <p className="text-sm text-muted-foreground">
                Respeite os horários agendados para manter o fluxo da clínica.
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium">📝 Registros</h4>
              <p className="text-sm text-muted-foreground">
                Mantenha notas sobre cada agendamento para melhor
                acompanhamento.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
