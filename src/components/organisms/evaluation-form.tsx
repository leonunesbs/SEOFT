"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Medication, type EyeSurgery, type Prisma } from "@prisma/client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { MdCheck, MdOutlineHistory, MdSave } from "react-icons/md";
import { z } from "zod";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "~/components/ui/alert-dialog";
import { Button } from "~/components/ui/button";
import { toast } from "~/hooks/use-toast";
import { useUnsavedChanges } from "~/hooks/use-unsaved-changes";
import { api } from "~/trpc/react";
import { ElapsedTime } from "../atoms/elapsed-time";
import { RemoveEvaluationButton } from "../atoms/remove-evaluation-button";
import { Separator } from "../ui/separator";
import { EvaluationFeedbackDialog } from "./evaluation-feedback-dialog";
import { EvaluationIdentificationForm } from "./evaluation-identification-form";
import {
  EvaluationMainForm,
  type EvaluationMainFormValues,
} from "./evaluation-main-form";
import { EvaluationRefractionForm } from "./evaluation-refraction-form";
import { PrescriptionCard } from "./prescription-card";

// Schemas de validação
const identificationSchema = z.object({
  collaborator: z.string(),
  clinic: z.string(),
});

const mainFormSchema = z
  .object({
    date: z.string().optional(),
    procedure: z.string().optional(),
    notes: z.string().optional(),
    biomicroscopyOD: z.string().optional(),
    biomicroscopyOS: z.string().optional(),
    fundoscopyOD: z.string().optional(),
    fundoscopyOS: z.string().optional(),
    gonioscopyOD: z.string().optional(),
    gonioscopyOS: z.string().optional(),
    tonometryOD: z.string().optional(),
    tonometryOS: z.string().optional(),
    pachymetryOD: z.string().optional(),
    pachymetryOS: z.string().optional(),
    octOD: z.string().optional(),
    octOS: z.string().optional(),
    ctCorneaOD: z.string().optional(),
    ctCorneaOS: z.string().optional(),
    angiographyOD: z.string().optional(),
    angiographyOS: z.string().optional(),
    opticalBiometryOD: z.string().optional(),
    opticalBiometryOS: z.string().optional(),
    specularMicroscopyOD: z.string().optional(),
    specularMicroscopyOS: z.string().optional(),
    visualFieldOD: z.string().optional(),
    visualFieldOS: z.string().optional(),
    retinographyOD: z.string().optional(),
    retinographyOS: z.string().optional(),
    // Annotation fields for each exam
    octAnnotationOD: z.string().optional(),
    octAnnotationOS: z.string().optional(),
    visualFieldAnnotationOD: z.string().optional(),
    visualFieldAnnotationOS: z.string().optional(),
    angiographyAnnotationOD: z.string().optional(),
    angiographyAnnotationOS: z.string().optional(),
    ctCorneaAnnotationOD: z.string().optional(),
    ctCorneaAnnotationOS: z.string().optional(),
    retinographyAnnotationOD: z.string().optional(),
    retinographyAnnotationOS: z.string().optional(),
    clinicalData: z.string().min(1, "Dados clínicos são obrigatórios."),
    continuousData: z.string().optional(),
    diagnosis: z.string().min(1, "Diagnóstico é obrigatório."),
    treatment: z.string().optional(),
    followUp: z.string().optional(),
    nextAppointment: z.string().optional(),
    returnDate: z.string().optional(),
    returnTime: z.enum(["07:00", "13:00"]).optional(),
    returnNotes: z.string().optional(),
  })
  .refine(
    (data) => {
      // Se returnDate estiver preenchido, returnTime também deve estar
      if (data.returnDate && !data.returnTime) {
        return false;
      }
      return true;
    },
    {
      message: "Turno é obrigatório quando a data de retorno é selecionada",
      path: ["returnTime"], // Mostra o erro no campo de turno
    },
  )
  .refine(
    (data) => {
      // Se ambos os campos estiverem preenchidos, validar se a data não é no passado
      if (data.returnDate && data.returnTime) {
        const scheduledDate = new Date(`${data.returnDate}T${data.returnTime}`);
        const now = new Date();
        return scheduledDate > now;
      }
      return true;
    },
    {
      message: "A data de retorno não pode ser no passado",
      path: ["returnDate"],
    },
  )
  .refine(
    (data) => {
      // Se returnDate e returnTime estiverem preenchidos, returnNotes deve estar preenchido
      if (data.returnDate && data.returnTime && !data.returnNotes?.trim()) {
        return false;
      }
      return true;
    },
    {
      message:
        "Notas para o retorno são obrigatórias quando uma data e turno são selecionados",
      path: ["returnNotes"],
    },
  );

