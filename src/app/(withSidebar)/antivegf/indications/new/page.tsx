"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  AlertCircle,
  ArrowLeft,
  Calendar,
  CheckCircle,
  Edit2,
  Eye,
  FileText,
  Save,
  Settings,
  User,
  XCircle,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { DatePicker } from "~/components/ui/date-picker";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";

// Componentes do formulário
import { BasicInfoForm } from "~/components/antivegf-form/form-sections/basic-info-form";
import { IndicationForm } from "~/components/antivegf-form/form-sections/indication-form";
import { InjectionsForm } from "~/components/antivegf-form/form-sections/injections-form";
import { ObservationsForm } from "~/components/antivegf-form/form-sections/observations-form";
import { SwalisClassificationForm } from "~/components/antivegf-form/form-sections/swalis-classification-form";

// Componente de busca de pacientes
import { PatientSearchDialogForIndication } from "~/components/organisms/patient-search-dialog-for-indication";

// Schema e tipos
import {
  antivegfSchema,
  type AntivegfFormData,
} from "~/lib/schemas/antivegf-schema";

// Utilitários
import { useToast } from "~/hooks/use-toast";
import { formatDateForAPI } from "~/lib/utils";
import { api } from "~/trpc/react";

// Tipos
interface ScheduledDate {
  id: string;
  date: string;
  eye: "right" | "left";
  doseNumber: number;
  status: "pending" | "confirmed" | "completed" | "cancelled";
}

interface Patient {
  id: string;
  refId: string;
  name: string;
  birthDate: string;
}

// Dados mockados
const MEDICATIONS = [
  { value: "Lucentis", label: "Lucentis (Ranibizumab)", interval: 28 },
  { value: "Avastin", label: "Avastin (Bevacizumab)", interval: 28 },
  { value: "Eylia", label: "Eylia (Aflibercept)", interval: 28 },
];

// Constantes
const INTERVAL_SAME_EYE = 28;
const INTERVAL_BETWEEN_EYES = 14;

// Hooks customizados
function useIndicationForm() {
  return useForm<AntivegfFormData>({
    resolver: zodResolver(antivegfSchema),
    defaultValues: {
      patientId: "",
      indicationDate: formatDateForAPI(new Date()),
      indication: "",
      indicationOther: "",
      medication: "",
      medicationOther: "",
      swalisClassification: "A2",
      remainingODOption: "0",
      remainingODCustom: null,
      remainingOSOption: "0",
      remainingOSCustom: null,
      startEye: "OD",
      treatmentStartDate: "",
      observations: "",
      contraindications: "",
      allergies: "",
      status: "pending",
      scheduledDates: [],
    },
  });
}

function useScheduledDates() {
  const [scheduledDates, setScheduledDates] = useState<ScheduledDate[]>([]);
  const [editingDateId, setEditingDateId] = useState<string | null>(null);
  const [isCalculatingDates, setIsCalculatingDates] = useState(false);

  return {
    scheduledDates,
    setScheduledDates,
    editingDateId,
    setEditingDateId,
    isCalculatingDates,
    setIsCalculatingDates,
  };
}

function usePatientSelection() {
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);

  const handlePatientSelect = (patient: Patient) => {
    setSelectedPatient(patient);
  };

  const clearPatient = () => {
    setSelectedPatient(null);
  };

  return {
    selectedPatient,
    handlePatientSelect,
    clearPatient,
  };
}

function useIndicationMutations() {
  const { toast } = useToast();
  const router = useRouter();

  const createIndication = api.indication.create.useMutation({
    onError(error) {
      toast({
        title: "Erro",
        description: error.message,
        variant: "destructive",
      });
    },
    onSuccess() {
      toast({
        title: "Sucesso!",
        description: "Indicação salva com sucesso.",
        variant: "default",
      });
    },
  });

  const createInjections = api.indication.createInjections.useMutation({
    onError(error) {
      toast({
        title: "Erro",
        description: `Erro ao criar agendamentos: ${error.message}`,
        variant: "destructive",
      });
    },
    onSuccess() {
      toast({
        title: "Sucesso!",
        description: "Agendamentos criados com sucesso.",
        variant: "default",
      });
      router.push("/antivegf/indications");
    },
  });

  return { createIndication, createInjections };
}

