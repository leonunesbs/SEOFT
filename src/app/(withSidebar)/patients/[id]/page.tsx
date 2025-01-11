import { MdOutlineHistory, MdOutlineUploadFile } from "react-icons/md";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";

import { Loader2 } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AddEvaluationButton } from "~/components/atoms/add-evaluation-button";
import { PageHeading } from "~/components/atoms/page-heading";
import { PatientForm } from "~/components/organisms/patient-form";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { Separator } from "~/components/ui/separator";
import { db } from "~/server/db";

type Params = Promise<{ id: string }>;
export default async function Patient({ params }: { params: Params }) {
  const { id } = await params;

  const patient = await db.patient.findUnique({
    where: { id },
    include: {
      evaluations: {
        include: {
          collaborator: { select: { name: true } },
          clinic: { select: { name: true } },
        },
        orderBy: { createdAt: "desc" },
        take: 6,
      },
    },
  });

  if (!patient) return notFound();
  return (
    <div className="pl-2">
      <div className="mb-4 flex items-center justify-between">
        <PageHeading>Detalhes do Paciente</PageHeading>
        <div className="flex gap-2">
          {/* Botão para reabrir a avaliação */}

          <Button asChild variant={"outline"}>
            <Link href={`/patients/${patient.id}/history`}>
              <MdOutlineHistory />
              Histórico
            </Link>
          </Button>

          <AddEvaluationButton
            patientId={patient.id}
            patientName={patient.name}
            variant={"default"}
            customChildren={
              <>
                <MdOutlineUploadFile />
                Nova Avaliação
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
      </div>

      <PatientForm
        initialData={{
          id: patient.id,
          refId: patient.refId,
          name: patient.name,
          birthDate: patient.birthDate.toISOString(),
        }}
      />
      <Separator className="my-4" />
      <div className="space-y-4">
        <h2 className="text-xl font-bold">Útimas Avaliações</h2>

        {/* Grid responsivo para acomodar os cards */}
        <div className="grid grid-cols-1 gap-4">
          {patient.evaluations.map((evaluation) => (
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
                  {new Date(evaluation.createdAt).toLocaleString()}
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
