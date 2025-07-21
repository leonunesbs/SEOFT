"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { useEffect, useState } from "react";

import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { MdSave } from "react-icons/md";
import { api } from "~/trpc/react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useToast } from "~/hooks/use-toast";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

function applyDateMask(event: React.ChangeEvent<HTMLInputElement>) {
  const input = event.target;
  let value = input.value.replace(/\D/g, ""); // Remove caracteres não numéricos

  if (value.length > 2) {
    value = `${value.slice(0, 2)}/${value.slice(2)}`;
  }
  if (value.length > 5) {
    value = `${value.slice(0, 5)}/${value.slice(5, 9)}`;
  }

  input.value = value.slice(0, 10); // Limita ao máximo de 10 caracteres
}

function parseToYYYYMMDD(date: string) {
  const [day, month, year] = date.split("/");
  return `${year}-${month}-${day}`;
}

const formSchema = z.object({
  refId: z
    .string()
    .min(1, "O ID do Paciente não pode ser vazio")
    .regex(/^\d+$/, "O ID do Paciente deve ser um número natural")
    .transform((val) => val.replace(/^0+/, "")), // Remove zeros à esquerda
  name: z.string().min(1, "O nome do paciente é obrigatório").toUpperCase(),
  birthDate: z
    .string()
    .regex(/^\d{2}\/\d{2}\/\d{4}$/, {
      message: "A data de nascimento deve estar no formato DD/MM/YYYY.",
    })
    .refine((val) => !isNaN(Date.parse(parseToYYYYMMDD(val))), {
      message: "Insira uma data válida.",
    }),
});

type AddPatientFormProps = {
  onSuccess?: () => void;
};

export function AddPatientForm({ onSuccess }: AddPatientFormProps) {
  const { toast } = useToast();
  const router = useRouter();
  const [currentCollaboratorId, setCurrentCollaboratorId] = useState<
    string | null
  >(null);

  // Obter o colaborador atual via cookie
  useEffect(() => {
    const fetchCurrentCollaborator = async () => {
      try {
        const response = await fetch("/api/v1/collaborator-switcher");
        const data = await response.json();
        setCurrentCollaboratorId(data.collaboratorId);
      } catch (error) {
        console.error("Erro ao obter colaborador atual:", error);
      }
    };
    fetchCurrentCollaborator();
  }, []);

  const formHandler = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      refId: "",
      name: "",
      birthDate: "",
    },
  });

  const createPatient = api.patient.create.useMutation({
    onError(error) {
      toast({
        title: "Erro",
        description: error.message,
        variant: "destructive",
        duration: 2000,
      });
    },
    onSuccess(patient) {
      toast({
        title: "Sucesso!",
        description: "Paciente criado com sucesso.",
        variant: "default",
        duration: 2000,
      });
      formHandler.reset();
      onSuccess?.();

      // Criar avaliação automaticamente se houver colaborador selecionado
      if (currentCollaboratorId) {
        createEvaluation.mutate({
          patientId: patient.id,
          collaboratorId: currentCollaboratorId,
        });
      } else {
        // Se não houver colaborador selecionado, apenas recarregar a página
        window.location.reload();
      }
    },
  });

  const createEvaluation = api.evaluation.create.useMutation({
    onError(error) {
      toast({
        title: "Erro ao criar avaliação",
        description: error.message,
        variant: "destructive",
        duration: 2000,
      });
      // Em caso de erro na criação da avaliação, recarregar a página
      window.location.reload();
    },
    onSuccess(evaluation) {
      toast({
        title: "Avaliação criada!",
        description: "Redirecionando para a avaliação...",
        variant: "default",
        duration: 2000,
      });
      // Redirecionar para a página da avaliação
      router.push(`/evaluations/${evaluation.id}`);
    },
  });

  const isLoading = createPatient.isPending || createEvaluation.isPending;

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const formattedValues = {
      ...values,
      birthDate: parseToYYYYMMDD(values.birthDate),
    };

    await createPatient.mutateAsync(formattedValues);
  }

  return (
    <Form {...formHandler}>
      <form
        onSubmit={formHandler.handleSubmit(onSubmit)}
        className="space-y-4"
        aria-label="Formulário de Adição de Paciente"
      >
        <div className="grid grid-cols-1 gap-3">
          <FormField
            control={formHandler.control}
            name="refId"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel htmlFor="refId" className="text-sm">
                  Nº do prontuário
                </FormLabel>
                <FormControl>
                  <Input
                    id="refId"
                    placeholder="Digite o número do prontuário"
                    {...field}
                    aria-invalid={fieldState.invalid}
                    aria-describedby="refId-error"
                    className="h-8 text-sm"
                  />
                </FormControl>
                <FormMessage id="refId-error" className="text-xs" />
              </FormItem>
            )}
          />

          <FormField
            control={formHandler.control}
            name="name"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel htmlFor="name" className="text-sm">
                  Nome completo
                </FormLabel>
                <FormControl>
                  <Input
                    id="name"
                    placeholder="Digite o nome completo do paciente"
                    {...field}
                    aria-invalid={fieldState.invalid}
                    aria-describedby="name-error"
                    className="h-8 text-sm"
                  />
                </FormControl>
                <FormMessage id="name-error" className="text-xs" />
              </FormItem>
            )}
          />

          <FormField
            control={formHandler.control}
            name="birthDate"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel htmlFor="birthDate" className="text-sm">
                  Data de nascimento
                </FormLabel>
                <FormControl>
                  <Input
                    id="birthDate"
                    placeholder="DD/MM/YYYY"
                    {...field}
                    onChange={(event) => {
                      applyDateMask(event);
                      field.onChange(event);
                    }}
                    aria-invalid={fieldState.invalid}
                    aria-describedby="birthDate-error"
                    className="h-8 text-sm"
                  />
                </FormControl>
                <FormMessage id="birthDate-error" className="text-xs" />
              </FormItem>
            )}
          />
        </div>

        <Button type="submit" disabled={isLoading} size="sm" className="w-full">
          <MdSave />
          {isLoading ? "Salvando..." : "Salvar Paciente"}
        </Button>
      </form>
    </Form>
  );
}
