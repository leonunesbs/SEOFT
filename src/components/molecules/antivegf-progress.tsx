"use client";

import { Check } from "lucide-react";
import { cn } from "~/lib/utils";

interface Step {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  current: boolean;
}

interface AntivegfProgressProps {
  steps: Step[];
  currentStep: string;
  onStepClick?: (stepId: string) => void;
}

export function AntivegfProgress({
  steps,
  onStepClick,
}: AntivegfProgressProps) {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => (
          <div key={step.id} className="flex items-center">
            <div className="flex flex-col items-center">
              <button
                onClick={() => onStepClick?.(step.id)}
                disabled={!onStepClick}
                className={cn(
                  "flex h-10 w-10 items-center justify-center rounded-full border-2 transition-all",
                  step.completed
                    ? "border-green-500 bg-green-500 text-white"
                    : step.current
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-muted-foreground/25 bg-background text-muted-foreground",
                  onStepClick && "cursor-pointer hover:scale-105",
                )}
              >
                {step.completed ? (
                  <Check className="h-5 w-5" />
                ) : (
                  <span className="text-sm font-medium">{index + 1}</span>
                )}
              </button>
              <div className="mt-2 text-center">
                <div
                  className={cn(
                    "text-xs font-medium",
                    step.completed
                      ? "text-green-600"
                      : step.current
                        ? "text-primary"
                        : "text-muted-foreground",
                  )}
                >
                  {step.title}
                </div>
                <div className="text-xs text-muted-foreground">
                  {step.description}
                </div>
              </div>
            </div>
            {index < steps.length - 1 && (
              <div
                className={cn(
                  "mx-4 h-0.5 w-16 transition-colors",
                  step.completed ? "bg-green-500" : "bg-muted-foreground/25",
                )}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
