import { createTRPCRouter, protectedProcedure } from "../trpc";

import { withErrorHandling } from "~/lib/errors";
import { z } from "zod";

export const appointmentRouter = createTRPCRouter({
  // Buscar agendamentos por data
  getByDate: protectedProcedure
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
            return [];
          }

          // Criar datas UTC para busca
          const startOfDay = new Date(
            Date.UTC(year, month - 1, day, 0, 0, 0, 0),
          );
          const endOfDay = new Date(
            Date.UTC(year, month - 1, day, 23, 59, 59, 999),
          );

          const appointments = await ctx.db.intravitrealInjection.findMany({
            where: {
              scheduledDate: {
                gte: startOfDay,
                lte: endOfDay,
              },
            },
            include: {
              indication: {
                include: {
                  patient: true,
                  collaborator: true,
                },
              },
            },
            orderBy: {
              scheduledDate: "asc",
            },
          });

          return appointments.map((appointment) => ({
            id: appointment.id,
            patientName:
              appointment.indication?.patient?.name ||
              "Paciente não encontrado",
            patientId: appointment.indication?.patient?.refId || "N/A",
            patientPhone: "", // Campo não existe no schema
            date: appointment.scheduledDate?.toISOString().split("T")[0] || "",
            time: appointment.scheduledDate
              ? appointment.scheduledDate
                  .toTimeString()
                  .split(" ")[0]!
                  .substring(0, 5)
              : "",
            duration: 30, // Duração padrão em minutos
            doctor:
              appointment.indication?.collaborator?.name ||
              "Médico não encontrado",
            room: "Sala 1", // Valor padrão
            status: appointment.status.toLowerCase() as
              | "pending"
              | "rescheduled"
              | "confirmed"
              | "completed",
            medication: appointment.indication?.medication || "AntiVEGF",
            priority: "medium" as "low" | "medium" | "high",
            notes: "", // Campo não existe no schema
            eye: appointment.eye === "OE" ? "OS" : ("OD" as "OD" | "OS"),
            doseNumber: 1, // Campo não existe no schema, usando valor padrão
          }));
        },
        { operation: "get_appointments_by_date" },
      ),
    ),

  // Atualizar agendamento
  update: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        status: z
          .enum(["PENDING", "RESCHEDULED", "CONFIRMED", "COMPLETED"])
          .optional(),
        scheduledDate: z.date().optional(),
      }),
    )
    .mutation(
      withErrorHandling(
        async ({ input, ctx }) => {
          const { id, ...updateData } = input;

          const appointment = await ctx.db.intravitrealInjection.update({
            where: { id },
            data: updateData,
            include: {
              indication: {
                include: {
                  patient: true,
                  collaborator: true,
                },
              },
            },
          });

          return appointment;
        },
        { operation: "update_appointment" },
      ),
    ),

  // Deletar agendamento
  delete: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .mutation(
      withErrorHandling(
        async ({ input, ctx }) => {
          const appointment = await ctx.db.intravitrealInjection.delete({
            where: { id: input.id },
            include: {
              indication: {
                include: {
                  patient: true,
                  collaborator: true,
                },
              },
            },
          });

          return appointment;
        },
        { operation: "delete_appointment" },
      ),
    ),

  // Criar novo agendamento
  create: protectedProcedure
    .input(
      z.object({
        indicationId: z.string(),
        scheduledDate: z.date(),
        eye: z.enum(["OD", "OE"]),
        status: z
          .enum(["PENDING", "RESCHEDULED", "CONFIRMED", "COMPLETED"])
          .default("PENDING"),
      }),
    )
    .mutation(
      withErrorHandling(
        async ({ input, ctx }) => {
          const appointment = await ctx.db.intravitrealInjection.create({
            data: {
              indicationId: input.indicationId,
              scheduledDate: input.scheduledDate,
              eye: input.eye,
              status: input.status,
            },
            include: {
              indication: {
                include: {
                  patient: true,
                  collaborator: true,
                },
              },
            },
          });

          return appointment;
        },
        { operation: "create_appointment" },
      ),
    ),
});
