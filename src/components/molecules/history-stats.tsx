"use client";

import { Activity, Calendar, Eye, Pill, Stethoscope, User } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";

import { Badge } from "~/components/ui/badge";
import Link from "next/link";

interface HistoryStatsProps {
  patient: {
    id: string;
    name: string;
  };
  stats: {
    totalEvaluations: number;
    lastEvaluationDate?: Date | string | null;
    lastEvaluationClinic?: string;
    totalPrescriptions?: number;
    totalSurgeries?: number;
    averageEvaluationsPerMonth?: number;
  };
}

export function HistoryStats({ patient, stats }: HistoryStatsProps) {
  const formatDateTime = (date: Date | string) => {
    const dateObj = typeof date === "string" ? new Date(date) : date;
    return dateObj.toLocaleString("pt-BR", {
      timeZone: "UTC",
    });
  };

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-base">
            <Activity className="h-4 w-4" />
            Total de Avaliações
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold">{stats.totalEvaluations}</span>
            <Badge variant="secondary">registros</Badge>
          </div>
          {stats.averageEvaluationsPerMonth && (
            <p className="mt-1 text-xs text-muted-foreground">
              Média: {stats.averageEvaluationsPerMonth.toFixed(1)}/mês
            </p>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-base">
            <Calendar className="h-4 w-4" />
            Última Avaliação
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-1">
            <p className="text-sm font-medium">
              {stats.lastEvaluationClinic || "N/A"}
            </p>
            {stats.lastEvaluationDate && (
              <p className="text-xs text-muted-foreground">
                {formatDateTime(stats.lastEvaluationDate)}
              </p>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-base">
            <User className="h-4 w-4" />
            ID do Paciente
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Link
            className="flex items-center justify-between hover:underline"
            href={`/patients/${patient.id}`}
            aria-label="Ver detalhes do paciente"
          >
            <span className="font-mono text-sm">{patient.id}</span>
            <Badge variant="outline" className="text-xs">
              Ver
            </Badge>
          </Link>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-base">
            <Eye className="h-4 w-4" />
            Status
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <span className="text-sm">Histórico</span>
            <Badge variant="default" className="text-xs">
              Ativo
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Cards adicionais para prescrições e cirurgias se disponíveis */}
      {stats.totalPrescriptions !== undefined && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-base">
              <Pill className="h-4 w-4" />
              Prescrições
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold">
                {stats.totalPrescriptions}
              </span>
              <Badge variant="outline">total</Badge>
            </div>
          </CardContent>
        </Card>
      )}

      {stats.totalSurgeries !== undefined && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-base">
              <Stethoscope className="h-4 w-4" />
              Cirurgias
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold">{stats.totalSurgeries}</span>
              <Badge variant="outline">total</Badge>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