function createLocalDate(dateString: string): Date {
  try {
    const [year, month, day] = dateString.split("-").map(Number);
    if (!year || !month || !day) {
      return new Date();
    }
    return new Date(year, month - 1, day);
  } catch (error) {
    console.error("Erro ao criar data local:", error, dateString);
    return new Date();
  }
}

function getEyeLabel(eye: string) {
  return eye === "right" ? "OD" : "OE";
}

function getEyeIcon(eye: string) {
  return eye === "right" ? "👁️" : "👁️‍🗨️";
}

// Componentes auxiliares
function WorkflowInfo() {
  return (
    <div className="rounded-xl border border-blue-200 bg-blue-50/50 p-4 dark:border-blue-800/30 dark:bg-blue-950/20">
      <div className="flex items-start gap-3">
        <div className="mt-1 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/50">
          <span className="text-sm text-blue-600 dark:text-blue-400">ℹ️</span>
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-medium text-blue-900 dark:text-blue-100">
            Fluxo de Trabalho
          </p>
          <p className="mt-1 text-sm text-blue-700 dark:text-blue-300">
            <strong>1.</strong> Preencha todos os dados da indicação
            <br />
            <strong>2.</strong> Clique em &quot;Salvar Indicação&quot; para
            salvar os dados
            <br />
            <strong>3.</strong> Após salvar, clique em &quot;Enviar para
            Avaliação NIR&quot; para criar os agendamentos
          </p>
        </div>
      </div>
    </div>
  );
}

function PatientCard({
  patient,
  onClear,
}: {
  patient: Patient;
  onClear: () => void;
}) {
  return (
    <div className="rounded-lg border border-green-200 bg-green-50 p-4 dark:border-green-800/30 dark:bg-green-950/20">
      <div className="flex flex-col space-y-3 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/50">
            <User className="h-5 w-5 text-green-600 dark:text-green-400" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="truncate font-semibold text-green-900 dark:text-green-100">
              {patient.name}
            </div>
            <div className="text-sm text-green-700 dark:text-green-300">
              Prontuário: {patient.refId}
            </div>
            <div className="text-sm text-green-700 dark:text-green-300">
              Data de nascimento:{" "}
              {(() => {
                try {
                  return new Date(patient.birthDate).toLocaleDateString(
                    "pt-BR",
                    {
                      timeZone: "UTC",
                    },
                  );
                } catch {
                  return patient.birthDate;
                }
              })()}
            </div>
          </div>
        </div>
        <Button
          variant="ghost"
          size="sm"
          className="w-full text-green-700 hover:bg-green-100 hover:text-green-800 dark:text-green-400 dark:hover:bg-green-900/30 dark:hover:text-green-300 sm:w-auto"
          onClick={onClear}
          type="button"
        >
          Alterar
        </Button>
      </div>
    </div>
  );
}

function AvailabilityBadge({
  availability,
}: {
  date: string;
  availability: any;
}) {
  if (!availability) return null;

  const availableSlots = availability.capacity - availability.booked;

  if (availableSlots <= 0) {
    return (
      <Badge variant="destructive" className="text-xs">
        <XCircle className="mr-1 h-3 w-3" />
        Sem vagas
      </Badge>
    );
  } else if (availableSlots <= 3) {
    return (
      <Badge variant="secondary" className="text-xs">
        <AlertCircle className="mr-1 h-3 w-3" />
        {availableSlots} vaga{availableSlots > 1 ? "s" : ""} restante
        {availableSlots > 1 ? "s" : ""}
      </Badge>
    );
  } else {
    return (
      <Badge variant="outline" className="text-xs">
        <CheckCircle className="mr-1 h-3 w-3" />
        {availableSlots} vagas disponíveis
      </Badge>
    );
  }
}

