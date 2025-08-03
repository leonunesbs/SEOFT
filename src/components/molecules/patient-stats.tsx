"use client";

import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import {
  MdOutlineBadge,
  MdOutlineHistory,
  MdOutlinePerson,
  MdOutlineTrendingUp,
} from "react-icons/md";

import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import Link from "next/link";
import { Separator } from "~/components/ui/separator";

interface PatientStatsProps {
  patient: {
    id: string;
    refId: string;
    name: string;
    birthDate: Date;
    _count: {
      evaluations: number;
    };
  };
}

export function PatientStats({ patient }: PatientStatsProps) {
  const age = calculateAge(patient.birthDate);
  const formattedBirthDate = formatDate(patient.birthDate);

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {/* Informações Básicas */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-base">
            <MdOutlineBadge className="h-4 w-4" />
            Informações Básicas
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Prontuário:</span>
            <Badge variant="outline" className="font-mono">
              {patient.refId}
            </Badge>
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Idade:</span>
            <span className="text-sm font-medium">{age} anos</span>
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">
              Data de Nascimento:
            </span>
            <span className="text-sm font-medium">{formattedBirthDate}</span>
          </div>
        </CardContent>
      </Card>

      {/* Estatísticas de Avaliações */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-base">
            <MdOutlinePerson className="h-4 w-4" />
            Avaliações
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Total:</span>
            <Badge variant="secondary">{patient._count.evaluations}</Badge>
          </div>
          <div className="pt-2">
            <Button asChild variant="outline" size="sm" className="w-full">
              <Link href={`/patients/${patient.id}/history`}>
                <MdOutlineHistory className="mr-2 h-4 w-4" />
                Ver Histórico
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Ações Rápidas */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-base">
            <MdOutlineTrendingUp className="h-4 w-4" />
            Ações Rápidas
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <Button asChild variant="default" size="sm" className="w-full">
            <Link href={`/evaluations/new?patientId=${patient.id}`}>
              <MdOutlinePerson className="mr-2 h-4 w-4" />
              Nova Avaliação
            </Link>
          </Button>
          <Button asChild variant="outline" size="sm" className="w-full">
            <Link href={`/patients/${patient.id}/history`}>
              <MdOutlineHistory className="mr-2 h-4 w-4" />
              Ver Histórico
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

// Função para calcular idade
function calculateAge(birthDate: Date): number {
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();

  if (
    monthDiff < 0 ||
    (monthDiff === 0 && today.getDate() < birthDate.getDate())
  ) {
    age--;
  }

  return age;
}

// Função para formatar data
function formatDate(date: Date): string {
  return date.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}
