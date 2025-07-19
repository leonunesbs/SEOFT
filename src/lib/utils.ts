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
