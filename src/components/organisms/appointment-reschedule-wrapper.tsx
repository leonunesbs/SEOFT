"use client";

import { forwardRef, useImperativeHandle, useState } from "react";

import { AppointmentRescheduleCard } from "~/components/organisms/appointment-reschedule-card";

interface AppointmentRescheduleWrapperProps {
  appointment: {
    id: string;
    patient: {
      name: string;
    };
    patientId: string;
    collaboratorId: string;
    scheduledDate: Date;
    notes?: string | null;
    clinic?: {
      name: string;
    } | null;
  };
  onRescheduleSuccess?: () => void;
}

export interface AppointmentRescheduleWrapperRef {
  openReschedule: () => void;
}

export const AppointmentRescheduleWrapper = forwardRef<
  AppointmentRescheduleWrapperRef,
  AppointmentRescheduleWrapperProps
>(({ appointment, onRescheduleSuccess }, ref) => {
  const [isRescheduleOpen, setIsRescheduleOpen] = useState(false);

  useImperativeHandle(ref, () => ({
    openReschedule: () => setIsRescheduleOpen(true),
  }));

  return (
    <>
      {isRescheduleOpen && (
        <AppointmentRescheduleCard
          appointmentId={appointment.id}
          patientName={appointment.patient.name}
          patientId={appointment.patientId}
          collaboratorId={appointment.collaboratorId}
          currentDate={appointment.scheduledDate}
          currentNotes={appointment.notes || ""}
          isOpen={isRescheduleOpen}
          onClose={() => setIsRescheduleOpen(false)}
          onSuccess={onRescheduleSuccess}
        />
      )}
    </>
  );
});

AppointmentRescheduleWrapper.displayName = "AppointmentRescheduleWrapper";
