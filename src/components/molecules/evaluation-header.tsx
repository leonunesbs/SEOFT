import { ArrowLeft, Clock, Eye, FileText, History } from "lucide-react";
import Link from "next/link";

import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { Card, CardContent } from "~/components/ui/card";
import {
  getTimeElapsed,
  type EvaluationWithRelations,
} from "~/lib/utils/evaluation";

interface EvaluationHeaderProps {
  evaluation: EvaluationWithRelations;
}

export function EvaluationHeader({ evaluation }: EvaluationHeaderProps) {
  const timeElapsed = getTimeElapsed(evaluation.createdAt);

  return (
    <Card>
      <CardContent className="p-4 sm:p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
          {/* Navigation and time info */}
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-3">
            <Button variant="outline" size="sm" asChild className="w-fit">
              <Link href="/evaluations/pending">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Voltar
              </Link>
            </Button>
            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
              <Badge variant="secondary" className="w-fit">
                <Clock className="mr-1 h-3 w-3" />
                {timeElapsed}
              </Badge>
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <FileText className="h-4 w-4" />
                <span className="truncate">{evaluation.collaborator.name}</span>
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-col gap-2 sm:flex-row sm:gap-2">
            <Button
              variant="outline"
              size="sm"
              asChild
              className="w-full sm:w-auto"
            >
              <Link href={`/patients/${evaluation.patient.id}/history`}>
                <History className="mr-2 h-4 w-4" />
                Histórico
              </Link>
            </Button>
            <Button
              variant="outline"
              size="sm"
              asChild
              className="w-full sm:w-auto"
            >
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
