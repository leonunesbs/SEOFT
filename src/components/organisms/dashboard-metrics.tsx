"use client";

import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import {
  MdOutlineArchive,
  MdOutlineCheckCircle,
  MdOutlineGroup,
  MdOutlineSpeed,
} from "react-icons/md";

import { Badge } from "~/components/ui/badge";
import { Progress } from "~/components/ui/progress";

interface DashboardMetricsProps {
  evaluationsLast30Days: number;
  patientsLast30Days: number;
  completedEvaluations: number;
  pendingEvaluations: number;
  totalEvaluations: number;
  totalPatients: number;
}

export function DashboardMetrics({
  evaluationsLast30Days,
  patientsLast30Days,
  completedEvaluations,
  pendingEvaluations,
  totalEvaluations,
}: DashboardMetricsProps) {
  const completionRate =
    totalEvaluations > 0 ? (completedEvaluations / totalEvaluations) * 100 : 0;
  const avgEvaluationsPerDay = evaluationsLast30Days / 30;
  const avgPatientsPerDay = patientsLast30Days / 30;

  return (
    <div className="space-y-4">
      {/* Taxa de Conclusão */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <MdOutlineCheckCircle className="h-5 w-5 text-green-600" />
            Taxa de Conclusão
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold">
              {completionRate.toFixed(1)}%
            </span>
            <Badge variant={completionRate >= 80 ? "default" : "secondary"}>
              {completionRate >= 80
                ? "Excelente"
                : completionRate >= 60
                  ? "Bom"
                  : "Atenção"}
            </Badge>
          </div>
          <Progress value={completionRate} className="h-2" />
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>{completedEvaluations} finalizadas</span>
            <span>{pendingEvaluations} pendentes</span>
          </div>
        </CardContent>
      </Card>

      {/* Métricas de Performance */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <MdOutlineSpeed className="h-5 w-5 text-blue-600" />
            Performance dos Últimos 30 Dias
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <MdOutlineArchive className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">Avaliações/dia</span>
              </div>
              <div className="text-2xl font-bold">
                {avgEvaluationsPerDay.toFixed(1)}
              </div>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                {evaluationsLast30Days} total
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <MdOutlineGroup className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">Pacientes/dia</span>
              </div>
              <div className="text-2xl font-bold">
                {avgPatientsPerDay.toFixed(1)}
              </div>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                {patientsLast30Days} total
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
