"use client";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  formatDateForAPI,
  localToUTC,
  parseLocalDateString,
} from "~/lib/utils";

import { AccordionExams } from "../molecules/accordion-exams";
import { DatePickerWithOccupancy } from "../ui/date-picker-with-occupancy";
import { Input } from "../ui/input";
import { Prisma } from "@prisma/client";
import { Textarea } from "../ui/textarea";
import { UseFormReturn } from "react-hook-form";

export type EvaluationMainFormValues = {
  biomicroscopyOD?: string;
  biomicroscopyOS?: string;
  fundoscopyOD?: string;
  fundoscopyOS?: string;
  gonioscopyOD?: string;
  gonioscopyOS?: string;
  tonometryOD?: string;
  tonometryOS?: string;
  pachymetryOD?: string;
  pachymetryOS?: string;
  opticalBiometryOD?: string;
  opticalBiometryOS?: string;
  specularMicroscopyOD?: string;
  specularMicroscopyOS?: string;
  octOD?: string;
  octOS?: string;
  visualFieldOD?: string;
  visualFieldOS?: string;
  angiographyOD?: string;
  angiographyOS?: string;
  ctCorneaOD?: string;
  ctCorneaOS?: string;
  retinographyOD?: string;
  retinographyOS?: string;
  // Annotation fields for each exam
  octAnnotationOD?: string;
  octAnnotationOS?: string;
  visualFieldAnnotationOD?: string;
  visualFieldAnnotationOS?: string;
  angiographyAnnotationOD?: string;
  angiographyAnnotationOS?: string;
  ctCorneaAnnotationOD?: string;
  ctCorneaAnnotationOS?: string;
  retinographyAnnotationOD?: string;
  retinographyAnnotationOS?: string;
  clinicalData: string;
  continuousData?: string;
  diagnosis: string;
  treatment?: string;
  followUp?: string;
  nextAppointment?: string;
  returnDate?: string;
  returnTime?: "07:00" | "13:00" | undefined;
  returnNotes?: string;
  notes?: string;
};

type EvaluationMainFormProps = {
  rightEyeId?: string;
  leftEyeId?: string;
  form: UseFormReturn<EvaluationMainFormValues>;
  lastEvaluationData?: Prisma.EvaluationGetPayload<{
    select: {
      continuousData: true;
      eyes: {
        include: {
          leftEye: {
            include: {
              logs: true;
              refraction: true;
            };
          };
          rightEye: {
            include: {
              logs: true;
              refraction: true;
            };
          };
        };
      };
    };
  }>;
  collaboratorId?: string;
  patientId?: string;
  occupancyData?: Record<
    string,
    { total: number; morning: number; afternoon: number }
  >;
};

