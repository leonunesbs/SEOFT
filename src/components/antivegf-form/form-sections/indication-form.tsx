"use client";

import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Controller, useFormContext } from "react-hook-form";
import {
  indicationDescriptions,
  indicationOptions,
} from "~/lib/schemas/antivegf-schema";

import { Button } from "~/components/ui/button";
import { FileText } from "lucide-react";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";

export function IndicationForm() {
  const {
    control,
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <FileText className="mr-2 h-5 w-5" />
          Diagnóstico e Tratamento
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Indicação */}
          <div>
            <Label className="font-semibold">Indicação *</Label>
            <Controller
              name="indication"
              control={control}
              render={({ field }) => (
                <>
                  <div
                    className="mt-2 flex flex-wrap gap-2"
                    role="group"
                    aria-labelledby="indication-label"
                  >
                    {indicationOptions.map((option) => (
                      <Button
                        key={option}
                        type="button"
                        variant={field.value === option ? "default" : "outline"}
                        size="sm"
                        onClick={() => field.onChange(option)}
                        aria-pressed={field.value === option}
                        aria-controls={
                          option === "Outros" ? "indicationOther" : undefined
                        }
                      >
                        {option}
                      </Button>
                    ))}
                  </div>
                  {field.value === "Outros" && (
                    <Input
                      type="text"
                      id="indicationOther"
                      {...register("indicationOther")}
                      placeholder="Especifique a indicação"
                      className={`mt-2 ${errors.indicationOther ? "border-red-500" : ""}`}
                      aria-required={field.value === "Outros"}
                    />
                  )}
                  {field.value !== "Outros" &&
                    indicationDescriptions[field.value] && (
                      <p className="mt-2 text-sm text-gray-600">
                        {indicationDescriptions[field.value]}
                      </p>
                    )}
                </>
              )}
            />
            {errors.indication && (
              <span className="text-sm text-red-500">
                {errors.indication.message as string}
              </span>
            )}
            {errors.indicationOther && (
              <span className="text-sm text-red-500">
                {errors.indicationOther.message as string}
              </span>
            )}
          </div>

          {/* Medicamento */}
          <div>
            <Label className="font-semibold">Medicação Indicada *</Label>
            <Controller
              name="medication"
              control={control}
              render={({ field }) => (
                <>
                  <div
                    className="mt-2 flex flex-wrap gap-2"
                    role="group"
                    aria-labelledby="medication-label"
                  >
                    {["Lucentis", "Avastin", "Eylia", "Outro"].map((option) => (
                      <Button
                        key={option}
                        type="button"
                        variant={field.value === option ? "default" : "outline"}
                        size="sm"
                        onClick={() => field.onChange(option)}
                        aria-pressed={field.value === option}
                        aria-controls={
                          option === "Outro" ? "medicationOther" : undefined
                        }
                      >
                        {option}
                      </Button>
                    ))}
                  </div>
                  {field.value === "Outro" && (
                    <Input
                      type="text"
                      id="medicationOther"
                      {...register("medicationOther")}
                      placeholder="Especifique a medicação"
                      className={`mt-2 ${errors.medicationOther ? "border-red-500" : ""}`}
                      aria-required={field.value === "Outro"}
                    />
                  )}
                </>
              )}
            />
            {errors.medication && (
              <span className="text-sm text-red-500">
                {errors.medication.message as string}
              </span>
            )}
            {errors.medicationOther && (
              <span className="text-sm text-red-500">
                {errors.medicationOther.message as string}
              </span>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
