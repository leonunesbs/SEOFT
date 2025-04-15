import { Medication, Prisma } from "@prisma/client";
import { MdCancel, MdOutlineInfo, MdOutlinePrint } from "react-icons/md";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { api } from "~/trpc/react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { PrescriptionFormDialog } from "./prescription-dialog-form";

type PrescriptionItemProps = {
  item: Prisma.PrescriptionItemGetPayload<{
    include: {
      medication: true;
    };
  }>;
  eye: string;
  onDelete: (surgeryId: string) => void;
  isLoading: boolean;
};

function PrescriptionItem({
  item,
  eye,
  onDelete,
  isLoading,
}: PrescriptionItemProps) {
  return (
    <div className="flex items-center justify-between gap-2">
      <div className="flex gap-1">
        <Badge className="w-10 justify-center">{eye}</Badge>
      </div>
      <span className="flex gap-1">
        {item.medication?.name}
        {item.medication && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger type="button">
                <MdOutlineInfo size={18} />
              </TooltipTrigger>
              <TooltipContent>
                <p>
                  {item.selectedMedicationInstruction || item.customInstruction}
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </span>
      <Button
        type="button"
        size="icon"
        onClick={() => onDelete(item.id)}
        disabled={isLoading}
      >
        {isLoading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <MdCancel />
        )}
      </Button>
    </div>
  );
}

export function PrescriptionCard({
  medications,
  firstPrescription,
}: {
  medications: Medication[];
  firstPrescription?: Prisma.PrescriptionGetPayload<{
    include: {
      prescriptionItems: {
        include: {
          medication: true;
        };
      };
    };
  }>;
}) {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const deleteMutation = api.prescription.deletePrescriptionItem.useMutation({
    onSuccess: () => {
      router.refresh();
    },
    onError: (error) => {
      console.error("Error deleting prescription item:", error);
    },
  });
  const handleDelete = (id: string) => {
    setDeletingId(id);
    deleteMutation.mutate(id, {
      onSettled: () => {
        setDeletingId(null); // volta ao normal depois que termina
      },
    });
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Prescrição</CardTitle>
          <Button
            variant={"outline"}
            onClick={() => {
              // abrir nova janela pequena e sem barra de de busca
              window.open(
                `/print/prescription/${firstPrescription?.id}`,
                "_blank",
                "width=800,height=600,menubar=no,toolbar=no,location=no,status=no,scrollbars=yes,resizable=yes",
              );
            }}
          >
            <MdOutlinePrint size={18} />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        {firstPrescription?.prescriptionItems.map((item) => (
          <PrescriptionItem
            key={item.id}
            item={item}
            eye={item.eye as string}
            onDelete={handleDelete}
            isLoading={deletingId === item.id}
          />
        ))}
      </CardContent>
      <CardFooter>
        <PrescriptionFormDialog
          medications={medications.map((medication) => ({
            ...medication,
            createdAt: medication.createdAt.toISOString(),
            updatedAt: medication.updatedAt.toISOString(),
          }))}
        />
      </CardFooter>
    </Card>
  );
}
