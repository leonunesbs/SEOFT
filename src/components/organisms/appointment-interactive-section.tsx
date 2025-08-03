"use client";

import {
  AppointmentRescheduleWrapper,
  AppointmentRescheduleWrapperRef,
} from "~/components/organisms/appointment-reschedule-wrapper";

import { AppointmentActions } from "~/components/organisms/appointment-actions";
import { useRef } from "react";

interface AppointmentInteractiveSectionProps {
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
  onAppointmentUpdate?: () => void;
}

export function AppointmentInteractiveSection({
  appointment,
  onAppointmentUpdate,
}: AppointmentInteractiveSectionProps) {
  const rescheduleRef = useRef<AppointmentRescheduleWrapperRef>(null);

  const handleRescheduleClick = () => {
    rescheduleRef.current?.openReschedule();
  };

  return (
    <>
      <AppointmentActions
        appointment={appointment}
        onRescheduleClick={handleRescheduleClick}
        onAppointmentUpdate={onAppointmentUpdate}
      />
      <AppointmentRescheduleWrapper
        ref={rescheduleRef}
        appointment={appointment}
        onRescheduleSuccess={onAppointmentUpdate}
      />
    </>
  );
}
