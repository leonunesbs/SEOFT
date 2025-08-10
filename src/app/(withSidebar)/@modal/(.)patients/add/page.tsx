import { PatientFormPage } from "~/components/organisms/patient-form-page";
import { RouteModal } from "~/components/ui/route-modal";

export default function Page() {
  return (
    <RouteModal title="Novo Paciente">
      <PatientFormPage />
    </RouteModal>
  );
}
