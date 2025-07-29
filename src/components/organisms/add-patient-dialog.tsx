"use client";

import { MdOutlinePersonAdd, MdSave } from "react-icons/md";

import { Button } from "~/components/ui/button";
import { PatientForm } from "./patient-form";
import { ResponsiveDialog } from "~/components/ui/responsive-dialog";
import { useState } from "react";

interface AddPatientDialogProps {
  onSuccess?: () => void;
  trigger?: React.ReactNode;
}

export function AddPatientDialog({
  onSuccess,
  trigger,
}: AddPatientDialogProps) {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSuccess = () => {
    setOpen(false);
    setIsLoading(false);
    onSuccess?.(); // Chamar callback personalizado se fornecido
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
      <PatientForm
        variant="dialog"
        compact={true}
        showDescriptions={false}
        formId="add-patient-form"
        onSuccess={handleSuccess}
        onLoadingChange={handleLoadingChange}
      />
    </div>
  );

  const footer = (
    <Button
      type="submit"
      form="add-patient-form"
      disabled={isLoading}
      className="w-full"
    >
      <MdSave />
      {isLoading
        ? "Criando paciente e avaliação..."
        : "Salvar Paciente e Criar Avaliação"}
    </Button>
  );

  return (
    <ResponsiveDialog
      trigger={trigger || defaultTrigger}
      title="Adicionar Novo Paciente"
      description="Preencha os dados do paciente para criar um novo registro e iniciar uma avaliação."
      open={open}
      onOpenChange={setOpen}
      footer={footer}
    >
      {content}
    </ResponsiveDialog>
  );
}
