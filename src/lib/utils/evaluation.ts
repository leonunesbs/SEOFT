import type {
  Collaborator,
  Evaluation,
  Eye,
  EyeLog,
  Eyes,
  EyeSurgery,
  Patient,
  Refraction,
} from "@prisma/client";

// ============================================================================
// TYPES
// ============================================================================

export type EvaluationWithRelations = Evaluation & {
  patient: Patient;
  collaborator: Collaborator;
  eyes?: Eyes & {
    leftEye: Eye & {
      logs: EyeLog[];
      refraction: Refraction[];
      surgeries: EyeSurgery[];
    };
    rightEye: Eye & {
      logs: EyeLog[];
      refraction: Refraction[];
      surgeries: EyeSurgery[];
    };
  };
};

export type ProgressVariant = "default" | "secondary" | "destructive";

// ============================================================================
// PROGRESS CALCULATION
// ============================================================================

/**
 * Calcula o progresso de uma avaliação baseado nos campos preenchidos
 */
export function calculateEvaluationProgress(
  evaluation: EvaluationWithRelations,
): number {
  let completedFields = 0;
  const totalFields = 7; // Total de seções principais

  // Verificar dados clínicos
  if (evaluation.clinicalData?.trim()) completedFields++;

  // Verificar diagnóstico
  if (evaluation.diagnosis?.trim()) completedFields++;

  // Verificar tratamento
  if (evaluation.treatment?.trim()) completedFields++;

  // Verificar exames OD
  const rightEyeLogs = evaluation.eyes?.rightEye?.logs || [];
  if (rightEyeLogs.length > 0) completedFields++;

  // Verificar exames OE
  const leftEyeLogs = evaluation.eyes?.leftEye?.logs || [];
  if (leftEyeLogs.length > 0) completedFields++;

  // Verificar refração OD
  const rightRefraction = evaluation.eyes?.rightEye?.refraction || [];
  if (rightRefraction.length > 0) completedFields++;

  // Verificar refração OE
  const leftRefraction = evaluation.eyes?.leftEye?.refraction || [];
  if (leftRefraction.length > 0) completedFields++;

  return Math.round((completedFields / totalFields) * 100);
}

/**
 * Determina a variante do progresso baseado na porcentagem
 */
export function getProgressVariant(progress: number): ProgressVariant {
  if (progress >= 80) return "default";
  if (progress >= 40) return "secondary";
  return "destructive";
}

/**
 * Retorna uma mensagem descritiva baseada no progresso
 */
export function getProgressMessage(progress: number): string {
  if (progress < 50) {
    return "Continue preenchendo os dados clínicos e exames";
  } else if (progress < 80) {
    return "Quase finalizada - adicione os dados restantes";
  } else {
    return "Avaliação quase completa - revise e finalize";
  }
}

// ============================================================================
// TIME UTILITIES
// ============================================================================

/**
 * Calcula o tempo decorrido desde uma data específica
 */
export function getTimeElapsed(date: Date): string {
  const now = new Date();
  const diffInMinutes = Math.floor(
    (now.getTime() - date.getTime()) / (1000 * 60),
  );

  if (diffInMinutes < 60) {
    return `${diffInMinutes}min`;
  } else {
    const diffInHours = Math.floor(diffInMinutes / 60);
    return `${diffInHours}h ${diffInMinutes % 60}min`;
  }
}

/**
 * Calcula a idade baseada na data de nascimento
 */
export function calculateAge(birthDate: Date): number {
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

// ============================================================================
// FORMATTING UTILITIES
// ============================================================================

/**
 * Formata uma data para exibição no padrão brasileiro
 */
export function formatDateBR(date: Date): string {
  return date.toLocaleDateString("pt-BR", {
    timeZone: "UTC",
  });
}

/**
 * Formata uma data e hora para exibição no padrão brasileiro
 */
export function formatDateTimeBR(date: Date): string {
  return date.toLocaleString("pt-BR", {
    timeZone: "America/Sao_Paulo",
  });
}
