import { createTRPCRouter, protectedProcedure } from "../trpc";

import { z } from "zod";

const medicationInput = z.object({
  name: z.string().min(1),
  category: z.string().min(1),
  unit: z.string().min(1),
  instructions: z.array(z.string().min(1)),
  specialControl: z.boolean(),
  external: z.boolean(),
});

export const medicationRouter = createTRPCRouter({
  getAll: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.db.medication.findMany({
      orderBy: { name: "asc" },
    });
  }),

  create: protectedProcedure
    .input(medicationInput)
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.medication.create({ data: input });
    }),

  update: protectedProcedure
    .input(
      medicationInput.extend({
        id: z.string().cuid(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { id, ...data } = input;
      return await ctx.db.medication.update({
        where: { id },
        data,
      });
    }),

  delete: protectedProcedure
    .input(z.string().cuid())
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.medication.delete({
        where: { id: input },
      });
    }),
});
