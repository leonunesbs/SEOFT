import { createCallerFactory, createTRPCRouter } from "../../server/api/trpc";

import { appointmentRouter } from "./routers/appointment";
import { clinicRouter } from "./routers/clinic";
import { evaluationRouter } from "./routers/evaluation";
import { indicationRouter } from "./routers/indication";
import { medicationRouter } from "./routers/medication";
import { patientRouter } from "./routers/patient";
import { prescriptionRouter } from "./routers/prescription";
import { refractionRouter } from "./routers/refraction";
import { residentRouter } from "./routers/resident";
import { scheduleRouter } from "./routers/schedule";
import { staffRouter } from "./routers/staff";
import { surgeryRouter } from "./routers/surgery";
import { userRouter } from "./routers/users";
import { utilsRouter } from "./routers/utils";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  appointment: appointmentRouter,
  staff: staffRouter,
  medication: medicationRouter,
  patient: patientRouter,
  prescription: prescriptionRouter,
  clinic: clinicRouter,
  evaluation: evaluationRouter,
  indication: indicationRouter,
  schedule: scheduleRouter,
  utils: utilsRouter,
  user: userRouter,
  refraction: refractionRouter,
  resident: residentRouter,
  surgery: surgeryRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter);
