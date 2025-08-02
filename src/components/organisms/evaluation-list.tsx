"use client";

import { type Evaluation } from "@prisma/client";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { MdOutlineUploadFile } from "react-icons/md";
import { AddEvaluationButton } from "~/components/atoms/add-evaluation-button";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { EvaluationFilters } from "./evaluation-filters";

interface EvaluationListProps {
  evaluations: (Evaluation & {
    collaborator: { name: string; id: string } | null;
    clinic: { name: string; id: string } | null;
  })[];
  patientId: string;
  patientName: string;
}

export function EvaluationList({
  evaluations,
  patientId,
  patientName,
}: EvaluationListProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const selectedClinic = searchParams.get("clinic") ?? undefined;
  const selectedCollaborator = searchParams.get("collaborator") ?? undefined;
  const selectedDate = searchParams.get("date")
    ? new Date(searchParams.get("date")!)
    : undefined;

  const updateFilters = useCallback(
    (updates: Record<string, string | undefined>) => {
      const params = new URLSearchParams(searchParams.toString());

      Object.entries(updates).forEach(([key, value]) => {
        if (value) {
          params.set(key, value);
        } else {
          params.delete(key);
        }
      });

      const newUrl = params.toString() ? `?${params.toString()}` : "";
      router.push(newUrl, { scroll: false });
    },
    [router, searchParams],
  );

  // Extract unique clinics and collaborators for filters
  const uniqueClinics = Array.from(
    new Set(evaluations.map((ev) => ev.clinic?.id).filter(Boolean)),
  ).map((id) => {
    const clinic = evaluations.find((ev) => ev.clinic?.id === id)?.clinic;
    return {
      id: id as string,
      name: clinic?.name ?? "Clínica não especificada",
    };
  });

  const uniqueCollaborators = Array.from(
    new Set(evaluations.map((ev) => ev.collaborator?.id).filter(Boolean)),
  ).map((id) => {
    const collaborator = evaluations.find(
      (ev) => ev.collaborator?.id === id,
    )?.collaborator;
    return {
      id: id as string,
      name: collaborator?.name ?? "Médico não especificado",
    };
  });

  // Filter evaluations based on selected filters
  const filteredEvaluations = evaluations.filter((evaluation) => {
    const matchesClinic =
      !selectedClinic ||
      selectedClinic === "all" ||
      evaluation.clinic?.id === selectedClinic;
    const matchesCollaborator =
      !selectedCollaborator ||
      selectedCollaborator === "all" ||
      evaluation.collaborator?.id === selectedCollaborator;
    const matchesDate =
      !selectedDate ||
      new Date(evaluation.createdAt).toDateString() ===
        selectedDate.toDateString();

    return matchesClinic && matchesCollaborator && matchesDate;
  });

  return (
    <div className="space-y-4">
      {/* Filtros de Avaliação */}
      <EvaluationFilters
        clinics={uniqueClinics}
        collaborators={uniqueCollaborators}
        selectedClinic={selectedClinic}
        selectedCollaborator={selectedCollaborator}
        selectedDate={selectedDate}
        onClinicChange={(value) => updateFilters({ clinic: value })}
        onCollaboratorChange={(value) => updateFilters({ collaborator: value })}
        onDateChange={(date) => updateFilters({ date: date?.toISOString() })}
      />

      {/* Grid responsivo para acomodar os cards */}
      <div className="grid grid-cols-1 gap-4">
        {filteredEvaluations.map((evaluation) => (
          <Card key={evaluation.id} className="shadow-sm">
            <CardHeader>
              <CardTitle>
                {evaluation.clinic?.name || "Não adicionado"}
              </CardTitle>
              <CardDescription>
                {evaluation.collaborator?.name || "Não adicionado"}
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-2">
              <p>
                <strong>Data:</strong>{" "}
                {new Date(evaluation.createdAt).toLocaleString("pt-BR", {
                  timeZone: "America/Sao_Paulo",
                })}
              </p>
              <p>
                <strong>Diagnóstico:</strong> {evaluation.diagnosis || "N/A"}
              </p>
              <p>
                <strong>Tratamento:</strong> {evaluation.treatment || "N/A"}
              </p>
              <p>
                <strong>Acompanhamento:</strong> {evaluation.followUp || "N/A"}
              </p>
              <p>
                <strong>Próxima consulta:</strong>{" "}
                {evaluation.nextAppointment || "N/A"}
              </p>
              {evaluation.returnNotes && (
                <p>
                  <strong>Notas para retorno:</strong> {evaluation.returnNotes}
                </p>
              )}
            </CardContent>

            <CardFooter className="flex items-center justify-between">
              <Badge variant={evaluation.done ? "default" : "secondary"}>
                {evaluation.done ? "Finalizado" : "Pendente"}
              </Badge>
              <Link href={`/evaluations/${evaluation.id}`} passHref>
                <Button variant="outline" size="sm">
                  Ver Detalhes
                </Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
        {filteredEvaluations.length === 0 && (
          <div className="flex flex-col items-center justify-center gap-4 p-8 text-center">
            <p className="text-muted-foreground">
              Nenhuma avaliação encontrada para os filtros selecionados.
            </p>
            <AddEvaluationButton
              patientId={patientId}
              patientName={patientName}
              variant={"default"}
              customChildren={
                <>
                  <MdOutlineUploadFile />
                  <span className="hidden sm:inline">Nova Avaliação</span>
                </>
              }
              customLoading={
                <>
                  <Loader2 className="animate-spin" />
                  Carregando...
                </>
              }
            />
          </div>
        )}
      </div>
    </div>
  );
}
