import { createTRPCRouter, protectedProcedure } from "../trpc";

import { type EyeLogType } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

const evaluationSchema = z.object({
  id: z.string().optional(),
  patientId: z.string({ message: "O ID do paciente deve ser um CUID válido." }),
  collaboratorId: z.string({
    message: "O ID do médico deve ser um CUID válido.",
  }),
  clinicId: z
    .string({ message: "O ID do ambulatório deve ser um UUID válido." })
    .optional(),
  rightEyeId: z.string().optional(),
  leftEyeId: z.string().optional(),
  clinicalData: z.string().max(5000).optional(),
  continuousData: z.string().max(5000).optional(),
  biomicroscopyOD: z.string().optional(),
  biomicroscopyOS: z.string().optional(),
  fundoscopyOD: z.string().optional(),
  fundoscopyOS: z.string().optional(),
  gonioscopyOD: z.string().optional(),
  gonioscopyOS: z.string().optional(),
  retinographyOD: z.string().optional(),
  retinographyOS: z.string().optional(),
  tcCorneaOD: z.string().optional(),
  tcCorneaOS: z.string().optional(),
  opticalBiometryOD: z.string().optional(),
  opticalBiometryOS: z.string().optional(),
  specularMicroscopyOD: z.string().optional(),
  specularMicroscopyOS: z.string().optional(),
  octOD: z.string().optional(),
  octOS: z.string().optional(),
  angiographyOD: z.string().optional(),
  angiographyOS: z.string().optional(),
  visualFieldOD: z.string().optional(),
  visualFieldOS: z.string().optional(),
  tonometryOD: z.string().optional(),
  tonometryOS: z.string().optional(),
  pachymetryOD: z.string().optional(),
  pachymetryOS: z.string().optional(),
  diagnosis: z.string().optional(),
  treatment: z.string().optional(),
  followUp: z.string().optional(),
  nextAppointment: z.string().optional(),
  date: z.string().optional(),
  procedure: z.string().optional(),
  notes: z.string().optional(),
  done: z.boolean().optional(),
});

export const evaluationRouter = createTRPCRouter({
  create: protectedProcedure
    .input(evaluationSchema)
    .mutation(async ({ input, ctx }) => {
      try {
        const existingEvaluation = await ctx.db.evaluation.findFirst({
          where: {
            patientId: input.patientId,
            collaboratorId: input.collaboratorId,
            done: false,
          },
        });

        if (existingEvaluation) {
          return existingEvaluation;
        }

        const newEvaluation = await ctx.db.evaluation.create({
          data: {
            patientId: input.patientId,
            collaboratorId: input.collaboratorId,
            eyes: {
              create: {
                leftEye: {
                  create: {},
                },
                rightEye: {
                  create: {},
                },
              },
            },
          },
        });

        return newEvaluation;
      } catch (error) {
        // Se já é um TRPCError, re-throw para preservar a mensagem original
        if (error instanceof TRPCError) {
          throw error;
        }

        console.error("Erro ao criar avaliação:", error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Erro ao criar a avaliação. Tente novamente.",
        });
      }
    }),
  update: protectedProcedure
    .input(evaluationSchema)
    .mutation(async ({ input, ctx }) => {
      // Função para criar os logs filtrados
      const createLogs = (
        eyeId: string,
        logs: { type: EyeLogType; details: string | undefined | null }[],
      ) =>
        logs
          .filter((log) => log.details !== undefined) // Inclui apenas logs com valores definidos
          .map((log) => ({
            where: { type_eyeId: { type: log.type, eyeId } }, // Adiciona compatibilidade com `EyeLogType`
            create: { type: log.type, details: log.details ?? null }, // Substitui `undefined` por `null`
            update: { details: log.details ?? null },
          }));
      const leftEyeLogs = createLogs(input.leftEyeId!, [
        { type: "BIOMICROSCOPY", details: input.biomicroscopyOS },
        { type: "FUNDOSCOPY", details: input.fundoscopyOS },
        { type: "TONOMETRY", details: input.tonometryOS },
        { type: "GONIOSCOPY", details: input.gonioscopyOS },
        { type: "RETINOGRAPHY", details: input.retinographyOS },
        { type: "CT_CORNEA", details: input.tcCorneaOS },
        { type: "OCT", details: input.octOS },
        { type: "ANGIOGRAPHY", details: input.angiographyOS },
        { type: "VISUAL_FIELD", details: input.visualFieldOS },
        { type: "PACHYMETRY", details: input.pachymetryOS },
        { type: "OPTICAL_BIOMETRY", details: input.opticalBiometryOS },
        { type: "SPECULAR_MICROSCOPY", details: input.specularMicroscopyOS },
      ]);

      // Logs para o olho direito
      const rightEyeLogs = createLogs(input.rightEyeId!, [
        { type: "BIOMICROSCOPY", details: input.biomicroscopyOD },
        { type: "FUNDOSCOPY", details: input.fundoscopyOD },
        { type: "TONOMETRY", details: input.tonometryOD },
        { type: "GONIOSCOPY", details: input.gonioscopyOD },
        { type: "RETINOGRAPHY", details: input.retinographyOD },
        { type: "CT_CORNEA", details: input.tcCorneaOD },
        { type: "OCT", details: input.octOD },
        { type: "ANGIOGRAPHY", details: input.angiographyOD },
        { type: "VISUAL_FIELD", details: input.visualFieldOD },
        { type: "PACHYMETRY", details: input.pachymetryOD },
        { type: "OPTICAL_BIOMETRY", details: input.opticalBiometryOD },
        { type: "SPECULAR_MICROSCOPY", details: input.specularMicroscopyOD },
      ]);
      return await ctx.db.evaluation.update({
        where: { id: input.id },
        data: {
          patientId: input.patientId,
          collaboratorId: input.collaboratorId,
          clinicId: input.clinicId ?? undefined,
          clinicalData: input.clinicalData,
          continuousData: input.continuousData,
          diagnosis: input.diagnosis,
          treatment: input.treatment,
          followUp: input.followUp,
          done: input.done,
          nextAppointment: input.nextAppointment!,
          eyes: {
            update: {
              leftEye: {
                update: {
                  logs: {
                    upsert: leftEyeLogs,
                  },
                },
              },
              rightEye: {
                update: {
                  logs: {
                    upsert: rightEyeLogs,
                  },
                },
              },
            },
          },
        },
      });
    }),
  delete: protectedProcedure
    .input(z.string())
    .mutation(async ({ input, ctx }) => {
      return await ctx.db.evaluation.delete({
        where: { id: input },
      });
    }),
  pendingEvaluations: protectedProcedure
    .input(z.string().optional())
    .query(async ({ input, ctx }) => {
      const collaboratorId = input;
      if (!collaboratorId) {
        return 0;
      }
      const evaluations = await ctx.db.evaluation.findMany({
        where: {
          collaboratorId: collaboratorId ?? undefined,
          done: false,
        },
      });

      return evaluations.length;
    }),
});
