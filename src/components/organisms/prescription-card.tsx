import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";

import { useParams } from "next/navigation";
import { api } from "~/trpc/react";
import { PrescriptionFormDialog } from "./prescription-dialog-form";

// type PrescriptionItemProps = {
//   item: Prisma.PrescriptionItemGetPayload<{
//     select: {
//       id: true;
//       medication: true;
//       selectedMedicationInstruction: true;
//       customInstruction: true;
//     };
//   }>;
//   eye: string;
//   onDelete: (surgeryId: string) => void;
//   isLoading: boolean; // Novo prop para indicar se o botão está em loading
// };

// function PrescriptionItem({
//   item,
//   eye,
//   onDelete,
//   isLoading,
// }: PrescriptionItemProps) {
//   return (
//     <div className="flex items-center justify-between gap-2">
//       <div className="flex gap-1">
//         <Badge className="w-10 justify-center">{eye}</Badge>
//       </div>
//       <span className="flex gap-1">
//         {item.medication?.name}
//         {item.medication && (
//           <TooltipProvider>
//             <Tooltip>
//               <TooltipTrigger type="button">
//                 <MdOutlineInfo size={18} />
//               </TooltipTrigger>
//               <TooltipContent>
//                 <p>
//                   {item.selectedMedicationInstruction || item.customInstruction}
//                 </p>
//               </TooltipContent>
//             </Tooltip>
//           </TooltipProvider>
//         )}
//       </span>
//       <Button
//         type="button"
//         size="icon"
//         onClick={() => onDelete(item.id)}
//         disabled={isLoading} // Desativa o botão se estiver carregando
//       >
//         {isLoading ? (
//           <Loader2 className="h-4 w-4 animate-spin" />
//         ) : (
//           <MdCancel />
//         )}
//       </Button>
//     </div>
//   );
// }

export function PrescriptionCard() {
  const params = useParams();
  const evaluationId = params.id as string;
  const prescription =
    api.prescription.getFirstPrescription.useQuery(evaluationId);
  return (
    <Card>
      <CardHeader>
        <CardTitle>Prescrição</CardTitle>
      </CardHeader>
      <CardContent>
        {prescription.data?.prescriptionItems.map((item) => (
          <div key={item.id}>
            <p>{item.medication?.name}</p>
            <p>{item.eye}</p>
            <p>{item.customInstruction}</p>
            <p>{item.selectedMedicationInstruction}</p>
            <p>{item.quantity}</p>
          </div>
        ))}
      </CardContent>
      <CardFooter>
        <PrescriptionFormDialog />
      </CardFooter>
    </Card>
  );
}
