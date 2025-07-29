import {
  ArrowRight,
  Calendar,
  ClipboardList,
  FileSearch,
  Plus,
  TrendingUp,
  Users,
} from "lucide-react";
import { cookies } from "next/headers";
import Link from "next/link";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
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

export default async function EvaluationsPage() {
  const cookieStore = await cookies();
  const collaboratorId =
    cookieStore.get("selected-collaborator")?.value ?? null;

  // Buscar estatísticas básicas
  const [totalPending, recentEvaluations, totalPatients] = await Promise.all([
    db.evaluation.count({
      where: { done: false },
    }),
    db.evaluation.count({
      where: {
        createdAt: {
          gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // última semana
        },
      },
    }),
    db.patient.count({
      where: {
        evaluations: {
          some: {
            createdAt: {
              gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // último mês
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
          value={recentEvaluations}
          description="Avaliações realizadas"
          icon={Calendar}
          trend="+12%"
        />

        <MetricCard
          title="Pacientes Ativos"
          value={totalPatients}
          description="Com avaliações recentes"
          icon={Users}
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
