"use client";

import { MdOutlinePersonAdd, MdSave } from "react-icons/md";

import { Button } from "~/components/ui/button";
import { PatientFormForIndication } from "./patient-form-for-indication";
import { ResponsiveDialog } from "~/components/ui/responsive-dialog";
import { useState } from "react";

interface AddPatientDialogForIndicationProps {
  onSuccess?: (patient: {
    id: string;
    refId: string;
    name: string;
    birthDate: string;
  }) => void;
  trigger?: React.ReactNode;
}

export function AddPatientDialogForIndication({
  onSuccess,
  trigger,
}: AddPatientDialogForIndicationProps) {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSuccess = (patient: {
    id: string;
    refId: string;
    name: string;
    birthDate: string;
  }) => {
    setOpen(false);
    setIsLoading(false);
    onSuccess?.(patient); // Chamar callback personalizado com os dados do paciente
  };

  const handleLoadingChange = (loading: boolean) => {
    setIsLoading(loading);
  };

  const defaultTrigger = (
    <Button>
      <MdOutlinePersonAdd />
      Adicionar Paciente
    </Button>
  );

  const content = (
    <div className="space-y-4">
      <PatientFormForIndication
        variant="dialog"
        compact={true}
        showDescriptions={false}
        formId="add-patient-for-indication-form"
        onSuccess={handleSuccess}
        onLoadingChange={handleLoadingChange}
      />
    </div>
  );

  const footer = (
    <Button
      type="submit"
      form="add-patient-for-indication-form"
      disabled={isLoading}
      className="w-full"
    >
      <MdSave />
      {isLoading ? "Criando paciente..." : "Salvar Paciente"}
    </Button>
  );

  return (
    <ResponsiveDialog
      trigger={trigger || defaultTrigger}
      title="Adicionar Novo Paciente"
      description="Preencha os dados do paciente para criar um novo registro (sem avaliação automática)."
      open={open}
      onOpenChange={setOpen}
      footer={footer}
    >
      {content}
    </ResponsiveDialog>
  );
}
