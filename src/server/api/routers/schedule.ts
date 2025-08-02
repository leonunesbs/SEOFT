import { createTRPCRouter, protectedProcedure } from "../trpc";

import { withErrorHandling } from "~/lib/errors";
import { z } from "zod";

export const scheduleRouter = createTRPCRouter({
  // Verificar disponibilidade de vagas para uma data específica
  checkAvailability: protectedProcedure
    .input(
      z.object({
        date: z.string(), // formato: "YYYY-MM-DD"
      }),
    )
    .query(
      withErrorHandling(
        async ({ input, ctx }) => {
          // Criar data UTC sem problemas de fuso horário
          const [year, month, day] = input.date.split("-").map(Number);

          // Validar se os valores são válidos
          if (!year || !month || !day) {
            return {
              available: false,
              reason: "Data inválida",
              capacity: 0,
              booked: 0,
            };
          }

          // Criar data UTC
          const targetDate = new Date(Date.UTC(year, month - 1, day));
          const dayOfWeek = targetDate.getUTCDay(); // 0 = Domingo (início da semana), 1 = Segunda, 2 = Terça, 4 = Quinta

          // Verificar se é um dia válido para agendamento
          const isValidDay =
            dayOfWeek === 1 || dayOfWeek === 2 || dayOfWeek === 4;
          if (!isValidDay) {
            return {
              available: false,
              reason: "Dia não disponível para agendamento",
              capacity: 0,
              booked: 0,
            };
          }

          // Determinar o turno baseado no dia da semana
          let shift: "MORNING" | "AFTERNOON";
          if (dayOfWeek === 4) {
            // Quinta-feira - manhã
            shift = "MORNING";
          } else {
            // Segunda e Terça - tarde
            shift = "AFTERNOON";
          }

          // Buscar a capacidade configurada para o dia/turno
          const dayOfWeekEnum =
            dayOfWeek === 1
              ? "MONDAY"
              : dayOfWeek === 2
                ? "TUESDAY"
                : "THURSDAY";

          const capacity = await ctx.db.injectionDayCapacity.findUnique({
            where: {
              dayOfWeek_shift: {
                dayOfWeek: dayOfWeekEnum as any,
                shift: shift,
              },
            },
          });

          const maxCapacity = capacity?.capacity || 30; // Capacidade padrão se não configurada

          // Contar agendamentos existentes para esta data (usando UTC)
          const startOfDay = new Date(
            Date.UTC(year, month - 1, day, 0, 0, 0, 0),
          );
          const endOfDay = new Date(
            Date.UTC(year, month - 1, day, 23, 59, 59, 999),
          );

          const bookedCount = await ctx.db.intravitrealInjection.count({
            where: {
              scheduledDate: {
                gte: startOfDay,
                lte: endOfDay,
              },
              status: {
                in: ["PENDING", "CONFIRMED", "RESCHEDULED"],
              },
            },
          });

          const availableSlots = maxCapacity - bookedCount;
          const isAvailable = availableSlots > 0;

          return {
            available: isAvailable,
            reason: isAvailable ? "Vagas disponíveis" : "Sem vagas disponíveis",
            capacity: maxCapacity,
            booked: bookedCount,
            dayOfWeek: dayOfWeekEnum,
            shift: shift,
          };
        },
        { operation: "check_schedule_availability" },
      ),
    ),

  // Verificar disponibilidade para múltiplas datas
  checkMultipleDates: protectedProcedure
    .input(
      z.object({
        dates: z.array(z.string()), // array de datas no formato "YYYY-MM-DD"
      }),
    )
    .query(
      withErrorHandling(
        async ({ input, ctx }) => {
          const results = await Promise.all(
            input.dates.map(async (dateStr) => {
              // Criar data UTC sem problemas de fuso horário
              const [year, month, day] = dateStr.split("-").map(Number);

              // Validar se os valores são válidos
              if (!year || !month || !day) {
                return {
                  date: dateStr,
                  available: false,
                  reason: "Data inválida",
                  capacity: 0,
                  booked: 0,
                };
              }

              // Criar data UTC
              const targetDate = new Date(Date.UTC(year, month - 1, day));
              const dayOfWeek = targetDate.getUTCDay();

              // Verificar se é um dia válido
              const isValidDay =
                dayOfWeek === 1 || dayOfWeek === 2 || dayOfWeek === 4;
              if (!isValidDay) {
                return {
                  date: dateStr,
                  available: false,
                  reason: "Dia não disponível para agendamento",
                  capacity: 0,
                  booked: 0,
                };
              }

              // Determinar turno
              let shift: "MORNING" | "AFTERNOON";
              if (dayOfWeek === 4) {
                shift = "MORNING";
              } else {
                shift = "AFTERNOON";
              }

              const dayOfWeekEnum =
                dayOfWeek === 1
                  ? "MONDAY"
                  : dayOfWeek === 2
                    ? "TUESDAY"
                    : "THURSDAY";

              // Buscar capacidade
              const capacity = await ctx.db.injectionDayCapacity.findUnique({
                where: {
                  dayOfWeek_shift: {
                    dayOfWeek: dayOfWeekEnum as any,
                    shift: shift,
                  },
                },
              });

              const maxCapacity = capacity?.capacity || 30;

              // Contar agendamentos (usando UTC)
              const startOfDay = new Date(
                Date.UTC(year, month - 1, day, 0, 0, 0, 0),
              );
              const endOfDay = new Date(
                Date.UTC(year, month - 1, day, 23, 59, 59, 999),
              );

              const bookedCount = await ctx.db.intravitrealInjection.count({
                where: {
                  scheduledDate: {
                    gte: startOfDay,
                    lte: endOfDay,
                  },
                  status: {
                    in: ["PENDING", "CONFIRMED", "RESCHEDULED"],
                  },
                },
              });

              const availableSlots = maxCapacity - bookedCount;

              return {
                date: dateStr,
                available: availableSlots > 0,
                reason:
                  availableSlots > 0
                    ? "Vagas disponíveis"
                    : "Sem vagas disponíveis",
                capacity: maxCapacity,
                booked: bookedCount,
                dayOfWeek: dayOfWeekEnum,
                shift: shift,
              };
            }),
          );

          return results;
        },
        { operation: "check_multiple_dates_availability" },
      ),
    ),

  // Encontrar próxima data disponível
  findNextAvailableDate: protectedProcedure
    .input(
      z.object({
        startDate: z.string(), // data de início para buscar a partir dela
      }),
    )
    .query(
      withErrorHandling(
        async ({ input, ctx }) => {
          // Criar data UTC de início
          const [year, month, day] = input.startDate.split("-").map(Number);
          if (!year || !month || !day) {
            return {
              date: null,
              available: false,
              reason: "Data de início inválida",
            };
          }

          const currentDate = new Date(Date.UTC(year, month - 1, day));

          // Buscar até 30 dias à frente
          for (let i = 0; i < 30; i++) {
            currentDate.setUTCDate(currentDate.getUTCDate() + 1);
            const dayOfWeek = currentDate.getUTCDay();

            // Verificar se é um dia válido
            if (dayOfWeek === 1 || dayOfWeek === 2 || dayOfWeek === 4) {
              const dateStr = currentDate.toISOString().split("T")[0];

              // Verificar disponibilidade
              const availability = await ctx.db.injectionDayCapacity.findFirst({
                where: {
                  dayOfWeek: (dayOfWeek === 1
                    ? "MONDAY"
                    : dayOfWeek === 2
                      ? "TUESDAY"
                      : "THURSDAY") as any,
                  shift: dayOfWeek === 4 ? "MORNING" : "AFTERNOON",
                },
              });

              const maxCapacity = availability?.capacity || 30;

              // Contar agendamentos (usando UTC)
              const startOfDay = new Date(
                Date.UTC(
                  currentDate.getUTCFullYear(),
                  currentDate.getUTCMonth(),
                  currentDate.getUTCDate(),
                  0,
                  0,
                  0,
                  0,
                ),
              );
              const endOfDay = new Date(
                Date.UTC(
                  currentDate.getUTCFullYear(),
                  currentDate.getUTCMonth(),
                  currentDate.getUTCDate(),
                  23,
                  59,
                  59,
                  999,
                ),
              );

              const bookedCount = await ctx.db.intravitrealInjection.count({
                where: {
                  scheduledDate: {
                    gte: startOfDay,
                    lte: endOfDay,
                  },
                  status: {
                    in: ["PENDING", "CONFIRMED", "RESCHEDULED"],
                  },
                },
              });

              if (bookedCount < maxCapacity) {
                return {
                  date: dateStr,
                  available: true,
                  capacity: maxCapacity,
                  booked: bookedCount,
                  dayOfWeek:
                    dayOfWeek === 1
                      ? "MONDAY"
                      : dayOfWeek === 2
                        ? "TUESDAY"
                        : "THURSDAY",
                  shift: dayOfWeek === 4 ? "MORNING" : "AFTERNOON",
                };
              }
            }
          }

          // Se não encontrar nenhuma data disponível
          return {
            date: null,
            available: false,
            reason: "Nenhuma data disponível encontrada nos próximos 30 dias",
          };
        },
        { operation: "find_next_available_date" },
      ),
    ),

  // Buscar todas as configurações de capacidade
  getCapacityConfigs: protectedProcedure.query(
    withErrorHandling(
      async ({ ctx }) => {
        const configs = await ctx.db.injectionDayCapacity.findMany({
          orderBy: [{ dayOfWeek: "asc" }, { shift: "asc" }],
        });

        return configs;
      },
      { operation: "get_capacity_configs" },
    ),
  ),

  // Criar ou atualizar configuração de capacidade
  upsertCapacityConfig: protectedProcedure
    .input(
      z.object({
        id: z.string().optional(), // opcional para criação
        dayOfWeek: z.enum(["MONDAY", "TUESDAY", "THURSDAY"]),
        shift: z.enum(["MORNING", "AFTERNOON"]),
        capacity: z.number().min(1).max(100),
        overbook: z.number().min(0).max(10),
      }),
    )
    .mutation(
      withErrorHandling(
        async ({ input, ctx }) => {
          if (input.id) {
            // Atualizar configuração existente
            const updated = await ctx.db.injectionDayCapacity.update({
              where: { id: input.id },
              data: {
                dayOfWeek: input.dayOfWeek,
                shift: input.shift,
                capacity: input.capacity,
                overbook: input.overbook,
              },
            });
            return updated;
          } else {
            // Criar nova configuração
            const created = await ctx.db.injectionDayCapacity.create({
              data: {
                dayOfWeek: input.dayOfWeek,
                shift: input.shift,
                capacity: input.capacity,
                overbook: input.overbook,
              },
            });
            return created;
          }
        },
        { operation: "upsert_capacity_config" },
      ),
    ),

  // Deletar configuração de capacidade
  deleteCapacityConfig: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .mutation(
      withErrorHandling(
        async ({ input, ctx }) => {
          const deleted = await ctx.db.injectionDayCapacity.delete({
            where: { id: input.id },
          });
          return deleted;
        },
        { operation: "delete_capacity_config" },
      ),
    ),
});
