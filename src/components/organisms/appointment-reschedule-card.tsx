"use client";

import {
  AlertCircle,
  CalendarDays,
  CheckCircle,
  Clock,
  FileText,
  User,
  XCircle,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import {
  extractTimeFromDate,
  formatDateForAPI,
  localToUTC,
  parseLocalDateString,
} from "~/lib/utils";

import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { DatePickerWithOccupancy } from "~/components/ui/date-picker-with-occupancy";
import { Separator } from "~/components/ui/separator";
import { Textarea } from "~/components/ui/textarea";
import { api } from "~/trpc/react";
import { toast } from "~/hooks/use-toast";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const rescheduleSchema = z.object({
  scheduledDate: z.string().min(1, "Data é obrigatória"),
  scheduledTime: z.string().min(1, "Turno é obrigatório"),
  notes: z.string().optional(),
});

type RescheduleFormValues = z.infer<typeof rescheduleSchema>;

interface AppointmentRescheduleCardProps {
  appointmentId: string;
  patientName: string;
  patientId: string;
  collaboratorId: string;
  currentDate: Date;
  currentNotes?: string;
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export function AppointmentRescheduleCard({
  appointmentId,
  patientName,
  patientId,
  collaboratorId,
  currentDate,
  currentNotes,
  isOpen,
  onClose,
  onSuccess,
}: AppointmentRescheduleCardProps) {
  const utils = api.useUtils();

  const form = useForm<RescheduleFormValues>({
    resolver: zodResolver(rescheduleSchema),
    defaultValues: {
      scheduledDate: formatDateForAPI(currentDate),
      scheduledTime: extractTimeFromDate(currentDate),
      notes: currentNotes || "",
    },
  });

  // Buscar dados de ocupação para o mês atual
  const currentMonth = new Date();
  const startOfMonth = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth(),
    1,
  );
  const endOfMonth = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth() + 1,
    0,
  );

  const { data: occupancyData } = api.appointment.getOccupancyByPeriod.useQuery(
    {
      startDate: startOfMonth,
      endDate: endOfMonth,
      collaboratorId,
    },
    {
      enabled: isOpen,
    },
  );

  const updateAppointment = api.appointment.update.useMutation({
    onSuccess: () => {
      toast({
        title: "✅ Atendimento reagendado!",
        description: "O atendimento foi reagendado com sucesso.",
      });
      onClose();
      form.reset();
      // Revalidar todas as queries relacionadas a agendamentos
      utils.appointment.getAll.invalidate();
      utils.appointment.getToday.invalidate();
      utils.appointment.getUpcoming.invalidate();
      utils.appointment.getById.invalidate({ id: appointmentId });
      // Chamar callback de sucesso se fornecido
      onSuccess?.();
    },
    onError: (error) => {
      toast({
        title: "❌ Erro ao reagendar",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: RescheduleFormValues) => {
    const scheduledDate = new Date(
      `${data.scheduledDate}T${data.scheduledTime}`,
    );

    updateAppointment.mutate({
      id: appointmentId,
      scheduledDate,
      notes: data.notes,
    });
  };

  const isLoading = updateAppointment.isPending;
  const scheduledDate = form.watch("scheduledDate");

  if (!isOpen) return null;

  return (
    <Card className="border-l-4 border-l-primary/20 bg-gradient-to-r from-primary/5 to-transparent">
      <CardHeader className="pb-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
              <CalendarDays className="h-5 w-5 text-primary" />
            </div>
            <div className="min-w-0 flex-1">
              <CardTitle className="text-lg">Reagendar Atendimento</CardTitle>
              <p className="text-sm text-muted-foreground">
                Paciente:{" "}
                <span className="font-medium text-foreground">
                  {patientName}
                </span>
              </p>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Informações atuais */}
        <div className="rounded-lg bg-muted/50 p-4">
          <div className="mb-3 flex items-center gap-2">
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium text-muted-foreground">
              Agendamento Atual
            </span>
          </div>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 shrink-0 text-muted-foreground" />
              <span className="text-sm">
                {currentDate.toLocaleDateString("pt-BR", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <User className="h-4 w-4 shrink-0 text-muted-foreground" />
              <span className="text-sm">
                {extractTimeFromDate(currentDate)} -{" "}
                {extractTimeFromDate(currentDate) === "07:00"
                  ? "Manhã"
                  : "Tarde"}
              </span>
            </div>
          </div>
        </div>

        <Separator />

        {/* Formulário de reagendamento */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              <FormField
                control={form.control}
                name="scheduledDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <CalendarDays className="h-4 w-4" />
                      Nova Data
                    </FormLabel>
                    <FormControl>
                      <DatePickerWithOccupancy
                        date={
                          field.value
                            ? parseLocalDateString(field.value)!
                            : undefined
                        }
                        onDateChange={(date) => {
                          field.onChange(
                            date ? formatDateForAPI(localToUTC(date)) : "",
                          );
                          if (!date) {
                            form.setValue("scheduledTime", "");
                          }
                        }}
                        placeholder="Selecione a nova data"
                        minDate={new Date()}
                        className="w-full"
                        collaboratorId={collaboratorId}
                        patientId={patientId}
                        occupancyData={occupancyData}
                      />
                    </FormControl>
                    <FormMessage />
                    <FormDescription>
                      <span className="text-xs text-muted-foreground">
                        Os indicadores coloridos mostram a lotação atual do dia
                      </span>
                    </FormDescription>
                  </FormItem>
                )}
              />

              {scheduledDate && (
                <FormField
                  control={form.control}
                  name="scheduledTime"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        Novo Turno
                      </FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione o turno" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="07:00">
                              <div className="flex items-center gap-2">
                                <span>🌅 Manhã</span>
                                <Badge variant="outline" className="text-xs">
                                  07:00
                                </Badge>
                              </div>
                            </SelectItem>
                            <SelectItem value="13:00">
                              <div className="flex items-center gap-2">
                                <span>🌆 Tarde</span>
                                <Badge variant="outline" className="text-xs">
                                  13:00
                                </Badge>
                              </div>
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                      <FormDescription>
                        <span className="text-xs text-muted-foreground">
                          Escolha o turno para o novo agendamento
                        </span>
                      </FormDescription>
                    </FormItem>
                  )}
                />
              )}
            </div>

            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    Observações do Reagendamento
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder="Adicione observações sobre o motivo do reagendamento..."
                      className="min-h-[100px] resize-none"
                    />
                  </FormControl>
                  <FormMessage />
                  <FormDescription>
                    <span className="text-xs text-muted-foreground">
                      Opcional: Informações sobre o motivo da mudança
                    </span>
                  </FormDescription>
                </FormItem>
              )}
            />

            <Separator />

            {/* Ações */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <CheckCircle className="h-4 w-4 shrink-0" />
                <span className="text-xs sm:text-sm">
                  Confirme os novos dados antes de salvar
                </span>
              </div>
              <div className="flex flex-col gap-2 sm:flex-row sm:gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={onClose}
                  disabled={isLoading}
                  className="gap-2"
                >
                  <XCircle className="h-4 w-4" />
                  <span className="hidden sm:inline">Cancelar</span>
                  <span className="sm:hidden">Cancelar</span>
                </Button>
                <Button type="submit" disabled={isLoading} className="gap-2">
                  {isLoading ? (
                    <>
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                      <span className="hidden sm:inline">Reagendando...</span>
                      <span className="sm:hidden">Salvando...</span>
                    </>
                  ) : (
                    <>
                      <CheckCircle className="h-4 w-4" />
                      <span className="hidden sm:inline">
                        Confirmar Reagendamento
                      </span>
                      <span className="sm:hidden">Confirmar</span>
                    </>
                  )}
                </Button>
              </div>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