function ScheduledDateCard({
  scheduledDate,
  index,
  totalDates,
  isEditing,
  onEdit,
  onDateChange,
  availability,
}: {
  scheduledDate: ScheduledDate;
  index: number;
  totalDates: number;
  isEditing: boolean;
  onEdit: (id: string | null) => void;
  onDateChange: (id: string, date: Date | undefined) => void;
  availability: any;
}) {
  return (
    <div className="group relative overflow-hidden rounded-lg border bg-card p-4 shadow-sm transition-all hover:border-primary/30 hover:shadow-md dark:border-border/50 dark:bg-card/50">
      <div className="absolute bottom-0 left-0 top-0 w-1 bg-gradient-to-b from-primary/20 to-primary/60 dark:from-primary/30 dark:to-primary/70"></div>

      <div className="ml-3">
        <div className="mb-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Badge
              variant="outline"
              className="border-2 px-2 py-1 text-xs font-medium"
            >
              <span className="mr-1 text-sm">
                {getEyeIcon(scheduledDate.eye)}
              </span>
              <span className="hidden sm:inline">
                {getEyeLabel(scheduledDate.eye)}
              </span>
              <span className="sm:hidden">
                {scheduledDate.eye === "right" ? "OD" : "OE"}
              </span>
            </Badge>
            <Badge
              variant="secondary"
              className="px-2 py-1 text-xs font-medium"
            >
              Dose {scheduledDate.doseNumber}
            </Badge>
          </div>
          <div className="flex items-center gap-1">
            <Badge variant="outline" className="px-2 py-1 text-xs font-medium">
              #{index + 1}
            </Badge>
            <AvailabilityBadge
              date={scheduledDate.date}
              availability={availability}
            />
          </div>
        </div>

        <div className="mb-3">
          <div className="mb-2 flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted dark:bg-muted/50">
              <Calendar className="h-4 w-4 text-muted-foreground dark:text-muted-foreground/80" />
            </div>
            <div className="text-sm font-semibold text-foreground">
              {(() => {
                try {
                  return new Date(scheduledDate.date).toLocaleDateString(
                    "pt-BR",
                    {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                      timeZone: "UTC",
                    },
                  );
                } catch {
                  return scheduledDate.date;
                }
              })()}
            </div>
          </div>
          <div className="ml-10 text-xs capitalize text-muted-foreground dark:text-muted-foreground/70">
            {(() => {
              try {
                return new Date(scheduledDate.date).toLocaleDateString(
                  "pt-BR",
                  {
                    weekday: "long",
                    timeZone: "UTC",
                  },
                );
              } catch {
                return "";
              }
            })()}
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-1 text-xs text-muted-foreground dark:text-muted-foreground/70">
            <span>
              <strong>Olho:</strong>{" "}
              {scheduledDate.eye === "right" ? "OD" : "OE"}
            </span>
            <span>
              <strong>Seq:</strong> {index + 1}/{totalDates}
            </span>
            <span className="inline-flex items-center gap-1">
              <div className="h-2 w-2 rounded-full bg-green-500 dark:bg-green-400"></div>
              Programada
            </span>
          </div>

          <Popover
            open={isEditing}
            onOpenChange={(open) => onEdit(open ? scheduledDate.id : null)}
          >
            <PopoverTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 flex-shrink-0 p-0 opacity-0 transition-all hover:bg-accent hover:text-accent-foreground group-hover:opacity-100 dark:hover:bg-accent/80 dark:hover:text-accent-foreground"
                type="button"
              >
                <Edit2 className="h-4 w-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent
              className="w-auto border-0 p-0 shadow-lg dark:border-border/50 dark:bg-popover"
              align="end"
            >
              <DatePicker
                date={createLocalDate(scheduledDate.date)}
                onDateChange={(date) => onDateChange(scheduledDate.id, date)}
                placeholder="Selecione uma data"
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </div>
  );
}

