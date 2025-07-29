import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "~/components/ui/tooltip";

import { Clock, FileText, User } from "lucide-react";
import { cookies } from "next/headers";
import Link from "next/link";
import {
  MdAccessTime,
  MdEdit,
  MdOutlineHistory,
  MdOutlineUploadFile,
  MdPerson,
} from "react-icons/md";
import { CollaboratorSwitcher } from "~/components/organisms/collaborator-switcher";
import { db } from "~/server/db";

// Função para calcular tempo decorrido
function getTimeElapsed(date: Date): string {
  const now = new Date();
  const diffInHours = Math.floor(
    (now.getTime() - date.getTime()) / (1000 * 60 * 60),
  );

  if (diffInHours < 1) {
    const diffInMinutes = Math.floor(
      (now.getTime() - date.getTime()) / (1000 * 60),
    );
    return `${diffInMinutes}min`;
  } else if (diffInHours < 24) {
    return `${diffInHours}h`;
  } else {
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays}d`;
  }
}

// Função para obter variante do badge baseado na idade da avaliação
function getAgeVariant(
  date: Date,
): "default" | "secondary" | "destructive" | "outline" {
  const now = new Date();
  const diffInHours = Math.floor(
    (now.getTime() - date.getTime()) / (1000 * 60 * 60),
  );

  if (diffInHours < 2) return "default";
  if (diffInHours < 24) return "secondary";
  if (diffInHours < 72) return "outline";
  return "destructive";
}

interface EvaluationCardProps {
  evaluation: any;
  patient: any;
}

function EvaluationCard({ evaluation, patient }: EvaluationCardProps) {
  const timeElapsed = getTimeElapsed(evaluation.createdAt);
  const ageVariant = getAgeVariant(evaluation.createdAt);

  return (
    <Card className="transition-shadow hover:shadow-md">
      <CardContent className="p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 space-y-3">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-xs">
                    #{patient.refId}
                  </Badge>
                  <Badge variant={ageVariant} className="text-xs">
                    <Clock className="mr-1 h-3 w-3" />
                    {timeElapsed}
                  </Badge>
                </div>
              </div>
            </div>

            {/* Patient Info */}
            <div className="space-y-2">
              <h3 className="text-lg font-semibold">{patient.name}</h3>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <User className="h-4 w-4" />
                  <span>
                    {new Date().getFullYear() -
                      new Date(patient.birthDate).getFullYear()}{" "}
                    anos
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <FileText className="h-4 w-4" />
                  <span>
                    {new Date(patient.birthDate).toLocaleDateString("pt-BR", {
                      timeZone: "UTC",
                    })}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-shrink-0 gap-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button asChild variant="default" size="sm">
                    <Link href={`/evaluations/${evaluation.id}`}>
                      <MdOutlineUploadFile size={16} />
                    </Link>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Continuar avaliação</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button asChild variant="outline" size="sm">
                    <Link href={`/patients/${patient.id}/history`}>
                      <MdOutlineHistory size={16} />
                    </Link>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Histórico</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button asChild variant="outline" size="sm">
                    <Link href={`/patients/${patient.id}`}>
                      <MdEdit size={16} />
                    </Link>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Editar paciente</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default async function EvaluationPending() {
  const cookieStore = await cookies();
  const collaboratorId =
    cookieStore.get("selected-collaborator")?.value ?? null;

  const collaborators = await db.collaborator.findMany({
    where: {
      role: {
        in: ["R1", "R2", "R3", "F1", "F2", "F3", "STAFF"],
      },
    },
    orderBy: {
      name: "asc",
    },
  });

  if (!collaboratorId) {
    return (
      <div className="flex min-h-[400px] flex-col items-center justify-center space-y-4">
        <div className="space-y-2 text-center">
          <MdPerson className="mx-auto h-12 w-12 text-muted-foreground" />
          <h2 className="text-xl font-semibold">Selecione um Colaborador</h2>
          <p className="text-muted-foreground">
            Escolha um colaborador para visualizar as avaliações pendentes
          </p>
        </div>
        <CollaboratorSwitcher collaborators={collaborators} />
      </div>
    );
  }

  const evaluations = await db.evaluation.findMany({
    where: {
      collaboratorId,
      done: false,
    },
    include: {
      collaborator: true,
      patient: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const selectedCollaborator = collaborators.find(
    (collaborator) => collaborator.id === collaboratorId,
  );

  return (
    <div className="space-y-6">
      {/* Header with Collaborator Info */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex aspect-square size-12 items-center justify-center rounded-lg border bg-background">
                <MdPerson className="h-6 w-6" />
              </div>
              <div className="space-y-1">
                <h2 className="text-xl font-semibold">
                  {selectedCollaborator?.name ?? "Colaborador"}
                </h2>
                <p className="text-sm text-muted-foreground">
                  {evaluations.length} avaliação
                  {evaluations.length !== 1 ? "ões" : ""} pendente
                  {evaluations.length !== 1 ? "s" : ""}
                </p>
              </div>
            </div>

            <div className="flex gap-2">
              <Button variant="outline" size="sm" asChild>
                <Link href="/patients/add">
                  <MdOutlineUploadFile className="mr-2 h-4 w-4" />
                  Nova Avaliação
                </Link>
              </Button>
              <CollaboratorSwitcher collaborators={collaborators} />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Statistics */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Pendentes
            </CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{evaluations.length}</div>
            <p className="text-xs text-muted-foreground">
              Aguardando finalização
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Recentes (&lt; 2h)
            </CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {
                evaluations.filter(
                  (e) =>
                    new Date().getTime() - e.createdAt.getTime() <
                    2 * 60 * 60 * 1000,
                ).length
              }
            </div>
            <p className="text-xs text-muted-foreground">
              Criadas recentemente
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Urgentes (&gt; 3d)
            </CardTitle>
            <MdAccessTime className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">
              {
                evaluations.filter(
                  (e) =>
                    new Date().getTime() - e.createdAt.getTime() >
                    3 * 24 * 60 * 60 * 1000,
                ).length
              }
            </div>
            <p className="text-xs text-muted-foreground">Requerem atenção</p>
          </CardContent>
        </Card>
      </div>

      {/* Evaluations List */}
      {evaluations.length === 0 ? (
        <Card>
          <CardContent className="p-12">
            <div className="space-y-4 text-center">
              <FileText className="mx-auto h-12 w-12 text-muted-foreground" />
              <div className="space-y-2">
                <h3 className="text-xl font-semibold">
                  Nenhuma avaliação pendente
                </h3>
                <p className="text-muted-foreground">
                  Todas as avaliações foram finalizadas. Parabéns!
                </p>
              </div>
              <Button asChild>
                <Link href="/patients/add">
                  <MdOutlineUploadFile className="mr-2 h-4 w-4" />
                  Iniciar Nova Avaliação
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {evaluations.map((evaluation) => (
            <EvaluationCard
              key={evaluation.id}
              evaluation={evaluation}
              patient={evaluation.patient}
            />
          ))}
        </div>
      )}
    </div>
  );
}
