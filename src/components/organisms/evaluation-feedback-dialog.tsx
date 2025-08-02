"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";
import {
  MdCheck,
  MdHome,
  MdPending,
  MdRefresh,
  MdSearch,
} from "react-icons/md";

import { Button } from "~/components/ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface EvaluationFeedbackDialogProps {
  open: boolean;
  evaluationId: string;
  patientName: string;
  isDone: boolean;
  onConclude?: () => void;
}

export function EvaluationFeedbackDialog({
  open,
  evaluationId,
  patientName,
  isDone,
  onConclude,
}: EvaluationFeedbackDialogProps) {
  const router = useRouter();
  const [isNavigating, setIsNavigating] = useState(false);

  const handleConclude = () => {
    setIsNavigating(true);
    if (onConclude) {
      onConclude();
    }

    // Redirecionar automaticamente após um pequeno delay para mostrar o loading
    setTimeout(() => {
      router.push(`/evaluations/${evaluationId}/summary`);
    }, 1500);
  };

  const handleUpdate = () => {
    setIsNavigating(true);
    window.location.reload();
  };

  const handleSearchPatient = () => {
    setIsNavigating(true);
    router.push(`/patients/search`);
  };

  const handleGoHome = () => {
    setIsNavigating(true);
    router.push("/");
  };

  const handlePendingEvaluations = () => {
    setIsNavigating(true);
    router.push("/evaluations/pending");
  };

  return (
    <Dialog open={open} onOpenChange={() => {}}>
      <DialogContent className="sm:max-w-md" showCloseButton={false}>
        <DialogHeader>
          <DialogTitle className="text-center">
            {isDone ? "Avaliação Concluída!" : "Avaliação Salva!"}
          </DialogTitle>
          <DialogDescription className="text-center">
            {isDone
              ? `A avaliação do paciente ${patientName} foi concluída com sucesso. Você será redirecionado para o resumo da avaliação.`
              : `A avaliação do paciente ${patientName} foi salva com sucesso.`}
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-2">
          {!isDone && (
            <Button
              onClick={handleConclude}
              disabled={isNavigating}
              className="w-full"
            >
              {isNavigating ? (
                <>
                  <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                  Redirecionando...
                </>
              ) : (
                <>
                  <MdCheck className="h-4 w-4" />
                  Concluir Avaliação
                </>
              )}
            </Button>
          )}

          <Button
            variant="outline"
            onClick={handleUpdate}
            disabled={isNavigating}
            className="w-full"
          >
            <MdRefresh className="h-4 w-4" />
            Continuar Editando
          </Button>

          <Button
            variant="outline"
            onClick={handleSearchPatient}
            disabled={isNavigating}
            className="w-full"
          >
            <MdSearch className="h-4 w-4" />
            Buscar Paciente
          </Button>

          <Button
            variant="outline"
            onClick={handlePendingEvaluations}
            disabled={isNavigating}
            className="w-full"
          >
            <MdPending className="h-4 w-4" />
            Avaliações Pendentes
          </Button>
          <Button
            variant="outline"
            onClick={handleGoHome}
            disabled={isNavigating}
            className="w-full"
          >
            <MdHome className="h-4 w-4" />
            Início
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
