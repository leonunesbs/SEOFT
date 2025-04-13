"use client";

import * as React from "react";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

import { zodResolver } from "@hookform/resolvers/zod";
import { useParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "~/hooks/use-toast";
import { api } from "~/trpc/react";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import { Input } from "../ui/input";

// --- Schema de Validação --- //
// Cada prescrição é de um único medicamento com os seguintes campos:
// - "eye": seleção do olho individual para o item (OD, OE ou AO),
// - "medicationId": identificador da medicação selecionada (via select com grupos),
// - "standardInstruction": instrução padrão (via radio) – opcional,
// - "customInstruction": instrução personalizada (via input) – opcional.
// É obrigatório que pelo menos uma instrução seja informada.
const prescriptionSchema = z
  .object({
    eye: z.enum(["OD", "OE", "AO"], {
      errorMap: () => ({ message: "Selecione um olho" }),
    }),
    medicationId: z.string().nonempty("Selecione uma medicação"),
    standardInstruction: z.string().optional(),
    customInstruction: z.string().optional(),
    continuousUse: z.boolean().optional(),
    durationDays: z.number().int().positive().optional(),
  })
  .refine(
    (data) => {
      const standard = data.standardInstruction?.trim() || "";
      const custom = data.customInstruction?.trim() || "";
      return standard !== "" || custom !== "";
    },
    {
      message:
        "Selecione uma instrução padrão ou insira uma instrução personalizada",
    },
  )
  .superRefine((data, ctx) => {
    if (
      !data.continuousUse &&
      (data.durationDays === undefined || data.durationDays <= 0)
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Informe a quantidade de dias se não for uso contínuo",
        path: ["durationDays"],
      });
    }
  });

export type PrescriptionFormValues = z.infer<typeof prescriptionSchema>;

// --- Tipo para representar uma medicação da Pharmacy --- //
export type PharmacyItem = {
  id: string;
  name: string;
  category: string;
  instructions: string[];
};

// Função helper para agrupar os medicamentos por categoria
function groupByCategory(
  items: PharmacyItem[],
): Record<string, PharmacyItem[]> {
  return items.reduce(
    (groups, item) => {
      const { category } = item;
      if (!groups[category]) {
        groups[category] = [];
      }
      groups[category].push(item);
      return groups;
    },
    {} as Record<string, PharmacyItem[]>,
  );
}

export function PrescriptionFormDialog() {
  const { id } = useParams();
  const evaluationId = id as string;

  const form = useForm<PrescriptionFormValues>({
    resolver: zodResolver(prescriptionSchema),
    defaultValues: {
      eye: "AO",
      medicationId: "",
      standardInstruction: "",
      customInstruction: "",
      continuousUse: true,
      durationDays: undefined,
    },
  });

  // Instancia a mutation do TRPC para criar ou atualizar a prescrição
  const createOrUpdateMutation = api.prescription.createOrUpdate.useMutation({
    onSuccess: () => {
      toast({
        title: "Prescrição Salva",
        description: "A prescrição foi salva com sucesso.",
      });
      form.reset();
    },
    onError: (error) => {
      toast({
        title: "Erro ao salvar",
        description: error.message,
      });
    },
  });

  // Query para obter os medicamentos (modelo Medication) via TRPC
  const { data: medications, isLoading } = api.medication.getAll.useQuery();

  // Lógica para cancelar mutuamente os campos de instrução padrão e personalizada.
  const customInstruction = form.watch("customInstruction");
  const standardInstruction = form.watch("standardInstruction");

  React.useEffect(() => {
    if (customInstruction && customInstruction.trim() !== "") {
      form.setValue("standardInstruction", "");
    }
  }, [customInstruction, form]);

  React.useEffect(() => {
    if (standardInstruction && standardInstruction.trim() !== "") {
      form.setValue("customInstruction", "");
    }
  }, [standardInstruction, form]);

  const onSubmit = (data: PrescriptionFormValues) => {
    // Chama a mutation TRPC com os dados do formulário
    createOrUpdateMutation.mutate({
      ...data,
      evaluationId,
      standardInstruction: data.standardInstruction?.trim(),
      customInstruction: data.customInstruction?.trim(),
    });
  };

  // Filtra a medicação selecionada para exibir suas instruções
  const selectedMedication = (medications as PharmacyItem[] | undefined)?.find(
    (med) => med.id === form.watch("medicationId"),
  );

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button type="button" className="w-full">
          Adicionar Prescrição
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Nova Prescrição</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Seleção da Medicação */}
            <FormField
              control={form.control}
              name="medicationId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Medicação</FormLabel>
                  <FormControl>
                    {isLoading ? (
                      <div>Carregando medicações...</div>
                    ) : (
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione uma medicação" />
                        </SelectTrigger>
                        <SelectContent>
                          {Object.entries(
                            groupByCategory(medications as PharmacyItem[]),
                          ).map(([category, items]) => (
                            <SelectGroup key={category}>
                              <SelectLabel>{category}</SelectLabel>
                              {items.map((med) => (
                                <SelectItem key={med.id} value={med.id}>
                                  {med.name}
                                </SelectItem>
                              ))}
                            </SelectGroup>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Se uma medicação for selecionada, exibe as instruções */}
            {selectedMedication && (
              <>
                {/* Instrução Padrão: RadioGroup */}
                <FormField
                  control={form.control}
                  name="standardInstruction"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Instrução Padrão</FormLabel>
                      <FormControl>
                        <RadioGroup
                          value={field.value}
                          onValueChange={(val) => field.onChange(val)}
                          className="flex flex-col space-y-2"
                        >
                          {selectedMedication.instructions.map((instr) => (
                            <div
                              key={instr}
                              className="flex items-center space-x-2"
                            >
                              <RadioGroupItem
                                value={instr}
                                id={`instr-${selectedMedication.id}-${instr}`}
                              />
                              <FormLabel
                                htmlFor={`instr-${selectedMedication.id}-${instr}`}
                              >
                                {instr}
                              </FormLabel>
                            </div>
                          ))}
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Instrução Personalizada */}
                <FormField
                  control={form.control}
                  name="customInstruction"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Instrução Personalizada</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Digite a instrução personalizada"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}

            {/* Seleção do Olho via RadioGroup */}
            <FormField
              control={form.control}
              name="eye"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Selecione o olho</FormLabel>
                  <FormControl>
                    <RadioGroup
                      value={field.value}
                      onValueChange={field.onChange}
                      className="flex space-x-4"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="OD" id="eye-od" />
                        <FormLabel htmlFor="eye-od">OD</FormLabel>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="OE" id="eye-oe" />
                        <FormLabel htmlFor="eye-oe">OE</FormLabel>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="AO" id="eye-ao" />
                        <FormLabel htmlFor="eye-ao">AO</FormLabel>
                      </div>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Checkbox para Uso Contínuo */}
            <FormField
              control={form.control}
              name="continuousUse"
              render={({ field }) => (
                <FormItem className="flex items-center space-x-2">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={(checked) => field.onChange(checked)}
                      disabled
                    />
                  </FormControl>
                  <FormLabel>Uso Contínuo</FormLabel>
                </FormItem>
              )}
            />

            {/* Se não for uso contínuo, exibe campo para quantidade de dias */}
            {!form.watch("continuousUse") && (
              <FormField
                control={form.control}
                name="durationDays"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Quantidade de Dias</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Informe os dias"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            <div className="flex justify-end">
              <Button type="submit" disabled>
                Salvar Prescrição
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
      <DialogFooter>{/* Opcional: botão de cancelamento */}</DialogFooter>
    </Dialog>
  );
}
