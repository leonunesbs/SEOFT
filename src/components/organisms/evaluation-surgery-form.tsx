"use client";

import { Prisma, type EyeSurgery } from "@prisma/client";
import { MdCancel, MdOutlineInfo } from "react-icons/md";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
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
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Minus, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react"; // Importa useState para gerenciar estados locais
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "~/hooks/use-toast";
import { api } from "~/trpc/react"; // Importação do cliente tRPC
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../ui/collapsible";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";
import { Textarea } from "../ui/textarea";
// Removed radio group; using selectable buttons instead

// Opções de procedimento para seleção múltipla
const PROCEDURE_OPTIONS = [
  "FACO",
  "FEC",
  "TREC",
  "TX PENET.",
  "VVPP",
  "OUTROS",
] as const;

// Schema de validação para o formulário
const surgeryFormSchema = z
  .object({
    procedureOptions: z
      .array(z.enum(PROCEDURE_OPTIONS))
      .min(1, "Selecione pelo menos um procedimento"),
    procedureOther: z.string().optional(),
    day: z
      .string()
      .optional()
      .refine(
        (val) =>
          !val ||
          (/^\d{1,2}$/.test(val) && Number(val) >= 1 && Number(val) <= 31),
        {
          message: "Dia inválido",
        },
      ),
    month: z
      .string()
      .optional()
      .refine(
        (val) =>
          !val ||
          (/^\d{1,2}$/.test(val) && Number(val) >= 1 && Number(val) <= 12),
        {
          message: "Mês inválido",
        },
      ),
    year: z.string().regex(/^\d{4}$/, "Ano inválido (use 4 dígitos)"),
    notes: z.string().optional(),
    eye: z.enum(["OD", "OE"]).default("OD"),
  })
  .refine(
    (data) =>
      (data.procedureOptions || []).includes("OUTROS")
        ? !!data.procedureOther?.trim()
        : true,
    {
      message: "Especifique o procedimento",
      path: ["procedureOther"],
    },
  );

type SurgeryFormValues = z.infer<typeof surgeryFormSchema>;

type SurgeryItemProps = {
  surgery: Prisma.EyeSurgeryGetPayload<{
    select: {
      id: true;
      procedure: true;
      date: true;
      notes: true;
    };
  }>;
  eye: string;
  onDelete: (surgeryId: string) => void;
  isLoading: boolean; // Novo prop para indicar se o botão está em loading
};

function SurgeryItem({ surgery, eye, onDelete, isLoading }: SurgeryItemProps) {
  const formatSurgeryDate = (dateInput: Date | string) => {
    const date = new Date(dateInput);
    const day = date.getUTCDate();
    const month = date.getUTCMonth() + 1; // 1-12
    const year = date.getUTCFullYear();

    // Se não foi informado mês nem dia (persistimos como 01/01/AAAA)
    if (day === 1 && month === 1) {
      return String(year);
    }

    // Se não foi informado o dia (persistimos como 01/MM/AAAA)
    if (day === 1) {
      return `${String(month).padStart(2, "0")}/${year}`;
    }

    // Caso completo
    return date.toLocaleDateString("pt-BR", { timeZone: "UTC" });
  };
  return (
    <div className="flex items-center justify-between gap-2">
      <div className="flex gap-1">
        <Badge className="w-10 justify-center">{eye}</Badge>
        <span>{formatSurgeryDate(surgery.date)}</span>
      </div>
      <span className="flex gap-1">
        {surgery.procedure}
        {surgery.notes && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger type="button">
                <MdOutlineInfo size={18} />
              </TooltipTrigger>
              <TooltipContent>
                <p>{surgery.notes}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </span>
      <Button
        type="button"
        size="icon"
        onClick={() => onDelete(surgery.id)}
        disabled={isLoading} // Desativa o botão se estiver carregando
      >
        {isLoading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <MdCancel />
        )}
      </Button>
    </div>
  );
}

interface EvaluationSurgeryFormProps {
  rightEyeId?: string;
  leftEyeId?: string;
  patientSurgeries: Array<{
    eyes: {
      leftEye: {
        surgeries: EyeSurgery[];
      };
      rightEye: {
        surgeries: EyeSurgery[];
      };
    };
  }>;
}

