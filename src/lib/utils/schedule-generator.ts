export interface ScheduledDate {
  id: string;
  date: Date;
  eye: "OD" | "OS";
  injectionNumber: number;
  type: "Injeção";
  status: "Pendente" | "Confirmada" | "Reagendada";
}

export interface ScheduleConfig {
  startDate: Date;
  startEye: "OD" | "OS";
  remainingOD: number;
  remainingOS: number;
}

// Função para verificar se uma data é válida (Segunda T, Terça T ou Quinta M)
export function isValidScheduleDate(date: Date): boolean {
  const dayOfWeek = date.getDay(); // 0 = Domingo (início da semana), 1 = Segunda, 2 = Terça, 4 = Quinta

  // Segunda-feira (1) - período da tarde (T)
  if (dayOfWeek === 1) return true;

  // Terça-feira (2) - período da tarde (T)
  if (dayOfWeek === 2) return true;

  // Quinta-feira (4) - período da manhã (M)
  if (dayOfWeek === 4) return true;

  return false;
}

// Função para encontrar a próxima data válida disponível
export function getNextValidScheduleDate(startDate: Date): Date {
  const nextDate = new Date(startDate);

  // Se a data inicial já é válida, retornar ela mesma
  if (isValidScheduleDate(nextDate)) {
    return nextDate;
  }

  // Procurar a próxima data válida
  let attempts = 0;
  const maxAttempts = 30; // Evitar loop infinito

  while (attempts < maxAttempts) {
    nextDate.setDate(nextDate.getDate() + 1);

    // Verificar se é uma data válida (Segunda T, Terça T ou Quinta M)
    const dayOfWeek = nextDate.getDay();

    // Segunda-feira (1) - período da tarde
    if (dayOfWeek === 1) {
      nextDate.setHours(14, 0, 0, 0); // 14:00 (T)
      return nextDate;
    }

    // Terça-feira (2) - período da tarde
    if (dayOfWeek === 2) {
      nextDate.setHours(14, 0, 0, 0); // 14:00 (T)
      return nextDate;
    }

    // Quinta-feira (4) - período da manhã
    if (dayOfWeek === 4) {
      nextDate.setHours(9, 0, 0, 0); // 09:00 (M)
      return nextDate;
    }

    attempts++;
  }

  // Se não encontrar uma data válida em 30 tentativas, retornar a data original
  return startDate;
}

// Função para obter a próxima data válida após um intervalo
export function getNextValidDateAfterInterval(
  currentDate: Date,
  intervalDays: number,
): Date {
  const nextDate = new Date(currentDate);
  nextDate.setDate(nextDate.getDate() + intervalDays);
  return getNextValidScheduleDate(nextDate);
}

export function generateSchedule(config: ScheduleConfig): ScheduledDate[] {
  const schedule: ScheduledDate[] = [];

  // Programação individualizada para cada olho com intervalo de 4 semanas
  const INTERVAL_SAME_EYE = 28; // 4 semanas

  let odInjectionCount = 0;
  let osInjectionCount = 0;

  // Criar todas as doses para cada olho separadamente
  const allDoses: Array<{ eye: "OD" | "OS"; doseNumber: number }> = [];

  // Adicionar todas as doses do OD
  for (let i = 0; i < config.remainingOD; i++) {
    allDoses.push({
      eye: "OD",
      doseNumber: i + 1,
    });
  }

  // Adicionar todas as doses do OS
  for (let i = 0; i < config.remainingOS; i++) {
    allDoses.push({
      eye: "OS",
      doseNumber: i + 1,
    });
  }

  // Ordenar para que o olho de início venha primeiro
  allDoses.sort((a, b) => {
    if (a.eye === config.startEye && b.eye !== config.startEye) return -1;
    if (a.eye !== config.startEye && b.eye === config.startEye) return 1;
    return 0;
  });

  // Gerar o cronograma baseado na sequência
  for (let i = 0; i < allDoses.length; i++) {
    const dose = allDoses[i];
    if (!dose) continue;

    let injectionDate: Date;

    if (dose.doseNumber === 1) {
      // Primeira dose de cada olho - usar a data de início
      injectionDate = new Date(config.startDate);
    } else {
      // Para doses subsequentes do mesmo olho, usar intervalo de 4 semanas
      // Encontrar a data da dose anterior do mesmo olho
      const previousSameEyeDose = schedule
        .filter((injection) => injection.eye === dose.eye)
        .sort((a, b) => a.date.getTime() - b.date.getTime())
        .pop();

      if (previousSameEyeDose) {
        injectionDate = new Date(previousSameEyeDose.date);
        injectionDate.setDate(injectionDate.getDate() + INTERVAL_SAME_EYE);
      } else {
        // Fallback - não deveria acontecer
        injectionDate = new Date(config.startDate);
      }
    }

    // Ajustar para o próximo dia válido
    injectionDate = getNextValidScheduleDate(injectionDate);

    // Adicionar ao cronograma
    if (dose.eye === "OD") {
      odInjectionCount++;
      schedule.push({
        id: `injection-${schedule.length + 1}`,
        date: new Date(injectionDate),
        eye: "OD",
        injectionNumber: odInjectionCount,
        type: "Injeção",
        status: "Pendente",
      });
    } else {
      osInjectionCount++;
      schedule.push({
        id: `injection-${schedule.length + 1}`,
        date: new Date(injectionDate),
        eye: "OS",
        injectionNumber: osInjectionCount,
        type: "Injeção",
        status: "Pendente",
      });
    }
  }

  // Ordenar por data
  return schedule.sort((a, b) => a.date.getTime() - b.date.getTime());
}

export function formatScheduleDate(date: Date): string {
  return date.toLocaleDateString("pt-BR", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function getNextInjectionDate(lastInjectionDate: Date): Date {
  const nextDate = new Date(lastInjectionDate);
  nextDate.setDate(nextDate.getDate() + 28); // 4 semanas (para doses no mesmo olho)
  return nextDate;
}

export function getNextVisitDate(lastVisitDate: Date): Date {
  const nextDate = new Date(lastVisitDate);
  nextDate.setDate(nextDate.getDate() + 14); // 2 semanas
  return nextDate;
}
