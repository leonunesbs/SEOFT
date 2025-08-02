import {
  ArrowRight,
  Calendar,
  ClipboardList,
  FileSearch,
  Plus,
  TrendingDown,
  TrendingUp,
  Users,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";

import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import Link from "next/link";
import { cookies } from "next/headers";
import { db } from "~/server/db";

// Função para calcular a tendência percentual
function calculateTrend(current: number, previous: number): string | null {
  if (previous === 0) {
    return current > 0 ? "+100%" : null;
  }

  const change = ((current - previous) / previous) * 100;
  const sign = change >= 0 ? "+" : "";
  return `${sign}${Math.round(change)}%`;
}

// Função para obter o ícone da tendência
function getTrendIcon(trend: string | null | undefined) {
  if (!trend) return null;
  const isPositive = trend.startsWith("+");
  return isPositive ? TrendingUp : TrendingDown;
}

// Função para obter a cor da tendência
function getTrendColor(trend: string | null | undefined) {
  if (!trend) return "text-muted-foreground";
  const isPositive = trend.startsWith("+");
  return isPositive ? "text-green-600" : "text-red-600";
}

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
  trend?: string | null;
  href?: string;
}) {
  const TrendIcon = getTrendIcon(trend);
  const trendColor = getTrendColor(trend);

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
          {trend && TrendIcon && (
            <span className={`ml-1 ${trendColor}`}>
              <TrendIcon className="inline h-3 w-3" /> {trend}
            </span>
          )}
        </p>
      </CardContent>
    </Card>
  );

  return href ? <Link href={href}>{content}</Link> : content;
}

export default async function EvaluationsPage() {
  const cookieStore = await cookies();
  const collaboratorId =
    cookieStore.get("selected-collaborator")?.value ?? null;

  // Calcular períodos para comparação
  const now = new Date();
  const currentWeekStart = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
  const previousWeekStart = new Date(
    currentWeekStart.getTime() - 7 * 24 * 60 * 60 * 1000,
  );
  const currentMonthStart = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
  const previousMonthStart = new Date(
    currentMonthStart.getTime() - 30 * 24 * 60 * 60 * 1000,
  );

  // Buscar estatísticas básicas e dados para tendências
  const [
    totalPending,
    currentWeekEvaluations,
    previousWeekEvaluations,
    currentMonthPatients,
    previousMonthPatients,
  ] = await Promise.all([
    db.evaluation.count({
      where: { done: false },
    }),
    db.evaluation.count({
      where: {
        createdAt: {
          gte: currentWeekStart,
        },
      },
    }),
    db.evaluation.count({
      where: {
        createdAt: {
          gte: previousWeekStart,
          lt: currentWeekStart,
        },
      },
    }),
    db.patient.count({
      where: {
        evaluations: {
          some: {
            createdAt: {
              gte: currentMonthStart,
            },
          },
        },
      },
    }),
    db.patient.count({
      where: {
        evaluations: {
          some: {
            createdAt: {
              gte: previousMonthStart,
              lt: currentMonthStart,
            },
          },
        },
      },
    }),
  ]);

  // Buscar avaliações pendentes do colaborador selecionado
  const myPendingEvaluations = collaboratorId
    ? await db.evaluation.count({
        where: {
          collaboratorId,
          done: false,
        },
      })
    : 0;

  // Calcular tendências
  const evaluationsTrend = calculateTrend(
    currentWeekEvaluations,
    previousWeekEvaluations,
  );
  const patientsTrend = calculateTrend(
    currentMonthPatients,
    previousMonthPatients,
  );

  // Buscar últimas avaliações completadas
  const recentCompletedEvaluations = await db.evaluation.findMany({
    where: {
      done: true,
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
    },
    orderBy: {
      updatedAt: "desc",
    },
    take: 5,
  });

  return (
    <div className="space-y-6">
      {/* Métricas principais */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Pendentes"
          value={totalPending}
          description="Total de avaliações pendentes"
          icon={ClipboardList}
          href="/evaluations/pending"
        />

        <MetricCard
          title="Minhas Pendentes"
          value={myPendingEvaluations}
          description="Suas avaliações pendentes"
          icon={Users}
          href="/evaluations/pending"
        />

        <MetricCard
          title="Esta Semana"
          value={currentWeekEvaluations}
          description="Avaliações realizadas"
          icon={Calendar}
          trend={evaluationsTrend}
        />

        <MetricCard
          title="Pacientes Ativos"
          value={currentMonthPatients}
          description="Com avaliações recentes"
          icon={Users}
          trend={patientsTrend}
        />
      </div>

      {/* Ações rápidas e avaliações recentes */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Ações rápidas */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Ações Rápidas</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button asChild className="w-full justify-start">
              <Link href="/patients/add">
                <Plus className="mr-2 h-4 w-4" />
                Nova Avaliação
              </Link>
            </Button>

            <Button asChild variant="outline" className="w-full justify-start">
              <Link href="/evaluations/pending">
                <ClipboardList className="mr-2 h-4 w-4" />
                Ver Pendentes
                {myPendingEvaluations > 0 && (
                  <Badge variant="destructive" className="ml-auto">
                    {myPendingEvaluations}
                  </Badge>
                )}
              </Link>
            </Button>

            <Button asChild variant="outline" className="w-full justify-start">
              <Link href="/patients/search">
                <FileSearch className="mr-2 h-4 w-4" />
                Buscar Paciente
              </Link>
            </Button>
          </CardContent>
        </Card>

        {/* Avaliações recentes */}
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Avaliações Recentes</CardTitle>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/patients/search">
                Ver todas
                <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            {recentCompletedEvaluations.length === 0 ? (
              <div className="py-8 text-center text-muted-foreground">
                <ClipboardList className="mx-auto h-12 w-12 opacity-50" />
                <p className="mt-2">
                  Nenhuma avaliação completada recentemente
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {recentCompletedEvaluations.map((evaluation) => (
                  <div
                    key={evaluation.id}
                    className="flex items-center justify-between rounded-lg border p-3 hover:bg-muted/50"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-xs">
                          #{evaluation.patient.refId}
                        </Badge>
                        <span className="font-medium">
                          {evaluation.patient.name}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {evaluation.collaborator.name} •{" "}
                        {new Date(evaluation.updatedAt).toLocaleDateString(
                          "pt-BR",
                        )}
                      </p>
                    </div>
                    <Button variant="ghost" size="sm" asChild>
                      <Link href={`/evaluations/${evaluation.id}/summary`}>
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

      {/* Dicas e informações */}
      <Card>
        <CardHeader>
          <CardTitle>Dicas de Produtividade</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <h4 className="font-medium">⚡ Atalhos Rápidos</h4>
              <p className="text-sm text-muted-foreground">
                Use Ctrl+K para buscar pacientes rapidamente em qualquer página.
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium">📋 Dados Clínicos</h4>
              <p className="text-sm text-muted-foreground">
                Preencha os dados clínicos primeiro para um fluxo mais
                eficiente.
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium">🔄 Auto-save</h4>
              <p className="text-sm text-muted-foreground">
                Seus dados são salvos automaticamente a cada alteração.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
