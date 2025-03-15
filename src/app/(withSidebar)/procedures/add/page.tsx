import { PatientForm } from "~/components/organisms/patient-form";
import { ProcedureForm } from "~/components/organisms/procedure-form";

export default function Page() {
  return (
    <div>
      <PatientForm redirect={false} />
      <ProcedureForm />
    </div>
  );
}
