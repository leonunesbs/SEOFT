"use client";

import { MdOutlinePersonAdd, MdSave } from "react-icons/md";

import { AddPatientForm } from "./add-patient-form";
import { Button } from "~/components/ui/button";
import { ResponsiveDialog } from "~/components/ui/responsive-dialog";
import { useState } from "react";

export function AddPatientDialog() {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSuccess = () => {
    setOpen(false);
    setIsLoading(false);
  };

  const handleLoadingChange = (loading: boolean) => {
    setIsLoading(loading);
  };

  const trigger = (
    <Button>
      <MdOutlinePersonAdd />
      Adicionar Paciente
    </Button>
  );

  const content = (
    <div className="space-y-4">
      <AddPatientForm
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
      {isLoading ? "Salvando..." : "Salvar Paciente"}
    </Button>
  );

  return (
    <ResponsiveDialog
      trigger={trigger}
      title="Adicionar Novo Paciente"
      description="Preencha os dados do paciente para criar um novo registro e iniciar sua primeira avaliação."
      open={open}
      onOpenChange={setOpen}
      className="sm:max-w-[425px]"
      footer={footer}
    >
      {content}
    </ResponsiveDialog>
  );
}
