"use client";

import {
  AlertTriangle,
  Calendar,
  Clock,
  TrendingUp,
  Users,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";

import { Badge } from "~/components/ui/badge";
import { api } from "~/trpc/react";

interface AvailabilityIndicatorProps {
  selectedDate?: string; // formato: "YYYY-MM-DD"
  className?: string;
}

export function AvailabilityIndicator({
  selectedDate,
  className,
}: AvailabilityIndicatorProps) {
  // Buscar disponibilidade para a data selecionada
  const { data: availability, isLoading } =
    api.schedule.checkAvailability.useQuery(
      { date: selectedDate || "" },
      { enabled: !!selectedDate },
    );

  // Buscar próximas datas disponíveis se a atual não estiver disponível
  const { data: nextAvailable } = api.schedule.findNextAvailableDate.useQuery(
    { startDate: selectedDate || "" },
    { enabled: !!selectedDate && availability && !availability.available },
  );

  if (!selectedDate) {
    return (
      <Card className={className}>
        <CardContent className="p-6">
          <div className="flex items-center justify-center text-muted-foreground">
            <Calendar className="mr-3 h-8 w-8" />
            <span>Selecione uma data para ver a disponibilidade</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (isLoading) {
    return (
      <Card className={className}>
        <CardHeader>
          <CardTitle className="flex items-center text-sm">
            <Calendar className="mr-2 h-4 w-4" />
            Verificando disponibilidade...
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-4">
            <div className="h-6 w-6 animate-spin rounded-full border-b-2 border-primary"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!availability) {
    return (
      <Card className={className}>
        <CardContent className="p-6">
          <div className="flex items-center justify-center text-destructive">
            <AlertTriangle className="mr-2 h-6 w-6" />
            <span>Erro ao verificar disponibilidade</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  const availableSlots = availability.capacity - availability.booked;
  const occupancyPercentage = Math.round(
    (availability.booked / availability.capacity) * 100,
  );

  // Função para obter informações do turno
  const getShiftInfo = () => {
    if (availability.shift === "MORNING") {
      return { name: "Manhã", icon: "🌅", time: "08:00-12:00" };
    } else {
      return { name: "Tarde", icon: "🌇", time: "14:00-18:00" };
    }
  };

  const shiftInfo = getShiftInfo();

  // Função para obter cor baseada na disponibilidade
  const getAvailabilityColor = () => {
    if (availableSlots <= 0) return "destructive";
    if (availableSlots <= 3) return "secondary";
    return "default";
  };

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center text-sm">
          <Calendar className="mr-2 h-4 w-4" />
          {new Date(selectedDate)
            .toLocaleDateString("pt-BR", {
              weekday: "long",
              timeZone: "UTC",
            })
            .toLocaleUpperCase()}
          ,{" "}
          {new Date(selectedDate).toLocaleDateString("pt-BR", {
            timeZone: "UTC",
          })}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Informações do turno */}
        <div className="flex items-center justify-between rounded-lg bg-muted/50 p-3">
          <div className="flex items-center">
            <span className="mr-2 text-lg">{shiftInfo.icon}</span>
            <div>
              <div className="text-sm font-medium">{shiftInfo.name}</div>
              <div className="text-xs text-muted-foreground">
                {shiftInfo.time}
              </div>
            </div>
          </div>
          <Badge variant="outline" className="text-xs">
            {availability.dayOfWeek}
          </Badge>
        </div>

        {/* Status de disponibilidade */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Users className="mr-2 h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">Disponibilidade</span>
            </div>
            <Badge variant={getAvailabilityColor()}>
              {availability.available ? "Disponível" : "Sem vagas"}
            </Badge>
          </div>

          {/* Métricas de vagas */}
          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-lg bg-muted/50 p-3 text-center">
              <div className="text-2xl font-bold text-primary">
                {availableSlots}
              </div>
              <div className="text-xs text-muted-foreground">Vagas livres</div>
            </div>
            <div className="rounded-lg bg-muted/50 p-3 text-center">
              <div className="text-2xl font-bold text-secondary-foreground">
                {availability.capacity}
              </div>
              <div className="text-xs text-muted-foreground">
                Capacidade total
              </div>
            </div>
          </div>

          {/* Barra de ocupação */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span>Ocupação: {occupancyPercentage}%</span>
              <span>{availability.booked} agendados</span>
            </div>
            <div className="h-2 w-full rounded-full bg-muted">
              <div
                className={`h-2 rounded-full transition-all duration-300 ${
                  occupancyPercentage >= 90
                    ? "bg-destructive"
                    : occupancyPercentage >= 70
                      ? "bg-secondary"
                      : "bg-primary"
                }`}
                style={{ width: `${occupancyPercentage}%` }}
              />
            </div>
          </div>

          {/* Alertas e recomendações */}
          {!availability.available && nextAvailable && (
            <div className="rounded-lg border border-destructive/20 bg-destructive/10 p-3">
              <div className="flex items-start">
                <TrendingUp className="mr-2 mt-0.5 h-4 w-4 text-destructive" />
                <div className="text-sm">
                  <div className="mb-1 font-medium text-destructive">
                    Data sem vagas
                  </div>
                  <div className="text-xs text-destructive/80">
                    Próxima data disponível:{" "}
                    <span className="font-medium">
                      {nextAvailable?.date
                        ? new Date(nextAvailable.date).toLocaleDateString(
                            "pt-BR",
                            {
                              timeZone: "UTC",
                            },
                          )
                        : "N/A"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {availability.available && availableSlots <= 3 && (
            <div className="rounded-lg border border-secondary/20 bg-secondary/10 p-3">
              <div className="flex items-start">
                <AlertTriangle className="mr-2 mt-0.5 h-4 w-4 text-secondary-foreground" />
                <div className="text-sm">
                  <div className="mb-1 font-medium text-secondary-foreground">
                    Poucas vagas restantes
                  </div>
                  <div className="text-xs text-secondary-foreground/80">
                    Recomendamos agendar o mais breve possível.
                  </div>
                </div>
              </div>
            </div>
          )}

          {availability.available && availableSlots > 5 && (
            <div className="rounded-lg border border-primary/20 bg-primary/10 p-3">
              <div className="flex items-start">
                <Clock className="mr-2 mt-0.5 h-4 w-4 text-primary" />
                <div className="text-sm">
                  <div className="mb-1 font-medium text-primary">
                    Boa disponibilidade
                  </div>
                  <div className="text-xs text-primary/80">
                    Esta data tem boa disponibilidade de vagas.
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
