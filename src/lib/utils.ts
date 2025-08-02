import { type ClassValue, clsx } from "clsx";

import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Mapeamento de acuidade visual para valores numéricos para comparação
export const visualAcuityValues: { [key: string]: number } = {
  ">20/20": 24,
  "20/20": 23,
  "20/25": 22,
  "20/30": 21,
  "20/40": 20,
  "20/50": 19,
  "20/60": 18,
  "20/70": 17,
  "20/80": 16,
  "20/100": 15,
  "20/200": 14,
  "20/400": 13,
  "20/800": 12,
  "CD 4m": 11,
  "CD 3m": 10,
  "CD 2m": 9,
  "CD 1m": 8,
  "CD 0,5m": 7,
  "CD 30cm": 6,
  "CD 15cm": 5,
  "CD FF": 4,
  MM: 3,
  PL: 2,
  "PL fraco": 1,
  "PL duvidoso": 0,
  SPL: 0,
};

// Função para determinar a melhor refração com base na acuidade visual
export const getBestRefraction = (refractions: any[]) => {
  return refractions.reduce((best, current) => {
    if (!current.visualAcuity) return best;

    const currentValue = visualAcuityValues[current.visualAcuity];
    if (currentValue === undefined) return best;

    if (!best || !best.visualAcuity) return current;

    const bestValue = visualAcuityValues[best.visualAcuity];
    if (bestValue === undefined) return current;

    // Maior valor numérico = melhor acuidade visual
    return currentValue > bestValue ? current : best;
  }, null);
};

export function translateType(type: string) {
  switch (type) {
    case "RETINOGRAPHY":
      return "RETINOGRAFIA";
    case "OCT":
      return "OCT";
    case "VISUAL_FIELD":
      return "CAMPIMETRIA";
    case "BIOMICROSCOPY":
      return "BIOMICROSCOPIA";
    case "TONOMETRY":
      return "TONOMETRIA";
    case "REFRACTION":
      return "REFRAÇÃO";
    case "BIOMETRY":
      return "BIOMETRIA";
    case "PACHYMETRY":
      return "PAQUIMETRIA";
    case "FUNDOSCOPY":
      return "FUNDOSCOPIA";
    case "CT_CORNEA":
      return "TC CÓRNEA";
    case "GONIOSCOPY":
      return "GONIOSCOPIA";
    default:
      return "N/A";
  }
}

export function isValidURL(string: string) {
  try {
    new URL(string);
    // check if is https
    if (!string.toLowerCase().startsWith("https")) {
      return false;
    }
    return true;
  } catch {
    return false;
  }
}

// Funções utilitárias para trabalhar com datas em UTC
export function createUTCDate(year: number, month: number, day: number): Date {
  return new Date(Date.UTC(year, month - 1, day));
}

export function normalizeToUTC(date: Date): Date {
  return new Date(
    Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()),
  );
}

export function parseDateStringToUTC(dateString: string): Date | null {
  const [year, month, day] = dateString.split("-").map(Number);
  if (!year || !month || !day) {
    return null;
  }
  return createUTCDate(year, month, day);
}

// Funções para converter entre timezone local (America/Sao_Paulo) e UTC
export function localToUTC(date: Date): Date {
  // Converter data local para UTC
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();

  // Criar data UTC no meio-dia para evitar problemas de fuso horário
  return new Date(Date.UTC(year, month, day, 12, 0, 0, 0));
}

export function utcToLocal(date: Date): Date {
  // Converter data UTC para timezone local (America/Sao_Paulo)
  return new Date(
    date.toLocaleString("en-US", { timeZone: "America/Sao_Paulo" }),
  );
}

export function formatDateForDisplay(
  date: Date | string | null | undefined,
  timezone: "UTC" | "America/Sao_Paulo" = "UTC",
): string {
  if (!date) return "";

  const dateObj = typeof date === "string" ? new Date(date) : date;

  return dateObj.toLocaleDateString("pt-BR", {
    timeZone: timezone,
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

export function formatDateTimeForDisplay(
  date: Date | string | null | undefined,
  timezone: "UTC" | "America/Sao_Paulo" = "UTC",
): string {
  if (!date) return "";

  const dateObj = typeof date === "string" ? new Date(date) : date;

  return dateObj.toLocaleDateString("pt-BR", {
    timeZone: timezone,
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

// Função para criar data a partir de string no formato YYYY-MM-DD considerando timezone local
export function parseLocalDateString(dateString: string): Date | null {
  const [year, month, day] = dateString.split("-").map(Number);
  if (!year || !month || !day) {
    return null;
  }

  // Criar data no timezone local
  const localDate = new Date(year, month - 1, day);

  // Converter para UTC para armazenamento
  return localToUTC(localDate);
}

// Função para formatar data para API (sempre em UTC)
export function formatDateForAPI(date: Date): string {
  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, "0");
  const day = String(date.getUTCDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}
