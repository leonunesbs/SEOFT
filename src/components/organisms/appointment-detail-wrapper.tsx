"use client";

import { AppointmentInteractiveSection } from "~/components/organisms/appointment-interactive-section";
import { api } from "~/trpc/react";
import { useRouter } from "next/navigation";

interface AppointmentDetailWrapperProps {
  appointment: {
    id: string;
    status: string;
    patient: {
      name: string;
      refId: string;
      birthDate?: Date | null;
    };
    patientId: string;
    collaboratorId: string;
    scheduledDate: Date;
    notes?: string | null;
    clinic?: {
      name: string;
    } | null;
    collaborator: {
      name: string;
      crm?: string | null;
    };
    evaluation?: {
      id: string;
      done: boolean;
      diagnosis?: string | null;
      treatment?: string | null;
      returnNotes?: string | null;
    } | null;
  };
}

export function AppointmentDetailWrapper({
  appointment,
}: AppointmentDetailWrapperProps) {
  const router = useRouter();
  const utils = api.useUtils();

  const handleAppointmentUpdate = () => {
    // Revalidar os dados do agendamento específico
    utils.appointment.getById.invalidate({ id: appointment.id });

    // Revalidar outras queries relacionadas
    utils.appointment.getAll.invalidate();
    utils.appointment.getToday.invalidate();
    utils.appointment.getUpcoming.invalidate();

    // Recarregar a página para garantir que os dados estejam atualizados
    router.refresh();
  };

  return (
    <AppointmentInteractiveSection
      appointment={appointment}
      onAppointmentUpdate={handleAppointmentUpdate}
    />
  );
}
