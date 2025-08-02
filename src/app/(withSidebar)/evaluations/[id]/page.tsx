import { notFound, redirect } from "next/navigation";

import { EvaluationForm } from "~/components/organisms/evaluation-form";
import { EvaluationHeader } from "~/components/molecules/evaluation-header";
import { getEvaluationPageData } from "~/server/api/services/evaluation-data";

type Params = Promise<{ id: string }>;

export default async function EvaluationPage({ params }: { params: Params }) {
  const { id } = await params;

  // Buscar todos os dados necessários de uma vez
  const data = await getEvaluationPageData(id);

  if (!data) {
    notFound();
  }

  const {
    evaluation: rawEvaluation,
    lastEvaluation,
    clinics,
    medications,
    firstPrescription,
    patientSurgeries,
    occupancyData,
  } = data;

  // Transform the evaluation to match the expected type
  const evaluation = rawEvaluation as any;

  // Redirecionar se a avaliação já estiver completa
  if (evaluation.done) {
    redirect(`/evaluations/${id}/summary`);
  }

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <EvaluationHeader evaluation={evaluation} />

      {/* Evaluation Form */}
      <EvaluationForm
        evaluation={evaluation}
        lastEvaluationData={lastEvaluation ?? undefined}
        clinics={clinics}
        medications={medications}
        firstPrescription={firstPrescription ?? undefined}
        patientSurgeries={patientSurgeries}
        occupancyData={occupancyData}
      />
    </div>
  );
}
