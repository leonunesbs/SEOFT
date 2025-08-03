import { Avatar, AvatarFallback } from "~/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import {
  MdOutlineBadge,
  MdOutlineCalendarToday,
  MdOutlineHistory,
  MdOutlinePerson,
  MdOutlineUploadFile,
} from "react-icons/md";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "~/components/ui/tooltip";

import { AddEvaluationButton } from "~/components/atoms/add-evaluation-button";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import Link from "next/link";
import { Loader2 } from "lucide-react";
import { PageHeading } from "~/components/atoms/page-heading";
import { PatientForm } from "~/components/organisms/patient-form";
import { Separator } from "~/components/ui/separator";
import { db } from "~/server/db";
import { notFound } from "next/navigation";

type Params = Promise<{ id: string }>;

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

// Função para gerar iniciais do nome
function getInitials(name: string): string {
  return name
    .split(" ")
    .map((word) => word.charAt(0))
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

// Função para formatar data
function formatDate(date: Date): string {
  return date.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    timeZone: "UTC",
  });
}

export default async function Patient({ params }: { params: Params }) {
  const { id } = await params;

  const patient = await db.patient.findUnique({
    where: { id },
    select: {
      id: true,
      refId: true,
      name: true,
      birthDate: true,
      _count: {
        select: {
          evaluations: true,
        },
      },
    },
  });

  if (!patient) return notFound();

  const age = calculateAge(patient.birthDate);
  const initials = getInitials(patient.name);
  const formattedBirthDate = formatDate(patient.birthDate);

  return (
    <div className="space-y-6">
      {/* Header com informações do paciente */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex items-start gap-4">
          <Avatar className="h-16 w-16">
            <AvatarFallback className="text-lg font-semibold">
              {initials}
            </AvatarFallback>
          </Avatar>

          <div className="space-y-1">
            <PageHeading className="text-2xl">{patient.name}</PageHeading>
            <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <MdOutlineBadge className="h-4 w-4" />
                <span>Prontuário: {patient.refId}</span>
              </div>
              <Separator orientation="vertical" className="h-4" />
              <div className="flex items-center gap-1">
                <MdOutlineCalendarToday className="h-4 w-4" />
                <span>
                  {formattedBirthDate} ({age} anos)
                </span>
              </div>
              <Separator orientation="vertical" className="h-4" />
              <div className="flex items-center gap-1">
                <MdOutlinePerson className="h-4 w-4" />
                <span>{patient._count.evaluations} avaliações</span>
              </div>
            </div>
          </div>
        </div>

        {/* Botões de ação */}
        <div className="flex gap-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <AddEvaluationButton
                  patientId={patient.id}
                  patientName={patient.name}
                  variant="default"
                  customChildren={
                    <>
                      <MdOutlineUploadFile className="h-4 w-4" />
                      <span className="hidden sm:inline">Nova Avaliação</span>
                    </>
                  }
                  customLoading={
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span className="hidden sm:inline">Carregando...</span>
                    </>
                  }
                />
              </TooltipTrigger>
              <TooltipContent>
                <p>Criar nova avaliação para {patient.name}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button asChild variant="outline">
                  <Link href={`/patients/${patient.id}/history`}>
                    <MdOutlineHistory className="h-4 w-4" />
                    <span className="hidden sm:inline">Histórico</span>
                  </Link>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Ver histórico completo do paciente</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>

      {/* Cards de informações */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
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

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-base">
              <MdOutlineUploadFile className="h-4 w-4" />
              Ações Rápidas
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <AddEvaluationButton
              patientId={patient.id}
              patientName={patient.name}
              variant="default"
              size="sm"
              className="w-full"
              customChildren="Nova Avaliação"
              customLoading="Criando..."
            />
            <Button asChild variant="outline" size="sm" className="w-full">
              <Link href={`/patients/${patient.id}/history`}>
                <MdOutlineHistory className="mr-2 h-4 w-4" />
                Ver Histórico
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Formulário de edição */}
      <Card>
        <CardHeader>
          <CardTitle>Editar Informações do Paciente</CardTitle>
          <CardDescription>
            Atualize as informações básicas do paciente. O número do prontuário
            não pode ser alterado.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <PatientForm
            initialData={{
              id: patient.id,
              refId: patient.refId,
              name: patient.name,
              birthDate: patient.birthDate.toISOString(),
            }}
          />
        </CardContent>
      </Card>
    </div>
  );
}