type IdentificationFormValues = z.infer<typeof identificationSchema>;

type EvaluationFormProps = {
  patientSurgeries: Array<{
    eyes: {
      leftEye: { surgeries: EyeSurgery[] };
      rightEye: { surgeries: EyeSurgery[] };
    };
  }>;
  evaluation: Prisma.EvaluationGetPayload<{
    include: {
      patient: true;
      collaborator: true;
      clinic: true;
      eyes: {
        include: {
          rightEye: {
            include: {
              logs: true;
              refraction: true;
            };
          };
          leftEye: {
            include: {
              logs: true;
              refraction: true;
            };
          };
        };
      };
    };
  }>;
  clinics: Prisma.ClinicGetPayload<{
    include: {
      collaborators: {
        select: {
          collaborator: {
            select: {
              name: true;
            };
          };
        };
      };
    };
  }>[];
  lastEvaluationData?: Prisma.EvaluationGetPayload<{
    select: {
      continuousData: true;
      eyes: {
        include: {
          leftEye: {
            include: {
              logs: true;
              refraction: true;
            };
          };
          rightEye: {
            include: {
              logs: true;
              refraction: true;
            };
          };
        };
      };
    };
  }>;
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
  occupancyData?: Record<
    string,
    { total: number; morning: number; afternoon: number }
  >;
};

