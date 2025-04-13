"use client";

import * as React from "react";

import { useParams, useRouter } from "next/navigation";
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
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "~/hooks/use-toast";
import { api } from "~/trpc/react";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";

// --- Schema Base com campos comuns --- //
const baseSchema = z.object({
  continuousUse: z.boolean().default(true),
  quantity: z.string().optional(),
  eye: z.enum(["OD", "OE", "AO"]), // Campo obrigatório para colírios
});

// Extensão para medicação, instruções, etc.
const prescriptionSchema = baseSchema
  .extend({
    medicationId: z.string().nonempty("Selecione uma medicação"),
    selectedMedicationInstruction: z.string().optional(),
    customInstruction: z.string().optional(),
  })
  .refine(
    (data) => {
      // Exige que pelo menos uma instrução (padrão ou custom) seja preenchida
      const standard = data.selectedMedicationInstruction?.trim() || "";
      const custom = data.customInstruction?.trim() || "";
      return standard !== "" || custom !== "";
    },
    {
      message:
        "Selecione uma instrução padrão ou insira uma instrução personalizada",
    },
  );

export type PrescriptionFormValues = z.infer<typeof prescriptionSchema>;

// Exemplo de tipo para Medication
export type MedicationItem = {
  id: string;
  name: string; // Nome do medicamento
  category: string;
  unit: string; // Ex: "mg", "ml" etc.
  instructions: string[];
  createdAt: string;
  updatedAt: string;
  prescriptionItems?: any[];
};

// Helper para agrupar medicações por categoria
function groupByCategory(
  items: MedicationItem[],
): Record<string, MedicationItem[]> {
  return items.reduce(
    (groups, item) => {
      const { category } = item;
      if (!groups[category]) {
        groups[category] = [];
      }
      groups[category].push(item);
      return groups;
    },
    {} as Record<string, MedicationItem[]>,
  );
}

export function PrescriptionFormDialog() {
  const { id } = useParams();
  const evaluationId = id as string;
  const router = useRouter();

  const form = useForm<PrescriptionFormValues>({
    resolver: zodResolver(prescriptionSchema),
    defaultValues: {
      medicationId: "",
      selectedMedicationInstruction: "",
      customInstruction: "",
      continuousUse: true,
      quantity: "",
      eye: "AO",
    },
  });

  // Para sincronizar campos de instrução: se "custom" é preenchida, zera a "padrão" e vice-versa
  const customInstruction = form.watch("customInstruction");
  const selectedMedicationInstruction = form.watch(
    "selectedMedicationInstruction",
  );

  React.useEffect(() => {
    if (customInstruction && customInstruction.trim() !== "") {
      form.setValue("selectedMedicationInstruction", "");
    }
  }, [customInstruction, form]);

  React.useEffect(() => {
    if (
      selectedMedicationInstruction &&
      selectedMedicationInstruction.trim() !== ""
    ) {
      form.setValue("customInstruction", "");
    }
  }, [selectedMedicationInstruction, form]);

  // TRPC: obtem as medicações
  const { data: medications, isLoading } = api.medication.getAll.useQuery();

  // TRPC: mutation para salvar ou atualizar
  const createOrUpdateMutation = api.prescription.createOrUpdate.useMutation({
    onSuccess: () => {
      toast({
        title: "Prescrição Salva",
        description: "A prescrição foi salva com sucesso.",
      });
      form.reset();
      router.refresh();
    },
    onError: (error) => {
      toast({
        title: "Erro ao salvar",
        description: error.message,
      });
    },
  });

  // Identifica a medicação selecionada
  const selectedMedication = medications
    ? (medications as unknown as MedicationItem[]).find(
        (med) => med.id === form.watch("medicationId"),
      )
    : null;

  // Monta o preview
  const { continuousUse } = form.watch();

  // Exemplo: se for uso contínuo, força a quantidade = "0" na hora de salvar
  const onSubmit = (data: PrescriptionFormValues) => {
    console.log("Dados do formulário:", data);
    const processedData = {
      ...data,
      evaluationId,
      selectedMedicationInstruction: data.selectedMedicationInstruction?.trim(),
      customInstruction: data.customInstruction?.trim(),
      quantity: data.continuousUse
        ? 0
        : data.quantity
          ? Number(data.quantity)
          : undefined,
    };

    createOrUpdateMutation.mutate({
      ...processedData,
      quantity: processedData.quantity
        ? Number(processedData.quantity)
        : undefined,
    });
  };

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
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
                            groupByCategory(
                              medications as unknown as MedicationItem[],
                            ),
                          ).map(([category, items]) => (
                            <SelectGroup key={category}>
                              <SelectLabel>{category}</SelectLabel>
                              {items.map((med) => (
                                <SelectItem key={med.id} value={med.id}>
                                  {med.name}
                                  {med.unit && ` (${med.unit})`}
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

            {/* Instruções Padrão e Customizadas */}
            {selectedMedication && (
              <>
                <FormField
                  control={form.control}
                  name="selectedMedicationInstruction"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Instrução Padrão</FormLabel>
                      <FormControl>
                        <RadioGroup
                          value={field.value}
                          onValueChange={field.onChange}
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

                <FormField
                  control={form.control}
                  name="customInstruction"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Instrução Personalizada</FormLabel>
                      <FormControl>
                        <Textarea
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

            <div className="grid grid-cols-2">
              {/* Uso Contínuo */}
              <FormField
                control={form.control}
                name="continuousUse"
                render={({ field }) => (
                  <FormItem className="flex items-center space-x-2">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={(checked) => field.onChange(checked)}
                      />
                    </FormControl>
                    <FormLabel>Uso Contínuo</FormLabel>
                  </FormItem>
                )}
              />

              {/* Se não for uso contínuo, exibe o input para Quantidade */}
              {!continuousUse && (
                <FormField
                  control={form.control}
                  name="quantity"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Quantidade</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Informe a quantidade"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
            </div>

            {/* Seleção do Olho (obrigatória para colírios) */}
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

            <div className="flex justify-end">
              <Button type="submit">Salvar Prescrição</Button>
            </div>
          </form>
        </Form>
      </DialogContent>
      <DialogFooter>{/* Botão de cancelamento opcional */}</DialogFooter>
    </Dialog>
  );
}
