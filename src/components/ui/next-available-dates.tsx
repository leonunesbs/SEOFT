"use client";

import { Calendar, ChevronRight, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";

import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { api } from "~/trpc/react";
import { formatDateForAPI } from "~/lib/utils";

interface NextAvailableDatesProps {
  onDateSelect?: (date: string) => void;
  maxDates?: number;
  className?: string;
  fromDate?: string;
}

export function NextAvailableDates({
  onDateSelect,
  maxDates = 5,
  className,
  fromDate,
}: NextAvailableDatesProps) {
  // Calcular próximos dias válidos para verificar disponibilidade
  const getNextValidDates = () => {
    const dates: string[] = [];
    const currentDate = new Date(fromDate || new Date());

    for (let i = 0; i < 60 && dates.length < maxDates; i++) {
      const testDate = new Date(currentDate);
      testDate.setDate(testDate.getDate() + i);

      const dayOfWeek = testDate.getDay();
      // Segunda (1), Terça (2) ou Quinta (4)
      if (dayOfWeek === 1 || dayOfWeek === 2 || dayOfWeek === 4) {
        dates.push(formatDateForAPI(testDate));
      }
    }

    return dates;
  };

  // Buscar disponibilidade para os próximos dias válidos
  const { data: availabilityData, isLoading } =
    api.schedule.checkMultipleDates.useQuery({ dates: getNextValidDates() });

  // Filtrar apenas datas disponíveis
  const availableDates =
    availabilityData?.filter((item) => item.available) || [];

  // Função para obter informações do turno
  const getShiftInfo = (shift: string) => {
    if (shift === "MORNING") {
      return { name: "Manhã", icon: "🌅", time: "08:00-12:00" };
    } else {
      return { name: "Tarde", icon: "🌇", time: "14:00-18:00" };
    }
  };

  // Função para obter cor da disponibilidade
  const getAvailabilityLevel = (capacity: number, booked: number) => {
    const available = capacity - booked;
    if (available >= 10) return { level: "high", variant: "default" as const };
    if (available >= 5)
      return { level: "medium", variant: "secondary" as const };
    return { level: "low", variant: "outline" as const };
  };

  if (isLoading) {
    return (
      <Card className={className}>
        <CardHeader>
          <CardTitle className="flex items-center text-sm">
            <Calendar className="mr-2 h-4 w-4" />
            Próximas Datas Disponíveis
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="h-16 rounded-lg bg-muted"></div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!availableDates.length) {
    return (
      <Card className={className}>
        <CardHeader>
          <CardTitle className="flex items-center text-sm">
            <Calendar className="mr-2 h-4 w-4" />
            Próximas Datas Disponíveis
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="py-6 text-center text-muted-foreground">
            <Calendar className="mx-auto mb-2 h-8 w-8 opacity-50" />
            <p className="text-sm">Nenhuma data disponível encontrada</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center text-sm">
          <Calendar className="mr-2 h-4 w-4" />
          Próximas Datas Disponíveis
        </CardTitle>
        <p className="mt-1 text-xs text-muted-foreground">
          Selecione uma data para agendamento rápido
        </p>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {availableDates.slice(0, maxDates).map((dateInfo) => {
            const shiftInfo = getShiftInfo(dateInfo.shift!);
            const availabilityLevel = getAvailabilityLevel(
              dateInfo.capacity,
              dateInfo.booked,
            );
            const availableSlots = dateInfo.capacity - dateInfo.booked;

            return (
              <Button
                key={dateInfo.date}
                variant="outline"
                className="h-auto w-full p-3 transition-colors hover:bg-accent"
                onClick={() => onDateSelect?.(dateInfo.date)}
              >
                <div className="flex w-full items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="text-left">
                      <div className="text-sm font-medium">
                        {new Date(dateInfo.date).toLocaleDateString("pt-BR", {
                          weekday: "long",
                          timeZone: "UTC",
                        })}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {new Date(dateInfo.date).toLocaleDateString("pt-BR", {
                          timeZone: "UTC",
                        })}
                      </div>
                    </div>

                    <div className="flex items-center text-xs text-muted-foreground">
                      <span className="mr-1">{shiftInfo.icon}</span>
                      <span>{shiftInfo.name}</span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Badge
                      className="text-xs"
                      variant={availabilityLevel.variant}
                    >
                      {availableSlots} vagas
                    </Badge>
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                  </div>
                </div>
              </Button>
            );
          })}
        </div>

        {/* Informação adicional */}
        <div className="mt-4 border-t pt-3 text-xs text-muted-foreground">
          <div className="flex items-center">
            <Clock className="mr-1 h-3 w-3" />
            <span>Horários: Seg/Ter 14h-18h • Qui 8h-12h</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
