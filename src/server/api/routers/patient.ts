import {
  createConflictError,
  createNotFoundError,
  createValidationError,
  withErrorHandling,
} from "~/lib/errors";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

import { z } from "zod";

export const patientRouter = createTRPCRouter({
  list: protectedProcedure.query(
    withErrorHandling(
      async ({ ctx }) => {
        const patients = await ctx.db.patient.findMany({
          take: 10,
          orderBy: { name: "asc" },
        });

        return patients.map((patient) => ({
          refId: patient.refId,
          name: patient.name,
          birthDate: new Date(patient.birthDate).toISOString(),
        }));
      },
      { operation: "list_patients" },
    ),
  ),

  create: protectedProcedure
    .input(
      z.object({
        refId: z.string().min(1, "Número de prontuário é obrigatório"),
        name: z.string().min(1, "Nome é obrigatório"),
        birthDate: z.string().min(1, "Data de nascimento é obrigatória"),
      }),
    )
    .mutation(
      withErrorHandling(
        async ({ input, ctx }) => {
          // Verifica se o paciente já existe
          const existingPatient = await ctx.db.patient.findUnique({
            where: { refId: input.refId },
          });

          if (existingPatient) {
            throw createConflictError(
              "Paciente",
              `já existe com o número de prontuário ${input.refId}`,
            );
          }

          // Valida a data de nascimento
          const birthDate = new Date(input.birthDate);
          if (isNaN(birthDate.getTime())) {
            throw createValidationError(
              "Data de nascimento inválida",
              "birthDate",
            );
          }

          // Verifica se a data não é no futuro
          if (birthDate > new Date()) {
            throw createValidationError(
              "Data de nascimento não pode ser no futuro",
              "birthDate",
            );
          }

          const newPatient = await ctx.db.patient.create({
            data: {
              refId: input.refId,
              name: input.name,
              birthDate: birthDate.toISOString(),
            },
          });

          return {
            id: newPatient.id,
            refId: newPatient.refId,
            name: newPatient.name,
            birthDate: newPatient.birthDate.toISOString(),
          };
        },
        { operation: "create_patient" },
      ),
    ),

  get: protectedProcedure
    .input(
      z.object({
        refId: z.string().min(1, "Número de prontuário é obrigatório"),
      }),
    )
    .query(
      withErrorHandling(
        async ({ input, ctx }) => {
          const patient = await ctx.db.patient.findUnique({
            where: { refId: input.refId },
          });

          if (!patient) {
            throw createNotFoundError("Paciente", input.refId);
          }

          return {
            refId: patient.refId,
            name: patient.name,
            birthDate: patient.birthDate.toISOString(),
          };
        },
        { operation: "get_patient" },
      ),
    ),

  search: protectedProcedure.input(z.string().optional()).query(
    withErrorHandling(
      async ({ input, ctx }) => {
        if (!input || input.trim().length === 0) {
          // Se não há termo de busca, retorna lista limitada
          const patients = await ctx.db.patient.findMany({
            take: 10,
            orderBy: { name: "asc" },
          });

          return patients.map((patient) => ({
            id: patient.id,
            refId: patient.refId,
            name: patient.name,
            birthDate: patient.birthDate.toISOString(),
          }));
        }

        const patients = await ctx.db.patient.findMany({
          where: {
            OR: [
              {
                name: {
                  contains: input,
                  mode: "insensitive",
                },
              },
              {
                refId: {
                  contains: input,
                  mode: "insensitive",
                },
              },
            ],
          },
          take: 10,
          orderBy: { name: "asc" },
        });

        return patients.map((patient) => ({
          id: patient.id,
          refId: patient.refId,
          name: patient.name,
          birthDate: patient.birthDate.toISOString(),
        }));
      },
      { operation: "search_patients" },
    ),
  ),

  update: protectedProcedure
    .input(
      z.object({
        id: z.string().min(1, "ID do paciente é obrigatório"),
        refId: z.string().min(1, "Número de prontuário é obrigatório"),
        name: z.string().min(1, "Nome é obrigatório"),
        birthDate: z.string().min(1, "Data de nascimento é obrigatória"),
      }),
    )
    .mutation(
      withErrorHandling(
        async ({ input, ctx }) => {
          // Verifica se o paciente existe
          const existingPatient = await ctx.db.patient.findUnique({
            where: { id: input.id },
          });

          if (!existingPatient) {
            throw createNotFoundError("Paciente", input.id);
          }

          // Valida a data de nascimento
          const birthDate = new Date(input.birthDate);
          if (isNaN(birthDate.getTime())) {
            throw createValidationError(
              "Data de nascimento inválida",
              "birthDate",
            );
          }

          // Verifica se a data não é no futuro
          if (birthDate > new Date()) {
            throw createValidationError(
              "Data de nascimento não pode ser no futuro",
              "birthDate",
            );
          }

          const patient = await ctx.db.patient.update({
            where: { id: input.id },
            data: {
              name: input.name,
              birthDate: birthDate,
            },
          });

          return {
            refId: patient.refId,
            name: patient.name,
            birthDate: patient.birthDate.toISOString(),
          };
        },
        { operation: "update_patient" },
      ),
    ),

  delete: protectedProcedure
    .input(z.string().min(1, "ID do paciente é obrigatório"))
    .mutation(
      withErrorHandling(
        async ({ input, ctx }) => {
          // Verifica se o paciente existe
          const existingPatient = await ctx.db.patient.findUnique({
            where: { id: input },
            include: {
              evaluations: {
                take: 1,
              },
            },
          });

          if (!existingPatient) {
            throw createNotFoundError("Paciente", input);
          }

          // Verifica se o paciente tem avaliações
          if (existingPatient.evaluations.length > 0) {
            throw createValidationError(
              "Não é possível excluir um paciente que possui avaliações registradas",
              "patient_has_evaluations",
            );
          }

          const patient = await ctx.db.patient.delete({
            where: { id: input },
          });

          return {
            refId: patient.refId,
            name: patient.name,
            birthDate: patient.birthDate.toISOString(),
          };
        },
        { operation: "delete_patient" },
      ),
    ),

  getEvaluationHistory: protectedProcedure
    .input(z.string().min(1, "ID do paciente é obrigatório"))
    .mutation(
      withErrorHandling(
        async ({ input, ctx }) => {
          // Verifica se o paciente existe
          const existingPatient = await ctx.db.patient.findUnique({
            where: { id: input },
          });

          if (!existingPatient) {
            throw createNotFoundError("Paciente", input);
          }

          return await ctx.db.patient.findUnique({
            where: { id: input },
            include: {
              evaluations: {
                where: { done: true },
                orderBy: { createdAt: "desc" },
                include: {
                  clinic: true,
                  collaborator: true,
                  prescriptions: {
                    include: {
                      prescriptionItems: {
                        include: {
                          medication: true,
                        },
                      },
                    },
                  },
                  eyes: {
                    include: {
                      leftEye: {
                        include: {
                          refraction: { orderBy: { recordedAt: "desc" } },
                          surgeries: { orderBy: { date: "desc" } },
                          logs: true,
                        },
                      },
                      rightEye: {
                        include: {
                          refraction: { orderBy: { recordedAt: "desc" } },
                          surgeries: { orderBy: { date: "desc" } },
                          logs: true,
                        },
                      },
                    },
                  },
                },
              },
            },
          });
        },
        { operation: "get_patient_evaluation_history" },
      ),
    ),
});
