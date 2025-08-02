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
  // Exames não-imagem (biomicroscopia, fundoscopia, etc.)
  biomicroscopyOD: z.string().optional(),
  biomicroscopyOS: z.string().optional(),
  fundoscopyOD: z.string().optional(),
  fundoscopyOS: z.string().optional(),
  gonioscopyOD: z.string().optional(),
  gonioscopyOS: z.string().optional(),
  tonometryOD: z.string().optional(),
  tonometryOS: z.string().optional(),
  pachymetryOD: z.string().optional(),
  pachymetryOS: z.string().optional(),
  // Exames de imagem - arquivos
  octOD: z.string().optional(),
  octOS: z.string().optional(),
  angiographyOD: z.string().optional(),
  angiographyOS: z.string().optional(),
  visualFieldOD: z.string().optional(),
  visualFieldOS: z.string().optional(),
  retinographyOD: z.string().optional(),
  retinographyOS: z.string().optional(),
  ctCorneaOD: z.string().optional(),
  ctCorneaOS: z.string().optional(),
  // Exames de imagem - anotações
  octAnnotationOD: z.string().optional(),
  octAnnotationOS: z.string().optional(),
  visualFieldAnnotationOD: z.string().optional(),
  visualFieldAnnotationOS: z.string().optional(),
  angiographyAnnotationOD: z.string().optional(),
  angiographyAnnotationOS: z.string().optional(),
  retinographyAnnotationOD: z.string().optional(),
  retinographyAnnotationOS: z.string().optional(),
  ctCorneaAnnotationOD: z.string().optional(),
  ctCorneaAnnotationOS: z.string().optional(),
  // Exames não-imagem (biometria óptica, microscopia especular)
  opticalBiometryOD: z.string().optional(),
  opticalBiometryOS: z.string().optional(),
  specularMicroscopyOD: z.string().optional(),
  specularMicroscopyOS: z.string().optional(),
  diagnosis: z.string().optional(),
  treatment: z.string().optional(),
  followUp: z.string().optional(),
  nextAppointment: z.string().optional(),
  returnNotes: z.string().optional(),
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
        logs: {
          type: EyeLogType;
          details?: string | undefined | null;
          fileUrl?: string | undefined | null;
          annotation?: string | undefined | null;
        }[],
      ) =>
        logs
          .filter(
            (log) =>
              log.details !== undefined ||
              log.fileUrl !== undefined ||
              log.annotation !== undefined,
          ) // Inclui logs com qualquer valor definido
          .map((log) => ({
            where: { type_eyeId: { type: log.type, eyeId } },
            create: {
              type: log.type,
              details: log.details ?? null,
              fileUrl: log.fileUrl ?? null,
              annotation: log.annotation ?? null,
            },
            update: {
              details: log.details ?? null,
              fileUrl: log.fileUrl ?? null,
              annotation: log.annotation ?? null,
            },
          }));
      // Logs para o olho esquerdo
      const leftEyeLogs = createLogs(input.leftEyeId!, [
        // Exames não-imagem (usam details)
        { type: "BIOMICROSCOPY", details: input.biomicroscopyOS },
        { type: "FUNDOSCOPY", details: input.fundoscopyOS },
        { type: "TONOMETRY", details: input.tonometryOS },
        { type: "GONIOSCOPY", details: input.gonioscopyOS },
        { type: "PACHYMETRY", details: input.pachymetryOS },
        // Exames de imagem (usam fileUrl e annotation)
        {
          type: "RETINOGRAPHY",
          fileUrl: input.retinographyOS,
          annotation: input.retinographyAnnotationOS,
        },
        {
          type: "CT_CORNEA",
          fileUrl: input.ctCorneaOS,
          annotation: input.ctCorneaAnnotationOS,
        },
        {
          type: "OCT",
          fileUrl: input.octOS,
          annotation: input.octAnnotationOS,
        },
        {
          type: "ANGIOGRAPHY",
          fileUrl: input.angiographyOS,
          annotation: input.angiographyAnnotationOS,
        },
        {
          type: "VISUAL_FIELD",
          fileUrl: input.visualFieldOS,
          annotation: input.visualFieldAnnotationOS,
        },
      ]);

      // Logs para o olho direito
      const rightEyeLogs = createLogs(input.rightEyeId!, [
        // Exames não-imagem (usam details)
        { type: "BIOMICROSCOPY", details: input.biomicroscopyOD },
        { type: "FUNDOSCOPY", details: input.fundoscopyOD },
        { type: "TONOMETRY", details: input.tonometryOD },
        { type: "GONIOSCOPY", details: input.gonioscopyOD },
        { type: "PACHYMETRY", details: input.pachymetryOD },
        // Exames de imagem (usam fileUrl e annotation)
        {
          type: "RETINOGRAPHY",
          fileUrl: input.retinographyOD,
          annotation: input.retinographyAnnotationOD,
        },
        {
          type: "CT_CORNEA",
          fileUrl: input.ctCorneaOD,
          annotation: input.ctCorneaAnnotationOD,
        },
        {
          type: "OCT",
          fileUrl: input.octOD,
          annotation: input.octAnnotationOD,
        },
        {
          type: "ANGIOGRAPHY",
          fileUrl: input.angiographyOD,
          annotation: input.angiographyAnnotationOD,
        },
        {
          type: "VISUAL_FIELD",
          fileUrl: input.visualFieldOD,
          annotation: input.visualFieldAnnotationOD,
        },
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
          returnNotes: input.returnNotes,
          // Optical biometry (mantido no Evaluation)
          opticalBiometryOD: input.opticalBiometryOD,
          opticalBiometryOS: input.opticalBiometryOS,
          // Specular microscopy (mantido no Evaluation)
          specularMicroscopyOD: input.specularMicroscopyOD,
          specularMicroscopyOS: input.specularMicroscopyOS,
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
  getStats: protectedProcedure.query(async ({ ctx }) => {
    const now = new Date();
    const startOfWeek = new Date(now.setDate(now.getDate() - now.getDay()));
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);

    const [pending, thisWeek, thisMonth, activePatients] = await Promise.all([
      ctx.db.evaluation.count({
        where: { done: false },
      }),
      ctx.db.evaluation.count({
        where: {
          createdAt: {
            gte: startOfWeek,
          },
        },
      }),
      ctx.db.evaluation.count({
        where: {
          createdAt: {
            gte: startOfMonth,
          },
        },
      }),
      ctx.db.patient.count({
        where: {
          evaluations: {
            some: {
              createdAt: {
                gte: thirtyDaysAgo,
              },
            },
          },
        },
      }),
    ]);

    return {
      pending,
      thisWeek,
      thisMonth,
      activePatients,
    };
  }),
});
