"use client";

import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { CheckCircle, Eye, UserCheck, Users } from "lucide-react";

import { Badge } from "~/components/ui/badge";
import { InjectionDaySteps } from "~/components/organisms/injection-day-steps";
import { Separator } from "~/components/ui/separator";
import { useState } from "react";

export default function InjectionDayManagementPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedDate] = useState<Date>(new Date());
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());

  const steps = [
    {
      id: 1,
      title: "Confirmação de Lateralidade",
      description: "Verificar prontuário e confirmar olho a ser injetado",
      icon: Eye,
      status: completedSteps.has(1)
        ? "completed"
        : currentStep === 1
          ? "active"
          : "pending",
    },
    {
      id: 2,
      title: "Confirmação de Pacientes",
      description: "Confirmar pacientes presentes no dia",
      icon: Users,
      status: completedSteps.has(2)
        ? "completed"
        : currentStep === 2
          ? "active"
          : "pending",
    },
    {
      id: 3,
      title: "Confirmação de Colaborador",
      description: "Confirmar staff responsável pelas injeções",
      icon: UserCheck,
      status: completedSteps.has(3)
        ? "completed"
        : currentStep === 3
          ? "active"
          : "pending",
    },
  ];

  const handleStepComplete = (stepId: number) => {
    setCompletedSteps((prev) => new Set([...prev, stepId]));
  };

  const handleStepSelect = (stepId: number) => {
    setCurrentStep(stepId);
  };

  const handleStepBack = (stepId: number) => {
    setCurrentStep(stepId - 1);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
        <div className="min-w-0 flex-1">
          <h1 className="text-xl font-bold text-foreground sm:text-2xl lg:text-3xl">
            Gerenciamento do Dia da Injeção
          </h1>
          <p className="mt-2 text-sm text-muted-foreground sm:text-base">
            Confirmação e gestão das injeções intravítreas do dia
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Badge
            variant="outline"
            className="border-border/50 text-sm dark:border-border/30"
          >
            {selectedDate.toLocaleDateString("pt-BR", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </Badge>
        </div>
      </div>

      <Card className="border-border/50 bg-card dark:border-border/30 dark:bg-card/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-foreground dark:text-foreground/90">
            <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
            Progresso do Dia
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {steps.map((step, index) => (
              <div key={step.id} className="relative">
                <Card
                  className={`cursor-pointer transition-all ${
                    step.status === "completed"
                      ? "border-green-500/50 bg-green-50/50 dark:border-green-400/30 dark:bg-green-950/20"
                      : step.status === "active"
                        ? "border-blue-500/50 bg-blue-50/50 dark:border-blue-400/30 dark:bg-blue-950/20"
                        : "border-border/50 dark:border-border/30"
                  }`}
                  onClick={() => handleStepSelect(step.id)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <div
                        className={`flex h-10 w-10 items-center justify-center rounded-full ${
                          step.status === "completed"
                            ? "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400"
                            : step.status === "active"
                              ? "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400"
                              : "bg-muted text-muted-foreground dark:bg-muted/50 dark:text-muted-foreground/70"
                        }`}
                      >
                        {step.status === "completed" ? (
                          <CheckCircle className="h-5 w-5" />
                        ) : (
                          <step.icon className="h-5 w-5" />
                        )}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-foreground dark:text-foreground/90">
                          {step.title}
                        </h3>
                        <p className="text-sm text-muted-foreground dark:text-muted-foreground/70">
                          {step.description}
                        </p>
                      </div>
                      {step.status === "completed" && (
                        <Badge
                          variant="default"
                          className="bg-green-600 dark:bg-green-500"
                        >
                          Concluído
                        </Badge>
                      )}
                      {step.status === "active" && (
                        <Badge
                          variant="default"
                          className="bg-blue-600 dark:bg-blue-500"
                        >
                          Ativo
                        </Badge>
                      )}
                    </div>
                  </CardContent>
                </Card>
                {index < steps.length - 1 && (
                  <div className="absolute -right-2 top-1/2 hidden h-0.5 w-4 -translate-y-1/2 bg-border dark:bg-border/50 md:block" />
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Separator className="border-border/50 dark:border-border/30" />

      <InjectionDaySteps
        currentStep={currentStep}
        selectedDate={selectedDate}
        onStepComplete={handleStepComplete}
        onStepSelect={handleStepSelect}
        onStepBack={handleStepBack}
      />
    </div>
  );
}
