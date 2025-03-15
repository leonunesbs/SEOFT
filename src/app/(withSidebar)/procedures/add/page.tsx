"use client";

import { PatientForm } from "~/components/organisms/patient-form";

export default function Page() {
  return (
    <div>
      <PatientForm redirect={false} />
    </div>
  );
}
