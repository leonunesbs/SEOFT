"use client";

import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Controller, useFormContext } from "react-hook-form";
import { formatDateForAPI, localToUTC } from "~/lib/utils";

import type { AntivegfFormData } from "~/lib/schemas/antivegf-schema";
import { Button } from "~/components/ui/button";
import { EnhancedScheduleDatePicker } from "~/components/ui/enhanced-schedule-date-picker";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { NextAvailableDates } from "~/components/ui/next-available-dates";
import { Separator } from "~/components/ui/separator";

export function InjectionsForm() {
  const {
    control,
    watch,
    register,
    setValue,
    formState: { errors },
  } = useFormContext<AntivegfFormData>();

  const [
    remainingODOption,
    remainingOSOption,
    remainingODCustom,
    remainingOSCustom,
  ] = watch([
    "remainingODOption",
    "remainingOSOption",
    "remainingODCustom",
    "remainingOSCustom",
  ]);

  // Verificar se ambos os olhos têm doses
  const odDoses =
    remainingODOption === "Outro"
      ? remainingODCustom || 0
      : parseInt(remainingODOption || "0", 10) || 0;
  const osDoses =
    remainingOSOption === "Outro"
      ? remainingOSCustom || 0
      : parseInt(remainingOSOption || "0", 10) || 0;

  return (
    <Card>
      <CardHeader>
        <CardTitle>💉 Injeções Programadas</CardTitle>
      </CardHeader>

      <CardContent>
        <div className="space-y-6">
          {/* Doses por Olho */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {/* Injeções OD */}
            <div className="space-y-4">
              <Label className="flex items-center text-base font-medium">
                <span className="mr-2">👁️</span>
                Injeções (OD)
              </Label>
              <Controller
                name="remainingODOption"
                control={control}
                render={({ field }) => (
                  <>
                    <div
                      className="flex flex-wrap gap-2"
                      role="group"
                      aria-labelledby="remaining-od-option"
                    >
                      {["0", "1", "2", "3", "Outro"].map((option) => (
                        <Button
                          key={option}
                          type="button"
                          variant={
                            field.value === option ? "default" : "outline"
                          }
                          size="sm"
                          onClick={() => field.onChange(option)}
                          aria-pressed={field.value === option}
                          aria-controls={
                            option === "Outro" ? "remainingODCustom" : undefined
                          }
                        >
                          {option}
                        </Button>
                      ))}
                    </div>

                    {field.value === "Outro" && (
                      <Input
                        {...register("remainingODCustom", {
                          valueAsNumber: true,
                        })}
                        type="number"
                        placeholder="Número de injeções OD"
                        min="0"
                        max="10"
                        className={
                          errors.remainingODCustom ? "border-red-500" : ""
                        }
                        id="remainingODCustom"
                        aria-label="Número de injeções personalizadas para OD"
                      />
                    )}
                  </>
                )}
              />
              {errors.remainingODCustom && (
                <span className="text-sm text-red-500">
                  {errors.remainingODCustom.message as string}
                </span>
              )}
            </div>

            {/* Injeções OS */}
            <div className="space-y-4">
              <Label className="flex items-center text-base font-medium">
                <span className="mr-2">👁️‍🗨️</span>
                Injeções (OS)
              </Label>
              <Controller
                name="remainingOSOption"
                control={control}
                render={({ field }) => (
                  <>
                    <div
                      className="flex flex-wrap gap-2"
                      role="group"
                      aria-labelledby="remaining-os-option"
                    >
                      {["0", "1", "2", "3", "Outro"].map((option) => (
                        <Button
                          key={option}
                          type="button"
                          variant={
                            field.value === option ? "default" : "outline"
                          }
                          size="sm"
                          onClick={() => field.onChange(option)}
                          aria-pressed={field.value === option}
                          aria-controls={
                            option === "Outro" ? "remainingOSCustom" : undefined
                          }
                        >
                          {option}
                        </Button>
                      ))}
                    </div>

                    {field.value === "Outro" && (
                      <Input
                        {...register("remainingOSCustom", {
                          valueAsNumber: true,
                        })}
                        type="number"
                        placeholder="Número de injeções OS"
                        min="0"
                        max="10"
                        className={
                          errors.remainingOSCustom ? "border-red-500" : ""
                        }
                        id="remainingOSCustom"
                        aria-label="Número de injeções personalizadas para OS"
                      />
                    )}
                  </>
                )}
              />
              {errors.remainingOSCustom && (
                <span className="text-sm text-red-500">
                  {errors.remainingOSCustom.message as string}
                </span>
              )}
            </div>
          </div>

          <Separator />

          {/* Olho de Início e Data */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {/* Olho de Início */}
            <div>
              <Label className="font-semibold">Começar por *</Label>
              <Controller
                name="startEye"
                control={control}
                render={({ field }) => (
                  <div
                    className="mt-2 flex items-center"
                    role="group"
                    aria-labelledby="start-eye"
                  >
                    <Button
                      type="button"
                      variant={field.value === "OD" ? "default" : "outline"}
                      size="sm"
                      className="mr-2"
                      onClick={() => field.onChange("OD")}
                      aria-pressed={field.value === "OD"}
                    >
                      OD
                    </Button>
                    <Button
                      type="button"
                      variant={field.value === "OS" ? "default" : "outline"}
                      size="sm"
                      onClick={() => field.onChange("OS")}
                      aria-pressed={field.value === "OS"}
                    >
                      OS
                    </Button>
                  </div>
                )}
              />
              {errors.startEye && (
                <span className="text-sm text-red-500">
                  {errors.startEye.message as string}
                </span>
              )}
            </div>

            {/* Data de Início - NOVO COMPONENTE APRIMORADO */}
            <div>
              <Label className="font-semibold">
                Data de Início do Tratamento *
              </Label>
              <Controller
                name="treatmentStartDate"
                control={control}
                render={({ field }) => {
                  // Converter string para Date se necessário, usando as novas funções utilitárias
                  const dateValue = field.value
                    ? (() => {
                        const parts = field.value.split("-").map(Number);
                        if (
                          parts.length === 3 &&
                          parts.every((part) => !isNaN(part))
                        ) {
                          const [year, month, day] = parts;
                          // Criar data local e converter para UTC
                          const localDate = new Date(year!, month! - 1, day!);
                          return localToUTC(localDate);
                        }
                        return undefined;
                      })()
                    : undefined;

                  // Verificar se a data é válida
                  const isValidDate = dateValue && !isNaN(dateValue.getTime());

                  return (
                    <EnhancedScheduleDatePicker
                      date={isValidDate ? dateValue : undefined}
                      onDateChange={(date: Date | undefined) => {
                        field.onChange(date ? formatDateForAPI(date) : "");
                      }}
                      placeholder="Selecione a data de início"
                      className="mt-2"
                    />
                  );
                }}
              />
              {errors.treatmentStartDate && (
                <span className="text-sm text-red-500">
                  {errors.treatmentStartDate.message as string}
                </span>
              )}
            </div>
          </div>

          {/* Widget de Próximas Datas Disponíveis */}
          {(odDoses > 0 || osDoses > 0) && (
            <>
              <Separator />
              <div>
                <Label className="mb-3 block font-semibold">
                  Seleção Rápida de Data
                </Label>
                <NextAvailableDates
                  onDateSelect={(dateStr) => {
                    setValue("treatmentStartDate", dateStr);
                  }}
                  maxDates={3}
                  fromDate={formatDateForAPI(new Date())}
                />
              </div>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
