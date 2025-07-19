import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { isValidURL, translateType } from "~/lib/utils";
import { notFound, redirect } from "next/navigation";

import { AccessFileButton } from "~/components/atoms/access-file-button";
import { Button } from "~/components/ui/button";
import { CopyPromptButton } from "~/components/atoms/copy-prompt-button";
import Link from "next/link";
import { MdOutlineHistory } from "react-icons/md";
import { PageHeading } from "~/components/atoms/page-heading";
import { ReopenEvaluationButton } from "~/components/atoms/reopen-evaluation-button";
import { Separator } from "~/components/ui/separator";
import { db } from "~/server/db";

type Params = Promise<{ id: string }>;

export default async function EvaluationSummaryPage({
  params,
}: {
  params: Params;
}) {
  const { id } = await params;

  // Recupera os dados da avaliação
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

  // Função para calcular a idade
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

  // Função para determinar a melhor refração com base na acuidade visual
  const getBestRefraction = (refractions: any[]) => {
    return refractions.reduce((best, current) => {
      if (
        !best ||
        (current.visualAcuity &&
          (!best.visualAcuity || current.visualAcuity > best.visualAcuity))
      ) {
        return current;
      }
      return best;
    }, null);
  };

  // Função para formatar valores de refração de forma segura
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

    // Para esférico e cilíndrico
    const formatted = numValue.toFixed(2);
    return numValue > 0 ? `+${formatted}` : formatted;
  };

  // Função para traduzir o tipo de correção
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

  // Melhor refração para cada olho
  const bestRightRefraction = getBestRefraction(
    eyes?.rightEye?.refraction || [],
  );
  const bestLeftRefraction = getBestRefraction(eyes?.leftEye?.refraction || []);

  // Formatar valores de refração do olho direito
  const rightSpherical = formatRefractionValue(
    bestRightRefraction?.spherical,
    "spherical",
  );
  const rightCylinder = formatRefractionValue(
    bestRightRefraction?.cylinder,
    "cylinder",
  );
  const rightAxis = formatRefractionValue(bestRightRefraction?.axis, "axis");
  const rightCorrectionType = translateCorrectionType(
    bestRightRefraction?.correctionType || "sc",
  );

  // Formatar valores de refração do olho esquerdo
  const leftSpherical = formatRefractionValue(
    bestLeftRefraction?.spherical,
    "spherical",
  );
  const leftCylinder = formatRefractionValue(
    bestLeftRefraction?.cylinder,
    "cylinder",
  );
  const leftAxis = formatRefractionValue(bestLeftRefraction?.axis, "axis");
  const leftCorrectionType = translateCorrectionType(
    bestLeftRefraction?.correctionType || "sc",
  );

  // Função para formatar data
  const formatDate = (date: Date | string | null | undefined) => {
    if (!date) return "";
    return new Date(date).toLocaleDateString("pt-BR", {
      timeZone: "America/Sao_Paulo",
    });
  };

  // Logs dos olhos
  const rightEyeLogs =
    eyes?.rightEye?.logs?.filter(
      (log) => log.details && log.details.trim() !== "",
    ) ?? [];
  const leftEyeLogs =
    eyes?.leftEye?.logs?.filter(
      (log) => log.details && log.details.trim() !== "",
    ) ?? [];

  // Cirurgias dos olhos
  const rightEyeSurgeries = patient.evaluations.flatMap(
    (evalData) => evalData.eyes?.rightEye?.surgeries ?? [],
  );
  const leftEyeSurgeries = patient.evaluations.flatMap(
    (evalData) => evalData.eyes?.leftEye?.surgeries ?? [],
  );

  // Colírios dos olhos (apenas da avaliação atual)
  const rightEyeEyedrops = eyes?.rightEye?.eyedrops ?? [];
  const leftEyeEyedrops = eyes?.leftEye?.eyedrops ?? [];

  // Prescrições da avaliação
  const prescriptions = evaluation.prescriptions ?? [];

  // Histórico de avaliações do paciente
  const patientEvaluations = patient.evaluations.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );

  // Função para gerar o conteúdo para o botão de copiar com melhor formatação
  const generateOutput = () => {
    let output = "";

    // 1. Informações do Paciente
    output += `*📋 INFORMAÇÕES DO PACIENTE*\n`;
    output += `━━━━━━━━━━━━━━━━━━\n`;
    output += `Nome: ${patient.name || "N/A"}\n`;
    output += `Idade: ${
      patient.birthDate
        ? calculateAge(patient.birthDate.toISOString()) + " anos"
        : "N/A"
    }\n`;
    output += `Histórico: ${patientEvaluations.length} avaliações concluídas\n`;
    output += `Primeira Avaliação: ${patientEvaluations.length > 0 ? formatDate(patientEvaluations[patientEvaluations.length - 1]?.createdAt) : "N/A"}\n\n`;

    // 2. Olho Direito (OD)
    output += `*👁️ OLHO DIREITO (OD)*\n`;
    output += `━━━━━━━━━━━━━━━━━━\n`;
    if (bestRightRefraction) {
      output += `Acuidade Visual: ${bestRightRefraction.visualAcuity || "N/A"}\n`;
      if (bestRightRefraction.correctionType === "rx") {
        output += `Refração (${rightCorrectionType}):\n`;
        output += `  • Esférico: ${rightSpherical}\n`;
        output += `  • Cilíndrico: ${rightCylinder}\n`;
        output += `  • Eixo: ${rightAxis}\n`;
      } else {
        output += `Refração: ${rightCorrectionType}\n`;
      }
    } else {
      output += `Nenhuma refração disponível\n`;
    }

    if (rightEyeLogs.length) {
      output += `\nExames Realizados:\n`;
      rightEyeLogs.forEach((log) => {
        output += `  • ${translateType(log.type) || log.type || "N/A"}: ${log.details || "N/A"}\n`;
      });
    }

    if (rightEyeSurgeries.length) {
      output += `\nHistórico de Cirurgias:\n`;
      rightEyeSurgeries.forEach((surgery) => {
        output += `  • ${surgery.procedure || "N/A"} (${surgery.date ? formatDate(surgery.date) : "N/A"})\n`;
        if (surgery.notes) {
          output += `    Notas: ${surgery.notes}\n`;
        }
      });
    }

    if (rightEyeEyedrops.length) {
      output += `\nColírios Prescritos:\n`;
      rightEyeEyedrops.forEach((eyedrop) => {
        output += `  • ${eyedrop.name || "N/A"}`;
        if (eyedrop.dosage) output += ` - ${eyedrop.dosage}`;
        if (eyedrop.startDate)
          output += ` (Início: ${formatDate(eyedrop.startDate)})`;
        output += `\n`;
        if (eyedrop.notes) {
          output += `    Notas: ${eyedrop.notes}\n`;
        }
      });
    }

    // 3. Olho Esquerdo (OE)
    output += `\n*👁️ OLHO ESQUERDO (OE)*\n`;
    output += `━━━━━━━━━━━━━━━━━━\n`;
    if (bestLeftRefraction) {
      output += `Acuidade Visual: ${bestLeftRefraction.visualAcuity || "N/A"}\n`;
      if (bestLeftRefraction.correctionType === "rx") {
        output += `Refração (${leftCorrectionType}):\n`;
        output += `  • Esférico: ${leftSpherical}\n`;
        output += `  • Cilíndrico: ${leftCylinder}\n`;
        output += `  • Eixo: ${leftAxis}\n`;
      } else {
        output += `Refração: ${leftCorrectionType}\n`;
      }
    } else {
      output += `Nenhuma refração disponível\n`;
    }

    if (leftEyeLogs.length) {
      output += `\nExames Realizados:\n`;
      leftEyeLogs.forEach((log) => {
        output += `  • ${translateType(log.type) || log.type || "N/A"}: ${log.details || "N/A"}\n`;
      });
    }

    if (leftEyeSurgeries.length) {
      output += `\nHistórico de Cirurgias:\n`;
      leftEyeSurgeries.forEach((surgery) => {
        output += `  • ${surgery.procedure || "N/A"} (${surgery.date ? formatDate(surgery.date) : "N/A"})\n`;
        if (surgery.notes) {
          output += `    Notas: ${surgery.notes}\n`;
        }
      });
    }

    if (leftEyeEyedrops.length) {
      output += `\nColírios Prescritos:\n`;
      leftEyeEyedrops.forEach((eyedrop) => {
        output += `  • ${eyedrop.name || "N/A"}`;
        if (eyedrop.dosage) output += ` - ${eyedrop.dosage}`;
        if (eyedrop.startDate)
          output += ` (Início: ${formatDate(eyedrop.startDate)})`;
        output += `\n`;
        if (eyedrop.notes) {
          output += `    Notas: ${eyedrop.notes}\n`;
        }
      });
    }

    // 4. Detalhes do Atendimento
    output += `\n*🏥 DETALHES DO ATENDIMENTO*\n`;
    output += `━━━━━━━━━━━━━━━━━━\n`;
    output += `Data da Avaliação: ${evaluation.createdAt ? formatDate(evaluation.createdAt) : "N/A"}\n`;
    output += `Data de Atualização: ${evaluation.updatedAt ? formatDate(evaluation.updatedAt) : "N/A"}\n`;
    output += `Médico: ${collaborator.name || "N/A"}\n`;
    if (collaborator.persistentNote) {
      output += `Observação do Médico: ${collaborator.persistentNote}\n`;
    }
    output += `Ambulatório: ${clinic?.name || "N/A"}\n`;
    if (clinic?.collaborators && clinic.collaborators.length > 0) {
      output += `Equipe do Ambulatório: ${clinic.collaborators.map((c) => c.collaborator.name).join(", ")}\n`;
    }

    if (evaluation.clinicalData?.trim()) {
      output += `\nDados Clínicos:\n${evaluation.clinicalData.trim()}\n`;
    }

    if (evaluation.continuousData?.trim()) {
      output += `\nDados Persistentes:\n${evaluation.continuousData.trim()}\n`;
    }

    output += `\nDiagnóstico: ${evaluation.diagnosis || "N/A"}\n`;
    output += `Tratamento: ${evaluation.treatment || "N/A"}\n`;
    output += `Acompanhamento: ${evaluation.followUp || "N/A"}\n`;

    if (evaluation.nextAppointment) {
      output += `Próxima Consulta: ${evaluation.nextAppointment}\n`;
    }

    // 5. Prescrições
    if (prescriptions.length > 0) {
      output += `\n*💊 PRESCRIÇÕES*\n`;
      output += `━━━━━━━━━━━━━━━━━━\n`;
      prescriptions.forEach((prescription, index) => {
        output += `Prescrição ${index + 1} (${formatDate(prescription.createdAt)}):\n`;
        if (prescription.prescriptionItems.length > 0) {
          prescription.prescriptionItems.forEach((item) => {
            output += `  • ${item.medication?.name || "Medicação personalizada"}`;
            if (item.eye) {
              const eyeLabel =
                item.eye === "OD"
                  ? "Olho Direito"
                  : item.eye === "OE"
                    ? "Olho Esquerdo"
                    : "Ambos os Olhos";
              output += ` (${eyeLabel})`;
            }
            if (item.quantity) output += ` - Qtd: ${item.quantity}`;
            output += `\n`;

            if (item.selectedMedicationInstruction) {
              output += `    Instrução: ${item.selectedMedicationInstruction}\n`;
            }
            if (item.customInstruction) {
              output += `    Instrução Personalizada: ${item.customInstruction}\n`;
            }
          });
        } else {
          output += `  Nenhum item prescrito\n`;
        }
        output += `\n`;
      });
    }

    // 6. Histórico de Avaliações
    if (patientEvaluations.length > 1) {
      output += `\n*📚 HISTÓRICO DE AVALIAÇÕES*\n`;
      output += `━━━━━━━━━━━━━━━━━━\n`;
      patientEvaluations.slice(0, 5).forEach((ev) => {
        const isCurrent = ev.id === evaluation.id;
        output += `${isCurrent ? "→ " : "  "}${formatDate(ev.createdAt)}: ${ev.diagnosis || "N/A"}\n`;
      });
      if (patientEvaluations.length > 5) {
        output += `  ... e mais ${patientEvaluations.length - 5} avaliações\n`;
      }
    }

    return output;
  };

  // Gere o conteúdo para o botão de copiar
  const prompt = generateOutput();

  if (!evaluation.done) redirect(`/evaluations/${id}`);

  return (
    <div className="space-y-6">
      <div className="flex justify-between">
        <PageHeading>Resumo da Avaliação</PageHeading>
        <div className="flex gap-2">
          <Link href={`/patients/${patient.id}/history`} passHref>
            <Button
              variant="outline"
              aria-label={`Histórico de ${patient.name}`}
            >
              <MdOutlineHistory size={18} />
              <span className="hidden sm:inline">Histórico</span>
            </Button>
          </Link>
          {/* Botão para reabrir a avaliação */}
          <ReopenEvaluationButton evaluation={evaluation} />
          {/* Botão para copiar o prompt */}
          <CopyPromptButton prompt={prompt} />
        </div>
      </div>
      {/* Informações do Paciente */}
      <Card>
        <CardHeader>
          <CardTitle>Informações do Paciente</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm">
          <p>
            <strong>Nome:</strong> {patient.name || "N/A"}
          </p>
          <p>
            <strong>Idade:</strong>{" "}
            {patient.birthDate
              ? calculateAge(patient.birthDate.toISOString()) + " anos"
              : "N/A"}
          </p>
          <p>
            <strong>Histórico de Avaliações:</strong>{" "}
            {patientEvaluations.length > 0
              ? `${patientEvaluations.length} avaliações concluídas`
              : "N/A"}
          </p>
        </CardContent>
      </Card>
      {/* Detalhes do Atendimento */}
      <Card>
        <CardHeader>
          <CardTitle>Detalhes do Atendimento</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm">
          <p>
            <strong>Data:</strong>{" "}
            {evaluation.createdAt ? formatDate(evaluation.createdAt) : "N/A"}
          </p>
          <p>
            <strong>Médico:</strong> {collaborator.name || "N/A"}
          </p>
          <p>
            <strong>Ambulatório:</strong> {clinic?.name || "N/A"}{" "}
            {clinic?.collaborators &&
              clinic.collaborators.length > 0 &&
              `(${clinic?.collaborators
                .map((c) => c.collaborator.name)
                .join(", ")})`}
          </p>
          <p>
            <strong>Dados Clínicos:</strong>{" "}
            {evaluation.clinicalData?.trim() || "N/A"}
          </p>
          <p>
            <strong>Dados Persistentes:</strong>{" "}
            {evaluation.continuousData?.trim() || "N/A"}
          </p>
          <p>
            <strong>Diagnóstico:</strong> {evaluation.diagnosis || "N/A"}
          </p>
          <p>
            <strong>Tratamento:</strong> {evaluation.treatment || "N/A"}
          </p>
          <p>
            <strong>Acompanhamento:</strong> {evaluation.followUp || "N/A"}
          </p>
          <p>
            <strong>Próxima Consulta:</strong>{" "}
            {evaluation.nextAppointment || "N/A"}
          </p>
        </CardContent>
      </Card>
      {/* Dados dos Olhos, Acuidade Visual, Refração e Históricos de Cirurgias */}
      <div className="flex flex-col gap-6 sm:flex-row">
        {/* Olho Direito */}
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Olho Direito (OD)</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Acuidade Visual e Refração */}
            {bestRightRefraction ? (
              <div className="flex flex-col gap-1">
                <p>
                  <strong>Melhor Acuidade Visual:</strong>{" "}
                  {bestRightRefraction.visualAcuity || "N/A"}
                </p>
                <p>
                  <strong>Refração:</strong>{" "}
                  {bestRightRefraction.correctionType === "rx"
                    ? `${rightCorrectionType} - Esférico: ${rightSpherical}, Cilíndrico: ${rightCylinder}, Eixo: ${rightAxis}`
                    : rightCorrectionType}
                </p>
              </div>
            ) : (
              <p>Nenhuma refração disponível.</p>
            )}

            <Separator />
            <h3 className="font-semibold">Olho Direito</h3>
            {rightEyeLogs.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Tipo</TableHead>
                    <TableHead>Detalhes</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {rightEyeLogs.map((log, index) => (
                    <TableRow key={index}>
                      <TableCell>{translateType(log.type) || "N/A"}</TableCell>
                      <TableCell>
                        {log.details && isValidURL(log.details) ? (
                          <AccessFileButton
                            fileName={log.details.split("/").pop() as string}
                            key={index}
                          >
                            Ver
                          </AccessFileButton>
                        ) : (
                          log.details || "N/A"
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <p>Nenhum log disponível</p>
            )}

            <Separator />
            <h3 className="font-semibold">Histórico de Cirurgias</h3>
            {rightEyeSurgeries.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Procedimento</TableHead>
                    <TableHead>Data</TableHead>
                    <TableHead>Notas</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {rightEyeSurgeries.map((surgery, index) => (
                    <TableRow key={index}>
                      <TableCell>{surgery.procedure || "N/A"}</TableCell>
                      <TableCell>
                        {surgery.date ? formatDate(surgery.date) : "N/A"}
                      </TableCell>
                      <TableCell>{surgery.notes || "N/A"}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <p>Nenhum histórico de cirurgias</p>
            )}
          </CardContent>
        </Card>

        {/* Olho Esquerdo */}
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Olho Esquerdo (OE)</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Acuidade Visual e Refração */}
            {bestLeftRefraction ? (
              <div className="flex flex-col gap-1">
                <p>
                  <strong>Melhor Acuidade Visual:</strong>{" "}
                  {bestLeftRefraction.visualAcuity || "N/A"}
                </p>
                <p>
                  <strong>Refração:</strong>{" "}
                  {bestLeftRefraction.correctionType === "rx"
                    ? `${leftCorrectionType} - Esférico: ${leftSpherical}, Cilíndrico: ${leftCylinder}, Eixo: ${leftAxis}`
                    : leftCorrectionType}
                </p>
              </div>
            ) : (
              <p>Nenhuma refração disponível.</p>
            )}

            <Separator />
            <h3 className="font-semibold">Olho Esquerdo</h3>
            {leftEyeLogs.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Tipo</TableHead>
                    <TableHead>Detalhes</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {leftEyeLogs.map((log, index) => (
                    <TableRow key={index}>
                      <TableCell>{translateType(log.type) || "N/A"}</TableCell>
                      <TableCell>
                        {log.details && isValidURL(log.details) ? (
                          <AccessFileButton
                            fileName={log.details.split("/").pop() as string}
                            key={index}
                          >
                            Ver
                          </AccessFileButton>
                        ) : (
                          log.details || "N/A"
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <p>Nenhum log disponível</p>
            )}

            <Separator />
            <h3 className="font-semibold">Histórico de Cirurgias</h3>
            {leftEyeSurgeries.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Procedimento</TableHead>
                    <TableHead>Data</TableHead>
                    <TableHead>Notas</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {leftEyeSurgeries.map((surgery, index) => (
                    <TableRow key={index}>
                      <TableCell>{surgery.procedure || "N/A"}</TableCell>
                      <TableCell>
                        {surgery.date ? formatDate(surgery.date) : "N/A"}
                      </TableCell>
                      <TableCell>{surgery.notes || "N/A"}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <p>Nenhum histórico de cirurgias</p>
            )}
          </CardContent>
        </Card>
      </div>
      {/* Histórico de Avaliações do Paciente */}
      <Card>
        <CardHeader>
          <CardTitle>Histórico de Avaliações</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {patientEvaluations.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Data</TableHead>
                  <TableHead>Diagnóstico</TableHead>
                  <TableHead>Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {patientEvaluations.map((ev, index) => (
                  <TableRow
                    key={index}
                    className={ev.id === evaluation.id ? "bg-muted" : undefined}
                  >
                    <TableCell>{formatDate(ev.createdAt)}</TableCell>
                    <TableCell>{ev.diagnosis || "N/A"}</TableCell>
                    <TableCell>
                      <Link href={`/evaluations/${ev.id}`} passHref>
                        <Button variant="outline" size="sm">
                          Ver Detalhes
                        </Button>
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <p>Nenhum histórico de avaliações disponível</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
