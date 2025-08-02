"use client";

import { Card, CardContent } from "~/components/ui/card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";

import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { Calendar } from "~/components/ui/calendar";
import { CalendarIcon } from "lucide-react";
import { cn } from "~/lib/utils";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useState } from "react";

interface AvailabilityData {
  date: string;
  available: boolean;
  capacity: number;
  booked: number;
  dayOfWeek: string;
}

interface EnhancedScheduleDatePickerProps {
  date?: Date;
  onDateChange?: (date: Date | undefined) => void;
  placeholder?: string;
  availabilityData?: AvailabilityData[];
  className?: string;
}

export function EnhancedScheduleDatePicker({
  date,
  onDateChange,
  placeholder = "Selecione uma data",
  availabilityData = [],
  className,
}: EnhancedScheduleDatePickerProps) {
  const [isOpen, setIsOpen] = useState(false);

  const getAvailabilityForDate = (date: Date) => {
    const dateString = format(date, "yyyy-MM-dd");
    return availabilityData.find((item) => item.date === dateString);
  };

  const getAvailabilityBadge = (date: Date) => {
    const availability = getAvailabilityForDate(date);
    if (!availability) return null;

    const availableSlots = availability.capacity - availability.booked;

    if (availableSlots <= 0) {
      return (
        <Badge variant="destructive" className="text-xs">
          Sem vagas
        </Badge>
      );
    } else if (availableSlots <= 3) {
      return (
        <Badge variant="secondary" className="text-xs">
          {availableSlots} vaga{availableSlots > 1 ? "s" : ""}
        </Badge>
      );
    } else {
      return (
        <Badge variant="outline" className="text-xs">
          {availableSlots} vagas
        </Badge>
      );
    }
  };

  const isDateDisabled = (date: Date) => {
    const availability = getAvailabilityForDate(date);
    return availability ? !availability.available : false;
  };

  const handleDateSelect = (selectedDate: Date | undefined) => {
    if (selectedDate && !isDateDisabled(selectedDate)) {
      onDateChange?.(selectedDate);
      setIsOpen(false);
    }
  };

  const getDayOfWeekLabel = (dayOfWeek: string) => {
    switch (dayOfWeek) {
      case "MONDAY":
        return "Segunda T";
      case "TUESDAY":
        return "Terça T";
      case "THURSDAY":
        return "Quinta M";
      default:
        return "";
    }
  };

  return (
    <div className={cn("w-full", className)}>
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              "w-full justify-start text-left font-normal",
              !date && "text-muted-foreground",
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date ? (
              <div className="flex items-center gap-2">
                <span>{format(date, "PPP", { locale: ptBR })}</span>
                {getAvailabilityBadge(date)}
              </div>
            ) : (
              placeholder
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <div className="flex">
            <Calendar
              mode="single"
              selected={date}
              onSelect={handleDateSelect}
              disabled={isDateDisabled}
              className="rounded-md border-0"
              classNames={{
                day: "h-9 w-9 p-0 font-normal aria-selected:opacity-100",
                day_selected:
                  "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
                day_today: "bg-accent text-accent-foreground",
                day_outside: "text-muted-foreground opacity-50",
                day_disabled: "text-muted-foreground opacity-50",
                day_range_middle:
                  "aria-selected:bg-accent aria-selected:text-accent-foreground",
                day_hidden: "invisible",
                caption: "flex justify-center pt-1 relative items-center",
                caption_label: "text-sm font-medium",
                nav: "space-x-1 flex items-center",
                nav_button: cn(
                  "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100",
                ),
                nav_button_previous: "absolute left-1",
                nav_button_next: "absolute right-1",
                table: "w-full border-collapse space-y-1",
                head_row: "flex",
                head_cell:
                  "text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]",
                row: "flex w-full mt-2",
                cell: "h-9 w-9 text-center text-sm p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
              }}
            />

            {/* Painel lateral com informações de disponibilidade */}
            <div className="w-64 border-l p-4">
              <div className="space-y-4">
                <div>
                  <h4 className="mb-2 text-sm font-medium">
                    Legenda de Disponibilidade
                  </h4>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="h-4 w-4 rounded border border-green-200 bg-green-50"></div>
                      <span className="text-xs">Vagas disponíveis</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="h-4 w-4 rounded border border-orange-200 bg-orange-50"></div>
                      <span className="text-xs">Poucas vagas (≤3)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="h-4 w-4 rounded border border-red-200 bg-red-50"></div>
                      <span className="text-xs">Sem vagas</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="mb-2 text-sm font-medium">
                    Próximas Datas Disponíveis
                  </h4>
                  <div className="max-h-32 space-y-2 overflow-y-auto">
                    {availabilityData
                      .filter((item) => item.available)
                      .slice(0, 5)
                      .map((item) => {
                        const itemDate = new Date(item.date);
                        const availableSlots = item.capacity - item.booked;
                        return (
                          <Card key={item.date} className="p-2">
                            <CardContent className="p-0">
                              <div className="flex items-center justify-between">
                                <div>
                                  <div className="text-xs font-medium">
                                    {format(itemDate, "dd/MM/yyyy", {
                                      locale: ptBR,
                                    })}
                                  </div>
                                  <div className="text-xs text-muted-foreground">
                                    {getDayOfWeekLabel(item.dayOfWeek)}
                                  </div>
                                </div>
                                <Badge
                                  variant={
                                    availableSlots <= 3
                                      ? "secondary"
                                      : "outline"
                                  }
                                  className="text-xs"
                                >
                                  {availableSlots} vagas
                                </Badge>
                              </div>
                            </CardContent>
                          </Card>
                        );
                      })}
                  </div>
                </div>

                {date && (
                  <div>
                    <h4 className="mb-2 text-sm font-medium">
                      Data Selecionada
                    </h4>
                    <Card className="p-2">
                      <CardContent className="p-0">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="text-xs font-medium">
                              {format(date, "dd/MM/yyyy", { locale: ptBR })}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              {format(date, "EEEE", { locale: ptBR })}
                            </div>
                          </div>
                          {getAvailabilityBadge(date)}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                )}
              </div>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
