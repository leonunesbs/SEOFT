import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";

import Link from "next/link";
import { PageHeading } from "~/components/atoms/page-heading";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { Separator } from "~/components/ui/separator";
import { api } from "~/trpc/server";

type Params = Promise<{ id: string }>;

export default async function PatientHistoryPage({
  params,
}: {
  params: Params;
}) {
  const { id } = await params;
  const patient = await api.patient.getEvaluationHistory(id);

  if (!patient) {
    return (
      <div className="text-center text-lg text-gray-500">
        Patient not found.
      </div>
    );
  }

  const totalEvaluations = patient.evaluations.length;
  const lastEvaluationDate = patient.evaluations[0]?.createdAt || "N/A";
  const lastEvaluationClinic = patient.evaluations[0]?.clinic?.name || "N/A";

  return (
    <div className="space-y-4">
      <PageHeading>Histórico do Paciente</PageHeading>
      {/* Header */}

      {/* Summary Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="flex flex-col justify-between p-4">
          <h2 className="font-semibold text-muted-foreground">
            Total de Avaliações
          </h2>
          <p className="text-right text-lg">{totalEvaluations}</p>
        </Card>
        <Card className="flex flex-col justify-between p-4">
          <h2 className="font-semibold text-muted-foreground">
            Útima Avaliação
          </h2>
          <p className="text-right text-sm">{lastEvaluationClinic}</p>
          <p className="text-right text-sm">
            {new Date(lastEvaluationDate).toLocaleString("pt-BR", {
              timeZone: "UTC",
            })}
          </p>
        </Card>
        <Card className="flex flex-col justify-between p-4">
          <h2 className="font-semibold text-muted-foreground">
            ID do Paciente
          </h2>
          <Link
            className="text-right hover:underline"
            href={`/patients/${patient.id}`}
            aria-label="Ver detalhes do paciente"
          >
            {patient.id}
          </Link>
        </Card>
      </div>

      <Separator />

      <div className="space-y-4">
        <h2 className="text-xl font-bold">Histórico de Avaliações</h2>

        {/* Grid responsivo para acomodar os cards */}
        <div className="grid grid-cols-1 gap-4">
          {patient.evaluations.map((evaluation) => (
            <Card key={evaluation.id} className="shadow-sm">
              <CardHeader>
                <CardTitle>
                  {evaluation.clinic?.name || "Clínica não adicionada"}
                </CardTitle>
                <CardDescription>
                  {evaluation.collaborator?.name || "Médico não selecionado"}
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
                  <strong>Acompanhamento:</strong>{" "}
                  {evaluation.followUp || "N/A"}
                </p>
                <p>
                  <strong>Próxima consulta:</strong>{" "}
                  {evaluation.nextAppointment || "N/A"}
                </p>
              </CardContent>

              <CardFooter className="flex items-center justify-between">
                {/* Exemplo de uso de Badge para o status */}
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
        </div>
      </div>
    </div>
  );
}
