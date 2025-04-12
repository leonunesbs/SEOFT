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

import { Prisma } from "prisma/client";
import { UseFormReturn } from "react-hook-form";
import { AccordionExams } from "../molecules/accordion-exams";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";

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
  octOD?: FileList | null;
  octOS?: FileList | null;
  visualFieldOD?: FileList | null;
  visualFieldOS?: FileList | null;
  angiographyOD?: FileList | null;
  angiographyOS?: FileList | null;
  ctCorneaOD?: FileList | null;
  ctCorneaOS?: FileList | null;
  retinographyOD?: FileList | null;
  retinographyOS?: FileList | null;
  clinicalData: string;
  continuousData?: string;
  diagnosis: string;
  treatment?: string;
  followUp?: string;
  nextAppointment?: string;
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
};

export function EvaluationMainForm({
  form,
  lastEvaluationData,
  rightEyeId,
  leftEyeId,
}: EvaluationMainFormProps) {
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
                  queixa, história da doença, sinais e sintomas)
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
                  Descreva informações clínicas persistentes (Ex: medicações,
                  doenças sistêmicas, colírios, cirurgias etc.)
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
                  Descreva o diagnóstico do paciente
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
                  Descreva o tratamento e/ou conduta sugerida
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
                  Descreva o plano de acompanhamento do paciente
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
                <Input {...field} />
              </FormControl>
              <FormMessage />
              <FormDescription>
                <span className="text-xs text-muted-foreground">
                  Descreva a programação da próxima consulta
                </span>
              </FormDescription>
            </FormItem>
          )}
        />

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
