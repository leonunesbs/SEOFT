"use client";

import { AddPatientForm } from "./add-patient-form";
import { Button } from "~/components/ui/button";
import { MdOutlinePersonAdd } from "react-icons/md";
import { ResponsiveDialog } from "~/components/ui/responsive-dialog";
import { useState } from "react";

export function AddPatientDialog() {
  const [open, setOpen] = useState(false);

  const handleSuccess = () => {
    setOpen(false);
  };

  const trigger = (
    <Button>
      <MdOutlinePersonAdd />
      Adicionar Paciente
    </Button>
  );

  const content = (
    <div className="space-y-4">
      <p className="text-center text-sm text-muted-foreground sm:text-left">
        Preencha os dados do paciente para criar um novo registro e iniciar sua
        primeira avaliação.
      </p>
      <AddPatientForm onSuccess={handleSuccess} />
    </div>
  );

  return (
    <ResponsiveDialog
      trigger={trigger}
      title="Adicionar Novo Paciente"
      open={open}
      onOpenChange={setOpen}
      className="sm:max-w-[425px]"
    >
      {content}
    </ResponsiveDialog>
  );
}
