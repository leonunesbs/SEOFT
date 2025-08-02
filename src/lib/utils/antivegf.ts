// Utilitários compartilhados para o módulo AntiVEGF

// Constantes de status e suas respectivas cores
export const STATUS_COLORS = {
  PENDING: "bg-yellow-100 text-yellow-800",
  PENDING_NIR: "bg-orange-100 text-orange-800",
  APPROVED: "bg-blue-100 text-blue-800",
  SCHEDULED: "bg-green-100 text-green-800",
  COMPLETED: "bg-gray-100 text-gray-800",
  CANCELLED: "bg-red-100 text-red-800",
  REJECTED: "bg-red-100 text-red-800",
  // Para appointments
  pending: "bg-yellow-100 text-yellow-800",
  rescheduled: "bg-orange-100 text-orange-800",
  confirmed: "bg-blue-100 text-blue-800",
  completed: "bg-green-100 text-green-800",
} as const;

// Constantes de prioridade/classificação SWALIS
export const SWALIS_COLORS = {
  A1: "bg-red-100 text-red-800",
  A2: "bg-orange-100 text-orange-800",
  B: "bg-yellow-100 text-yellow-800",
  C: "bg-blue-100 text-blue-800",
  D: "bg-green-100 text-green-800",
  // Para appointments
  low: "bg-gray-100 text-gray-800",
  medium: "bg-yellow-100 text-yellow-800",
  high: "bg-red-100 text-red-800",
} as const;

// Constantes de status de injeção
export const INJECTION_STATUS_COLORS = {
  PENDING: "bg-yellow-100 text-yellow-800",
  CONFIRMED: "bg-blue-100 text-blue-800",
  COMPLETED: "bg-green-100 text-green-800",
  RESCHEDULED: "bg-orange-100 text-orange-800",
} as const;

// Função para obter texto do status
export function getStatusText(status: string): string {
  const statusMap: Record<string, string> = {
    PENDING: "Pendente",
    PENDING_NIR: "Aguardando NIR",
    APPROVED: "Aprovado",
    SCHEDULED: "Agendado",
    COMPLETED: "Concluído",
    CANCELLED: "Cancelado",
    REJECTED: "Rejeitado",
    // Para appointments
    pending: "Pendente",
    rescheduled: "Reagendado",
    confirmed: "Confirmado",
    completed: "Concluído",
  };
  return statusMap[status] || status;
}

// Função para obter texto da classificação SWALIS
export function getSwalisText(classification: string): string {
  const swalisMap: Record<string, string> = {
    A1: "A1 - Risco iminente",
    A2: "A2 - Atividades prejudicadas",
    B: "B - Prejuízo acentuado",
    C: "C - Prejuízo mínimo",
    D: "D - Sem prejuízo",
  };
  return swalisMap[classification] || classification;
}

// Função para obter cor da classificação SWALIS
export function getSwalisColor(classification: string): string {
  return (
    SWALIS_COLORS[classification as keyof typeof SWALIS_COLORS] ||
    "bg-gray-100 text-gray-800"
  );
}

// Função para obter texto de prioridade
export function getPriorityText(priority: string): string {
  const priorityMap: Record<string, string> = {
    low: "Baixa",
    medium: "Média",
    high: "Alta",
  };
  return priorityMap[priority] || priority;
}

// Função para obter texto do status de injeção
export function getInjectionStatusText(status: string): string {
  const statusMap: Record<string, string> = {
    PENDING: "Pendente",
    CONFIRMED: "Confirmada",
    COMPLETED: "Concluída",
    RESCHEDULED: "Reagendada",
  };
  return statusMap[status] || status;
}

// Função para obter cor do status de injeção
export function getInjectionStatusColor(status: string): string {
  return (
    INJECTION_STATUS_COLORS[status as keyof typeof INJECTION_STATUS_COLORS] ||
    "bg-gray-100 text-gray-800"
  );
}

// Função para obter label do olho
export function getEyeLabel(eye: string): string {
  return eye === "OD" ? "Olho Direito" : "Olho Esquerdo";
}

// Função para obter ícone do olho
export function getEyeIcon(eye: string): string {
  return eye === "OD" ? "👁️" : "👁️‍🗨️";
}

// Função para verificar se a classificação é urgente
export function isUrgent(classification: string): boolean {
  return classification === "A1" || classification === "A2";
}

// Função para formatar data para API (UTC)
export function formatDateForAPI(date: Date | undefined): string {
  if (!date) return "";
  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, "0");
  const day = String(date.getUTCDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

// Função para formatar data para exibição
export function formatDateForDisplay(date: Date | undefined): string {
  if (!date) return "";
  return date.toLocaleDateString("pt-BR", {
    timeZone: "UTC",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

// Função para formatar data com dia da semana
export function formatDateAndWeekday(date: Date | undefined): string {
  if (!date) return "";
  const dateStr = date.toLocaleDateString("pt-BR", {
    timeZone: "UTC",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
  const weekday = date.toLocaleDateString("pt-BR", {
    timeZone: "UTC",
    weekday: "long",
  });
  return `${dateStr} - ${weekday}`;
}

// Função para verificar se a data é válida para agendamentos (Segunda T, Terça T ou Quinta M)
export function isValidAppointmentDate(date: Date | undefined): boolean {
  if (!date) return false;
  const dayOfWeek = date.getDay(); // 0 = Domingo, 1 = Segunda, 2 = Terça, 4 = Quinta
  return dayOfWeek === 1 || dayOfWeek === 2 || dayOfWeek === 4;
}

// Informações sobre dias disponíveis
export function getAvailableDaysInfo() {
  return {
    monday: "Segunda-feira (Tarde)",
    tuesday: "Terça-feira (Tarde)",
    thursday: "Quinta-feira (Manhã)",
  };
}
