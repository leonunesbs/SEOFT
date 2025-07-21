import { createValidationError } from "./errors";
import { z } from "zod";

// ============================================================================
// SCHEMAS DE VALIDAÇÃO COMUNS
// ============================================================================

export const commonSchemas = {
  // Validação de email
  email: z.string().email("E-mail inválido"),

  // Validação de nome (permite acentos e espaços)
  name: z
    .string()
    .min(1, "Nome é obrigatório")
    .max(100, "Nome deve ter no máximo 100 caracteres")
    .regex(/^[a-zA-ZÀ-ÿ\s]+$/, "Nome deve conter apenas letras e espaços"),

  // Validação de CRM (apenas números)
  crm: z
    .string()
    .min(1, "CRM é obrigatório")
    .regex(/^\d+$/, "CRM deve conter apenas números"),

  // Validação de data de nascimento
  birthDate: z
    .string()
    .min(1, "Data de nascimento é obrigatória")
    .refine((date) => {
      const parsed = new Date(date);
      return !isNaN(parsed.getTime()) && parsed <= new Date();
    }, "Data de nascimento deve ser uma data válida no passado"),

  // Validação de ID (CUID ou UUID)
  id: z.string().min(1, "ID é obrigatório"),

  // Validação de texto com limite
  text: (maxLength: number = 1000) =>
    z
      .string()
      .max(maxLength, `Texto deve ter no máximo ${maxLength} caracteres`),

  // Validação de número positivo
  positiveNumber: z.number().positive("Número deve ser positivo"),

  // Validação de número entre 0 e 1 (para percentuais)
  percentage: z.number().min(0).max(1, "Percentual deve estar entre 0 e 1"),
} as const;

// ============================================================================
// FUNÇÕES DE VALIDAÇÃO UTILITÁRIAS
// ============================================================================

/**
 * Valida se uma data é válida e não está no futuro
 */
export function validateDate(
  dateString: string,
  fieldName: string = "data",
): Date {
  const date = new Date(dateString);

  if (isNaN(date.getTime())) {
    throw createValidationError(`${fieldName} inválida`, fieldName);
  }

  if (date > new Date()) {
    throw createValidationError(
      `${fieldName} não pode ser no futuro`,
      fieldName,
    );
  }

  return date;
}

/**
 * Valida se um email tem formato válido
 */
export function validateEmail(email: string): string {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email)) {
    throw createValidationError("E-mail inválido", "email");
  }

  return email.toLowerCase().trim();
}

/**
 * Valida se um nome tem formato válido
 */
export function validateName(name: string, fieldName: string = "nome"): string {
  const trimmedName = name.trim();

  if (trimmedName.length === 0) {
    throw createValidationError(`${fieldName} é obrigatório`, fieldName);
  }

  if (trimmedName.length > 100) {
    throw createValidationError(
      `${fieldName} deve ter no máximo 100 caracteres`,
      fieldName,
    );
  }

  // Permite letras, acentos e espaços
  const nameRegex = /^[a-zA-ZÀ-ÿ\s]+$/;
  if (!nameRegex.test(trimmedName)) {
    throw createValidationError(
      `${fieldName} deve conter apenas letras e espaços`,
      fieldName,
    );
  }

  return trimmedName;
}

/**
 * Valida se um CRM tem formato válido
 */
export function validateCRM(crm: string): string {
  const trimmedCRM = crm.trim();

  if (trimmedCRM.length === 0) {
    throw createValidationError("CRM é obrigatório", "crm");
  }

  if (!/^\d+$/.test(trimmedCRM)) {
    throw createValidationError("CRM deve conter apenas números", "crm");
  }

  return trimmedCRM;
}

/**
 * Valida se um ID não está vazio
 */
export function validateID(id: string, fieldName: string = "ID"): string {
  const trimmedID = id.trim();

  if (trimmedID.length === 0) {
    throw createValidationError(
      `${fieldName} é obrigatório`,
      fieldName.toLowerCase(),
    );
  }

  return trimmedID;
}