export function EvaluationSurgeryForm({
  rightEyeId,
  leftEyeId,
  patientSurgeries,
}: EvaluationSurgeryFormProps) {
  const router = useRouter();
  const [deletingSurgeryIds, setDeletingSurgeryIds] = useState<string[]>([]); // Estado local para rastrear quais cirurgias estão sendo deletadas
  const [isFormOpen, setIsFormOpen] = useState(false);

  const form = useForm<SurgeryFormValues>({
    resolver: zodResolver(surgeryFormSchema),
    defaultValues: {
      procedureOptions: [],
      procedureOther: "",
      day: "",
      month: "",
      year: "",
      notes: "",
      eye: "OD",
    },
  });

  // Combina as cirurgias de todas as avaliações
  const combinedSurgeries = patientSurgeries.flatMap((history) => [
    ...history.eyes.rightEye.surgeries.map((surgery) => ({
      ...surgery,
      eye: "OD",
    })),
    ...history.eyes.leftEye.surgeries.map((surgery) => ({
      ...surgery,
      eye: "OE",
    })),
  ]);

  // Mutations do tRPC
  const createSurgeryMutation = api.surgery.create.useMutation({
    onSuccess: () => {
      toast({
        title: "Cirurgia adicionada!",
        description: "A cirurgia foi registrada com sucesso.",
        variant: "default",
        duration: 4000,
      });
      form.reset();
      router.refresh();
    },
    onError: (error) => {
      toast({
        title: "Erro",
        description: error.message || "Erro ao adicionar cirurgia.",
        variant: "destructive",
        duration: 4000,
      });
    },
  });

  const deleteSurgeryMutation = api.surgery.delete.useMutation({
    onSuccess: () => {
      toast({
        title: "Cirurgia excluída!",
        description: "A cirurgia foi removida com sucesso.",
        variant: "default",
        duration: 4000,
      });
      router.refresh();
    },
    onError: (error) => {
      toast({
        title: "Erro",
        description: error.message || "Erro ao excluir cirurgia.",
        variant: "destructive",
        duration: 4000,
      });
    },
  });

  const handleDelete = async (surgeryId: string) => {
    setDeletingSurgeryIds((prev) => [...prev, surgeryId]); // Adiciona o ID ao estado de carregamento
    try {
      await deleteSurgeryMutation.mutateAsync(surgeryId);
    } catch {
      // O toast de erro já é tratado no onError da mutation
    } finally {
      setDeletingSurgeryIds((prev) => prev.filter((id) => id !== surgeryId)); // Remove o ID após a operação
    }
  };

  const onSubmit = (data: SurgeryFormValues) => {
    const eyeId = data.eye === "OD" ? rightEyeId : leftEyeId;

    if (!eyeId) {
      toast({
        title: "Erro",
        description: `ID do olho ${data.eye} não encontrado.`,
        variant: "destructive",
        duration: 4000,
      });
      return;
    }

    const selected = data.procedureOptions || [];
    const mapped = selected
      .map((opt) =>
        opt === "OUTROS" ? (data.procedureOther ?? "").toUpperCase() : opt,
      )
      .filter((v) => v && v.trim().length > 0);
    const procedureValue = mapped.join(" + ");

    if (!procedureValue) {
      toast({
        title: "Erro",
        description: "Especifique o procedimento.",
        variant: "destructive",
        duration: 4000,
      });
      return;
    }

    const year = Number(data.year);
    const month = data.month ? Number(data.month) : 1;
    const day = data.day ? Number(data.day) : 1;
    const isoDate = `${String(year).padStart(4, "0")}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;

    createSurgeryMutation.mutate({
      eyeId,
      procedure: procedureValue,
      date: isoDate,
      notes: data.notes,
    });
  };

  return (
    <Form {...form}>
      <div className="space-y-4">
        <Card>
          <Collapsible open={isFormOpen} onOpenChange={setIsFormOpen}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div className="flex items-center gap-2">
                <CardTitle>Cirurgias e Procedimentos</CardTitle>
                <Badge variant="secondary" className="ml-1">
                  {combinedSurgeries.length}
                </Badge>
              </div>
              <CollapsibleTrigger asChild>
                <Button variant="outline" size="sm" aria-expanded={isFormOpen}>
                  {isFormOpen ? (
                    <Minus className="mr-2 h-4 w-4" />
                  ) : (
                    <Plus className="mr-2 h-4 w-4" />
                  )}
                  {isFormOpen ? "Ocultar cadastro" : "Cadastrar cirurgia"}
                </Button>
              </CollapsibleTrigger>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Lista de cirurgias registradas */}
              {combinedSurgeries.length > 0 ? (
                <div className="space-y-2">
                  {combinedSurgeries.map((surgery) => (
                    <SurgeryItem
                      key={surgery.id}
                      surgery={surgery}
                      eye={surgery.eye}
                      onDelete={handleDelete}
                      isLoading={deletingSurgeryIds.includes(surgery.id)}
                    />
                  ))}
                </div>
              ) : (
                <div className="flex items-center justify-center text-sm text-muted-foreground">
                  Nenhuma cirurgia prévia registrada.
                </div>
              )}

              {/* Formulário para adicionar cirurgias */}
              <CollapsibleContent className="space-y-4">
                {combinedSurgeries.length > 0 && <Separator />}
                <FormField
                  control={form.control}
                  name="eye"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Selecione o olho</FormLabel>
                      <div className="flex items-center gap-2">
                        <Button
                          type="button"
                          variant={field.value === "OD" ? "default" : "outline"}
                          onClick={() => field.onChange("OD")}
                        >
                          OD
                        </Button>
                        <Button
                          type="button"
                          variant={field.value === "OE" ? "default" : "outline"}
                          onClick={() => field.onChange("OE")}
                        >
                          OE
                        </Button>
                      </div>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="procedureOptions"
                  render={({ field }) => {
                    const selected: readonly (typeof PROCEDURE_OPTIONS)[number][] =
                      (field.value as any) || [];
                    const toggle = (
                      opt: (typeof PROCEDURE_OPTIONS)[number],
                    ) => {
                      if (selected.includes(opt)) {
                        field.onChange(selected.filter((v) => v !== opt));
                      } else {
                        field.onChange([...selected, opt]);
                      }
                    };
                    return (
                      <FormItem>
                        <FormLabel>Procedimento(s)</FormLabel>
                        <FormControl>
                          <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
                            {PROCEDURE_OPTIONS.map((opt) => (
                              <div
                                key={opt}
                                className="flex items-center gap-2"
                              >
                                <Checkbox
                                  id={`proc-${opt}`}
                                  checked={selected.includes(opt)}
                                  onCheckedChange={() => toggle(opt)}
                                />
                                <Label htmlFor={`proc-${opt}`}>{opt}</Label>
                              </div>
                            ))}
                          </div>
                        </FormControl>
                        <FormDescription>
                          Você pode selecionar mais de um procedimento.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />
                {/* Campo de especificação quando 'OUTROS' for selecionado */}
                {(form.watch("procedureOptions") || []).includes("OUTROS") && (
                  <FormField
                    control={form.control}
                    name="procedureOther"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Especificar procedimento</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="Digite o procedimento"
                            autoFocus
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}
                <div className="grid grid-cols-3 gap-2">
                  <FormField
                    control={form.control}
                    name="day"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Dia (opcional)</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            inputMode="numeric"
                            placeholder="DD"
                            maxLength={2}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="month"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Mês (opcional)</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            inputMode="numeric"
                            placeholder="MM"
                            maxLength={2}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="year"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Ano *</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            inputMode="numeric"
                            placeholder="AAAA"
                            maxLength={4}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="notes"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Notas</FormLabel>
                      <FormControl>
                        <Textarea
                          {...field}
                          placeholder="Informações adicionais"
                          className="resize-none"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div>
                  <Button
                    type="button"
                    className="w-full"
                    disabled={createSurgeryMutation.isPending}
                    onClick={form.handleSubmit(onSubmit)}
                  >
                    {createSurgeryMutation.isPending ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      "Adicionar Cirurgia"
                    )}
                  </Button>
                </div>
              </CollapsibleContent>
            </CardContent>
          </Collapsible>
        </Card>
      </div>
    </Form>
  );
}
