"use client";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";

import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { Calendar } from "~/components/ui/calendar";
import { Calendar as CalendarIcon } from "lucide-react";
import { api } from "~/trpc/react";
import { cn } from "~/lib/utils";

interface DatePickerWithOccupancyProps {
  date?: Date;
  onDateChange?: (date: Date | undefined) => void;
  placeholder?: string;
  minDate?: Date;
  className?: string;
  collaboratorId?: string;
  patientId?: string; // Novo prop para verificar disponibilidade do paciente
  occupancyData?: Record<
    string,
    { total: number; morning: number; afternoon: number }
  >; // Dados de ocupação carregados server-side
}

export function DatePickerWithOccupancy({
  date,
  onDateChange,
  placeholder = "Selecione uma data",
  minDate,
  className,
  collaboratorId,
  patientId,
  occupancyData,
}: DatePickerWithOccupancyProps) {
  // Função para lidar com mudanças de data
  const handleDateChange = (selectedDate: Date | undefined) => {
    if (onDateChange && selectedDate) {
      // Usar a data selecionada diretamente sem normalização UTC
      onDateChange(selectedDate);
    } else if (onDateChange) {
      onDateChange(undefined);
    }
  };

  // Buscar dados de ocupação para o mês atual
  const currentMonth = date
    ? new Date(date.getFullYear(), date.getMonth(), 1)
    : new Date();
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

  // Usar dados server-side se fornecidos, caso contrário usar tRPC
  const { data: clientOccupancyByDate } =
    api.appointment.getOccupancyByPeriod.useQuery(
      {
        startDate: startOfMonth,
        endDate: endOfMonth,
        collaboratorId,
      },
      {
        enabled: !occupancyData, // Só executar se não tivermos dados server-side
      },
    );

  // Usar dados server-side se disponíveis, caso contrário usar dados do cliente
  const occupancyByDate = occupancyData || clientOccupancyByDate;

  // Verificar se o paciente já tem agendamento na data selecionada
  const { data: patientAvailability } =
    api.appointment.checkPatientAvailability.useQuery(
      {
        patientId: patientId || "",
        scheduledDate: date || new Date(),
      },
      {
        enabled: !!patientId && !!date,
      },
    );

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-full justify-start text-left font-normal",
            !date && "text-muted-foreground",
            className,
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date
            ? new Date(date).toLocaleDateString("pt-BR", {
                timeZone: "UTC",
                dateStyle: "full",
              })
            : placeholder}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="center">
        <div className="border-b p-3">
          <p className="mb-2 text-center text-sm text-muted-foreground">
            Indicadores de Lotação
          </p>
          <div className="flex items-center justify-center gap-3 text-xs">
            <div className="flex items-center gap-1">
              <div className="h-3 w-3 rounded-full bg-green-500"></div>
              <span>Baixa (≤30)</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
              <span>Média (31-50)</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="h-3 w-3 rounded-full bg-orange-500"></div>
              <span>Alta (51-80)</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="h-3 w-3 rounded-full bg-red-500"></div>
              <span>Crítica (80+)</span>
            </div>
          </div>
        </div>
        <div className="flex justify-center">
          <Calendar
            mode="single"
            selected={date}
            onSelect={handleDateChange}
            defaultMonth={date}
            disabled={(date) => (minDate ? date < minDate : false)}
            initialFocus
            classNames={{
              day: cn(
                "h-9 w-9 p-0 font-normal aria-selected:opacity-100 relative",
                "hover:bg-accent hover:text-accent-foreground",
              ),
            }}
            modifiers={{
              low: (date) => {
                const dateKey = date.toISOString().split("T")[0];
                const count = dateKey
                  ? occupancyByDate?.[dateKey]?.total || 0
                  : 0;
                return count > 0 && count <= 30;
              },
              medium: (date) => {
                const dateKey = date.toISOString().split("T")[0];
                const count = dateKey
                  ? occupancyByDate?.[dateKey]?.total || 0
                  : 0;
                return count > 30 && count <= 50;
              },
              high: (date) => {
                const dateKey = date.toISOString().split("T")[0];
                const count = dateKey
                  ? occupancyByDate?.[dateKey]?.total || 0
                  : 0;
                return count > 50 && count <= 80;
              },
              critical: (date) => {
                const dateKey = date.toISOString().split("T")[0];
                const count = dateKey
                  ? occupancyByDate?.[dateKey]?.total || 0
                  : 0;
                return count > 80;
              },
            }}
            modifiersClassNames={{
              low: "text-green-500",
              medium: "text-yellow-500",
              high: "text-orange-500",
              critical: "text-red-500",
            }}
          />
        </div>
        {/* Mostrar contagem de agendamentos para a data selecionada */}
        {date && (
          <div className="border-t p-3">
            <div className="text-center text-sm">
              <span className="text-muted-foreground">Agendamentos para </span>
              <span className="font-medium">
                {date.toLocaleDateString("pt-BR")}
              </span>
              <span className="text-muted-foreground">: </span>
              <Badge
                variant="secondary"
                className={cn(
                  "ml-1",
                  (() => {
                    const dateKey = date.toISOString().split("T")[0];
                    const count = dateKey
                      ? occupancyByDate?.[dateKey]?.total || 0
                      : 0;

                    if (count === 0) return "";
                    if (count <= 30) return "text-green-500";
                    if (count <= 50) return "text-yellow-500";
                    if (count <= 80) return "text-orange-500";
                    return "text-red-500";
                  })(),
                )}
              >
                {(() => {
                  const dateKey = date.toISOString().split("T")[0];
                  return dateKey ? occupancyByDate?.[dateKey]?.total || 0 : 0;
                })()}
              </Badge>
            </div>

            {/* Mostrar contagem por turnos */}
            {(() => {
              const dateKey = date.toISOString().split("T")[0];
              const occupancy = dateKey ? occupancyByDate?.[dateKey] : null;

              if (!occupancy || occupancy.total === 0) return null;

              return (
                <div className="mt-3 space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">Manhã:</span>
                    <Badge variant="outline" className="text-xs">
                      {occupancy.morning}
                    </Badge>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">Tarde:</span>
                    <Badge variant="outline" className="text-xs">
                      {occupancy.afternoon}
                    </Badge>
                  </div>
                </div>
              );
            })()}

            {/* Mostrar categoria de lotação */}
            {(() => {
              const dateKey = date.toISOString().split("T")[0];
              const count = dateKey
                ? occupancyByDate?.[dateKey]?.total || 0
                : 0;

              if (count === 0) return null;

              let category = "";
              let categoryColor = "";

              if (count <= 30) {
                category = "Baixa Lotação";
                categoryColor = "text-green-600";
              } else if (count <= 50) {
                category = "Média Lotação";
                categoryColor = "text-yellow-600";
              } else if (count <= 80) {
                category = "Alta Lotação";
                categoryColor = "text-orange-600";
              } else {
                category = "Lotação Crítica";
                categoryColor = "text-red-600";
              }

              return (
                <div className="mt-2 text-center">
                  <span className={cn("text-xs font-medium", categoryColor)}>
                    {category}
                  </span>
                </div>
              );
            })()}

            {/* Aviso se o paciente já tem agendamento nesta data */}
            {patientAvailability && !patientAvailability.isAvailable && (
              <div className="mt-3 rounded-md p-2">
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 rounded-full bg-red-500"></div>
                  <span className="text-xs font-medium text-red-500">
                    ⚠️ Paciente já possui agendamento nesta data
                  </span>
                </div>
                {patientAvailability.existingAppointment && (
                  <div className="mt-1 text-xs text-red-500">
                    {patientAvailability.existingAppointment.clinic?.name}
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
}
