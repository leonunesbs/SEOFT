import { createTRPCRouter, protectedProcedure } from "../trpc";

import { cookies } from "next/headers";
import { z } from "zod";

export const utilsRouter = createTRPCRouter({
  currentCollaborator: protectedProcedure.query(async ({}) => {
    const cookieStore = await cookies();
    const collaboratorId =
      cookieStore.get("selected-collaborator")?.value ?? null;
    return { collaboratorId };
  }),
  selectCollaborator: protectedProcedure
    .input(z.string())
    .mutation(async ({ input }) => {
      const cookieStore = await cookies();
      cookieStore.set("selected-collaborator", input, {
        maxAge: 60 * 60 * 24 * 30, // 30 dias
        path: "/",
      });
      return { collaboratorId: input };
    }),
});