/**
 * Valida se um número está dentro de um intervalo
 */
export function validateNumberRange(
  value: number,
  min: number,
  max: number,
  fieldName: string = "valor",
): number {
  if (value < min || value > max) {
    throw createValidationError(
      `${fieldName} deve estar entre ${min} e ${max}`,
      fieldName.toLowerCase(),
    );
  }

  return value;
}

/**
 * Valida se uma string não está vazia e tem tamanho máximo
 */
export function validateString(
  value: string,
  maxLength: number = 1000,
  fieldName: string = "texto",
): string {
  const trimmedValue = value.trim();

  if (trimmedValue.length === 0) {
    throw createValidationError(
      `${fieldName} é obrigatório`,
      fieldName.toLowerCase(),
    );
  }

  if (trimmedValue.length > maxLength) {
    throw createValidationError(
      `${fieldName} deve ter no máximo ${maxLength} caracteres`,
      fieldName.toLowerCase(),
    );
  }

  return trimmedValue;
}

// ============================================================================
// FUNÇÕES DE VALIDAÇÃO DE NEGÓCIO
// ============================================================================

/**
 * Valida se um paciente pode ser excluído (não tem avaliações)
 */
export async function validatePatientDeletion(
  patientId: string,
  db: any,
): Promise<void> {
  const patient = await db.patient.findUnique({
    where: { id: patientId },
    include: {
      evaluations: {
        take: 1,
      },
    },
  });

  if (!patient) {
    throw createValidationError("Paciente não encontrado", "patientId");
  }

  if (patient.evaluations.length > 0) {
    throw createValidationError(
      "Não é possível excluir um paciente que possui avaliações registradas",
      "patient_has_evaluations",
    );
  }
}

/**
 * Valida se um colaborador pode ser excluído (não tem avaliações)
 */
export async function validateCollaboratorDeletion(
  collaboratorId: string,
  db: any,
): Promise<void> {
  const collaborator = await db.collaborator.findUnique({
    where: { id: collaboratorId },
    include: {
      evaluations: {
        take: 1,
      },
    },
  });

  if (!collaborator) {
    throw createValidationError("Colaborador não encontrado", "collaboratorId");
  }

  if (collaborator.evaluations.length > 0) {
    throw createValidationError(
      "Não é possível excluir um colaborador que possui avaliações registradas",
      "collaborator_has_evaluations",
    );
  }
}

/**
 * Valida se uma clínica pode ser excluída (não tem avaliações)
 */
export async function validateClinicDeletion(
  clinicId: string,
  db: any,
): Promise<void> {
  const clinic = await db.clinic.findUnique({
    where: { id: clinicId },
    include: {
      evaluations: {
        take: 1,
      },
    },
  });

  if (!clinic) {
    throw createValidationError("Clínica não encontrada", "clinicId");
  }

  if (clinic.evaluations.length > 0) {
    throw createValidationError(
      "Não é possível excluir uma clínica que possui avaliações registradas",
      "clinic_has_evaluations",
    );
  }
}

// ============================================================================
// FUNÇÕES DE SANITIZAÇÃO
// ============================================================================

/**
 * Sanitiza um nome (remove espaços extras, capitaliza)
 */
export function sanitizeName(name: string): string {
  return name
    .trim()
    .replace(/\s+/g, " ") // Remove múltiplos espaços
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}

/**
 * Sanitiza um email (lowercase, trim)
 */
export function sanitizeEmail(email: string): string {
  return email.toLowerCase().trim();
}

/**
 * Sanitiza um CRM (remove espaços e caracteres especiais)
 */
export function sanitizeCRM(crm: string): string {
  return crm.replace(/\D/g, ""); // Remove tudo que não é dígito
}

/**
 * Sanitiza um texto (trim, remove quebras de linha extras)
 */
export function sanitizeText(text: string): string {
  return text
    .trim()
    .replace(/\n\s*\n/g, "\n") // Remove linhas em branco extras
    .replace(/\s+/g, " "); // Remove múltiplos espaços
}
