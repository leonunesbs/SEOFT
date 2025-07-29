import {
  ArrowLeft,
  Calendar,
  Clock,
  Eye,
  FileText,
  History,
  User,
} from "lucide-react";
import Link from "next/link";

import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { Card, CardContent } from "~/components/ui/card";
import {
  calculateAge,
  formatDateBR,
  getTimeElapsed,
  type EvaluationWithRelations,
} from "~/lib/utils/evaluation";
import { EvaluationProgress } from "./evaluation-progress";

interface EvaluationHeaderProps {
  evaluation: EvaluationWithRelations;
}

export function EvaluationHeader({ evaluation }: EvaluationHeaderProps) {
  const patientAge = calculateAge(new Date(evaluation.patient.birthDate));
  const timeElapsed = getTimeElapsed(evaluation.createdAt);
  const formattedBirthDate = formatDateBR(
    new Date(evaluation.patient.birthDate),
  );

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-start justify-between gap-6">
          {/* Patient and evaluation info */}
          <div className="flex-1 space-y-4">
            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm" asChild>
                <Link href="/evaluations/pending">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Voltar
                </Link>
              </Button>
              <Badge variant="outline">#{evaluation.patient.refId}</Badge>
              <Badge variant="secondary">
                <Clock className="mr-1 h-3 w-3" />
                {timeElapsed}
              </Badge>
            </div>

            <div className="space-y-2">
              <h1 className="text-2xl font-semibold text-foreground">
                {evaluation.patient.name}
              </h1>
              <div className="flex items-center gap-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <User className="h-4 w-4" />
                  <span>{patientAge} anos</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <span>{formattedBirthDate}</span>
                </div>
                <div className="flex items-center gap-1">
                  <FileText className="h-4 w-4" />
                  <span>{evaluation.collaborator.name}</span>
                </div>
              </div>
            </div>

            {/* Progress Section */}
            <EvaluationProgress evaluation={evaluation} />
          </div>

          {/* Action buttons */}
          <div className="flex gap-2">
            <Button variant="outline" size="sm" asChild>
              <Link href={`/patients/${evaluation.patient.id}/history`}>
                <History className="mr-2 h-4 w-4" />
                Histórico
              </Link>
            </Button>
            <Button variant="outline" size="sm" asChild>
              <Link href={`/patients/${evaluation.patient.id}`}>
                <Eye className="mr-2 h-4 w-4" />
                Ver Paciente
              </Link>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
