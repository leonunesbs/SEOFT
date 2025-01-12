"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";

import { Prisma } from "@prisma/client";
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
                <Textarea
                  {...field}
                  placeholder="Descreva informações clínicas relevantes"
                  className="min-h-40 resize-y"
                />
              </FormControl>
              <FormMessage />
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
                <Textarea
                  {...field}
                  placeholder="Informe o diagnóstico do paciente"
                  className="resize-none"
                />
              </FormControl>
              <FormMessage />
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
                <Textarea
                  {...field}
                  placeholder="Descreva o tratamento e/ou conduta sugerida"
                  className="resize-none"
                />
              </FormControl>
              <FormMessage />
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
                <Textarea
                  {...field}
                  placeholder="Plano de acompanhamento"
                  className="resize-none"
                />
              </FormControl>
              <FormMessage />
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
                <Input {...field} placeholder="Programação" />
              </FormControl>
              <FormMessage />
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
