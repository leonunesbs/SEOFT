"use client";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "~/components/ui/collapsible";
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

import { Button } from "~/components/ui/button";
import { DatePickerWithOccupancy } from "~/components/ui/date-picker-with-occupancy";
import { Textarea } from "~/components/ui/textarea";
import { api } from "~/trpc/react";
import { toast } from "~/hooks/use-toast";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const rescheduleSchema = z.object({
  scheduledDate: z.string().min(1, "Data é obrigatória"),
  scheduledTime: z.string().min(1, "Turno é obrigatório"),
  notes: z.string().optional(),
});

type RescheduleFormValues = z.infer<typeof rescheduleSchema>;

interface AppointmentRescheduleCollapsibleProps {
  appointmentId: string;
  patientName: string;
  patientId: string;
  collaboratorId: string;
  currentDate: Date;
  currentNotes?: string;
  trigger?: React.ReactNode;
}

export function AppointmentRescheduleCollapsible({
  appointmentId,
  patientName,
  patientId,
  collaboratorId,
  currentDate,
  currentNotes,
  trigger,
}: AppointmentRescheduleCollapsibleProps) {
  const [open, setOpen] = useState(false);
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
      enabled: open,
    },
  );

  const updateAppointment = api.appointment.update.useMutation({
    onSuccess: () => {
      toast({
        title: "Atendimento reagendado!",
        description: "O atendimento foi reagendado com sucesso.",
      });
      setOpen(false);
      form.reset();
      utils.appointment.getAll.invalidate();
      utils.appointment.getToday.invalidate();
      utils.appointment.getUpcoming.invalidate();
    },
    onError: (error) => {
      toast({
        title: "Erro ao reagendar",
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

  return (
    <Collapsible open={open} onOpenChange={setOpen}>
      <CollapsibleTrigger asChild>
        {trigger || (
          <Button variant="outline" size="sm">
            Reagendar
          </Button>
        )}
      </CollapsibleTrigger>
      <CollapsibleContent className="mt-4 space-y-4 rounded-lg border bg-card p-4">
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Reagendar Atendimento</h3>
          <p className="text-sm text-muted-foreground">
            Reagende o atendimento do paciente {patientName}
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="scheduledDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Data do Atendimento</FormLabel>
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
                        // Limpar o turno quando a data for removida
                        if (!date) {
                          form.setValue("scheduledTime", "");
                        }
                      }}
                      placeholder="Selecione a data do atendimento"
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
                      Data para o atendimento. Os indicadores mostram a lotação
                      atual.
                    </span>
                  </FormDescription>
                </FormItem>
              )}
            />

            {/* Campo de turno só aparece quando uma data for selecionada */}
            {scheduledDate && (
              <FormField
                control={form.control}
                name="scheduledTime"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Turno do Atendimento *</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione o turno" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="07:00">Manhã (07h)</SelectItem>
                          <SelectItem value="13:00">Tarde (13h)</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                    <FormDescription>
                      <span className="text-xs text-muted-foreground">
                        Turno para o atendimento (obrigatório).
                      </span>
                    </FormDescription>
                  </FormItem>
                )}
              />
            )}

            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Observações</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder="Observações sobre o reagendamento..."
                      className="resize-none"
                    />
                  </FormControl>
                  <FormMessage />
                  <FormDescription>
                    <span className="text-xs text-muted-foreground">
                      Observações opcionais sobre o reagendamento.
                    </span>
                  </FormDescription>
                </FormItem>
              )}
            />

            <div className="flex justify-end space-x-2 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
                disabled={isLoading}
              >
                Cancelar
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Reagendando..." : "Reagendar"}
              </Button>
            </div>
          </form>
        </Form>
      </CollapsibleContent>
    </Collapsible>
  );
}
