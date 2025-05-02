import { MdOutlineHistory, MdOutlineUploadFile } from "react-icons/md";

import { AddEvaluationButton } from "~/components/atoms/add-evaluation-button";
import { Button } from "~/components/ui/button";
import Link from "next/link";
import { Loader2 } from "lucide-react";
import { PageHeading } from "~/components/atoms/page-heading";
import { PatientForm } from "~/components/organisms/patient-form";
import { db } from "~/server/db";
import { notFound } from "next/navigation";

type Params = Promise<{ id: string }>;
export default async function Patient({ params }: { params: Params }) {
  const { id } = await params;

  const patient = await db.patient.findUnique({
    where: { id },
    select: {
      id: true,
      refId: true,
      name: true,
      birthDate: true,
    },
  });

  if (!patient) return notFound();

  return (
    <div className="space-y-6">
      <div className="flex justify-between">
        <PageHeading>Detalhes do Paciente</PageHeading>
        <div className="flex gap-2">
          <AddEvaluationButton
            patientId={patient.id}
            patientName={patient.name}
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
          <Button asChild variant={"outline"}>
            <Link href={`/patients/${patient.id}/history`}>
              <MdOutlineHistory />
              <span className="hidden sm:inline">Histórico</span>
            </Link>
          </Button>
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
    </div>
  );
}
