import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { MdOutlineHistory, MdVisibility } from "react-icons/md";
import { getBestRefraction, isValidURL, translateType } from "~/lib/utils";
import { notFound, redirect } from "next/navigation";

import { AccessFileButton } from "~/components/atoms/access-file-button";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { EvaluationSummaryCopyButton } from "~/components/atoms/evaluation-summary-copy-button";
import Link from "next/link";
import { PageHeading } from "~/components/atoms/page-heading";
import { ReopenEvaluationButton } from "~/components/atoms/reopen-evaluation-button";
import { db } from "~/server/db";

type Params = Promise<{ id: string }>;

// Utility functions
const calculateAge = (birthDate: string) => {
  const birth = new Date(birthDate);
  const now = new Date();
  let age = now.getFullYear() - birth.getFullYear();
  const m = now.getMonth() - birth.getMonth();
  if (m < 0 || (m === 0 && now.getDate() < birth.getDate())) {
    age--;
  }
  return age;
};

const formatDate = (date: Date | string | null | undefined) => {
  if (!date) return "";
  return new Date(date).toLocaleDateString("pt-BR", {
    timeZone: "America/Sao_Paulo",
  });
};

const formatRefractionValue = (
  value: any,
  type: "spherical" | "cylinder" | "axis",
) => {
  if (value === null || value === undefined || value === "") {
    return "N/A";
  }

  const numValue = parseFloat(value);
  if (isNaN(numValue)) {
    return "N/A";
  }

  if (type === "axis") {
    return `${Math.round(numValue)}º`;
  }

  const formatted = numValue.toFixed(2);
  return numValue > 0 ? `+${formatted}` : formatted;
};

const translateCorrectionType = (correctionType: string) => {
  const correctionTypeMap = {
    sc: "S/C",
    ph: "PH",
    rx: "RX",
  };
  return (
    correctionTypeMap[correctionType as keyof typeof correctionTypeMap] ||
    correctionType
  );
};

// Clean info display component
const InfoItem = ({ label, value }: { label: string; value: string }) => (
  <div className="flex justify-between border-b border-gray-100 py-2 last:border-b-0">
    <span className="font-medium text-muted-foreground">{label}</span>
    <span className="text-gray-900">{value}</span>
  </div>
);

// Clean refraction display
const RefractionInfo = ({
  refraction,
  eyeLabel,
}: {
  refraction: any;
  eyeLabel: string;
}) => {
  if (!refraction) {
    return (
      <div className="py-4 text-center text-gray-500">
        Sem dados de refração
      </div>
    );
  }

  const spherical = formatRefractionValue(refraction.spherical, "spherical");
  const cylinder = formatRefractionValue(refraction.cylinder, "cylinder");
  const axis = formatRefractionValue(refraction.axis, "axis");
  const correctionType = translateCorrectionType(
    refraction.correctionType || "sc",
  );

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <Badge variant="outline" className="text-xs">
          {eyeLabel}
        </Badge>
        <span className="text-sm">
          Acuidade: {refraction.visualAcuity || "N/A"}
        </span>
      </div>

      {refraction.correctionType === "rx" ? (
        <div className="grid grid-cols-3 gap-3 text-sm">
          <div className="rounded bg-gray-50 p-2 text-center">
            <div className="text-xs text-muted-foreground">Esférico</div>
            <div className="font-mono font-medium">{spherical}</div>
          </div>
          <div className="rounded bg-gray-50 p-2 text-center">
            <div className="text-xs text-muted-foreground">Cilíndrico</div>
            <div className="font-mono font-medium">{cylinder}</div>
          </div>
          <div className="rounded bg-gray-50 p-2 text-center">
            <div className="text-xs text-muted-foreground">Eixo</div>
            <div className="font-mono font-medium">{axis}</div>
          </div>
        </div>
      ) : (
        <div className="rounded bg-gray-50 p-2 text-center">
          <span className="font-medium">{correctionType}</span>
        </div>
      )}
    </div>
  );
};