export function EvaluationMainForm({
  form,
  lastEvaluationData,
  rightEyeId,
  leftEyeId,
  collaboratorId,
  patientId,
  occupancyData,
}: EvaluationMainFormProps) {
  // Monitorar o valor dos campos returnDate e returnTime para controlar a visibilidade
  const returnDate = form.watch("returnDate");
  const returnTime = form.watch("returnTime");

  return (
    <Form {...form}>
      <form className="min-w-xs flex w-full flex-col gap-6">
        {/* Dados Clínicos */}
        <FormField
          control={form.control}
          name="clinicalData"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Dados Clínicos</FormLabel>
              <FormControl>
                <Textarea {...field} className="min-h-40 resize-y" />
              </FormControl>
              <FormMessage />
              <FormDescription>
                <span className="text-xs text-muted-foreground">
                  Descreva informações clínicas relevantes do quadro atual (Ex:
                  queixa, história da doença, sinais e sintomas).
                </span>
              </FormDescription>
            </FormItem>
          )}
        />
        {/* Dados contínuos */}
        <FormField
          control={form.control}
          name="continuousData"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Dados Persistentes</FormLabel>
              <FormControl>
                <Textarea {...field} className="min-h-40 resize-y" />
              </FormControl>
              <FormMessage />
              <FormDescription>
                <span className="text-xs text-muted-foreground">
                  Descreva informações clínicas persistentes em todas as
                  avaliações (Ex: medicações de uso contínuo, doenças
                  sistêmicas, colírios, cirurgias etc.).
                </span>
              </FormDescription>
            </FormItem>
          )}
        />

        <AccordionExams
          form={form}
          rightEyeId={rightEyeId}
          leftEyeId={leftEyeId}
          lastEvaluationData={lastEvaluationData}
        />

        {/* DIAGNÓSTICO */}
        <FormField
          control={form.control}
          name="diagnosis"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex justify-between">
                Diagnóstico
              </FormLabel>
              <FormControl>
                <Textarea {...field} className="resize-none" />
              </FormControl>
              <FormMessage />
              <FormDescription>
                <span className="text-xs text-muted-foreground">
                  Descreva o diagnóstico do paciente.
                </span>
              </FormDescription>
            </FormItem>
          )}
        />

        {/* TRATAMENTO */}
        <FormField
          control={form.control}
          name="treatment"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tratamento</FormLabel>
              <FormControl>
                <Textarea {...field} className="resize-none" />
              </FormControl>
              <FormMessage />
              <FormDescription>
                <span className="text-xs text-muted-foreground">
                  Descreva o tratamento e/ou conduta sugerida.
                </span>
              </FormDescription>
            </FormItem>
          )}
        />

        {/* ACOMPANHAMENTO */}
        <FormField
          control={form.control}
          name="followUp"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Acompanhamento</FormLabel>
              <FormControl>
                <Textarea {...field} className="resize-none" />
              </FormControl>
              <FormMessage />
              <FormDescription>
                <span className="text-xs text-muted-foreground">
                  Descreva o plano de acompanhamento do paciente.
                </span>
              </FormDescription>
            </FormItem>
          )}
        />

        {/* PRÓXIMA CONSULTA */}
        <FormField
          control={form.control}
          name="nextAppointment"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Próxima Consulta</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Ex: 30 dias, 3 meses, alta" />
              </FormControl>
              <FormMessage />
              <FormDescription>
                <span className="text-xs text-muted-foreground">
                  Prazo para próxima consulta ou alta.
                </span>
              </FormDescription>
            </FormItem>
          )}
        />

        {/* DATA DE RETORNO */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-medium">Agendamento de Retorno</h3>
            <span className="text-xs text-muted-foreground">
              (opcional - será criado automaticamente ao concluir com turnos
              predefinidos)
            </span>
          </div>
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            <FormField
              control={form.control}
              name="returnDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Data de Retorno</FormLabel>
                  <FormControl>
                    <DatePickerWithOccupancy
                      date={
                        field.value
                          ? parseLocalDateString(field.value)!
                          : undefined
                      }
                      onDateChange={(date) => {
                        field.onChange(
                          date ? formatDateForAPI(localToUTC(date)) : "",
                        );
                        // Limpar o turno e notas quando a data for removida
                        if (!date) {
                          form.setValue("returnTime", undefined);
                          form.setValue("returnNotes", "");
                        }
                      }}
                      placeholder="Selecione a data de retorno"
                      minDate={new Date()}
                      className="w-full"
                      collaboratorId={collaboratorId}
                      patientId={patientId}
                      occupancyData={occupancyData}
                    />
                  </FormControl>
                  <FormMessage />
                  <FormDescription>
                    <span className="text-xs text-muted-foreground">
                      Data para agendamento de retorno. Os indicadores mostram a
                      lotação atual.
                    </span>
                  </FormDescription>
                </FormItem>
              )}
            />

            {/* Campo de turno só aparece quando uma data for selecionada */}
            {returnDate && (
              <FormField
                control={form.control}
                name="returnTime"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Turno de Retorno *</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={(value) => {
                          field.onChange(value);
                          // Limpar as notas quando o turno for removido
                          if (!value) {
                            form.setValue("returnNotes", "");
                          }
                        }}
                        value={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione o turno" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="07:00">Manhã (07h)</SelectItem>
                          <SelectItem value="13:00">Tarde (13h)</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                    <FormDescription>
                      <span className="text-xs text-muted-foreground">
                        Turno para agendamento de retorno (obrigatório).
                      </span>
                    </FormDescription>
                  </FormItem>
                )}
              />
            )}
          </div>

          {/* NOTAS PARA O RETORNO - Só aparece quando há data e turno preenchidos */}
          {returnDate && returnTime && (
            <FormField
              control={form.control}
              name="returnNotes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Notas para o Retorno *</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder="Observações importantes para o próximo retorno do paciente (obrigatório)"
                      className="resize-none"
                      rows={3}
                    />
                  </FormControl>
                  <FormMessage />
                  <FormDescription>
                    <span className="text-xs text-muted-foreground">
                      Informações que serão incluídas no agendamento de retorno
                      (obrigatório quando data e turno são selecionados).
                    </span>
                  </FormDescription>
                </FormItem>
              )}
            />
          )}
        </div>

        {/* ANOTAÇÕES */}
        {/* <FormField
          control={form.control}
          name="notes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Anotações</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  placeholder="Escreva anotações adicionais"
                  className="resize-none"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        /> */}
      </form>
    </Form>
  );
}
