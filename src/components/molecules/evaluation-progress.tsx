import { Progress } from "~/components/ui/progress";
import {
  calculateEvaluationProgress,
  getProgressMessage,
  type EvaluationWithRelations,
} from "~/lib/utils/evaluation";

interface EvaluationProgressProps {
  evaluation: EvaluationWithRelations;
  className?: string;
}

export function EvaluationProgress({
  evaluation,
  className,
}: EvaluationProgressProps) {
  const progress = calculateEvaluationProgress(evaluation);
  const message = getProgressMessage(progress);

  return (
    <div className={`space-y-2 ${className || ""}`}>
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium">Progresso da Avaliação</span>
        <span className="text-sm text-muted-foreground">{progress}%</span>
      </div>
      <Progress value={progress} className="h-2" />
      <p className="text-xs text-muted-foreground">{message}</p>
    </div>
  );
}
