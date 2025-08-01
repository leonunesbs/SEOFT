"use client";

import { MdCheck, MdOutlineContentCopy } from "react-icons/md";
import { getBestRefraction, translateType } from "~/lib/utils";

import { Button } from "~/components/ui/button";
import { Prisma } from "@prisma/client";
import { useState } from "react";

interface EvaluationSummaryCopyButtonProps {
  evaluation: Prisma.EvaluationGetPayload<{
    include: {
      patient: {
        include: {
          evaluations: true;
        };
      };
      collaborator: true;
      clinic: {
        include: {
          collaborators: true;
        };
      };
      eyes: {
        include: {
          rightEye: {
            include: {
              refraction: true;
              logs: true;
              surgeries: true;
              eyedrops: true;
            };
          };
          leftEye: {
            include: {
              refraction: true;
              logs: true;
              surgeries: true;
              eyedrops: true;
            };
          };
        };
      };
      prescriptions: true;
    };
  }>;
}

export function EvaluationSummaryCopyButton({
  evaluation,
}: EvaluationSummaryCopyButtonProps) {
  const [copied, setCopied] = useState(false);

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

  // Função para formatar data
  const formatDate = (date: Date | string | null | undefined) => {
    if (!date) return "";
    return new Date(date).toLocaleDateString("pt-BR", {
      timeZone: "America/Sao_Paulo",
    });
  };

  // Função para gerar o conteúdo para o botão de copiar com melhor formatação
  const generateOutput = () => {
    const { patient, collaborator, clinic, eyes } = evaluation;

    // Melhor refração para cada olho
    const bestRightRefraction = getBestRefraction(
      eyes?.rightEye?.refraction || [],
    );
    const bestLeftRefraction = getBestRefraction(
      eyes?.leftEye?.refraction || [],
    );

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

    // Logs dos olhos
    const rightEyeLogs =
      eyes?.rightEye?.logs?.filter(
        (log: any) => log.details && log.details.trim() !== "",
      ) ?? [];
    const leftEyeLogs =
      eyes?.leftEye?.logs?.filter(
        (log: any) => log.details && log.details.trim() !== "",
      ) ?? [];

    // Cirurgias dos olhos
    const rightEyeSurgeries = patient.evaluations.flatMap(
      (evalData: any) => evalData.eyes?.rightEye?.surgeries ?? [],
    );
    const leftEyeSurgeries = patient.evaluations.flatMap(
      (evalData: any) => evalData.eyes?.leftEye?.surgeries ?? [],
    );

    // Colírios dos olhos (apenas da avaliação atual)
    const rightEyeEyedrops = eyes?.rightEye?.eyedrops ?? [];
    const leftEyeEyedrops = eyes?.leftEye?.eyedrops ?? [];

    // Prescrições da avaliação
    const prescriptions = evaluation.prescriptions ?? [];

    // Histórico de avaliações do paciente
    const patientEvaluations = patient.evaluations.sort(
      (a: any, b: any) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    );

    let output = "";

    // Detalhes do Atendimento
    output += `\n*🏥 SETOR DE OFTAMOLOGIA -  SEOFT*\n`;
    output += `━━━━━━━━━━━━━━━━━━\n`;
    output += `Data da Avaliação: ${evaluation.createdAt ? formatDate(evaluation.createdAt) : "N/A"}\n`;
    output += `Médico: ${collaborator.name || "N/A"}\n`;
    output += `Ambulatório: ${clinic?.name || "N/A"}\n`;

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
      rightEyeLogs.forEach((log: any) => {
        output += `  • ${translateType(log.type) || log.type || "N/A"}: ${log.details || "N/A"}\n`;
      });
    }

    if (rightEyeSurgeries.length) {
      output += `\nHistórico de Cirurgias:\n`;
      rightEyeSurgeries.forEach((surgery: any) => {
        output += `  • ${surgery.procedure || "N/A"} (${surgery.date ? formatDate(surgery.date) : "N/A"})\n`;
        if (surgery.notes) {
          output += `    Notas: ${surgery.notes}\n`;
        }
      });
    }

    if (rightEyeEyedrops.length) {
      output += `\nColírios Prescritos:\n`;
      rightEyeEyedrops.forEach((eyedrop: any) => {
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
      leftEyeLogs.forEach((log: any) => {
        output += `  • ${translateType(log.type) || log.type || "N/A"}: ${log.details || "N/A"}\n`;
      });
    }

    if (leftEyeSurgeries.length) {
      output += `\nHistórico de Cirurgias:\n`;
      leftEyeSurgeries.forEach((surgery: any) => {
        output += `  • ${surgery.procedure || "N/A"} (${surgery.date ? formatDate(surgery.date) : "N/A"})\n`;
        if (surgery.notes) {
          output += `    Notas: ${surgery.notes}\n`;
        }
      });
    }

    if (leftEyeEyedrops.length) {
      output += `\nColírios Prescritos:\n`;
      leftEyeEyedrops.forEach((eyedrop: any) => {
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
      prescriptions.forEach((prescription: any, index: number) => {
        output += `Prescrição ${index + 1} (${formatDate(prescription.createdAt)}):\n`;
        if (prescription.prescriptionItems.length > 0) {
          prescription.prescriptionItems.forEach((item: any) => {
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
      patientEvaluations.slice(0, 5).forEach((ev: any) => {
        const isCurrent = ev.id === evaluation.id;
        output += `${isCurrent ? "→ " : "  "}${formatDate(ev.createdAt)}: ${ev.diagnosis || "N/A"}\n`;
      });
      if (patientEvaluations.length > 5) {
        output += `  ... e mais ${patientEvaluations.length - 5} avaliações\n`;
      }
    }

    return output;
  };

  const handleCopy = async () => {
    try {
      const prompt = generateOutput();
      await navigator.clipboard.writeText(prompt);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Reseta após 2 segundos
    } catch (err) {
      console.error("Falha ao copiar para a área de transferência", err);
    }
  };

  return (
    <Button onClick={handleCopy}>
      {copied ? (
        <>
          <MdCheck className="" />
          <span className="hidden sm:block">Copiado!</span>
        </>
      ) : (
        <>
          <MdOutlineContentCopy className="" />
          <span className="hidden sm:block">Copiar</span>
        </>
      )}
    </Button>
  );
}
