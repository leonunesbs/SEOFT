import { ArrowLeft, Calendar, Edit } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { formatDateForDisplay, formatDateTimeForDisplay } from "~/lib/utils";

import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { Label } from "~/components/ui/label";
import Link from "next/link";
import { db } from "~/server/db";
import { notFound } from "next/navigation";

interface IndicationPageProps {
  params: Promise<{ id: string }>;
}

export default async function IndicationPage({ params }: IndicationPageProps) {
  const { id } = await params;
  const indication = await db.intravitrealInjectionIndication.findUnique({
    where: { id },
    include: {
      patient: true,
      collaborator: true,
      clinic: true,
      injections: {
        orderBy: {
          scheduledDate: "asc",
        },
      },
    },
  });

  if (!indication) {
    notFound();
  }

  const statusColors = {
    PENDING:
      "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300 dark:border-yellow-800/50",
    PENDING_NIR:
      "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300 dark:border-orange-800/50",
    APPROVED:
      "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-800/50",
    SCHEDULED:
      "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 dark:border-green-800/50",
    COMPLETED:
      "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300 dark:border-gray-800/50",
    CANCELLED:
      "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300 dark:border-red-800/50",
    REJECTED:
      "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300 dark:border-red-800/50",
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "PENDING":
        return "Pendente";
      case "PENDING_NIR":
        return "Aguardando NIR";
      case "APPROVED":
        return "Aprovado";
      case "SCHEDULED":
        return "Agendado";
      case "COMPLETED":
        return "Concluído";
      case "CANCELLED":
        return "Cancelado";
      case "REJECTED":
        return "Rejeitado";
      default:
        return status;
    }
  };

  const getSwalisText = (classification: string) => {
    switch (classification) {
      case "A1":
        return "A1 - Risco iminente";
      case "A2":
        return "A2 - Atividades prejudicadas";
      case "B":
        return "B - Prejuízo acentuado";
      case "C":
        return "C - Prejuízo mínimo";
      case "D":
        return "D - Sem prejuízo";
      default:
        return classification;
    }
  };

  const getSwalisColor = (classification: string) => {
    switch (classification) {
      case "A1":
        return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300 dark:border-red-800/50";
      case "A2":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300 dark:border-orange-800/50";
      case "B":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300 dark:border-yellow-800/50";
      case "C":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-800/50";
      case "D":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 dark:border-green-800/50";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300 dark:border-gray-800/50";
    }
  };

  const getInjectionStatusText = (status: string) => {
    switch (status) {
      case "PENDING":
        return "Pendente";
      case "CONFIRMED":
        return "Confirmado";
      case "COMPLETED":
        return "Concluído";
      case "CANCELLED":
        return "Cancelado";
      case "NO_SHOW":
        return "Não compareceu";
      default:
        return status;
    }
  };

  const getInjectionStatusColor = (status: string) => {
    switch (status) {
      case "PENDING":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300 dark:border-yellow-800/50";
      case "CONFIRMED":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-800/50";
      case "COMPLETED":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 dark:border-green-800/50";
      case "CANCELLED":
        return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300 dark:border-red-800/50";
      case "NO_SHOW":
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300 dark:border-gray-800/50";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300 dark:border-gray-800/50";
    }
  };

  const getEyeLabel = (eye: string) => {
    return eye === "OD" ? "Olho Direito" : "Olho Esquerdo";
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:space-x-4 sm:space-y-0">
        <Button
          variant="outline"
          size="sm"
          asChild
          className="w-fit border-border/50 hover:bg-muted/50 dark:border-border/30 dark:hover:bg-muted/30"
        >
          <Link href="/antivegf/indications">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar
          </Link>
        </Button>
        <div className="min-w-0 flex-1">
          <h2 className="text-xl font-bold text-foreground sm:text-2xl lg:text-3xl">
            Indicação AntiVEGF
          </h2>
          <p className="mt-1 text-sm text-muted-foreground sm:text-base">
            Detalhes da indicação de injeção intravítrea
          </p>
        </div>
        <div className="flex justify-end">
          <Button
            variant="outline"
            size="sm"
            asChild
            className="border-border/50 hover:bg-muted/50 dark:border-border/30 dark:hover:bg-muted/30"
          >
            <Link href={`/antivegf/indications/${indication.id}/edit`}>
              <Edit className="mr-2 h-4 w-4" />
              <span className="hidden sm:inline">Editar</span>
            </Link>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Informações do Paciente */}
        <Card className="border-border/50 bg-card dark:border-border/30 dark:bg-card/50">
          <CardHeader>
            <CardTitle className="text-foreground dark:text-foreground/90">
              Paciente
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label
                htmlFor="patientName"
                className="text-foreground dark:text-foreground/90"
              >
                Nome
              </Label>
              <p
                className="text-lg font-medium text-foreground dark:text-foreground/90"
                id="patientName"
              >
                {indication.patient.name}
              </p>
            </div>
            <div>
              <Label
                htmlFor="patientRefId"
                className="text-foreground dark:text-foreground/90"
              >
                Número do Prontuário
              </Label>
              <p
                className="text-lg text-foreground dark:text-foreground/90"
                id="patientRefId"
              >
                {indication.patient.refId}
              </p>
            </div>
            <div>
              <Label
                htmlFor="patientBirthDate"
                className="text-foreground dark:text-foreground/90"
              >
                Data de Nascimento
              </Label>
              <p
                className="text-lg text-foreground dark:text-foreground/90"
                id="patientBirthDate"
              >
                {formatDateForDisplay(
                  indication.patient.birthDate,
                  "America/Sao_Paulo",
                )}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Informações da Indicação */}
        <Card className="border-border/50 bg-card dark:border-border/30 dark:bg-card/50">
          <CardHeader>
            <CardTitle className="text-foreground dark:text-foreground/90">
              Indicação
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label
                htmlFor="indicationStatus"
                className="text-foreground dark:text-foreground/90"
              >
                Status
              </Label>
              <div className="mt-1">
                <Badge
                  className={`${statusColors[indication.status as keyof typeof statusColors]} border-border/50`}
                  id="indicationStatus"
                >
                  {getStatusText(indication.status)}
                </Badge>
              </div>
            </div>
            <div>
              <Label
                htmlFor="swalisClassification"
                className="text-foreground dark:text-foreground/90"
              >
                Classificação Swalis
              </Label>
              <div className="mt-1">
                <Badge
                  className={`${getSwalisColor(indication.swalisClassification)} border-border/50`}
                  id="swalisClassification"
                >
                  {getSwalisText(indication.swalisClassification)}
                </Badge>
              </div>
            </div>
            <div>
              <Label
                htmlFor="indicationCreatedAt"
                className="text-foreground dark:text-foreground/90"
              >
                Data de Criação
              </Label>
              <p
                className="text-lg text-foreground dark:text-foreground/90"
                id="indicationCreatedAt"
              >
                {formatDateTimeForDisplay(indication.createdAt, "UTC")}
              </p>
            </div>
            <div>
              <Label
                htmlFor="treatmentStartDate"
                className="text-foreground dark:text-foreground/90"
              >
                Data de Início do Tratamento
              </Label>
              <p
                className="text-lg text-foreground dark:text-foreground/90"
                id="treatmentStartDate"
              >
                {formatDateForDisplay(
                  indication.treatmentStartDate,
                  "America/Sao_Paulo",
                )}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Diagnóstico e Tratamento */}
        <Card className="border-border/50 bg-card dark:border-border/30 dark:bg-card/50">
          <CardHeader>
            <CardTitle className="text-foreground dark:text-foreground/90">
              Diagnóstico e Tratamento
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label
                htmlFor="indication"
                className="text-foreground dark:text-foreground/90"
              >
                Indicação
              </Label>
              <p
                className="text-lg font-medium text-foreground dark:text-foreground/90"
                id="indication"
              >
                {indication.indication}
              </p>
              {indication.indicationOther && (
                <p className="mt-1 text-sm text-muted-foreground dark:text-muted-foreground/70">
                  {indication.indicationOther}
                </p>
              )}
            </div>
            <div>
              <Label
                htmlFor="medication"
                className="text-foreground dark:text-foreground/90"
              >
                Medicação
              </Label>
              <p
                className="text-lg font-medium text-foreground dark:text-foreground/90"
                id="medication"
              >
                {indication.medication}
              </p>
              {indication.medicationOther && (
                <p className="mt-1 text-sm text-muted-foreground dark:text-muted-foreground/70">
                  {indication.medicationOther}
                </p>
              )}
            </div>
            <div>
              <Label
                htmlFor="dosesConfiguration"
                className="text-foreground dark:text-foreground/90"
              >
                Configuração de Doses
              </Label>
              <div className="mt-1 space-y-1">
                <p className="text-lg text-foreground dark:text-foreground/90">
                  OD: {indication.totalOD} doses | OS: {indication.totalOS}{" "}
                  doses
                </p>
                <p className="text-sm text-muted-foreground dark:text-muted-foreground/70">
                  Início: {getEyeLabel(indication.startEye)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Médico Responsável */}
        <Card className="border-border/50 bg-card dark:border-border/30 dark:bg-card/50">
          <CardHeader>
            <CardTitle className="text-foreground dark:text-foreground/90">
              Médico Responsável
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label
                htmlFor="collaboratorName"
                className="text-foreground dark:text-foreground/90"
              >
                Nome
              </Label>
              <p
                className="text-lg font-medium text-foreground dark:text-foreground/90"
                id="collaboratorName"
              >
                {indication.collaborator.name}
              </p>
            </div>
            <div>
              <Label
                htmlFor="collaboratorCrm"
                className="text-foreground dark:text-foreground/90"
              >
                CRM
              </Label>
              <p
                className="text-lg text-foreground dark:text-foreground/90"
                id="collaboratorCrm"
              >
                {indication.collaborator.crm}
              </p>
            </div>
            <div>
              <Label
                htmlFor="collaboratorRole"
                className="text-foreground dark:text-foreground/90"
              >
                Função
              </Label>
              <p
                className="text-lg text-foreground dark:text-foreground/90"
                id="collaboratorRole"
              >
                {indication.collaborator.role}
              </p>
            </div>
            {indication.clinic && (
              <div>
                <Label
                  htmlFor="clinicName"
                  className="text-foreground dark:text-foreground/90"
                >
                  Clínica
                </Label>
                <p
                  className="text-lg text-foreground dark:text-foreground/90"
                  id="clinicName"
                >
                  {indication.clinic.name}
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Observações */}
      {(indication.observations ||
        indication.contraindications ||
        indication.allergies) && (
        <Card className="border-border/50 bg-card dark:border-border/30 dark:bg-card/50">
          <CardHeader>
            <CardTitle className="text-foreground dark:text-foreground/90">
              Observações
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {indication.observations && (
              <div>
                <Label
                  htmlFor="generalObservations"
                  className="text-foreground dark:text-foreground/90"
                >
                  Observações Gerais
                </Label>
                <p
                  className="mt-1 text-foreground dark:text-foreground/90"
                  id="generalObservations"
                >
                  {indication.observations}
                </p>
              </div>
            )}
            {indication.contraindications && (
              <div>
                <Label
                  htmlFor="contraindications"
                  className="text-foreground dark:text-foreground/90"
                >
                  Contraindicações
                </Label>
                <p
                  className="mt-1 text-foreground dark:text-foreground/90"
                  id="contraindications"
                >
                  {indication.contraindications}
                </p>
              </div>
            )}
            {indication.allergies && (
              <div>
                <Label
                  htmlFor="allergies"
                  className="text-foreground dark:text-foreground/90"
                >
                  Alergias
                </Label>
                <p
                  className="mt-1 text-foreground dark:text-foreground/90"
                  id="allergies"
                >
                  {indication.allergies}
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Injeções Programadas */}
      {indication.injections.length > 0 && (
        <Card className="border-border/50 bg-card dark:border-border/30 dark:bg-card/50">
          <CardHeader>
            <CardTitle className="flex items-center text-foreground dark:text-foreground/90">
              <Calendar className="mr-2 h-5 w-5" />
              Injeções Programadas ({indication.injections.length})
            </CardTitle>
            {/* Mostrar informações sobre alternância se ambos os olhos têm injeções */}
            {(() => {
              const hasOD = indication.injections.some(
                (inj) => inj.eye === "OD",
              );
              const hasOE = indication.injections.some(
                (inj) => inj.eye === "OE",
              );
              const hasBothEyes = hasOD && hasOE;

              if (hasBothEyes) {
                return (
                  <div className="rounded-lg border border-blue-200/50 bg-blue-50/50 p-3 text-sm text-muted-foreground dark:border-blue-800/30 dark:bg-blue-950/20 dark:text-muted-foreground/80">
                    <div className="mb-2 flex items-center">
                      <span className="font-medium text-blue-600 dark:text-blue-400">
                        ⚡ Alternância automática entre olhos
                      </span>
                    </div>
                    <div className="space-y-1 text-xs">
                      <div>• Intervalo entre olhos diferentes: 14 dias</div>
                      <div>• Intervalo entre doses do mesmo olho: 28 dias</div>
                      <div>• Segurança: Nunca bilateral no mesmo dia</div>
                    </div>
                  </div>
                );
              }
              return null;
            })()}
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {indication.injections.map((injection, index) => {
                const nextInjection = indication.injections[index + 1];
                const isLastInjection =
                  index === indication.injections.length - 1;

                // Calcular dias até próxima injeção
                let daysToNext = null;
                let intervalType = null;
                if (nextInjection) {
                  const currentDate = new Date(injection.scheduledDate);
                  const nextDate = new Date(nextInjection.scheduledDate);
                  daysToNext = Math.ceil(
                    (nextDate.getTime() - currentDate.getTime()) /
                      (1000 * 60 * 60 * 24),
                  );
                  intervalType =
                    injection.eye === nextInjection.eye
                      ? "mesmo olho"
                      : "olhos diferentes";
                }

                return (
                  <div key={injection.id}>
                    <div className="flex flex-col space-y-4 rounded-lg border border-border/50 bg-background p-4 dark:border-border/30 dark:bg-background/50 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
                      <div className="flex items-center space-x-4">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-sm font-medium text-primary-foreground">
                          {index + 1}
                        </div>
                        <div>
                          <p className="flex items-center font-medium text-foreground dark:text-foreground/90">
                            {getEyeLabel(injection.eye)}
                            {/* Indicador visual do olho */}
                            <span
                              className={`ml-2 inline-block h-3 w-3 rounded-full ${
                                injection.eye === "OD"
                                  ? "bg-blue-500"
                                  : "bg-green-500"
                              }`}
                              title={
                                injection.eye === "OD"
                                  ? "Olho Direito"
                                  : "Olho Esquerdo"
                              }
                            ></span>
                          </p>
                          <p className="text-sm text-muted-foreground dark:text-muted-foreground/70">
                            {formatDateForDisplay(
                              injection.scheduledDate,
                              "America/Sao_Paulo",
                            )}
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-col space-y-2 sm:flex-row sm:items-center sm:space-x-2 sm:space-y-0">
                        <Badge
                          className={`${getInjectionStatusColor(injection.status)} border-border/50`}
                        >
                          {getInjectionStatusText(injection.status)}
                        </Badge>
                        {injection.performedAt && (
                          <Badge
                            variant="outline"
                            className="border-border/50 text-xs dark:border-border/30"
                          >
                            Realizada em{" "}
                            {formatDateForDisplay(
                              injection.performedAt,
                              "America/Sao_Paulo",
                            )}
                          </Badge>
                        )}
                      </div>
                    </div>

                    {/* Mostrar intervalo até próxima injeção */}
                    {!isLastInjection && daysToNext && (
                      <div className="mb-2 ml-12 mt-2">
                        <div className="flex items-center text-xs text-muted-foreground dark:text-muted-foreground/70">
                          <div className="mr-3 h-6 w-0.5 bg-border dark:bg-border/50"></div>
                          <span
                            className={`rounded-full px-2 py-1 text-xs ${
                              intervalType === "olhos diferentes"
                                ? "bg-orange-100 text-orange-700 dark:border-orange-800/50 dark:bg-orange-900/30 dark:text-orange-300"
                                : "bg-blue-100 text-blue-700 dark:border-blue-800/50 dark:bg-blue-900/30 dark:text-blue-300"
                            }`}
                          >
                            {daysToNext} dias ({intervalType})
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