export function EvaluationForm({
  evaluation,
  clinics,
  lastEvaluationData,
  patientSurgeries,
  medications,
  firstPrescription,
  occupancyData,
}: EvaluationFormProps) {
  const router = useRouter();
  const [showFeedbackDialog, setShowFeedbackDialog] = useState(false);
  const [showUnsavedDialog, setShowUnsavedDialog] = useState(false);
  const [pendingHref, setPendingHref] = useState<string | null>(null);
  const [lastSavedData, setLastSavedData] = useState<{
    done: boolean;
    id: string;
  } | null>(null);

  const identificationForm = useForm<IdentificationFormValues>({
    resolver: zodResolver(identificationSchema),
    defaultValues: {
      collaborator: `[${evaluation.collaborator.crm}] ${evaluation.collaborator.name}`,
      clinic: evaluation.clinic?.id ?? "",
    },
  });

  const emptyBiomicroscopy = "";
  const emptyFundoscopy = "";
  const emptyGonioscopy = "";

  const mainForm = useForm<EvaluationMainFormValues>({
    resolver: zodResolver(mainFormSchema),
    defaultValues: {
      biomicroscopyOD:
        evaluation.eyes?.rightEye?.logs.find(
          (log) => log.type === "BIOMICROSCOPY",
        )?.details ?? emptyBiomicroscopy,
      biomicroscopyOS:
        evaluation.eyes?.leftEye?.logs.find(
          (log) => log.type === "BIOMICROSCOPY",
        )?.details ?? "",
      fundoscopyOD:
        evaluation.eyes?.rightEye?.logs.find((log) => log.type === "FUNDOSCOPY")
          ?.details ?? emptyFundoscopy,
      fundoscopyOS:
        evaluation.eyes?.leftEye?.logs.find((log) => log.type === "FUNDOSCOPY")
          ?.details ?? "",
      gonioscopyOD:
        evaluation.eyes?.rightEye?.logs.find((log) => log.type === "GONIOSCOPY")
          ?.details ?? emptyGonioscopy,
      gonioscopyOS:
        evaluation.eyes?.leftEye?.logs.find((log) => log.type === "GONIOSCOPY")
          ?.details ?? "",
      tonometryOD:
        evaluation.eyes?.rightEye?.logs.find((log) => log.type === "TONOMETRY")
          ?.details ?? "",
      tonometryOS:
        evaluation.eyes?.leftEye?.logs.find((log) => log.type === "TONOMETRY")
          ?.details ?? "",
      pachymetryOD:
        evaluation.eyes?.rightEye?.logs.find((log) => log.type === "PACHYMETRY")
          ?.details ?? "",
      pachymetryOS:
        evaluation.eyes?.leftEye?.logs.find((log) => log.type === "PACHYMETRY")
          ?.details ?? "",
      opticalBiometryOD:
        evaluation.eyes?.rightEye?.logs.find(
          (log) => log.type === "OPTICAL_BIOMETRY",
        )?.details ?? "",
      opticalBiometryOS:
        evaluation.eyes?.leftEye?.logs.find(
          (log) => log.type === "OPTICAL_BIOMETRY",
        )?.details ?? "",
      specularMicroscopyOD:
        evaluation.eyes?.rightEye?.logs.find(
          (log) => log.type === "SPECULAR_MICROSCOPY",
        )?.details ?? "",
      specularMicroscopyOS:
        evaluation.eyes?.leftEye?.logs.find(
          (log) => log.type === "SPECULAR_MICROSCOPY",
        )?.details ?? "",
      // Exames de imagem - arquivos
      octOD:
        evaluation.eyes?.rightEye?.logs.find((log) => log.type === "OCT")
          ?.fileUrl ?? "",
      octOS:
        evaluation.eyes?.leftEye?.logs.find((log) => log.type === "OCT")
          ?.fileUrl ?? "",
      ctCorneaOD:
        evaluation.eyes?.rightEye?.logs.find((log) => log.type === "CT_CORNEA")
          ?.fileUrl ?? "",
      ctCorneaOS:
        evaluation.eyes?.leftEye?.logs.find((log) => log.type === "CT_CORNEA")
          ?.fileUrl ?? "",
      angiographyOD:
        evaluation.eyes?.rightEye?.logs.find(
          (log) => log.type === "ANGIOGRAPHY",
        )?.fileUrl ?? "",
      angiographyOS:
        evaluation.eyes?.leftEye?.logs.find((log) => log.type === "ANGIOGRAPHY")
          ?.fileUrl ?? "",
      visualFieldOD:
        evaluation.eyes?.rightEye?.logs.find(
          (log) => log.type === "VISUAL_FIELD",
        )?.fileUrl ?? "",
      visualFieldOS:
        evaluation.eyes?.leftEye?.logs.find(
          (log) => log.type === "VISUAL_FIELD",
        )?.fileUrl ?? "",
      retinographyOD:
        evaluation.eyes?.rightEye?.logs.find(
          (log) => log.type === "RETINOGRAPHY",
        )?.fileUrl ?? "",
      retinographyOS:
        evaluation.eyes?.leftEye?.logs.find(
          (log) => log.type === "RETINOGRAPHY",
        )?.fileUrl ?? "",
      // Exames de imagem - anotações
      octAnnotationOD:
        evaluation.eyes?.rightEye?.logs.find((log) => log.type === "OCT")
          ?.annotation ?? "",
      octAnnotationOS:
        evaluation.eyes?.leftEye?.logs.find((log) => log.type === "OCT")
          ?.annotation ?? "",
      visualFieldAnnotationOD:
        evaluation.eyes?.rightEye?.logs.find(
          (log) => log.type === "VISUAL_FIELD",
        )?.annotation ?? "",
      visualFieldAnnotationOS:
        evaluation.eyes?.leftEye?.logs.find(
          (log) => log.type === "VISUAL_FIELD",
        )?.annotation ?? "",
      angiographyAnnotationOD:
        evaluation.eyes?.rightEye?.logs.find(
          (log) => log.type === "ANGIOGRAPHY",
        )?.annotation ?? "",
      angiographyAnnotationOS:
        evaluation.eyes?.leftEye?.logs.find((log) => log.type === "ANGIOGRAPHY")
          ?.annotation ?? "",
      ctCorneaAnnotationOD:
        evaluation.eyes?.rightEye?.logs.find((log) => log.type === "CT_CORNEA")
          ?.annotation ?? "",
      ctCorneaAnnotationOS:
        evaluation.eyes?.leftEye?.logs.find((log) => log.type === "CT_CORNEA")
          ?.annotation ?? "",
      retinographyAnnotationOD:
        evaluation.eyes?.rightEye?.logs.find(
          (log) => log.type === "RETINOGRAPHY",
        )?.annotation ?? "",
      retinographyAnnotationOS:
        evaluation.eyes?.leftEye?.logs.find(
          (log) => log.type === "RETINOGRAPHY",
        )?.annotation ?? "",
      clinicalData: evaluation.clinicalData ?? "",
      continuousData:
        (evaluation.continuousData || lastEvaluationData?.continuousData) ?? "",
      diagnosis: evaluation.diagnosis ?? "",
      treatment: evaluation.treatment ?? "",
      followUp: evaluation.followUp ?? "",
      nextAppointment: evaluation.nextAppointment ?? "",
      returnDate: "",
      returnTime: undefined,
      returnNotes: evaluation.returnNotes ?? "",
    },
  });

  // Guardar navegação quando houver alterações não salvas
  const hasUnsavedChanges =
    identificationForm.formState.isDirty || mainForm.formState.isDirty;
  useUnsavedChanges(hasUnsavedChanges, undefined, (href) => {
    setPendingHref(href);
    setShowUnsavedDialog(true);
  });

  const updateEvaluation = api.evaluation.update.useMutation({
    onSuccess: (variables) => {
      // Resetar estado "dirty" após salvar com sucesso
      identificationForm.reset(identificationForm.getValues());
      mainForm.reset(mainForm.getValues());

      const message = variables.done
        ? "A avaliação foi marcada como concluída com sucesso."
        : "A avaliação foi salva com sucesso.";
      const title = variables.done ? "Avaliação concluída!" : "Avaliação salva";

      toast({
        title,
        description: message,
        variant: "default",
      });

      // Salvar dados da última operação e mostrar dialog apenas quando não for concluída
      if (variables.id) {
        setLastSavedData({ done: variables.done ?? false, id: variables.id });
        // Só mostra o dialog se não for uma conclusão (done = false)
        if (!variables.done) {
          setShowFeedbackDialog(true);
        } else {
          // Se for uma conclusão, redireciona para a página de summary
          router.push(`/evaluations/${variables.id}/summary`);
        }
      }
    },
    onError: (error, variables) => {
      const message = variables.done
        ? "Erro ao concluir a avaliação. Tente novamente."
        : "Erro ao salvar a avaliação. Tente novamente.";

      toast({
        title: "Erro",
        description: message,
        variant: "destructive",
      });
    },
  });

  const createAppointment = api.appointment.create.useMutation({
    onSuccess: () => {
      toast({
        title: "Agendamento criado!",
        description:
          "O retorno foi agendado automaticamente com o turno selecionado.",
      });
    },
    onError: (error) => {
      toast({
        title: "Erro ao agendar",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const isSubmitting =
    updateEvaluation.isPending || createAppointment.isPending;

  const handleSubmitMainForm = (
    data: EvaluationMainFormValues,
    done = false,
  ) => {
    if (identificationForm.getValues("clinic") === "") {
      identificationForm.setFocus("clinic");
      identificationForm.setError("clinic", {
        type: "required",
        message: "Selecione um ambulatório.",
      });
      toast({
        title: "Erro!",
        description: "Selecione um ambulatório.",
        variant: "destructive",
      });
      return;
    } else {
      identificationForm.clearErrors("clinic");
    }

    const payload = {
      ...data,
      done,
      id: evaluation.id || undefined,
      patientId: evaluation.patient.id,
      collaboratorId: evaluation.collaborator.id,
      clinicId: identificationForm.getValues().clinic,
      rightEyeId: evaluation.eyes?.rightEyeId,
      leftEyeId: evaluation.eyes?.leftEyeId,
    };

    updateEvaluation.mutate(payload, {
      onSuccess: () => {
        // Se os campos de data e horário estiverem preenchidos, criar agendamento automaticamente
        if (data.returnDate && data.returnTime && done) {
          const scheduledDate = new Date(
            `${data.returnDate}T${data.returnTime}`,
          );

          const turnoText =
            data.returnTime === "07:00" ? "Manhã (07h)" : "Tarde (13h)";

          // Construir as notas do agendamento
          let appointmentNotes = `Retorno agendado automaticamente durante a avaliação - Turno: ${turnoText}.`;

          if (data.nextAppointment) {
            appointmentNotes += ` Próxima consulta: ${data.nextAppointment}.`;
          }

          if (data.returnNotes) {
            appointmentNotes += ` Notas para retorno: ${data.returnNotes}.`;
          }

          createAppointment.mutate({
            patientId: evaluation.patient.id,
            collaboratorId: evaluation.collaborator.id,
            clinicId: identificationForm.getValues().clinic,
            evaluationId: evaluation.id,
            scheduledDate,
            notes: appointmentNotes,
          });
        }
      },
    });
  };

  const handleConcludeFromDialog = () => {
    // Marcar a avaliação como concluída usando os dados atuais do formulário
    const currentData = mainForm.getValues();
    handleSubmitMainForm(currentData, true);
  };

  const handleConfirmNavigation = () => {
    const href = pendingHref;
    setShowUnsavedDialog(false);
    setPendingHref(null);
    if (href) router.push(href);
  };

  function FormActions() {
    return (
      <div className="flex flex-col items-end gap-2">
        <span className="text-xs text-muted-foreground">
          Salvo <ElapsedTime startTime={evaluation.updatedAt.toISOString()} />.
        </span>
        <div className="flex gap-2">
          <RemoveEvaluationButton
            evaluationId={evaluation.id}
            patientName={evaluation.patient.name}
          />
          <Button asChild variant={"outline"}>
            <Link href={`/patients/${evaluation.patient.id}/history`}>
              <MdOutlineHistory />
              <span className="hidden sm:inline">Histórico</span>
            </Link>
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={mainForm.handleSubmit((data) =>
              handleSubmitMainForm(data),
            )}
            disabled={isSubmitting}
          >
            <MdSave size={18} />
            <span className="hidden md:block">
              {isSubmitting ? "Salvando..." : "Salvar"}
            </span>
          </Button>
          <Button
            type="button"
            onClick={mainForm.handleSubmit((data) =>
              handleSubmitMainForm(data, true),
            )}
            disabled={isSubmitting}
          >
            <MdCheck size={18} />
            <span className="hidden md:block">
              {isSubmitting ? "Concluindo..." : "Concluir"}
            </span>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4 px-2">
      <FormActions />
      <EvaluationIdentificationForm
        form={identificationForm}
        patient={evaluation.patient}
        collaborator={evaluation.collaborator}
        clinics={clinics}
      />
      <Separator />
      <div className="flex w-full flex-col-reverse gap-4 sm:flex-row">
        <EvaluationMainForm
          form={mainForm}
          lastEvaluationData={lastEvaluationData}
          leftEyeId={evaluation.eyes?.leftEyeId}
          rightEyeId={evaluation.eyes?.rightEyeId}
          collaboratorId={evaluation.collaborator.id}
          patientId={evaluation.patient.id}
          occupancyData={occupancyData}
          patientSurgeries={patientSurgeries}
        />
        <div className="flex w-full flex-col space-y-4 text-sm sm:max-w-xs">
          <EvaluationRefractionForm
            leftEye={evaluation.eyes?.leftEye}
            rightEye={evaluation.eyes?.rightEye}
            lastEyesData={{
              leftEye: lastEvaluationData?.eyes?.leftEye,
              rightEye: lastEvaluationData?.eyes?.rightEye,
            }}
          />
          <PrescriptionCard
            medications={medications}
            firstPrescription={firstPrescription}
          />
        </div>
      </div>
      <FormActions />

      {/* Dialog de Feedback */}
      {lastSavedData && (
        <EvaluationFeedbackDialog
          open={showFeedbackDialog}
          evaluationId={lastSavedData.id}
          patientName={evaluation.patient.name}
          isDone={lastSavedData.done}
          onConclude={handleConcludeFromDialog}
        />
      )}

      {/* Dialog de saída com alterações não salvas */}
      <AlertDialog open={showUnsavedDialog} onOpenChange={setShowUnsavedDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Tem certeza que deseja sair?</AlertDialogTitle>
            <AlertDialogDescription>
              Você tem alterações não salvas. Se sair agora, suas mudanças serão
              perdidas.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setPendingHref(null)}>
              Cancelar
            </AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmNavigation}>
              Sair sem salvar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
