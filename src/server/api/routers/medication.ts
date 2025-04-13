import { createTRPCRouter, protectedProcedure } from "../trpc";

export const medicationRouter = createTRPCRouter({
  getAll: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.db.medication.findMany();
  }),
});
