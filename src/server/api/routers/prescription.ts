import { createTRPCRouter, protectedProcedure } from "../trpc";

import { z } from "zod";

// Schema de input para PrescriptionItem.
// O campo "eye" é obrigatório aqui, pois ele é parte do item, e
// pelo menos uma instrução (padrão ou personalizada) deve ser fornecida.
const prescriptionInputSchema = z
  .object({
    evaluationId: z.string().nonempty("ID da avaliação é obrigatório"),
    eye: z.enum(["OD", "OE", "AO"], {
      errorMap: () => ({ message: "Selecione um olho para o item" }),
    }),
    medicationId: z.string().nonempty("Selecione uma medicação"),
    standardInstruction: z.string().optional(),
    customInstruction: z.string().optional(),
  })
  .refine(
    (data) => {
      const standard = data.standardInstruction?.trim() || "";
      const custom = data.customInstruction?.trim() || "";
      return standard !== "" || custom !== "";
    },
    {
      message:
        "Selecione uma instrução padrão ou insira uma instrução personalizada",
    },
  );

export const prescriptionRouter = createTRPCRouter({
  // Procedure getOrCreate: se já existir uma prescrição ativa para o usuário,
  // adiciona um novo PrescriptionItem com os dados enviados (incluindo "eye"). Caso contrário, cria uma nova prescrição.
  createOrUpdate: protectedProcedure
    .input(prescriptionInputSchema)
    .mutation(async ({ ctx, input }) => {
      const evaluationId = input.evaluationId;

      // Buscamos uma prescrição ativa do usuário.
      // Ajuste esse critério conforme a sua lógica de negócio (por exemplo, status = 'open').
      const existingPrescription = await ctx.db.prescription.findFirst({
        where: {
          evaluationId,
          // Exemplo: status: "open"
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
                eye: input.eye,
                selectedMedicationInstruction:
                  input.standardInstruction || null,
                customInstruction: input.customInstruction || null,
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
            // Outros campos da prescrição, se houver (por exemplo, data, status, etc.)
            prescriptionItems: {
              create: {
                medicationId: input.medicationId,
                eye: input.eye,
                selectedMedicationInstruction:
                  input.standardInstruction || null,
                customInstruction: input.customInstruction || null,
              },
            },
          },
          include: { prescriptionItems: true },
        });
        return newPrescription;
      }
    }),
});
