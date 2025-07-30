"use client";

import { type Collaborator, type Patient, type Prisma } from "@prisma/client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import {
  Form,
  FormControl,
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

import { Loader2, RefreshCw } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { type UseFormReturn } from "react-hook-form";
import { useToast } from "~/hooks/use-toast";
import { calculateAge, formatDateBR } from "~/lib/utils/evaluation";
import { api } from "~/trpc/react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

type EvaluationIdentificationFormProps = {
  form: UseFormReturn<{ collaborator: string; clinic: string }>;
  patient: Patient;
  collaborator: Collaborator;
  clinics: Prisma.ClinicGetPayload<{
    include: {
      collaborators: {
        select: {
          collaborator: {
            select: {
              name: true;
            };
          };
        };
      };
    };
  }>[];
};

export function EvaluationIdentificationForm({
  form,
  patient,
  collaborator,
  clinics,
}: EvaluationIdentificationFormProps) {
  const [isSyncing, setIsSyncing] = useState(false);
  const { toast } = useToast();

  const currentCollaborator = api.utils.currentCollaborator.useQuery();

  const handleSyncCollaborator = async () => {
    if (!currentCollaborator.data?.collaboratorId) {
      toast({
        title: "Aviso",
        description: "Nenhum colaborador atual selecionado",
        variant: "destructive",
      });
      return;
    }

    setIsSyncing(true);
    try {
      // Verificar se o colaborador atual é diferente do colaborador da avaliação
      if (currentCollaborator.data.collaboratorId === collaborator.id) {
        toast({
          title: "Informação",
          description: "Colaborador já está sincronizado",
        });
        return;
      }

      // Buscar os dados do colaborador atual via tRPC
      const response = await fetch(
        `/api/trpc/staff.get?input=${currentCollaborator.data.collaboratorId}`,
      );

      if (!response.ok) {
        throw new Error(`Erro ao buscar colaborador: ${response.status}`);
      }

      const result = await response.json();

      if (result.result?.data) {
        const currentCollaboratorData = result.result.data;
        const collaboratorDisplay = `[${currentCollaboratorData.crm}] ${currentCollaboratorData.name}`;

        // Atualizar o campo do formulário
        form.setValue("collaborator", collaboratorDisplay);

        toast({
          title: "Sucesso",
          description: `Colaborador sincronizado: ${currentCollaboratorData.name}`,
        });
      } else {
        toast({
          title: "Erro",
          description: "Dados do colaborador não encontrados",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Erro ao sincronizar colaborador:", error);
      toast({
        title: "Erro",
        description: "Erro ao sincronizar colaborador. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsSyncing(false);
    }
  };

  const patientAge = calculateAge(new Date(patient.birthDate));
  const formattedBirthDate = formatDateBR(new Date(patient.birthDate));

  return (
    <Form {...form}>
      <form className="space-y-4">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-1">
              <Badge variant="outline">#{patient.refId}</Badge>
              <Link
                href={`/patients/${patient.id}`}
                className="hover:underline"
              >
                <CardTitle>{patient.name}</CardTitle>
              </Link>
            </div>
            <CardDescription className="flex gap-2">
              <span>Idade: {patientAge} anos</span>
              <span>-</span>
              <span className="text-sm text-muted-foreground">
                Nascimento: {formattedBirthDate}
              </span>
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex w-full flex-col gap-4 sm:flex-row">
              <FormField
                control={form.control}
                name="collaborator"
                render={({ field }) => (
                  <FormItem className="w-full sm:w-3/5">
                    <FormLabel>Médico</FormLabel>
                    <div className="flex gap-2">
                      <FormControl>
                        <Input
                          {...field}
                          readOnly
                          className="cursor-not-allowed"
                        />
                      </FormControl>
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        onClick={handleSyncCollaborator}
                        disabled={isSyncing}
                        className="h-10 w-10 shrink-0"
                        title="Sincronizar colaborador atual"
                      >
                        {isSyncing ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <RefreshCw className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="clinic"
                render={({ field }) => (
                  <FormItem className="w-full sm:w-2/5">
                    <FormLabel>Ambulatório</FormLabel>
                    <FormControl>
                      <Select
                        {...field}
                        onValueChange={field.onChange}
                        value={field.value}
                        required
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione o ambulatório" />
                        </SelectTrigger>
                        <SelectContent>
                          {clinics.map((clinic) => (
                            <SelectItem key={clinic.id} value={clinic.id}>
                              {clinic.name}
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
          </CardContent>
        </Card>
      </form>
    </Form>
  );
}
