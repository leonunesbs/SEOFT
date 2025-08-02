"use client";

import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";

import { FileText } from "lucide-react";
import { Label } from "~/components/ui/label";
import { Textarea } from "~/components/ui/textarea";
import { useFormContext } from "react-hook-form";

export function ObservationsForm() {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <FileText className="mr-2 h-5 w-5" />
          Observações e Informações Adicionais
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Observações Clínicas */}
          <div>
            <Label htmlFor="observations" className="font-semibold">
              Observações Clínicas
            </Label>
            <Textarea
              id="observations"
              {...register("observations")}
              placeholder="Observações importantes sobre o caso..."
              className={`mt-2 ${errors.observations ? "border-red-500" : ""}`}
              rows={3}
            />
            {errors.observations && (
              <span className="text-sm text-red-500">
                {errors.observations.message as string}
              </span>
            )}
          </div>

          {/* Contraindicações */}
          <div>
            <Label htmlFor="contraindications" className="font-semibold">
              Contraindicações
            </Label>
            <Textarea
              id="contraindications"
              {...register("contraindications")}
              placeholder="Contraindicações conhecidas..."
              className={`mt-2 ${errors.contraindications ? "border-red-500" : ""}`}
              rows={2}
            />
            {errors.contraindications && (
              <span className="text-sm text-red-500">
                {errors.contraindications.message as string}
              </span>
            )}
          </div>

          {/* Alergias */}
          <div>
            <Label htmlFor="allergies" className="font-semibold">
              Alergias
            </Label>
            <Textarea
              id="allergies"
              {...register("allergies")}
              placeholder="Alergias conhecidas..."
              className={`mt-2 ${errors.allergies ? "border-red-500" : ""}`}
              rows={2}
            />
            {errors.allergies && (
              <span className="text-sm text-red-500">
                {errors.allergies.message as string}
              </span>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
