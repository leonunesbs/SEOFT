import { createTRPCRouter, protectedProcedure } from "../trpc";

import { z } from "zod";

// Schema de input para PrescriptionItem, incluindo o campo "quantity"
const prescriptionInputSchema = z
  .object({
    evaluationId: z.string().nonempty("ID da avaliação é obrigatório"),
    eye: z.enum(["OD", "OE", "AO"]).optional(),
    medicationId: z.string().nonempty("Selecione uma medicação"),
    selectedMedicationInstruction: z.string().optional(),
    customInstruction: z.string().optional(),
    quantity: z.number().optional(),
  })
  .refine(
    (data) => {
      const standard = data.selectedMedicationInstruction?.trim() || "";
      const custom = data.customInstruction?.trim() || "";
      console.log(standard);
      return standard !== "" || custom !== "";
    },
    {
      message:
        "Selecione uma instrução padrão ou insira uma instrução personalizada",
    },
  );

export const prescriptionRouter = createTRPCRouter({
  createOrUpdate: protectedProcedure
    .input(prescriptionInputSchema)
    .mutation(async ({ ctx, input }) => {
      const evaluationId = input.evaluationId;

      // Busca uma prescrição ativa com base no evaluationId
      const existingPrescription = await ctx.db.prescription.findFirst({
        where: {
          evaluationId,
          // Adicione qualquer outro critério necessário (por exemplo, status: 'open')
        },
      });

      if (existingPrescription) {
        // Atualiza a prescrição existente adicionando um novo item
        const updatedPrescription = await ctx.db.prescription.update({
          where: { id: existingPrescription.id },
          data: {
            prescriptionItems: {
              create: {
                medicationId: input.medicationId,
                eye: input.eye || null,
                selectedMedicationInstruction:
                  input.selectedMedicationInstruction || null,
                customInstruction: input.customInstruction || null,
                quantity: input.quantity,
              },
            },
          },
          include: { prescriptionItems: true },
        });
        return updatedPrescription;
      } else {
        // Cria uma nova prescrição para o usuário com um único PrescriptionItem
        const newPrescription = await ctx.db.prescription.create({
          data: {
            evaluation: {
              connect: {
                id: evaluationId,
              },
            },
            // Outros campos da prescrição, se houver
            prescriptionItems: {
              create: {
                medicationId: input.medicationId,
                eye: input.eye || null,
                selectedMedicationInstruction:
                  input.selectedMedicationInstruction || null,
                customInstruction: input.customInstruction || null,
                quantity: input.quantity,
              },
            },
          },
          include: { prescriptionItems: true },
        });
        return newPrescription;
      }
    }),
  getFirstPrescription: protectedProcedure
    .input(z.string())
    .query(async ({ ctx, input }) => {
      const prescription = await ctx.db.prescription.findFirst({
        where: {
          evaluationId: input,
        },
        include: {
          prescriptionItems: {
            include: {
              medication: true,
            },
          },
        },
      });

      return prescription;
    }),
  deletePrescriptionItem: protectedProcedure
    .input(z.string())
    .mutation(async ({ ctx, input }) => {
      const prescriptionItem = await ctx.db.prescriptionItem.delete({
        where: {
          id: input,
        },
      });

      return prescriptionItem;
    }),
});
