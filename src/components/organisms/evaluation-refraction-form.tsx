"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Collapsible, CollapsibleContent } from "../ui/collapsible";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import {
  MdArrowDownward,
  MdArrowUpward,
  MdCancel,
  MdOutlineFileCopy,
  MdRemove,
} from "react-icons/md";
import { Prisma, Refraction } from "@prisma/client";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "~/components/ui/tooltip";

import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Input } from "~/components/ui/input";
import { Loader2 } from "lucide-react";
import { Separator } from "../ui/separator";
import { api } from "~/trpc/react";
import { toast } from "~/hooks/use-toast";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const visualAcuityOptions = [
  ">20/20",
  "20/20",
  "20/25",
  "20/30",
  "20/40",
  "20/50",
  "20/60",
  "20/70",
  "20/80",
  "20/100",
  "20/200",
  "20/400",
  "20/800",
  "CD 4m",
  "CD 3m",
  "CD 2m",
  "CD 1m",
  "CD 0,5m",
  "CD 30cm",
  "CD 15cm",
  "CD FF",
  "MM",
  "PL",
  "PL fraco",
  "PL duvidoso",
  "SPL",
];

// Mapeamento de acuidade visual para valores numéricos para comparação
const visualAcuityValues: { [key: string]: number } = {
  ">20/20": 24,
  "20/20": 23,
  "20/25": 22,
  "20/30": 21,
  "20/40": 20,
  "20/50": 19,
  "20/60": 18,
  "20/70": 17,
  "20/80": 16,
  "20/100": 15,
  "20/200": 14,
  "20/400": 13,
  "20/800": 12,
  "CD 4m": 11,
  "CD 3m": 10,
  "CD 2m": 9,
  "CD 1m": 8,
  "CD 0,5m": 7,
  "CD 30cm": 6,
  "CD 15cm": 5,
  "CD FF": 4,
  MM: 3,
  PL: 2,
  "PL fraco": 1,
  "PL duvidoso": 0,
  SPL: 0,
};

// Schema de validação
const refractionSchema = z.object({
  leftEyeId: z.string().optional(),
  rightEyeId: z.string().optional(),
  correctionTypeOD: z.enum(["sc", "ph", "rx"]).default("sc"), // Tipo de correção para olho direito
  correctionTypeOS: z.enum(["sc", "ph", "rx"]).default("sc"), // Tipo de correção para olho esquerdo
  sphericalOD: z.union([z.string(), z.number()]).optional(),
  cylinderOD: z.union([z.string(), z.number()]).optional(),
  axisOD: z.union([z.string(), z.number()]).optional(),
  visualAcuityOD: z.string().min(1, "A acuidade visual é obrigatória."),
  sphericalOS: z.union([z.string(), z.number()]).optional(),
  cylinderOS: z.union([z.string(), z.number()]).optional(),
  axisOS: z.union([z.string(), z.number()]).optional(),
  visualAcuityOS: z.string().min(1, "A acuidade visual é obrigatória."),
});

type RefractionFormValues = z.infer<typeof refractionSchema>;

type EvaluationRefractionFormProps = {
  leftEye?: Prisma.EyeGetPayload<{
    include: {
      refraction: true;
      logs: true;
    };
  }>;
  rightEye?: Prisma.EyeGetPayload<{
    include: {
      refraction: true;
      logs: true;
    };
  }>;
  lastEyesData?: {
    leftEye?: Prisma.EyeGetPayload<{
      include: {
        refraction: true;
        logs: true;
      };
    }>;
    rightEye?: Prisma.EyeGetPayload<{
      include: {
        refraction: true;
        logs: true;
      };
    }>;
  };
};

