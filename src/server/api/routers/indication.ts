import { createNotFoundError, withErrorHandling } from "~/lib/errors";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

import { formatDateForAPI } from "~/lib/utils";
import { z } from "zod";

export const indicationRouter = createTRPCRouter({
  // Query para buscar todas as indicações (debug)
  getAll: protectedProcedure.query(
    withErrorHandling(
      async ({ ctx }) => {
        const indications =
          await ctx.db.intravitrealInjectionIndication.findMany({
            include: {
              patient: true,
              collaborator: true,
              clinic: true,
              injections: {
                orderBy: {
                  scheduledDate: "asc",
                },
              },
            },
            orderBy: {
              createdAt: "desc",
            },
          });

        return indications;
      },
      { operation: "get_all_indications" },
    ),
  ),

  create: protectedProcedure
    .input(
      z.object({
        patientId: z.string().min(1, "ID do paciente é obrigatório"),
        responsibleDoctor: z
          .string()
          .min(1, "Médico responsável é obrigatório"),
        totalOD: z.number().min(0, "Total OD deve ser maior ou igual a 0"),
        totalOS: z.number().min(0, "Total OS deve ser maior ou igual a 0"),
        startEye: z.enum(["OD", "OE"], {
          required_error: "Olho de início é obrigatório",
        }),
        indication: z.string().optional(),
        medication: z.string().optional(),
        swalisClassification: z.string().optional(),
        treatmentStartDate: z.date().optional(),
        observations: z.string().optional(),
        contraindications: z.string().optional(),
        allergies: z.string().optional(),
      }),
    )
    .mutation(
      withErrorHandling(
        async ({ input, ctx }) => {
          // Verificar se o paciente existe
          const patient = await ctx.db.patient.findUnique({
            where: { id: input.patientId },
          });

          if (!patient) {
            throw createNotFoundError("Paciente", input.patientId);
          }

          // Verificar se o colaborador existe
          const collaborator = await ctx.db.collaborator.findUnique({
            where: { id: input.responsibleDoctor },
          });

          if (!collaborator) {
            throw createNotFoundError("Colaborador", input.responsibleDoctor);
          }

          // Criar a indicação
          const indication =
            await ctx.db.intravitrealInjectionIndication.create({
              data: {
                patientId: patient.id,
                collaboratorId: collaborator.id,
                totalOD: input.totalOD,
                totalOS: input.totalOS,
                startEye: input.startEye,
                // Campos obrigatórios do schema
                indication: input.indication || "DMRI Exsudativa",
                medication: input.medication || "Aflibercept",
                swalisClassification: input.swalisClassification || "A2",
                treatmentStartDate: input.treatmentStartDate || new Date(),
                observations: input.observations,
                contraindications: input.contraindications,
                allergies: input.allergies,
                status: "PENDING_NIR", // Set to PENDING_NIR for NIR evaluation
              },
              include: {
                patient: true,
                collaborator: true,
                clinic: true,
              },
            });

          return indication;
        },
        { operation: "create_indication" },
      ),
    ),

  createInjections: protectedProcedure
    .input(
      z.object({
        indicationId: z.string().min(1, "ID da indicação é obrigatório"),
        startDate: z.date(),
        startEye: z.enum(["OD", "OS"]),
        totalOD: z.number().min(0),
        totalOS: z.number().min(0),
      }),
    )
    .mutation(
      withErrorHandling(
        async ({ input, ctx }) => {
          console.log("createInjections called with:", input);

          // Verificar se a indicação existe
          const indication =
            await ctx.db.intravitrealInjectionIndication.findUnique({
              where: { id: input.indicationId },
            });

          if (!indication) {
            throw createNotFoundError("Indicação", input.indicationId);
          }

          console.log("Indicação encontrada:", indication.id);

          // REGRA CRÍTICA: Nunca fazer injeções no mesmo dia em ambos os olhos
          // - Mínimo 2 semanas entre injeções de olhos diferentes
          // - Mínimo 4 semanas entre injeções do mesmo olho
          const INTERVAL_SAME_EYE = 28; // 4 semanas
          const INTERVAL_BETWEEN_EYES = 14; // 2 semanas entre olhos diferentes

          const startEyeCode = input.startEye === "OD" ? "OD" : "OE";
          const hasBothEyes = input.totalOD > 0 && input.totalOS > 0;

          console.log("=== CRIANDO AGENDAMENTO ===");
          console.log("Total OD:", input.totalOD, "Total OE:", input.totalOS);
          console.log("Olho inicial:", startEyeCode);
          console.log("Ambos os olhos:", hasBothEyes);

          // Cronograma de injeções com alternância obrigatória
          const schedule: Array<{
            eye: "OD" | "OE";
            doseNumber: number;
            scheduledDate: Date;
          }> = [];

          if (!hasBothEyes) {
            // Apenas um olho - agendamento simples
            const eyeToSchedule = input.totalOD > 0 ? "OD" : "OE";
            const totalDoses =
              input.totalOD > 0 ? input.totalOD : input.totalOS;

            for (let i = 0; i < totalDoses; i++) {
              const injectionDate = new Date(input.startDate);
              injectionDate.setDate(
                injectionDate.getDate() + i * INTERVAL_SAME_EYE,
              );

              schedule.push({
                eye: eyeToSchedule,
                doseNumber: i + 1,
                scheduledDate: injectionDate,
              });
            }
          } else {
            // Ambos os olhos - alternância obrigatória com 2 semanas entre olhos
            const currentDate = new Date(input.startDate);
            let odCount = 0;
            let oeCount = 0;
            let currentEye = startEyeCode;

            // Agendar alternando entre os olhos, sempre respeitando os intervalos
            while (odCount < input.totalOD || oeCount < input.totalOS) {
              if (currentEye === "OD" && odCount < input.totalOD) {
                // Agendar próxima dose do OD
                odCount++;
                schedule.push({
                  eye: "OD",
                  doseNumber: odCount,
                  scheduledDate: new Date(currentDate),
                });

                console.log(
                  `Agendado: OD dose ${odCount} - ${formatDateForAPI(currentDate)}`,
                );

                // Próxima será OE (se ainda há doses)
                if (oeCount < input.totalOS) {
                  currentEye = "OE";
                  currentDate.setDate(
                    currentDate.getDate() + INTERVAL_BETWEEN_EYES,
                  );
                } else {
                  // Só restam doses do OD
                  currentDate.setDate(
                    currentDate.getDate() + INTERVAL_SAME_EYE,
                  );
                }
              } else if (currentEye === "OE" && oeCount < input.totalOS) {
                // Agendar próxima dose do OE
                oeCount++;
                schedule.push({
                  eye: "OE",
                  doseNumber: oeCount,
                  scheduledDate: new Date(currentDate),
                });

                console.log(
                  `Agendado: OE dose ${oeCount} - ${formatDateForAPI(currentDate)}`,
                );

                // Próxima será OD (se ainda há doses)
                if (odCount < input.totalOD) {
                  currentEye = "OD";
                  currentDate.setDate(
                    currentDate.getDate() + INTERVAL_BETWEEN_EYES,
                  );
                } else {
                  // Só restam doses do OE
                  currentDate.setDate(
                    currentDate.getDate() + INTERVAL_SAME_EYE,
                  );
                }
              } else {
                // Trocar para o outro olho se não conseguiu agendar o atual
                currentEye = currentEye === "OD" ? "OE" : "OD";
              }

              // Proteção contra loop infinito
              if (schedule.length > input.totalOD + input.totalOS + 5) {
                console.error("ERRO: Loop infinito detectado no agendamento");
                break;
              }
            }
          }

          // Criar as injeções no banco de dados
          const injections = [];
          console.log(`\n=== CRIANDO ${schedule.length} INJEÇÕES NO BANCO ===`);

          for (const item of schedule) {
            console.log(
              `Criando: ${item.eye} dose ${item.doseNumber} em ${formatDateForAPI(item.scheduledDate)}`,
            );

            const injection = await ctx.db.intravitrealInjection.create({
              data: {
                indicationId: input.indicationId,
                scheduledDate: item.scheduledDate,
                eye: item.eye,
                status: "PENDING",
                patientAttended: false,
                lateralityConfirmed: false,
              },
            });

            injections.push(injection);
          }

          // Retornar a indicação com as injeções criadas
          const updatedIndication =
            await ctx.db.intravitrealInjectionIndication.findUnique({
              where: { id: input.indicationId },
              include: {
                patient: true,
                collaborator: true,
                clinic: true,
                injections: {
                  orderBy: { scheduledDate: "asc" },
                },
              },
            });

          return updatedIndication;
        },
        { operation: "create_injections" },
      ),
    ),

  updateInjection: protectedProcedure
    .input(
      z.object({
        injectionId: z.string().min(1, "ID da injeção é obrigatório"),
        scheduledDate: z.date(),
        status: z.enum(["PENDING", "RESCHEDULED", "CONFIRMED", "COMPLETED"]),
      }),
    )
    .mutation(
      withErrorHandling(
        async ({ input, ctx }) => {
          const injection = await ctx.db.intravitrealInjection.update({
            where: { id: input.injectionId },
            data: {
              scheduledDate: input.scheduledDate,
              status: input.status,
            },
            include: {
              indication: {
                include: {
                  patient: true,
                  collaborator: true,
                  clinic: true,
                },
              },
            },
          });

          return injection;
        },
        { operation: "update_injection" },
      ),
    ),

  // Atualizar data de uma injeção específica (para uso na interface NIR)
  updateInjectionDate: protectedProcedure
    .input(
      z.object({
        injectionId: z.string().min(1, "ID da injeção é obrigatório"),
        newDate: z.string(), // formato: "YYYY-MM-DD"
      }),
    )
    .mutation(
      withErrorHandling(
        async ({ input, ctx }) => {
          // Validar formato da data
          const [year, month, day] = input.newDate.split("-").map(Number);
          if (!year || !month || !day) {
            throw new Error("Formato de data inválido");
          }

          const newScheduledDate = new Date(Date.UTC(year, month - 1, day));

          const injection = await ctx.db.intravitrealInjection.update({
            where: { id: input.injectionId },
            data: {
              scheduledDate: newScheduledDate,
              status: "RESCHEDULED",
            },
            include: {
              indication: {
                include: {
                  patient: true,
                  collaborator: true,
                  clinic: true,
                  injections: {
                    orderBy: {
                      scheduledDate: "asc",
                    },
                  },
                },
              },
            },
          });

          return injection;
        },
        { operation: "update_injection_date" },
      ),
    ),

  rescheduleInjection: protectedProcedure
    .input(
      z.object({
        injectionId: z.string().min(1, "ID da injeção é obrigatório"),
        newDate: z.date(),
        updateSubsequent: z.boolean().default(true),
      }),
    )
    .mutation(
      withErrorHandling(
        async ({ input, ctx }) => {
          // Buscar a injeção e suas subsequentes
          const injection = await ctx.db.intravitrealInjection.findUnique({
            where: { id: input.injectionId },
            include: {
              indication: {
                include: {
                  injections: {
                    orderBy: { scheduledDate: "asc" },
                  },
                },
              },
            },
          });

          if (!injection) {
            throw createNotFoundError("Injeção", input.injectionId);
          }

          // Atualizar a injeção selecionada
          await ctx.db.intravitrealInjection.update({
            where: { id: input.injectionId },
            data: {
              scheduledDate: input.newDate,
              status: "RESCHEDULED",
            },
          });

          if (input.updateSubsequent) {
            // Recalcular datas subsequentes
            const subsequentInjections = injection.indication.injections.filter(
              (inj) => inj.scheduledDate > injection.scheduledDate,
            );

            let currentDate = input.newDate;
            for (const subsequentInjection of subsequentInjections) {
              // Calcular próxima data baseada no olho
              const isSameEye = subsequentInjection.eye === injection.eye;
              const daysToAdd = isSameEye ? 28 : 14; // 4 semanas para mesmo olho, 2 para olho diferente

              currentDate = new Date(currentDate);
              currentDate.setDate(currentDate.getDate() + daysToAdd);

              await ctx.db.intravitrealInjection.update({
                where: { id: subsequentInjection.id },
                data: {
                  scheduledDate: currentDate,
                  status: "RESCHEDULED",
                },
              });
            }
          }

          // Retornar a indicação atualizada
          const updatedIndication =
            await ctx.db.intravitrealInjectionIndication.findUnique({
              where: { id: injection.indicationId },
              include: {
                patient: true,
                collaborator: true,
                clinic: true,
                injections: {
                  orderBy: { scheduledDate: "asc" },
                },
              },
            });

          return updatedIndication;
        },
        { operation: "reschedule_injection" },
      ),
    ),

  confirmLaterality: protectedProcedure
    .input(
      z.object({
        injectionId: z.string().min(1, "ID da injeção é obrigatório"),
        eye: z.enum(["OD", "OS"], {
          required_error: "Olho é obrigatório",
        }),
      }),
    )
    .mutation(
      withErrorHandling(
        async ({ input, ctx }) => {
          const injection = await ctx.db.intravitrealInjection.update({
            where: { id: input.injectionId },
            data: {
              eye: input.eye === "OS" ? "OE" : ("OD" as "OD" | "OE"),
              lateralityConfirmed: true,
              status: "CONFIRMED",
            },
            include: {
              indication: {
                include: {
                  patient: true,
                  collaborator: true,
                  clinic: true,
                },
              },
            },
          });

          return injection;
        },
        { operation: "confirm_laterality" },
      ),
    ),

  markAsAttended: protectedProcedure
    .input(
      z.object({
        injectionId: z.string().min(1, "ID da injeção é obrigatório"),
      }),
    )
    .mutation(
      withErrorHandling(
        async ({ input, ctx }) => {
          const injection = await ctx.db.intravitrealInjection.update({
            where: { id: input.injectionId },
            data: {
              patientAttended: true,
              performedAt: new Date(),
              status: "COMPLETED",
            },
            include: {
              indication: {
                include: {
                  patient: true,
                  collaborator: true,
                  clinic: true,
                },
              },
            },
          });

          return injection;
        },
        { operation: "mark_as_attended" },
      ),
    ),

  getInjectionsByDate: protectedProcedure
    .input(
      z.object({
        date: z.date(),
      }),
    )
    .query(
      withErrorHandling(
        async ({ input, ctx }) => {
          const startOfDay = new Date(input.date);
          startOfDay.setHours(0, 0, 0, 0);

          const endOfDay = new Date(input.date);
          endOfDay.setHours(23, 59, 59, 999);

          const injections = await ctx.db.intravitrealInjection.findMany({
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
                  clinic: true,
                },
              },
            },
            orderBy: {
              scheduledDate: "asc",
            },
          });

          return injections;
        },
        { operation: "get_injections_by_date" },
      ),
    ),

  getByPatient: protectedProcedure
    .input(
      z.object({
        patientId: z.string().min(1, "ID do paciente é obrigatório"),
      }),
    )
    .query(
      withErrorHandling(
        async ({ input, ctx }) => {
          const indications =
            await ctx.db.intravitrealInjectionIndication.findMany({
              where: {
                patient: {
                  refId: input.patientId,
                },
              },
              include: {
                patient: true,
                collaborator: true,
                clinic: true,
                injections: {
                  orderBy: {
                    scheduledDate: "asc",
                  },
                },
              },
              orderBy: {
                createdAt: "desc",
              },
            });

          return indications;
        },
        { operation: "get_indications_by_patient" },
      ),
    ),

  getById: protectedProcedure
    .input(
      z.object({
        id: z.string().min(1, "ID da indicação é obrigatório"),
      }),
    )
    .query(
      withErrorHandling(
        async ({ input, ctx }) => {
          const indication =
            await ctx.db.intravitrealInjectionIndication.findUnique({
              where: { id: input.id },
              include: {
                patient: true,
                collaborator: true,
                clinic: true,
                injections: {
                  orderBy: {
                    scheduledDate: "asc",
                  },
                },
              },
            });

          if (!indication) {
            throw createNotFoundError("Indicação", input.id);
          }

          return indication;
        },
        { operation: "get_indication_by_id" },
      ),
    ),

  list: protectedProcedure
    .input(
      z
        .object({
          limit: z.number().min(1).max(100).default(10),
          offset: z.number().min(0).default(0),
        })
        .optional(),
    )
    .query(
      withErrorHandling(
        async ({ input, ctx }) => {
          const { limit = 10, offset = 0 } = input || {};

          const indications =
            await ctx.db.intravitrealInjectionIndication.findMany({
              take: limit,
              skip: offset,
              include: {
                patient: true,
                collaborator: true,
                clinic: true,
                injections: {
                  orderBy: {
                    scheduledDate: "asc",
                  },
                },
              },
              orderBy: {
                createdAt: "desc",
              },
            });

          const total = await ctx.db.intravitrealInjectionIndication.count();

          return {
            indications,
            total,
            hasMore: offset + limit < total,
          };
        },
        { operation: "list_indications" },
      ),
    ),

  // NIR Evaluation queries and mutations
  getPendingNir: protectedProcedure.query(
    withErrorHandling(
      async ({ ctx }) => {
        const indications =
          await ctx.db.intravitrealInjectionIndication.findMany({
            where: {
              status: "PENDING_NIR",
            },
            include: {
              patient: true,
              collaborator: true,
              clinic: true,
              injections: {
                orderBy: {
                  scheduledDate: "asc",
                },
              },
            },
            orderBy: {
              createdAt: "asc",
            },
          });

        return indications;
      },
      { operation: "get_pending_nir" },
    ),
  ),

  getProcessedIndications: protectedProcedure.query(
    withErrorHandling(
      async ({ ctx }) => {
        const indications =
          await ctx.db.intravitrealInjectionIndication.findMany({
            where: {
              status: {
                in: ["APPROVED", "REJECTED", "SCHEDULED", "COMPLETED"],
              },
            },
            include: {
              patient: true,
              collaborator: true,
              clinic: true,
              injections: {
                orderBy: {
                  scheduledDate: "asc",
                },
              },
            },
            orderBy: {
              updatedAt: "desc",
            },
          });

        return indications;
      },
      { operation: "get_processed_indications" },
    ),
  ),

  approveIndication: protectedProcedure
    .input(
      z.object({
        indicationId: z.string().min(1, "ID da indicação é obrigatório"),
        nirNotes: z.string().optional(),
      }),
    )
    .mutation(
      withErrorHandling(
        async ({ input, ctx }) => {
          // Buscar a indicação com suas injeções
          const indication =
            await ctx.db.intravitrealInjectionIndication.findUnique({
              where: { id: input.indicationId },
              include: {
                patient: true,
                collaborator: true,
                clinic: true,
                injections: {
                  orderBy: {
                    scheduledDate: "asc",
                  },
                },
              },
            });

          if (!indication) {
            throw new Error("Indicação não encontrada");
          }

          // Verificar se já existem injeções criadas
          if (indication.injections.length === 0) {
            // REGRA CRÍTICA: Nunca fazer injeções no mesmo dia em ambos os olhos
            // - Mínimo 2 semanas entre injeções de olhos diferentes
            // - Mínimo 4 semanas entre injeções do mesmo olho
            const INTERVAL_SAME_EYE = 28; // 4 semanas
            const INTERVAL_BETWEEN_EYES = 14; // 2 semanas entre olhos diferentes

            const startEyeCode = indication.startEye;
            const hasBothEyes =
              indication.totalOD > 0 && indication.totalOS > 0;

            console.log("=== APROVAÇÃO - CRIANDO AGENDAMENTO ===");
            console.log(
              "Total OD:",
              indication.totalOD,
              "Total OE:",
              indication.totalOS,
            );
            console.log("Olho inicial:", startEyeCode);
            console.log("Ambos os olhos:", hasBothEyes);

            // Cronograma de injeções com alternância obrigatória
            const schedule: Array<{
              eye: "OD" | "OE";
              doseNumber: number;
              scheduledDate: Date;
            }> = [];

            if (!hasBothEyes) {
              // Apenas um olho - agendamento simples
              const eyeToSchedule = indication.totalOD > 0 ? "OD" : "OE";
              const totalDoses =
                indication.totalOD > 0
                  ? indication.totalOD
                  : indication.totalOS;

              for (let i = 0; i < totalDoses; i++) {
                const injectionDate = new Date(indication.treatmentStartDate);
                injectionDate.setDate(
                  injectionDate.getDate() + i * INTERVAL_SAME_EYE,
                );

                schedule.push({
                  eye: eyeToSchedule,
                  doseNumber: i + 1,
                  scheduledDate: injectionDate,
                });
              }
            } else {
              // Ambos os olhos - alternância obrigatória com 2 semanas entre olhos
              const currentDate = new Date(indication.treatmentStartDate);
              let odCount = 0;
              let oeCount = 0;
              let currentEye = startEyeCode;

              // Agendar alternando entre os olhos, sempre respeitando os intervalos
              while (
                odCount < indication.totalOD ||
                oeCount < indication.totalOS
              ) {
                if (currentEye === "OD" && odCount < indication.totalOD) {
                  // Agendar próxima dose do OD
                  odCount++;
                  schedule.push({
                    eye: "OD",
                    doseNumber: odCount,
                    scheduledDate: new Date(currentDate),
                  });

                  console.log(
                    `Aprovação - Agendado: OD dose ${odCount} - ${formatDateForAPI(currentDate)}`,
                  );

                  // Próxima será OE (se ainda há doses)
                  if (oeCount < indication.totalOS) {
                    currentEye = "OE";
                    currentDate.setDate(
                      currentDate.getDate() + INTERVAL_BETWEEN_EYES,
                    );
                  } else {
                    // Só restam doses do OD
                    currentDate.setDate(
                      currentDate.getDate() + INTERVAL_SAME_EYE,
                    );
                  }
                } else if (
                  currentEye === "OE" &&
                  oeCount < indication.totalOS
                ) {
                  // Agendar próxima dose do OE
                  oeCount++;
                  schedule.push({
                    eye: "OE",
                    doseNumber: oeCount,
                    scheduledDate: new Date(currentDate),
                  });

                  console.log(
                    `Aprovação - Agendado: OE dose ${oeCount} - ${formatDateForAPI(currentDate)}`,
                  );

                  // Próxima será OD (se ainda há doses)
                  if (odCount < indication.totalOD) {
                    currentEye = "OD";
                    currentDate.setDate(
                      currentDate.getDate() + INTERVAL_BETWEEN_EYES,
                    );
                  } else {
                    // Só restam doses do OE
                    currentDate.setDate(
                      currentDate.getDate() + INTERVAL_SAME_EYE,
                    );
                  }
                } else {
                  // Trocar para o outro olho se não conseguiu agendar o atual
                  currentEye = currentEye === "OD" ? "OE" : "OD";
                }

                // Proteção contra loop infinito
                if (
                  schedule.length >
                  indication.totalOD + indication.totalOS + 5
                ) {
                  console.error(
                    "ERRO: Loop infinito detectado no agendamento da aprovação",
                  );
                  break;
                }
              }
            }

            // Criar as injeções no banco de dados
            const injections = [];
            console.log(
              `\n=== APROVAÇÃO - CRIANDO ${schedule.length} INJEÇÕES NO BANCO ===`,
            );

            for (const item of schedule) {
              console.log(
                `Aprovação - Criando: ${item.eye} dose ${item.doseNumber} em ${formatDateForAPI(item.scheduledDate)}`,
              );

              const injection = await ctx.db.intravitrealInjection.create({
                data: {
                  indicationId: input.indicationId,
                  scheduledDate: item.scheduledDate,
                  eye: item.eye,
                  status: "PENDING",
                  patientAttended: false,
                  lateralityConfirmed: false,
                },
              });

              injections.push(injection);
            }
          }

          // Atualizar o status da indicação para SCHEDULED
          const updatedIndication =
            await ctx.db.intravitrealInjectionIndication.update({
              where: { id: input.indicationId },
              data: {
                status: "SCHEDULED",
                observations: input.nirNotes
                  ? `${input.nirNotes}\n\n--- Aprovado e agendado pelo NIR em ${new Date().toLocaleString(
                      "pt-BR",
                    )} ---`
                  : `--- Aprovado e agendado pelo NIR em ${new Date().toLocaleString(
                      "pt-BR",
                    )} ---`,
              },
              include: {
                patient: true,
                collaborator: true,
                clinic: true,
                injections: {
                  orderBy: {
                    scheduledDate: "asc",
                  },
                },
              },
            });

          return updatedIndication;
        },
        { operation: "approve_indication" },
      ),
    ),

  rejectIndication: protectedProcedure
    .input(
      z.object({
        indicationId: z.string().min(1, "ID da indicação é obrigatório"),
        nirNotes: z.string().optional(),
      }),
    )
    .mutation(
      withErrorHandling(
        async ({ input, ctx }) => {
          const indication =
            await ctx.db.intravitrealInjectionIndication.update({
              where: { id: input.indicationId },
              data: {
                status: "REJECTED",
                observations: input.nirNotes
                  ? `${input.nirNotes}\n\n--- Rejeitado pelo NIR em ${new Date().toLocaleString(
                      "pt-BR",
                    )} ---`
                  : `--- Rejeitado pelo NIR em ${new Date().toLocaleString(
                      "pt-BR",
                    )} ---`,
              },
              include: {
                patient: true,
                collaborator: true,
                clinic: true,
                injections: {
                  orderBy: {
                    scheduledDate: "asc",
                  },
                },
              },
            });

          return indication;
        },
        { operation: "reject_indication" },
      ),
    ),

  rescheduleIndication: protectedProcedure
    .input(
      z.object({
        indicationId: z.string().min(1, "ID da indicação é obrigatório"),
        updatedDates: z.record(z.string(), z.string()),
        nirNotes: z.string().optional(),
      }),
    )
    .mutation(
      withErrorHandling(
        async ({ input, ctx }) => {
          // Update indication status
          await ctx.db.intravitrealInjectionIndication.update({
            where: { id: input.indicationId },
            data: {
              status: "SCHEDULED",
              observations: input.nirNotes
                ? `${input.nirNotes}\n\n--- Reagendado pelo NIR em ${new Date().toLocaleString(
                    "pt-BR",
                  )} ---`
                : `--- Reagendado pelo NIR em ${new Date().toLocaleString(
                    "pt-BR",
                  )} ---`,
            },
            include: {
              patient: true,
              collaborator: true,
              clinic: true,
              injections: {
                orderBy: {
                  scheduledDate: "asc",
                },
              },
            },
          });

          // Update injection dates
          for (const [injectionId, newDate] of Object.entries(
            input.updatedDates,
          )) {
            await ctx.db.intravitrealInjection.update({
              where: { id: injectionId },
              data: {
                scheduledDate: new Date(newDate),
                status: "RESCHEDULED",
              },
            });
          }

          // Return updated indication with new injection dates
          const updatedIndication =
            await ctx.db.intravitrealInjectionIndication.findUnique({
              where: { id: input.indicationId },
              include: {
                patient: true,
                collaborator: true,
                clinic: true,
                injections: {
                  orderBy: {
                    scheduledDate: "asc",
                  },
                },
              },
            });

          return updatedIndication;
        },
        { operation: "reschedule_indication" },
      ),
    ),

  updateStatus: protectedProcedure
    .input(
      z.object({
        indicationId: z.string().min(1, "ID da indicação é obrigatório"),
        status: z.enum([
          "PENDING",
          "PENDING_NIR",
          "APPROVED",
          "REJECTED",
          "SCHEDULED",
          "COMPLETED",
          "CANCELLED",
        ]),
      }),
    )
    .mutation(
      withErrorHandling(
        async ({ input, ctx }) => {
          const indication =
            await ctx.db.intravitrealInjectionIndication.update({
              where: { id: input.indicationId },
              data: {
                status: input.status,
              },
              include: {
                patient: true,
                collaborator: true,
                clinic: true,
                injections: {
                  orderBy: {
                    scheduledDate: "asc",
                  },
                },
              },
            });

          return indication;
        },
        { operation: "update_indication_status" },
      ),
    ),
});
