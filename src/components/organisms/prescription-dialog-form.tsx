"use client";

import * as React from "react";

import { Check, ChevronsUpDown } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "~/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { ResponsiveDialog } from "~/components/ui/responsive-dialog";
import { toast } from "~/hooks/use-toast";
import { cn } from "~/lib/utils";
import { api } from "~/trpc/react";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";

// --- Schema Base com campos comuns --- //
const baseSchema = z.object({
  continuousUse: z.boolean().default(false),
  quantity: z.string().optional(),
  isExternal: z.boolean().default(false),
  eye: z.enum(["OD", "OE", "AO"]).optional(), // Campo opcional, só obrigatório para uso externo
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
  )
  .refine(
    (data) => {
      // Se for uso externo, o campo eye é obrigatório
      if (data.isExternal) {
        return data.eye !== undefined && data.eye !== null;
      }
      return true;
    },
    {
      message: "Selecione o olho para uso externo",
      path: ["eye"],
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
  external: boolean; // Indica se é para uso externo (colírio)
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

export function PrescriptionFormDialog({
  medications,
}: {
  medications: MedicationItem[];
}) {
  const { id } = useParams();
  const evaluationId = id as string;
  const router = useRouter();
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [popoverOpen, setPopoverOpen] = React.useState(false);

  const form = useForm<PrescriptionFormValues>({
    resolver: zodResolver(prescriptionSchema),
    defaultValues: {
      medicationId: "",
      selectedMedicationInstruction: "",
      customInstruction: "",
      continuousUse: false,
      quantity: "0",
      eye: undefined,
      isExternal: false,
    },
  });

  // Sincroniza campos de instrução: se "custom" for preenchida, zera a "padrão" e vice-versa
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

  // TRPC: mutation para salvar ou atualizar
  const createOrUpdateMutation = api.prescription.createOrUpdate.useMutation({
    onSuccess: () => {
      toast({
        title: "Prescrição Salva",
        description: "A prescrição foi salva com sucesso.",
      });
      form.reset();
      setDialogOpen(false);
      router.refresh();
    },
    onError: (error) => {
      toast({
        title: "Erro ao salvar",
        description: error.message,
      });
    },
  });

  // Para exibir a medicação selecionada no combobox
  const selectedMedication = medications.find(
    (med) => med.id === form.watch("medicationId"),
  );

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

    createOrUpdateMutation.mutate(processedData);
  };

  const trigger = (
    <Button type="button" className="w-full">
      Adicionar Prescrição
    </Button>
  );

  const formContent = (
    <Form {...form}>
      <form
        id="prescription-form"
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4"
      >
        {/* Combobox para Seleção da Medicação */}
        <FormField
          control={form.control}
          name="medicationId"
          render={({ field }) => {
            // Estado para controlar o Popover
            const currentMedication = medications.find(
              (med) => med.id === field.value,
            );
            return (
              <FormItem>
                <FormLabel>Medicação</FormLabel>
                <FormControl>
                  <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={popoverOpen}
                        className="w-full justify-between"
                      >
                        {currentMedication ? (
                          <>{currentMedication.name}</>
                        ) : (
                          "Selecione uma medicação"
                        )}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-full p-0">
                      <Command>
                        <CommandInput
                          placeholder="Buscar medicação..."
                          className="h-9"
                        />
                        <CommandList>
                          <CommandEmpty>
                            <span className="px-2">
                              Nenhuma medicação encontrada.
                            </span>
                          </CommandEmpty>
                          {Object.entries(groupByCategory(medications)).map(
                            ([category, items]) => (
                              <CommandGroup key={category} heading={category}>
                                {items.map((med) => (
                                  <CommandItem
                                    key={med.id}
                                    value={`${med.name} ${med.category}`} // inclui a categoria para filtrar também
                                    onSelect={() => {
                                      field.onChange(med.id); // armazena o id da medicação no formulário
                                      setPopoverOpen(false);
                                    }}
                                  >
                                    {med.name}
                                    <Check
                                      className={cn(
                                        "ml-auto",
                                        field.value === med.id
                                          ? "opacity-100"
                                          : "opacity-0",
                                      )}
                                    />
                                  </CommandItem>
                                ))}
                              </CommandGroup>
                            ),
                          )}
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />

        {/* Instruções Padrão e Personalizadas */}
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

        <div className="grid grid-cols-2 gap-4">
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

          {/* Uso Externo */}
          <FormField
            control={form.control}
            name="isExternal"
            render={({ field }) => (
              <FormItem className="flex items-center space-x-2">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={(checked) => {
                      field.onChange(checked);
                      // Limpa a seleção do olho quando desmarca uso externo
                      if (!checked) {
                        form.setValue("eye", undefined);
                      }
                    }}
                  />
                </FormControl>
                <FormLabel>Uso Externo</FormLabel>
              </FormItem>
            )}
          />
        </div>

        {/* Se não for uso contínuo, exibe o input para Quantidade */}
        {!form.watch("continuousUse") && (
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
                    required
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        {/* Seleção do Olho (obrigatória para uso externo) */}
        {form.watch("isExternal") && (
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
        )}
      </form>
    </Form>
  );

  return (
    <ResponsiveDialog
      trigger={trigger}
      title="Nova Prescrição"
      open={dialogOpen}
      onOpenChange={setDialogOpen}
      footer={
        <Button
          type="submit"
          form="prescription-form"
          disabled={createOrUpdateMutation.isPending}
          className="w-full"
        >
          {createOrUpdateMutation.isPending
            ? "Salvando..."
            : "Salvar Prescrição"}
        </Button>
      }
    >
      {formContent}
    </ResponsiveDialog>
  );
}