// Componente principal
export default function NewIndicationPage() {
  const { toast } = useToast();

  // Hooks customizados
  const methods = useIndicationForm();
  const {
    scheduledDates,
    setScheduledDates,
    editingDateId,
    setEditingDateId,
    isCalculatingDates,
    setIsCalculatingDates,
  } = useScheduledDates();
  const { selectedPatient, handlePatientSelect, clearPatient } =
    usePatientSelection();
  const { createIndication, createInjections } = useIndicationMutations();

  // Estado local
  const [isIndicationSaved, setIsIndicationSaved] = useState(false);
  const [savedIndicationId, setSavedIndicationId] = useState<string | null>(
    null,
  );

  const {
    watch,
    setValue,
    handleSubmit,
    formState: { isValid },
  } = methods;

  // Queries
  const availabilityQuery = api.schedule.checkMultipleDates.useQuery(
    { dates: scheduledDates.map((date) => date.date) },
    {
      enabled:
        scheduledDates.length > 0 && scheduledDates.every((date) => date.date),
      refetchInterval: 30000,
      retry: false,
    },
  );

  const {
    data: collaboratorData,
    isLoading: isCollaboratorLoading,
    error: collaboratorError,
  } = api.utils.currentCollaborator.useQuery();

  // Observar campos relevantes
  const watchedFields = watch([
    "medication",
    "treatmentStartDate",
    "startEye",
    "remainingODOption",
    "remainingODCustom",
    "remainingOSOption",
    "remainingOSCustom",
  ]);

  const [
    medication,
    treatmentStartDate,
    startEye,
    remainingODOption,
    remainingODCustom,
    remainingOSOption,
    remainingOSCustom,
  ] = watchedFields;

  const generateScheduledDates = async () => {
    setIsCalculatingDates(true);

    try {
      if (!treatmentStartDate || !startEye) return;

      const dates: ScheduledDate[] = [];
      const [year, month, day] = treatmentStartDate.split("-").map(Number);
      if (!year || !month || !day) return;

      const startDate = new Date(year, month - 1, day);
      const odDoses =
        remainingODOption === "Outro"
          ? remainingODCustom || 0
          : parseInt(remainingODOption || "0", 10) || 0;
      const osDoses =
        remainingOSOption === "Outro"
          ? remainingOSCustom || 0
          : parseInt(remainingOSOption || "0", 10) || 0;

      const hasBothEyes = odDoses > 0 && osDoses > 0;
      const firstEye = startEye === "OD" ? "right" : "left";

      if (!hasBothEyes) {
        const eyeToSchedule = odDoses > 0 ? "right" : "left";
        const totalDoses = odDoses > 0 ? odDoses : osDoses;

        for (let i = 0; i < totalDoses; i++) {
          const injectionDate = new Date(startDate);
          injectionDate.setDate(
            injectionDate.getDate() + i * INTERVAL_SAME_EYE,
          );

          dates.push({
            id: `date-${i}`,
            date: formatDateForAPI(injectionDate),
            eye: eyeToSchedule,
            doseNumber: i + 1,
            status: "pending",
          });
        }
      } else {
        let currentDate = new Date(startDate);
        let odCount = 0;
        let osCount = 0;
        let currentEye = firstEye;

        while (odCount < odDoses || osCount < osDoses) {
          if (currentEye === "right" && odCount < odDoses) {
            odCount++;
            dates.push({
              id: `date-${dates.length}`,
              date: formatDateForAPI(currentDate),
              eye: "right",
              doseNumber: odCount,
              status: "pending",
            });

            if (osCount < osDoses) {
              currentEye = "left";
              currentDate = new Date(currentDate);
              currentDate.setDate(
                currentDate.getDate() + INTERVAL_BETWEEN_EYES,
              );
            } else {
              currentDate = new Date(currentDate);
              currentDate.setDate(currentDate.getDate() + INTERVAL_SAME_EYE);
            }
          } else if (currentEye === "left" && osCount < osDoses) {
            osCount++;
            dates.push({
              id: `date-${dates.length}`,
              date: formatDateForAPI(currentDate),
              eye: "left",
              doseNumber: osCount,
              status: "pending",
            });

            if (odCount < odDoses) {
              currentEye = "right";
              currentDate = new Date(currentDate);
              currentDate.setDate(
                currentDate.getDate() + INTERVAL_BETWEEN_EYES,
              );
            } else {
              currentDate = new Date(currentDate);
              currentDate.setDate(currentDate.getDate() + INTERVAL_SAME_EYE);
            }
          } else {
            currentEye = currentEye === "right" ? "left" : "right";
          }

          if (dates.length > odDoses + osDoses + 5) break;
        }
      }

      setScheduledDates(dates);
      setValue("scheduledDates", dates);
    } catch (error) {
      console.error("Erro ao gerar datas programadas:", error);
      toast({
        title: "Erro",
        description: "Erro ao calcular as datas programadas. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsCalculatingDates(false);
    }
  };

  // Gerar datas programadas
  useEffect(() => {
    if (medication && treatmentStartDate && startEye) {
      const medicationData = MEDICATIONS.find((m) => m.value === medication);
      if (medicationData) {
        generateScheduledDates();
      }
    }
  }, [
    medication,
    treatmentStartDate,
    startEye,
    remainingODOption,
    remainingODCustom,
    remainingOSOption,
    remainingOSCustom,
    generateScheduledDates,
  ]);

  const recalculateDatesFromIndex = (changedIndex: number, newDate: Date) => {
    const updatedDates = [...scheduledDates];
    updatedDates[changedIndex] = {
      ...updatedDates[changedIndex]!,
      date: formatDateForAPI(newDate),
    };

    let currentDate = new Date(newDate);

    for (let i = changedIndex + 1; i < updatedDates.length; i++) {
      const currentDose = updatedDates[i];
      const previousDose = updatedDates[i - 1];

      if (!currentDose || !previousDose) continue;

      const intervalDays =
        currentDose.eye === previousDose.eye
          ? INTERVAL_SAME_EYE
          : INTERVAL_BETWEEN_EYES;
      const nextDate = new Date(currentDate);
      nextDate.setDate(nextDate.getDate() + intervalDays);
      currentDate = nextDate;

      updatedDates[i] = { ...currentDose, date: formatDateForAPI(currentDate) };
    }

    setScheduledDates(updatedDates);
    setValue("scheduledDates", updatedDates);
  };

  const handleDateChange = (dateId: string, newDate: Date | undefined) => {
    if (!newDate) return;

    const dateIndex = scheduledDates.findIndex((date) => date.id === dateId);
    if (dateIndex === -1) return;

    const newDateStr = formatDateForAPI(newDate);
    const availability = availabilityQuery.data?.find(
      (item) => item.date === newDateStr,
    );

    if (availability && !availability.available) {
      toast({
        title: "Data não disponível",
        description: `A data ${newDate.toLocaleDateString("pt-BR")} não possui vagas disponíveis. Considere escolher outra data.`,
        variant: "destructive",
      });
    }

    recalculateDatesFromIndex(dateIndex, newDate);
    setEditingDateId(null);
  };

  const handlePatientSelectWrapper = (patient: Patient) => {
    handlePatientSelect(patient);
    setValue("patientId", patient.id);
  };

  const handleSaveIndication = async (data: AntivegfFormData) => {
    if (isCollaboratorLoading) {
      toast({
        title: "Carregando",
        description: "Aguarde enquanto carregamos as informações do médico.",
        variant: "default",
      });
      return;
    }

    if (collaboratorError || !collaboratorData?.collaboratorId) {
      toast({
        title: "Erro",
        description:
          "Nenhum médico selecionado. Verifique se um médico está selecionado no menu lateral.",
        variant: "destructive",
      });
      return;
    }

    const totalOD =
      data.remainingODOption === "Outro"
        ? data.remainingODCustom || 0
        : parseInt(data.remainingODOption, 10) || 0;
    const totalOS =
      data.remainingOSOption === "Outro"
        ? data.remainingOSCustom || 0
        : parseInt(data.remainingOSOption, 10) || 0;

    try {
      const indication = await createIndication.mutateAsync({
        patientId: data.patientId,
        responsibleDoctor: collaboratorData.collaboratorId,
        totalOD,
        totalOS,
        startEye: data.startEye === "OS" ? "OE" : "OD",
        indication: data.indication,
        medication: data.medication,
        swalisClassification: data.swalisClassification,
        treatmentStartDate: new Date(data.treatmentStartDate),
        observations: data.observations,
        contraindications: data.contraindications,
        allergies: data.allergies,
      });

      setIsIndicationSaved(true);
      setSavedIndicationId(indication.id);
    } catch (error) {
      console.error("Erro ao salvar indicação:", error);
      toast({
        title: "Erro",
        description: "Erro ao salvar indicação. Tente novamente.",
        variant: "destructive",
      });
    }
  };

  const handleSubmitForEvaluation = async (data: AntivegfFormData) => {
    if (!isIndicationSaved || !savedIndicationId) {
      toast({
        title: "Erro",
        description: "Salve a indicação antes de enviar para avaliação.",
        variant: "destructive",
      });
      return;
    }

    const hasUnavailableDates = availabilityQuery.data?.some(
      (availability) => !availability.available,
    );
    if (hasUnavailableDates) {
      const unavailableDates = availabilityQuery.data
        ?.filter((availability) => !availability.available)
        .map((availability) =>
          new Date(availability.date).toLocaleDateString("pt-BR"),
        )
        .join(", ");

      toast({
        title: "Datas não disponíveis",
        description: `As seguintes datas não possuem vagas: ${unavailableDates}. Ajuste as datas antes de continuar.`,
        variant: "destructive",
      });
      return;
    }

    const totalOD =
      data.remainingODOption === "Outro"
        ? data.remainingODCustom || 0
        : parseInt(data.remainingODOption, 10) || 0;
    const totalOS =
      data.remainingOSOption === "Outro"
        ? data.remainingOSCustom || 0
        : parseInt(data.remainingOSOption, 10) || 0;

    try {
      if (totalOD > 0 || totalOS > 0) {
        await createInjections.mutateAsync({
          indicationId: savedIndicationId,
          startDate: new Date(data.treatmentStartDate),
          startEye: data.startEye === "OS" ? "OS" : "OD",
          totalOD,
          totalOS,
        });
      }
    } catch (error) {
      console.error("Erro ao enviar para avaliação:", error);
      toast({
        title: "Erro",
        description: "Erro ao enviar para avaliação. Tente novamente.",
        variant: "destructive",
      });
    }
  };

  const getAvailabilityForDate = (date: string) => {
    return availabilityQuery.data?.find((item) => item.date === date);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col space-y-3 sm:flex-row sm:items-center sm:space-x-4 sm:space-y-0">
        <Button
          variant="outline"
          size="sm"
          asChild
          className="w-fit"
          type="button"
        >
          <Link href="/antivegf/indications">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar
          </Link>
        </Button>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-3">
            <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100 sm:text-xl lg:text-2xl">
              Nova Indicação AntiVEGF
            </h2>
            {isIndicationSaved && (
              <Badge
                variant="default"
                className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
              >
                <CheckCircle className="mr-1 h-3 w-3" />
                Salva
              </Badge>
            )}
          </div>
          <p className="mt-1 text-sm text-muted-foreground sm:text-base">
            Preencha os dados para criar uma nova indicação de injeção
            intravítrea
          </p>
        </div>
      </div>

      <FormProvider {...methods}>
        <form className="space-y-6">
          <WorkflowInfo />

          {/* Seleção de Paciente */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Seleção de Paciente
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <PatientSearchDialogForIndication
                  onPatientSelect={handlePatientSelectWrapper}
                  selectedPatientId={selectedPatient?.id}
                />

                {selectedPatient && (
                  <PatientCard
                    patient={selectedPatient}
                    onClear={() => {
                      clearPatient();
                      setValue("patientId", "");
                    }}
                  />
                )}
              </div>
            </CardContent>
          </Card>

          {/* Informações Básicas */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Informações Básicas
              </CardTitle>
            </CardHeader>
            <CardContent>
              <BasicInfoForm />
            </CardContent>
          </Card>

          {/* Diagnóstico */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Eye className="h-5 w-5" />
                Diagnóstico
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <IndicationForm />
                <SwalisClassificationForm />
              </div>
            </CardContent>
          </Card>

          {/* Tratamento */}
          <InjectionsForm />

          {/* Agendamento */}
          {(scheduledDates.length > 0 || isCalculatingDates) && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  <span className="flex flex-col sm:flex-row sm:items-center sm:gap-2">
                    Programação de Datas
                    {isCalculatingDates ? (
                      <span className="text-sm text-muted-foreground">
                        Calculando...
                      </span>
                    ) : (
                      <span className="text-sm text-muted-foreground">
                        ({scheduledDates.length} aplicações programadas)
                      </span>
                    )}
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                {isCalculatingDates ? (
                  <div className="flex items-center justify-center py-16">
                    <div className="flex flex-col items-center space-y-6">
                      <div className="border-3 h-10 w-10 animate-spin rounded-full border-primary border-t-transparent dark:border-primary/80"></div>
                      <div className="space-y-2 text-center">
                        <p className="text-base font-medium text-foreground">
                          Calculando datas programadas...
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Aguarde enquanto calculamos o cronograma de aplicações
                        </p>
                      </div>
                    </div>
                  </div>
                ) : availabilityQuery.isLoading && scheduledDates.length > 0 ? (
                  <div className="flex items-center justify-center py-16">
                    <div className="flex flex-col items-center space-y-6">
                      <div className="border-3 h-10 w-10 animate-spin rounded-full border-primary border-t-transparent dark:border-primary/80"></div>
                      <div className="space-y-2 text-center">
                        <p className="text-base font-medium text-foreground">
                          Verificando disponibilidade...
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Consultando vagas disponíveis para cada data
                        </p>
                      </div>
                    </div>
                  </div>
                ) : availabilityQuery.error ? (
                  <div className="flex items-center justify-center py-16">
                    <div className="space-y-4 text-center">
                      <div className="flex justify-center">
                        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10 dark:bg-destructive/20">
                          <XCircle className="h-8 w-8 text-destructive" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="text-base font-medium text-destructive">
                          Erro ao verificar disponibilidade
                        </div>
                        <div className="text-sm text-muted-foreground">
                          As datas foram calculadas, mas não foi possível
                          verificar a disponibilidade das vagas.
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {/* Resumo do Cronograma */}
                    <div className="rounded-xl border border-blue-200/50 bg-gradient-to-r from-blue-50/50 to-indigo-50/50 p-6 dark:border-blue-800/30 dark:from-blue-950/30 dark:to-indigo-950/30">
                      <div className="flex items-center gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/50">
                          <Calendar className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div className="flex-1">
                          <h4 className="text-base font-semibold text-blue-900 dark:text-blue-100">
                            Cronograma de Aplicações
                          </h4>
                          <p className="mt-1 text-sm text-blue-700 dark:text-blue-300">
                            {scheduledDates.length} aplicações programadas entre{" "}
                            {(() => {
                              try {
                                const firstDate = new Date(
                                  scheduledDates[0]?.date || "",
                                );
                                const lastDate = new Date(
                                  scheduledDates[scheduledDates.length - 1]
                                    ?.date || "",
                                );
                                return `${firstDate.toLocaleDateString(
                                  "pt-BR",
                                  {
                                    day: "2-digit",
                                    month: "2-digit",
                                    year: "numeric",
                                  },
                                )} e ${lastDate.toLocaleDateString("pt-BR", {
                                  day: "2-digit",
                                  month: "2-digit",
                                  year: "numeric",
                                })}`;
                              } catch {
                                return "datas programadas";
                              }
                            })()}
                          </p>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-blue-900 dark:text-blue-100">
                            {scheduledDates.length}
                          </div>
                          <div className="text-sm text-blue-700 dark:text-blue-300">
                            aplicações
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Lista de Aplicações */}
                    <div className="space-y-4">
                      <h4 className="text-base font-medium text-foreground">
                        Detalhes das Aplicações
                      </h4>
                      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                        {scheduledDates.map((scheduledDate, index) => (
                          <ScheduledDateCard
                            key={scheduledDate.id}
                            scheduledDate={scheduledDate}
                            index={index}
                            totalDates={scheduledDates.length}
                            isEditing={editingDateId === scheduledDate.id}
                            onEdit={setEditingDateId}
                            onDateChange={handleDateChange}
                            availability={getAvailabilityForDate(
                              scheduledDate.date,
                            )}
                          />
                        ))}
                      </div>
                    </div>

                    {/* Alertas de Disponibilidade */}
                    {availabilityQuery.data?.some(
                      (availability) => !availability.available,
                    ) && (
                      <div className="rounded-xl border border-destructive/20 bg-destructive/5 p-6 dark:border-destructive/30 dark:bg-destructive/10">
                        <div className="flex items-start gap-4">
                          <div className="mt-1 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-destructive/10 dark:bg-destructive/20">
                            <XCircle className="h-4 w-4 text-destructive" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="text-base font-medium text-destructive dark:text-destructive">
                              ⚠️ Datas Indisponíveis Detectadas
                            </p>
                            <p className="mt-2 text-sm text-destructive/80 dark:text-destructive/70">
                              Algumas datas programadas não possuem vagas
                              disponíveis. Ajuste as datas manualmente ou entre
                              em contato com a equipe de agendamento.
                            </p>
                            <div className="mt-4 inline-block break-words rounded-lg bg-destructive/10 px-4 py-3 text-sm dark:bg-destructive/20 dark:text-destructive/90">
                              <strong>Datas sem vagas:</strong>{" "}
                              {availabilityQuery.data
                                ?.filter(
                                  (availability) => !availability.available,
                                )
                                .map((availability) => {
                                  try {
                                    return new Date(
                                      availability.date,
                                    ).toLocaleDateString("pt-BR", {
                                      day: "2-digit",
                                      month: "2-digit",
                                      year: "numeric",
                                      timeZone: "UTC",
                                    });
                                  } catch {
                                    return availability.date;
                                  }
                                })
                                .join(", ")}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Observações */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Observações
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ObservationsForm />
            </CardContent>
          </Card>

          {/* Botões de ação */}
          <div className="flex flex-col gap-3 sm:flex-row sm:justify-between sm:gap-4">
            <div className="flex justify-start">
              <Button
                variant="outline"
                type="button"
                asChild
                className="w-full sm:w-auto"
              >
                <Link href="/antivegf/indications">Cancelar</Link>
              </Button>
            </div>

            <div className="flex justify-end gap-3">
              <Button
                type="button"
                variant="outline"
                disabled={
                  !isValid ||
                  createIndication.isPending ||
                  isIndicationSaved ||
                  !selectedPatient
                }
                onClick={() => handleSubmit(handleSaveIndication)()}
                className="w-full sm:w-auto"
              >
                <Save className="mr-2 h-4 w-4" />
                <span className="hidden sm:inline">
                  {createIndication.isPending
                    ? "Salvando..."
                    : isIndicationSaved
                      ? "Salvo ✓"
                      : !selectedPatient
                        ? "Selecione um paciente"
                        : "Salvar Indicação"}
                </span>
                <span className="sm:hidden">
                  {createIndication.isPending
                    ? "Salvando..."
                    : isIndicationSaved
                      ? "Salvo ✓"
                      : !selectedPatient
                        ? "Selecione paciente"
                        : "Salvar"}
                </span>
              </Button>

              <Button
                type="button"
                disabled={
                  !isValid ||
                  !isIndicationSaved ||
                  scheduledDates.length === 0 ||
                  createInjections.isPending ||
                  availabilityQuery.data?.some(
                    (availability) => !availability.available,
                  ) ||
                  !selectedPatient
                }
                onClick={() => handleSubmit(handleSubmitForEvaluation)()}
                className="w-full sm:w-auto"
              >
                <FileText className="mr-2 h-4 w-4" />
                <span className="hidden sm:inline">
                  {createInjections.isPending
                    ? "Enviando..."
                    : !selectedPatient
                      ? "Selecione um paciente"
                      : !isIndicationSaved
                        ? "Salve primeiro"
                        : availabilityQuery.data?.some(
                              (availability) => !availability.available,
                            )
                          ? "Ajuste as datas"
                          : "Enviar para Avaliação NIR"}
                </span>
                <span className="sm:hidden">
                  {createInjections.isPending
                    ? "Enviando..."
                    : !selectedPatient
                      ? "Selecione paciente"
                      : !isIndicationSaved
                        ? "Salve primeiro"
                        : availabilityQuery.data?.some(
                              (availability) => !availability.available,
                            )
                          ? "Ajuste as datas"
                          : "Enviar"}
                </span>
              </Button>
            </div>
          </div>
        </form>
      </FormProvider>
    </div>
  );
}