function EyeRefractionList({
  eye,
  refractions,
  onDelete,
  deletingIds,
  previousVisualAcuity,
}: {
  eye: "OD" | "OE";
  refractions: Refraction[];
  onDelete: (id: string) => void;
  deletingIds: string[]; // Recebe a lista de IDs que estão sendo deletados
  previousVisualAcuity?: string; // Acuidade visual anterior para comparação
}) {
  return (
    <div className="flex w-full flex-col gap-2">
      <div className="flex items-center">
        <Badge className="mr-2 w-10">{eye}</Badge>
      </div>
      {refractions.length > 0 ? (
        <table className="w-full table-auto border-collapse">
          <thead>
            <tr className="border-b">
              <th className="py-2 text-left">Esférico</th>
              <th className="py-2 text-left">Cilíndrico</th>
              <th className="py-2 text-left">Eixo</th>
              <th className="py-2 text-left">AV</th>
              <th className="py-2 text-center">Ação</th>
            </tr>
          </thead>
          <tbody>
            {refractions.map((refraction, index) => {
              const isLoading = deletingIds.includes(refraction.id);

              // Comparação apenas para a refração mais recente (index 0)
              let comparisonIcon = null;
              if (index === 0 && previousVisualAcuity) {
                const currentVAValue =
                  visualAcuityValues[refraction.visualAcuity ?? ""];
                const previousVAValue =
                  visualAcuityValues[previousVisualAcuity];

                if (currentVAValue != null && previousVAValue != null) {
                  if (currentVAValue > previousVAValue) {
                    // Melhora
                    comparisonIcon = <MdArrowUpward />;
                  } else if (currentVAValue < previousVAValue) {
                    // Piora
                    comparisonIcon = <MdArrowDownward />;
                  } else {
                    // Manutenção
                    comparisonIcon = <MdRemove />;
                  }
                }
              }

              // Mapeamento do tipo de correção
              const correctionTypeMap = {
                sc: "S/C",
                ph: "PH",
                rx: "RX",
              };

              const correctionType =
                correctionTypeMap[
                  ((refraction as any).correctionType ||
                    "sc") as keyof typeof correctionTypeMap
                ];

              return (
                <tr key={refraction.id} className="border-b">
                  <td className="py-2">
                    {correctionType === "RX"
                      ? refraction.spherical! > 0
                        ? `+${refraction.spherical?.toFixed(2)}`
                        : (refraction.spherical?.toFixed(2) ?? "S/C")
                      : correctionType}
                  </td>
                  <td className="py-2">
                    {correctionType === "RX"
                      ? refraction.cylinder! > 0
                        ? `+${refraction.cylinder?.toFixed(2)}`
                        : (refraction.cylinder?.toFixed(2) ?? "S/C")
                      : correctionType}
                  </td>
                  <td className="py-2">
                    {correctionType === "RX"
                      ? refraction.cylinder
                        ? refraction.axis
                          ? `${refraction.axis}º`
                          : "S/C"
                        : "S/C"
                      : correctionType}
                  </td>
                  <td>
                    <div className="flex items-center">
                      {refraction.visualAcuity}
                      {comparisonIcon && (
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger type="button">
                              {comparisonIcon}
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Útima acuidade: {previousVisualAcuity}</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      )}
                    </div>
                  </td>
                  <td className="py-2 text-center">
                    <Button
                      type="button"
                      size="icon"
                      onClick={() => onDelete(refraction.id)}
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <MdCancel />
                      )}
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        <div className="text-center text-sm text-muted-foreground">
          Nenhuma refração registrada para o olho{" "}
          {eye === "OD" ? "direito" : "esquerdo"}.
        </div>
      )}
    </div>
  );
}

export function EvaluationRefractionForm({
  leftEye,
  rightEye,
  lastEyesData,
}: EvaluationRefractionFormProps) {
  const form = useForm<z.infer<typeof refractionSchema>>({
    resolver: zodResolver(refractionSchema),
    defaultValues: {
      leftEyeId: leftEye?.id ?? "",
      rightEyeId: rightEye?.id ?? "",
      correctionTypeOD: "sc",
      correctionTypeOS: "sc",
      sphericalOD: 0,
      sphericalOS: 0,
      cylinderOD: 0,
      cylinderOS: 0,
      axisOD: 0,
      axisOS: 0,
      visualAcuityOD: "",
      visualAcuityOS: "",
    },
  });

  const correctionTypeOD = form.watch("correctionTypeOD");
  const correctionTypeOS = form.watch("correctionTypeOS");

  const router = useRouter();
  const [deletingIds, setDeletingIds] = useState<string[]>([]); // Estado para rastrear IDs que estão sendo deletados
  const [isImporting, setIsImporting] = useState(false); // Estado para o carregamento da importação

  const createRefractionMutation = api.refraction.create.useMutation({
    onSuccess: () => {
      toast({
        title: "Refração salva!",
        description: "A refração foi salva com sucesso.",
      });
      // Mantém os tipos de correção selecionados após salvar
      const currentCorrectionTypeOD = form.getValues("correctionTypeOD");
      const currentCorrectionTypeOS = form.getValues("correctionTypeOS");
      form.reset();
      form.setValue("correctionTypeOD", currentCorrectionTypeOD);
      form.setValue("correctionTypeOS", currentCorrectionTypeOS);
      router.refresh();
    },
    onError: () => {
      toast({
        title: "Erro ao salvar refração",
        description: "Ocorreu um erro ao salvar a refração.",
        variant: "destructive",
      });
    },
  });

  const deleteRefractionMutation = api.refraction.delete.useMutation({
    onSuccess: () => {
      toast({
        title: "Refração deletada!",
        description: "A refração foi deletada com sucesso.",
      });
      router.refresh();
    },
    onError: () => {
      toast({
        title: "Erro ao deletar refração",
        description: "Ocorreu um erro ao deletar a refração.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: RefractionFormValues) => {
    createRefractionMutation.mutate({
      leftEyeId: data.leftEyeId!,
      rightEyeId: data.rightEyeId!,
      leftEyeData: {
        spherical: data.sphericalOS ? Number(data.sphericalOS) : null,
        cylinder: data.cylinderOS ? Number(data.cylinderOS) : null,
        axis: data.axisOS ? Number(data.axisOS) : null,
        visualAcuity: data.visualAcuityOS,
        correctionType: data.correctionTypeOS,
      },
      rightEyeData: {
        spherical: data.sphericalOD ? Number(data.sphericalOD) : null,
        cylinder: data.cylinderOD ? Number(data.cylinderOD) : null,
        axis: data.axisOD ? Number(data.axisOD) : null,
        visualAcuity: data.visualAcuityOD,
        correctionType: data.correctionTypeOD,
      },
    });
  };

  const handleDelete = async (id: string) => {
    setDeletingIds((prev) => [...prev, id]); // Adiciona o ID ao estado de carregamento
    try {
      await deleteRefractionMutation.mutateAsync(id);
    } catch {
      // O erro é tratado no onError da mutation
    } finally {
      setDeletingIds((prev) => prev.filter((refId) => refId !== id)); // Remove o ID após a operação
    }
  };

  const handleImportLastData = async () => {
    if (!lastEyesData) {
      toast({
        title: "Erro",
        description:
          "Nenhum dado da última avaliação disponível para importar.",
        variant: "destructive",
      });
      return;
    }

    setIsImporting(true); // Inicia o estado de carregamento

    // Dados do olho esquerdo
    const leftEyeData = lastEyesData.leftEye?.refraction[0];
    // Dados do olho direito
    const rightEyeData = lastEyesData.rightEye?.refraction[0];

    if (!leftEyeData && !rightEyeData) {
      toast({
        title: "Erro",
        description: "Nenhum dado de refração disponível para importar.",
        variant: "destructive",
      });
      setIsImporting(false);
      return;
    }

    try {
      await createRefractionMutation.mutateAsync({
        leftEyeId: form.getValues("leftEyeId")!,
        rightEyeId: form.getValues("rightEyeId")!,
        leftEyeData:
          leftEyeData && leftEyeData.visualAcuity
            ? {
                spherical: leftEyeData.spherical,
                cylinder: leftEyeData.cylinder,
                axis: leftEyeData.axis,
                visualAcuity: leftEyeData.visualAcuity,
                correctionType: (leftEyeData as any).correctionType || "sc",
              }
            : undefined,
        rightEyeData:
          rightEyeData && rightEyeData.visualAcuity
            ? {
                spherical: rightEyeData.spherical,
                cylinder: rightEyeData.cylinder,
                axis: rightEyeData.axis,
                visualAcuity: rightEyeData.visualAcuity,
                correctionType: (rightEyeData as any).correctionType || "sc",
              }
            : undefined,
      });

      toast({
        title: "Dados importados!",
        description:
          "Os dados da última avaliação foram importados e salvos com sucesso.",
      });
    } catch {
      // O erro é tratado no onError da mutation
    } finally {
      setIsImporting(false); // Finaliza o estado de carregamento
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Card className="min-w-lg">
          <CardHeader>
            <CardTitle className="flex justify-between">
              Acuidade e Refração
              <Button
                size="sm"
                type="button"
                variant="outline"
                onClick={handleImportLastData}
                disabled={
                  createRefractionMutation.isPending ||
                  deleteRefractionMutation.isPending ||
                  isImporting
                }
              >
                {isImporting ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <MdOutlineFileCopy size={18} />
                )}
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Lista de refrações registradas */}
            <EyeRefractionList
              eye="OD"
              refractions={rightEye?.refraction ?? []}
              onDelete={handleDelete}
              deletingIds={deletingIds}
              previousVisualAcuity={
                lastEyesData?.rightEye?.refraction[0]?.visualAcuity ?? undefined
              }
            />
            <EyeRefractionList
              eye="OE"
              refractions={leftEye?.refraction ?? []}
              onDelete={handleDelete}
              deletingIds={deletingIds}
              previousVisualAcuity={
                lastEyesData?.leftEye?.refraction[0]?.visualAcuity ?? undefined
              }
            />
            <Separator />
            {/* Formulário para adicionar novas refrações */}
            <div className="grid grid-cols-2 gap-6">
              {/* Olho Direito */}
              <div>
                <div className="mb-2 flex items-center">
                  <div className="text-sm font-semibold">Olho Direito</div>
                </div>
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="correctionTypeOD"
                    render={({ field }) => (
                      <FormItem className="space-y-3">
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="flex flex-col space-y-1"
                          >
                            <FormItem className="flex items-center space-x-2">
                              <FormControl>
                                <RadioGroupItem value="sc" />
                              </FormControl>
                              <FormLabel className="text-sm font-normal">
                                Sem Correção
                              </FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-2">
                              <FormControl>
                                <RadioGroupItem value="ph" />
                              </FormControl>
                              <FormLabel className="text-sm font-normal">
                                Pinhole
                              </FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-2">
                              <FormControl>
                                <RadioGroupItem value="rx" />
                              </FormControl>
                              <FormLabel className="text-sm font-normal">
                                Refração
                              </FormLabel>
                            </FormItem>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {/* Collapsible para inputs de refração OD */}
                  <Collapsible open={correctionTypeOD === "rx"}>
                    <CollapsibleContent className="space-y-4">
                      {/* Esférico OD */}
                      <FormField
                        control={form.control}
                        name="sphericalOD"
                        render={({ field }) => {
                          const numericValue = parseFloat(
                            String(field.value) || "0",
                          );
                          return (
                            <FormItem>
                              <FormLabel>
                                Esférico:{" "}
                                {numericValue > 0
                                  ? `+${numericValue.toFixed(2)}`
                                  : numericValue.toFixed(2)}
                              </FormLabel>
                              <FormControl>
                                <Input
                                  type="number"
                                  step={0.25}
                                  value={field.value}
                                  onChange={(e) => {
                                    field.onChange(e.target.value);
                                  }}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          );
                        }}
                      />
                      {/* Cilíndrico OD */}
                      <FormField
                        control={form.control}
                        name="cylinderOD"
                        render={({ field }) => {
                          const numericValue = parseFloat(
                            String(field.value) || "0",
                          );
                          return (
                            <FormItem>
                              <FormLabel>
                                Cilíndrico:{" "}
                                {numericValue > 0
                                  ? `+${numericValue.toFixed(2)}`
                                  : numericValue.toFixed(2)}
                              </FormLabel>
                              <FormControl>
                                <Input
                                  type="number"
                                  step={0.25}
                                  value={field.value}
                                  onChange={(e) => {
                                    /**
                                     * Se quiser manter a lógica de "valor negativo" do slider,
                                     * podemos forçar o valor para negativo aqui.
                                     */
                                    const rawValue = parseFloat(
                                      e.target.value || "0",
                                    );
                                    // Exemplo: forçar para negativo
                                    field.onChange(
                                      (-Math.abs(rawValue)).toString(),
                                    );
                                  }}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          );
                        }}
                      />
                      {/* Eixo OD */}
                      <FormField
                        control={form.control}
                        name="axisOD"
                        render={({ field }) => {
                          const numericValue = parseFloat(
                            String(field.value) || "0",
                          );
                          return (
                            <FormItem>
                              <FormLabel>Eixo: {`${numericValue}º`}</FormLabel>
                              <FormControl>
                                <Input
                                  type="number"
                                  step={5}
                                  value={field.value}
                                  onChange={(e) => {
                                    field.onChange(e.target.value);
                                  }}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          );
                        }}
                      />
                    </CollapsibleContent>
                  </Collapsible>
                  {/* Acuidade Visual OD */}
                  <FormField
                    control={form.control}
                    name="visualAcuityOD"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Acuidade Visual</FormLabel>
                        <FormControl>
                          <Select
                            onValueChange={field.onChange}
                            value={field.value}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Selecione AV" />
                            </SelectTrigger>
                            <SelectContent>
                              {visualAcuityOptions.map((option) => (
                                <SelectItem key={option} value={option}>
                                  {option}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              {/* Olho Esquerdo */}
              <div>
                <div className="mb-2 flex items-center">
                  <div className="text-sm font-semibold">Olho Esquerdo</div>
                </div>
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="correctionTypeOS"
                    render={({ field }) => (
                      <FormItem className="space-y-3">
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="flex flex-col space-y-1"
                          >
                            <FormItem className="flex items-center space-x-2">
                              <FormControl>
                                <RadioGroupItem value="sc" />
                              </FormControl>
                              <FormLabel className="text-sm font-normal">
                                Sem Correção
                              </FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-2">
                              <FormControl>
                                <RadioGroupItem value="ph" />
                              </FormControl>
                              <FormLabel className="text-sm font-normal">
                                Pinhole
                              </FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-2">
                              <FormControl>
                                <RadioGroupItem value="rx" />
                              </FormControl>
                              <FormLabel className="text-sm font-normal">
                                Refração
                              </FormLabel>
                            </FormItem>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {/* Collapsible para inputs de refração OS */}
                  <Collapsible open={correctionTypeOS === "rx"}>
                    <CollapsibleContent className="space-y-4">
                      {/* Esférico OS */}
                      <FormField
                        control={form.control}
                        name="sphericalOS"
                        render={({ field }) => {
                          const numericValue = parseFloat(
                            String(field.value) || "0",
                          );
                          return (
                            <FormItem>
                              <FormLabel>
                                Esférico:{" "}
                                {numericValue > 0
                                  ? `+${numericValue.toFixed(2)}`
                                  : numericValue.toFixed(2)}
                              </FormLabel>
                              <FormControl>
                                <Input
                                  type="number"
                                  step={0.25}
                                  value={field.value}
                                  onChange={(e) => {
                                    field.onChange(e.target.value);
                                  }}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          );
                        }}
                      />
                      {/* Cilíndrico OS */}
                      <FormField
                        control={form.control}
                        name="cylinderOS"
                        render={({ field }) => {
                          const numericValue = parseFloat(
                            String(field.value) || "0",
                          );
                          return (
                            <FormItem>
                              <FormLabel>
                                Cilíndrico:{" "}
                                {numericValue > 0
                                  ? `+${numericValue.toFixed(2)}`
                                  : numericValue.toFixed(2)}
                              </FormLabel>
                              <FormControl>
                                <Input
                                  type="number"
                                  step={0.25}
                                  value={field.value}
                                  onChange={(e) => {
                                    /**
                                     * Novamente, se quiser manter a lógica de valor negativo:
                                     */
                                    const rawValue = parseFloat(
                                      e.target.value || "0",
                                    );
                                    field.onChange(
                                      (-Math.abs(rawValue)).toString(),
                                    );
                                  }}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          );
                        }}
                      />
                      {/* Eixo OS */}
                      <FormField
                        control={form.control}
                        name="axisOS"
                        render={({ field }) => {
                          const numericValue = parseFloat(
                            String(field.value) || "0",
                          );
                          return (
                            <FormItem>
                              <FormLabel>Eixo: {`${numericValue}º`}</FormLabel>
                              <FormControl>
                                <Input
                                  type="number"
                                  step={5}
                                  value={field.value}
                                  onChange={(e) => {
                                    field.onChange(e.target.value);
                                  }}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          );
                        }}
                      />
                    </CollapsibleContent>
                  </Collapsible>
                  {/* Acuidade Visual OS */}
                  <FormField
                    control={form.control}
                    name="visualAcuityOS"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Acuidade Visual</FormLabel>
                        <FormControl>
                          <Select
                            onValueChange={field.onChange}
                            value={field.value}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Selecione AV" />
                            </SelectTrigger>
                            <SelectContent>
                              {visualAcuityOptions.map((option) => (
                                <SelectItem key={option} value={option}>
                                  {option}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button
              type="submit"
              className="w-full"
              disabled={createRefractionMutation.isPending}
            >
              {createRefractionMutation.isPending ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                "Adicionar Refração"
              )}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
}
