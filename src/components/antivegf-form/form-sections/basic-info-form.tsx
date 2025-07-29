"use client";

import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";

import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { User } from "lucide-react";
import { api } from "~/trpc/react";
import { useEffect } from "react";
import { useFormContext } from "react-hook-form";

export function BasicInfoForm() {
  const {
    register,
    setValue,
    formState: { errors },
  } = useFormContext();

  // Buscar o colaborador atual
  const { data: collaboratorData, error: collaboratorError } =
    api.utils.currentCollaborator.useQuery();

  // Definir o colaborador automaticamente quando os dados estiverem disponíveis
  useEffect(() => {
    if (collaboratorData?.collaboratorId) {
      setValue("responsibleDoctor", collaboratorData.collaboratorId);
    }
  }, [collaboratorData?.collaboratorId, setValue]);

  // Mostrar erro se não houver colaborador selecionado
  useEffect(() => {
    if (collaboratorError) {
      console.error("Erro ao carregar colaborador:", collaboratorError);
    }
  }, [collaboratorError]);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <User className="mr-2 h-5 w-5" />
          Informações Básicas
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-1">
          {/* Data da Indicação */}
          <div>
            <Label htmlFor="indicationDate" className="font-semibold">
              Data da Indicação *
            </Label>
            <Input
              id="indicationDate"
              type="date"
              {...register("indicationDate")}
              className={errors.indicationDate ? "border-red-500" : ""}
            />
            {errors.indicationDate && (
              <span className="text-sm text-red-500">
                {errors.indicationDate.message as string}
              </span>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
