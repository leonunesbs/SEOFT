import type { Prisma } from "@prisma/client";
import { db } from "~/server/db";

// ============================================================================
// INCLUDES CONFIGURATION
// ============================================================================

const evaluationInclude = {
  clinic: true,
  collaborator: true,
  patient: true,
  eyes: {
    include: {
      leftEye: {
        include: {
          logs: true,
          refraction: true,
          surgeries: {
            orderBy: {
              date: "asc" as const,
            },
          },
        },
      },
      rightEye: {
        include: {
          logs: true,
          refraction: true,
          surgeries: {
            orderBy: {
              date: "asc" as const,
            },
          },
        },
      },
    },
  },
  appointments: {
    include: {
      clinic: true,
      collaborator: true,
    },
    orderBy: {
      scheduledDate: "asc",
    },
  },
} satisfies Prisma.EvaluationInclude;

const lastEvaluationInclude = {
  eyes: {
    include: {
      leftEye: {
        include: {
          logs: true,
          refraction: true,
          surgeries: true,
        },
      },
      rightEye: {
        include: {
          logs: true,
          refraction: true,
          surgeries: true,
        },
      },
    },
  },
} satisfies Prisma.EvaluationInclude;

const patientSurgeriesInclude = {
  eyes: {
    include: {
      leftEye: {
        include: {
          surgeries: {
            orderBy: {
              date: "asc" as const,
            },
          },
        },
      },
      rightEye: {
        include: {
          surgeries: {
            orderBy: {
              date: "asc" as const,
            },
          },
        },
      },
    },
  },
} satisfies Prisma.EvaluationInclude;

// ============================================================================
// DATA ACCESS FUNCTIONS
// ============================================================================

/**
 * Busca uma avaliação específica com todos os dados relacionados
 */
export async function getEvaluationWithRelations(id: string) {
  return await db.evaluation.findUnique({
    where: { id },
    include: evaluationInclude,
  });
}

/**
 * Busca a última avaliação completa de um paciente
 */
export async function getLastPatientEvaluation(patientId: string) {
  return await db.evaluation.findFirst({
    where: {
      done: true,
      patientId,
    },
    orderBy: {
      createdAt: "desc",
    },
    include: lastEvaluationInclude,
  });
}

/**
 * Busca todas as clínicas com seus colaboradores
 */
export async function getClinicsWithCollaborators() {
  return await db.clinic.findMany({
    include: {
      collaborators: {
        select: {
          collaborator: {
            select: {
              name: true,
            },
          },
        },
      },
    },
  });
}

/**
 * Busca todas as cirurgias de um paciente organizadas por avaliação
 */
export async function getPatientSurgeries(patientId: string) {
  return await db.evaluation.findMany({
    where: { patientId },
    include: patientSurgeriesInclude,
  });
}

/**
 * Busca todos os medicamentos ordenados por nome
 */
export async function getAllMedications() {
  return await db.medication.findMany({
    orderBy: {
      name: "asc",
    },
  });
}

/**
 * Busca a primeira prescrição de uma avaliação
 */
export async function getEvaluationPrescription(evaluationId: string) {
  return await db.prescription.findFirst({
    where: { evaluationId },
    include: {
      prescriptionItems: {
        include: {
          medication: true,
        },
      },
    },
  });
}

/**
 * Busca dados de ocupação de agendamentos por período
 */
export async function getOccupancyByPeriod(
  startDate: Date,
  endDate: Date,
  collaboratorId?: string,
) {
  const where: Prisma.AppointmentWhereInput = {
    scheduledDate: {
      gte: startDate,
      lte: endDate,
    },
    status: {
      in: ["SCHEDULED", "CONFIRMED"],
    },
  };

  if (collaboratorId) {
    where.collaboratorId = collaboratorId;
  }

  const appointments = await db.appointment.findMany({
    where,
    select: {
      scheduledDate: true,
    },
    orderBy: {
      scheduledDate: "asc",
    },
  });

  // Agrupar por data e turno
  const occupancyByDate: Record<
    string,
    { total: number; morning: number; afternoon: number }
  > = {};

  appointments.forEach((appointment) => {
    const dateKey = appointment.scheduledDate.toISOString().split("T")[0];
    if (dateKey) {
      if (!occupancyByDate[dateKey]) {
        occupancyByDate[dateKey] = { total: 0, morning: 0, afternoon: 0 };
      }

      const hour = appointment.scheduledDate.getHours();
      const isMorning = hour < 12;

      occupancyByDate[dateKey].total += 1;
      if (isMorning) {
        occupancyByDate[dateKey].morning += 1;
      } else {
        occupancyByDate[dateKey].afternoon += 1;
      }
    }
  });

  return occupancyByDate;
}

/**
 * Busca todos os dados necessários para a página de evaluation
 */
export async function getEvaluationPageData(id: string) {
  const [evaluation, clinics, medications, firstPrescription] =
    await Promise.all([
      getEvaluationWithRelations(id),
      getClinicsWithCollaborators(),
      getAllMedications(),
      getEvaluationPrescription(id),
    ]);

  if (!evaluation) {
    return null;
  }

  const [lastEvaluation, patientSurgeries] = await Promise.all([
    getLastPatientEvaluation(evaluation.patientId),
    getPatientSurgeries(evaluation.patientId),
  ]);

  // Carregar dados de ocupação para o mês atual e próximo mês
  const currentDate = new Date();
  const startOfCurrentMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1,
  );
  const endOfNextMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 2,
    0,
  );

  const occupancyData = await getOccupancyByPeriod(
    startOfCurrentMonth,
    endOfNextMonth,
    evaluation.collaboratorId,
  );

  return {
    evaluation,
    lastEvaluation,
    clinics,
    medications,
    firstPrescription,
    patientSurgeries: patientSurgeries.map((evaluation) => ({
      eyes: {
        leftEye: {
          surgeries: evaluation.eyes?.leftEye.surgeries ?? [],
        },
        rightEye: {
          surgeries: evaluation.eyes?.rightEye.surgeries ?? [],
        },
      },
    })),
    occupancyData,
  };
}
