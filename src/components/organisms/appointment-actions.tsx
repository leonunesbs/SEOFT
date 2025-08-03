"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "~/components/ui/alert-dialog";
import { Calendar, CalendarDays, Edit, User, XCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";

import { AddEvaluationButton } from "~/components/atoms/add-evaluation-button";
import { Button } from "~/components/ui/button";
import Link from "next/link";
import { api } from "~/trpc/react";
import { useState } from "react";
import { useToast } from "~/hooks/use-toast";

interface AppointmentActionsProps {
  appointment: {
    id: string;
    status: string;
    patient: {
      id: string;
      name: string;
      refId: string;
    };
    evaluation?: {
      id: string;
    } | null;
  };
  onRescheduleClick: () => void;
  onAppointmentUpdate?: () => void;
}

export function AppointmentActions({
  appointment,
  onRescheduleClick,
  onAppointmentUpdate,
}: AppointmentActionsProps) {
  const { toast } = useToast();
  const [isCancelDialogOpen, setIsCancelDialogOpen] = useState(false);

  // Verificar se o agendamento pode ser excluído
  const canDelete =
    appointment.status !== "COMPLETED" && !appointment.evaluation;

  const cancelAppointmentMutation = api.appointment.delete.useMutation({
    onSuccess: () => {
      toast({
        title: "Agendamento excluído",
        description: "O agendamento foi excluído com sucesso.",
        variant: "default",
      });
      setIsCancelDialogOpen(false);
      onAppointmentUpdate?.();
    },
    onError: (error) => {
      toast({
        title: "Erro ao excluir",
        description:
          error.message || "Ocorreu um erro ao excluir o agendamento.",
        variant: "destructive",
      });
    },
  });

  const handleCancelAppointment = () => {
    cancelAppointmentMutation.mutate({
      id: appointment.id,
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg sm:text-xl">Ações Rápidas</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-3">
          {/* Ações principais - sempre visíveis */}
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-4">
            <AddEvaluationButton
              patientId={appointment.patient.id}
              patientName={appointment.patient.name}
              variant="outline"
              className="h-auto justify-start py-3"
              customChildren={
                <>
                  <Edit className="mr-2 h-4 w-4 flex-shrink-0" />
                  <span className="text-left">
                    <span className="block font-medium">Nova Avaliação</span>
                    <span className="text-xs text-muted-foreground">
                      Criar avaliação
                    </span>
                  </span>
                </>
              }
            />

            <Button
              variant="outline"
              asChild
              className="h-auto justify-start py-3"
            >
              <Link href={`/patients/${appointment.patient.id}`}>
                <User className="mr-2 h-4 w-4 flex-shrink-0" />
                <span className="text-left">
                  <span className="block font-medium">
                    Histórico do Paciente
                  </span>
                  <span className="text-xs text-muted-foreground">
                    Ver perfil completo
                  </span>
                </span>
              </Link>
            </Button>

            <Button
              variant="outline"
              asChild
              className="h-auto justify-start py-3"
            >
              <Link href={`/patients/${appointment.patient.id}/history`}>
                <Calendar className="mr-2 h-4 w-4 flex-shrink-0" />
                <span className="text-left">
                  <span className="block font-medium">
                    Histórico de Agendamentos
                  </span>
                  <span className="text-xs text-muted-foreground">
                    Ver todos os agendamentos
                  </span>
                </span>
              </Link>
            </Button>

            <Button
              variant="outline"
              className="h-auto w-full justify-start py-3"
              onClick={onRescheduleClick}
            >
              <CalendarDays className="mr-2 h-4 w-4 flex-shrink-0" />
              <span className="text-left">
                <span className="block font-medium">Reagendar</span>
                <span className="text-xs text-muted-foreground">
                  Alterar data/horário
                </span>
              </span>
            </Button>
          </div>

          {/* Ações de cancelamento */}
          <div className="flex flex-col gap-2 sm:flex-row sm:justify-end">
            {!canDelete && (
              <div className="text-xs text-muted-foreground">
                {appointment.evaluation
                  ? "Não é possível excluir um agendamento com avaliação associada"
                  : "Não é possível excluir um agendamento já realizado"}
              </div>
            )}
            <AlertDialog
              open={isCancelDialogOpen}
              onOpenChange={setIsCancelDialogOpen}
            >
              <AlertDialogTrigger asChild>
                <Button
                  variant="destructive"
                  className="justify-start sm:justify-center"
                  disabled={cancelAppointmentMutation.isPending || !canDelete}
                  title={
                    !canDelete
                      ? appointment.evaluation
                        ? "Não é possível excluir um agendamento com avaliação associada"
                        : "Não é possível excluir um agendamento já realizado"
                      : "Excluir agendamento"
                  }
                >
                  <XCircle className="mr-2 h-4 w-4" />
                  {cancelAppointmentMutation.isPending
                    ? "Excluindo..."
                    : "Excluir Agendamento"}
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Confirmar exclusão</AlertDialogTitle>
                  <AlertDialogDescription>
                    Tem certeza que deseja excluir o agendamento do paciente{" "}
                    <strong>{appointment.patient.name}</strong> (ID:{" "}
                    {appointment.patient.refId})?
                    <br />
                    <br />
                    Esta ação irá excluir permanentemente o agendamento e não
                    pode ser desfeita.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel
                    disabled={cancelAppointmentMutation.isPending}
                  >
                    Manter agendamento
                  </AlertDialogCancel>
                  <AlertDialogAction
                    onClick={handleCancelAppointment}
                    disabled={cancelAppointmentMutation.isPending}
                    className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                  >
                    {cancelAppointmentMutation.isPending
                      ? "Excluindo..."
                      : "Sim, excluir"}
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