// Component for displaying logs with better UI
const LogsSection = ({ logs, title }: { logs: any[]; title: string }) => {
  if (logs.length === 0) {
    return null;
  }

  return (
    <div className="space-y-3">
      <h4 className="text-sm font-semibold">{title}</h4>
      <div className="space-y-2">
        {logs.map((log, index) => (
          <div
            key={index}
            className="rounded-lg border border-gray-100 bg-gray-50 p-3"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0 flex-1">
                <div className="mb-1 flex items-center gap-2">
                  <Badge variant="secondary" className="px-2 py-0.5 text-xs">
                    {translateType(log.type) || "N/A"}
                  </Badge>
                </div>
                {log.details && !isValidURL(log.details) && (
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {log.details}
                  </p>
                )}
              </div>
              {log.details && isValidURL(log.details) && (
                <div className="flex-shrink-0">
                  <AccessFileButton
                    fileName={log.details.split("/").pop() as string}
                  >
                    <Button variant="outline" size="sm" className="h-8 px-3">
                      <MdVisibility className="mr-1 h-3 w-3" />
                      Ver
                    </Button>
                  </AccessFileButton>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Component for displaying surgeries with better UI
const SurgeriesSection = ({
  surgeries,
  title,
}: {
  surgeries: any[];
  title: string;
}) => {
  if (surgeries.length === 0) {
    return null;
  }

  return (
    <div className="space-y-3">
      <h4 className="text-sm font-semibold">{title}</h4>
      <div className="space-y-2">
        {surgeries.map((surgery, index) => (
          <div
            key={index}
            className="rounded-lg border border-gray-100 bg-gray-50 p-3"
          >
            <div className="mb-2 flex items-start justify-between gap-3">
              <h5 className="text-sm font-medium text-gray-900">
                {surgery.procedure || "N/A"}
              </h5>
              {surgery.date && (
                <Badge variant="outline" className="px-2 py-0.5 text-xs">
                  {formatDate(surgery.date)}
                </Badge>
              )}
            </div>
            {surgery.notes && (
              <p className="text-sm leading-relaxed text-muted-foreground">
                {surgery.notes}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default async function EvaluationSummaryPage({
  params,
}: {
  params: Params;
}) {
  const { id } = await params;

  const evaluation = await db.evaluation.findUnique({
    where: { id },
    include: {
      patient: {
        include: {
          evaluations: {
            where: { done: true },
            orderBy: { createdAt: "desc" },
            include: {
              eyes: {
                include: {
                  leftEye: {
                    include: {
                      refraction: {
                        orderBy: { recordedAt: "desc" },
                      },
                      surgeries: {
                        orderBy: { date: "desc" },
                      },
                      logs: true,
                      eyedrops: {
                        orderBy: { startDate: "desc" },
                      },
                    },
                  },
                  rightEye: {
                    include: {
                      refraction: {
                        orderBy: { recordedAt: "desc" },
                      },
                      surgeries: {
                        orderBy: { date: "desc" },
                      },
                      logs: true,
                      eyedrops: {
                        orderBy: { startDate: "desc" },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
      collaborator: true,
      clinic: {
        include: {
          collaborators: {
            include: {
              collaborator: true,
            },
          },
        },
      },
      eyes: {
        include: {
          rightEye: {
            include: {
              logs: {
                orderBy: { type: "asc" },
              },
              refraction: {
                orderBy: { recordedAt: "desc" },
              },
              surgeries: {
                orderBy: { date: "desc" },
              },
              eyedrops: {
                orderBy: { startDate: "desc" },
              },
            },
          },
          leftEye: {
            include: {
              logs: {
                orderBy: { type: "asc" },
              },
              refraction: {
                orderBy: { recordedAt: "desc" },
              },
              surgeries: {
                orderBy: { date: "desc" },
              },
              eyedrops: {
                orderBy: { startDate: "desc" },
              },
            },
          },
        },
      },
      prescriptions: {
        include: {
          prescriptionItems: {
            include: {
              medication: true,
            },
          },
        },
      },
    },
  });

  if (!evaluation) {
    notFound();
  }

  const { patient, collaborator, clinic, eyes } = evaluation;

  const bestRightRefraction = getBestRefraction(
    eyes?.rightEye?.refraction || [],
  );
  const bestLeftRefraction = getBestRefraction(eyes?.leftEye?.refraction || []);

  const rightEyeLogs =
    eyes?.rightEye?.logs?.filter(
      (log) => log.details && log.details.trim() !== "",
    ) ?? [];
  const leftEyeLogs =
    eyes?.leftEye?.logs?.filter(
      (log) => log.details && log.details.trim() !== "",
    ) ?? [];

  const rightEyeSurgeries = patient.evaluations.flatMap(
    (evalData) => evalData.eyes?.rightEye?.surgeries ?? [],
  );
  const leftEyeSurgeries = patient.evaluations.flatMap(
    (evalData) => evalData.eyes?.leftEye?.surgeries ?? [],
  );

  const patientEvaluations = patient.evaluations.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );

  if (!evaluation.done) redirect(`/evaluations/${id}`);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="mb-4 flex flex-col justify-between gap-4 sm:flex-row">
        <PageHeading>Resumo da Avaliação</PageHeading>
        <div className="flex flex-wrap gap-2">
          <Link href={`/patients/${patient.id}/history`} passHref>
            <Button variant="outline">
              <MdOutlineHistory className="mr-2 h-4 w-4" />
              Histórico
            </Button>
          </Link>
          <ReopenEvaluationButton evaluation={evaluation} />
          <EvaluationSummaryCopyButton evaluation={evaluation} />
        </div>
      </div>

      {/* Patient and Appointment Info */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        {/* Patient Info */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Paciente</CardTitle>
          </CardHeader>
          <CardContent className="space-y-0">
            <InfoItem label="Nome" value={patient.name || "N/A"} />
            <InfoItem
              label="Idade"
              value={
                patient.birthDate
                  ? `${calculateAge(patient.birthDate.toISOString())} anos`
                  : "N/A"
              }
            />
            <InfoItem
              label="Avaliações"
              value={`${patientEvaluations.length} realizadas`}
            />
          </CardContent>
        </Card>

        {/* Appointment Info */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Atendimento</CardTitle>
          </CardHeader>
          <CardContent className="space-y-0">
            <InfoItem
              label="Data"
              value={
                evaluation.createdAt ? formatDate(evaluation.createdAt) : "N/A"
              }
            />
            <InfoItem label="Médico" value={collaborator.name || "N/A"} />
            <InfoItem label="Clínica" value={clinic?.name || "N/A"} />
          </CardContent>
        </Card>
      </div>

      {/* Clinical Data */}
      {(evaluation.clinicalData?.trim() ||
        evaluation.diagnosis ||
        evaluation.treatment ||
        evaluation.followUp) && (
        <Card>
          <CardContent className="space-y-4 pt-4">
            {evaluation.clinicalData?.trim() && (
              <div>
                <h4 className="mb-2 font-semibold">Dados Clínicos</h4>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {evaluation.clinicalData.trim()}
                </p>
              </div>
            )}
            {evaluation.diagnosis && (
              <div>
                <h4 className="mb-2 font-semibold">Diagnóstico</h4>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {evaluation.diagnosis}
                </p>
              </div>
            )}
            {evaluation.treatment && (
              <div>
                <h4 className="mb-2 font-semibold">Tratamento</h4>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {evaluation.treatment}
                </p>
              </div>
            )}
            {evaluation.followUp && (
              <div>
                <h4 className="mb-2 font-semibold">Acompanhamento</h4>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {evaluation.followUp}
                </p>
              </div>
            )}
            {evaluation.nextAppointment && (
              <div>
                <h4 className="mb-2 font-semibold">Próxima Consulta</h4>
                <p className="text-sm text-muted-foreground">
                  {evaluation.nextAppointment}
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Eye Data - Side by Side */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        {/* Right Eye */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Olho Direito (OD)</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <RefractionInfo refraction={bestRightRefraction} eyeLabel="OD" />

            <LogsSection logs={rightEyeLogs} title="Exames Realizados" />
            <SurgeriesSection
              surgeries={rightEyeSurgeries}
              title="Histórico de Cirurgias"
            />
          </CardContent>
        </Card>

        {/* Left Eye */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Olho Esquerdo (OE)</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <RefractionInfo refraction={bestLeftRefraction} eyeLabel="OE" />

            <LogsSection logs={leftEyeLogs} title="Exames Realizados" />
            <SurgeriesSection
              surgeries={leftEyeSurgeries}
              title="Histórico de Cirurgias"
            />
          </CardContent>
        </Card>
      </div>

      {/* Evaluation History */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Histórico de Avaliações</CardTitle>
        </CardHeader>
        <CardContent>
          {patientEvaluations.length > 0 ? (
            <div className="space-y-3">
              {patientEvaluations.map((ev, index) => (
                <div
                  key={index}
                  className={`rounded-lg border p-4 ${
                    ev.id === evaluation.id
                      ? "border-blue-200 bg-blue-50"
                      : "border-gray-200 bg-gray-50 hover:bg-gray-100"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="min-w-0 flex-1">
                      <div className="mb-1 flex items-center gap-2">
                        <span className="text-sm font-medium">
                          {formatDate(ev.createdAt)}
                        </span>
                        {ev.id === evaluation.id && (
                          <Badge variant="default" className="text-xs">
                            Atual
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {ev.diagnosis || "Sem diagnóstico registrado"}
                      </p>
                    </div>
                    <Link href={`/evaluations/${ev.id}`} passHref>
                      <Button variant="outline" size="sm">
                        <MdVisibility className="mr-1 h-4 w-4" />
                        Ver
                      </Button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="py-8 text-center text-gray-500">
              Nenhum histórico de avaliações disponível
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
