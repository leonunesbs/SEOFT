import { createTRPCRouter, protectedProcedure } from "../trpc";

import { Prisma } from "@prisma/client";
import { z } from "zod";

export const appointmentRouter = createTRPCRouter({
  // Buscar todos os agendamentos
  getAll: protectedProcedure
    .input(
      z.object({
        limit: z.number().min(1).max(100).default(10),
        cursor: z.string().nullish(),
        status: z
          .enum(["SCHEDULED", "CONFIRMED", "COMPLETED", "CANCELLED", "NO_SHOW"])
          .optional(),
        collaboratorId: z.string().optional(),
        startDate: z.date().optional(),
        endDate: z.date().optional(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const { limit, cursor, status, collaboratorId, startDate, endDate } =
        input;

      const where: Prisma.AppointmentWhereInput = {};

      if (status) {
        where.status = status;
      }

      if (collaboratorId) {
        where.collaboratorId = collaboratorId;
      }

      if (startDate || endDate) {
        where.scheduledDate = {};
        if (startDate) {
          where.scheduledDate.gte = startDate;
        }
        if (endDate) {
          where.scheduledDate.lte = endDate;
        }
      }

      const items = await ctx.db.appointment.findMany({
        take: limit + 1,
        cursor: cursor ? { id: cursor } : undefined,
        orderBy: {
          scheduledDate: "asc",
        },
        where,
        include: {
          patient: {
            select: {
              name: true,
              refId: true,
            },
          },
          collaborator: {
            select: {
              name: true,
            },
          },
          clinic: {
            select: {
              name: true,
            },
          },
        },
      });

      let nextCursor: typeof cursor | undefined = undefined;
      if (items.length > limit) {
        const nextItem = items.pop();
        nextCursor = nextItem!.id;
      }

      return {
        items,
        nextCursor,
      };
    }),

  // Buscar agendamentos de hoje
  getToday: protectedProcedure
    .input(
      z.object({
        collaboratorId: z.string().optional(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const { collaboratorId } = input;

      const today = new Date();
      const startOfDay = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate(),
      );
      const endOfDay = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate(),
        23,
        59,
        59,
        999,
      );

      const where: any = {
        scheduledDate: {
          gte: startOfDay,
          lte: endOfDay,
        },
        status: {
          in: ["SCHEDULED", "CONFIRMED"],
        },
      };

      if (collaboratorId) {
        where.collaboratorId = collaboratorId;
      }

      return await ctx.db.appointment.findMany({
        where,
        include: {
          patient: {
            select: {
              name: true,
              refId: true,
            },
          },
          collaborator: {
            select: {
              name: true,
            },
          },
          clinic: {
            select: {
              name: true,
            },
          },
        },
        orderBy: {
          scheduledDate: "asc",
        },
      });
    }),

  // Buscar agendamentos futuros
  getUpcoming: protectedProcedure
    .input(
      z.object({
        limit: z.number().min(1).max(100).default(10),
        collaboratorId: z.string().optional(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const { limit, collaboratorId } = input;

      const where: any = {
        scheduledDate: {
          gte: new Date(),
        },
        status: {
          in: ["SCHEDULED", "CONFIRMED"],
        },
      };

      if (collaboratorId) {
        where.collaboratorId = collaboratorId;
      }

      return await ctx.db.appointment.findMany({
        take: limit,
        where,
        include: {
          patient: {
            select: {
              name: true,
              refId: true,
            },
          },
          collaborator: {
            select: {
              name: true,
            },
          },
          clinic: {
            select: {
              name: true,
            },
          },
        },
        orderBy: {
          scheduledDate: "asc",
        },
      });
    }),

  // Buscar agendamento por ID
  getById: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      return await ctx.db.appointment.findUnique({
        where: { id: input.id },
        include: {
          patient: {
            select: {
              name: true,
              refId: true,
              birthDate: true,
            },
          },
          collaborator: {
            select: {
              name: true,
              crm: true,
            },
          },
          clinic: {
            select: {
              name: true,
            },
          },
          evaluation: {
            select: {
              id: true,
              done: true,
              diagnosis: true,
              treatment: true,
              returnNotes: true,
            },
          },
        },
      });
    }),

  // Criar novo agendamento
  create: protectedProcedure
    .input(
      z.object({
        patientId: z.string(),
        collaboratorId: z.string(),
        clinicId: z.string().optional(),
        evaluationId: z.string().optional(),
        scheduledDate: z.date(),
        notes: z.string().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      // Verificar se já existe um agendamento para o mesmo paciente na mesma data
      const existingAppointment = await ctx.db.appointment.findFirst({
        where: {
          patientId: input.patientId,
          scheduledDate: input.scheduledDate,
          status: {
            in: ["SCHEDULED", "CONFIRMED"],
          },
        },
      });

      if (existingAppointment) {
        throw new Error(
          "Este paciente já possui um agendamento para esta data e horário. Um paciente não pode ter múltiplos agendamentos para a mesma data e turno.",
        );
      }

      return await ctx.db.appointment.create({
        data: {
          patientId: input.patientId,
          collaboratorId: input.collaboratorId,
          clinicId: input.clinicId,
          evaluationId: input.evaluationId,
          scheduledDate: input.scheduledDate,
          notes: input.notes,
        },
        include: {
          patient: {
            select: {
              name: true,
              refId: true,
            },
          },
          collaborator: {
            select: {
              name: true,
            },
          },
          clinic: {
            select: {
              name: true,
            },
          },
        },
      });
    }),

  // Atualizar agendamento
  update: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        patientId: z.string().optional(),
        collaboratorId: z.string().optional(),
        clinicId: z.string().optional(),
        evaluationId: z.string().optional(),
        scheduledDate: z.date().optional(),
        status: z
          .enum(["SCHEDULED", "CONFIRMED", "COMPLETED", "CANCELLED", "NO_SHOW"])
          .optional(),
        notes: z.string().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { id, ...data } = input;

      // Se a data está sendo alterada, verificar se não há conflito
      if (data.scheduledDate) {
        const existingAppointment = await ctx.db.appointment.findFirst({
          where: {
            id: { not: id }, // Excluir o agendamento atual da verificação
            patientId:
              data.patientId ||
              (await ctx.db.appointment.findUnique({ where: { id } }))
                ?.patientId,
            scheduledDate: data.scheduledDate,
            status: {
              in: ["SCHEDULED", "CONFIRMED"],
            },
          },
        });

        if (existingAppointment) {
          throw new Error(
            "Este paciente já possui um agendamento para esta data e horário. Um paciente não pode ter múltiplos agendamentos para a mesma data e turno.",
          );
        }
      }

      return await ctx.db.appointment.update({
        where: { id },
        data,
        include: {
          patient: {
            select: {
              name: true,
              refId: true,
            },
          },
          collaborator: {
            select: {
              name: true,
            },
          },
          clinic: {
            select: {
              name: true,
            },
          },
        },
      });
    }),

  // Deletar agendamento
  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.appointment.delete({
        where: { id: input.id },
      });
    }),

  // Atualizar status do agendamento
  updateStatus: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        status: z.enum([
          "SCHEDULED",
          "CONFIRMED",
          "COMPLETED",
          "CANCELLED",
          "NO_SHOW",
        ]),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.appointment.update({
        where: { id: input.id },
        data: { status: input.status },
        include: {
          patient: {
            select: {
              name: true,
              refId: true,
            },
          },
          collaborator: {
            select: {
              name: true,
            },
          },
          clinic: {
            select: {
              name: true,
            },
          },
        },
      });
    }),

  // Buscar estatísticas
  getStats: protectedProcedure
    .input(
      z.object({
        collaboratorId: z.string().optional(),
        startDate: z.date().optional(),
        endDate: z.date().optional(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const { collaboratorId, startDate, endDate } = input;

      const where: any = {};

      if (collaboratorId) {
        where.collaboratorId = collaboratorId;
      }

      if (startDate || endDate) {
        where.scheduledDate = {};
        if (startDate) {
          where.scheduledDate.gte = startDate;
        }
        if (endDate) {
          where.scheduledDate.lte = endDate;
        }
      }

      const [total, scheduled, confirmed, completed, cancelled, noShow] =
        await Promise.all([
          ctx.db.appointment.count({ where }),
          ctx.db.appointment.count({
            where: { ...where, status: "SCHEDULED" },
          }),
          ctx.db.appointment.count({
            where: { ...where, status: "CONFIRMED" },
          }),
          ctx.db.appointment.count({
            where: { ...where, status: "COMPLETED" },
          }),
          ctx.db.appointment.count({
            where: { ...where, status: "CANCELLED" },
          }),
          ctx.db.appointment.count({ where: { ...where, status: "NO_SHOW" } }),
        ]);

      return {
        total,
        scheduled,
        confirmed,
        completed,
        cancelled,
        noShow,
      };
    }),

  // Buscar contagem de agendamentos por data
  getCountByDate: protectedProcedure
    .input(
      z.object({
        date: z.date(),
        collaboratorId: z.string().optional(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const { date, collaboratorId } = input;

      // Criar range para o dia inteiro
      const startOfDay = new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate(),
      );
      const endOfDay = new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate(),
        23,
        59,
        59,
        999,
      );

      const where: any = {
        scheduledDate: {
          gte: startOfDay,
          lte: endOfDay,
        },
        status: {
          in: ["SCHEDULED", "CONFIRMED"],
        },
      };

      if (collaboratorId) {
        where.collaboratorId = collaboratorId;
      }

      const count = await ctx.db.appointment.count({ where });

      return {
        date: startOfDay,
        count,
      };
    }),

  // Verificar se paciente já tem agendamento em uma data específica
  checkPatientAvailability: protectedProcedure
    .input(
      z.object({
        patientId: z.string(),
        scheduledDate: z.date(),
        excludeAppointmentId: z.string().optional(), // Para excluir o agendamento atual em caso de edição
      }),
    )
    .query(async ({ ctx, input }) => {
      const { patientId, scheduledDate, excludeAppointmentId } = input;

      const where: any = {
        patientId,
        scheduledDate,
        status: {
          in: ["SCHEDULED", "CONFIRMED"],
        },
      };

      // Se estamos editando um agendamento, excluir ele da verificação
      if (excludeAppointmentId) {
        where.id = { not: excludeAppointmentId };
      }

      const existingAppointment = await ctx.db.appointment.findFirst({
        where,
        include: {
          patient: {
            select: {
              name: true,
              refId: true,
            },
          },
          collaborator: {
            select: {
              name: true,
            },
          },
          clinic: {
            select: {
              name: true,
            },
          },
        },
      });

      return {
        isAvailable: !existingAppointment,
        existingAppointment: existingAppointment || null,
      };
    }),

  // Buscar ocupação por período (para calendário)
  getOccupancyByPeriod: protectedProcedure
    .input(
      z.object({
        startDate: z.date(),
        endDate: z.date(),
        collaboratorId: z.string().optional(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const { startDate, endDate, collaboratorId } = input;

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

      const appointments = await ctx.db.appointment.findMany({
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
    }),

  // Buscar agendamentos da próxima semana (otimizado para calendário)
  getWeekAppointments: protectedProcedure
    .input(
      z.object({
        collaboratorId: z.string().optional(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const { collaboratorId } = input;

      // Buscar agendamentos da próxima semana
      const startOfWeek = new Date();
      const endOfWeek = new Date();
      endOfWeek.setDate(endOfWeek.getDate() + 7);

      const where: Prisma.AppointmentWhereInput = {
        scheduledDate: {
          gte: startOfWeek,
          lte: endOfWeek,
        },
        status: {
          in: ["SCHEDULED", "CONFIRMED", "COMPLETED", "CANCELLED", "NO_SHOW"],
        },
      };

      if (collaboratorId) {
        where.collaboratorId = collaboratorId;
      }

      return await ctx.db.appointment.findMany({
        where,
        include: {
          patient: {
            select: {
              name: true,
              refId: true,
            },
          },
          collaborator: {
            select: {
              name: true,
            },
          },
          clinic: {
            select: {
              name: true,
            },
          },
        },
        orderBy: {
          scheduledDate: "asc",
        },
      });
    }),
});
