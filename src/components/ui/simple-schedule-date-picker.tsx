"use client";

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
  dayOfWeek?: string;
  reason?: string;
  shift?: "MORNING" | "AFTERNOON";
}

interface SimpleScheduleDatePickerProps {
  date?: Date;
  onDateChange?: (date: Date | undefined) => void;
  placeholder?: string;
  availabilityData?: AvailabilityData[];
  className?: string;
}

export function SimpleScheduleDatePicker({
  date,
  onDateChange,
  placeholder = "Selecione uma data",
  availabilityData = [],
  className,
}: SimpleScheduleDatePickerProps) {
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
        <Badge variant="destructive" className="text-xs font-medium">
          Sem vagas
        </Badge>
      );
    } else if (availableSlots <= 3) {
      return (
        <Badge
          variant="secondary"
          className="border-orange-200 bg-orange-100 text-xs font-medium text-orange-800"
        >
          {availableSlots} vaga{availableSlots > 1 ? "s" : ""}
        </Badge>
      );
    } else {
      return (
        <Badge
          variant="outline"
          className="border-green-200 bg-green-50 text-xs font-medium text-green-700"
        >
          {availableSlots} vagas
        </Badge>
      );
    }
  };

  const getAvailabilityStatus = (date: Date) => {
    const availability = getAvailabilityForDate(date);
    if (!availability) return "unknown";

    const availableSlots = availability.capacity - availability.booked;
    if (availableSlots <= 0) return "unavailable";
    if (availableSlots <= 3) return "limited";
    return "available";
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

  const getDayClassName = (date: Date) => {
    const status = getAvailabilityStatus(date);
    const baseClasses = "h-9 w-9 p-0 font-normal relative";

    switch (status) {
      case "available":
        return cn(
          baseClasses,
          "hover:bg-green-50 hover:text-green-700 focus:bg-green-50 focus:text-green-700",
        );
      case "limited":
        return cn(
          baseClasses,
          "hover:bg-orange-50 hover:text-orange-700 focus:bg-orange-50 focus:text-orange-700",
        );
      case "unavailable":
        return cn(
          baseClasses,
          "text-muted-foreground opacity-50 cursor-not-allowed",
        );
      default:
        return baseClasses;
    }
  };

  return (
    <div className={cn("w-full", className)}>
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              "w-full justify-start text-left font-normal hover:bg-accent/50",
              !date && "text-muted-foreground",
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date ? (
              <div className="flex items-center gap-2">
                <span className="font-medium">
                  {format(date, "dd/MM/yyyy", { locale: ptBR })}
                </span>
                {getAvailabilityBadge(date)}
              </div>
            ) : (
              placeholder
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto border-0 p-0 shadow-lg" align="start">
          <div className="border-b bg-gradient-to-r from-blue-50 to-indigo-50 p-3 sm:p-4">
            <h4 className="mb-1 text-sm font-semibold text-gray-900">
              Selecionar Data
            </h4>
            <div className="text-xs text-gray-600">
              Clique em uma data disponível para selecionar
            </div>
          </div>

          <Calendar
            mode="single"
            selected={date}
            onSelect={handleDateSelect}
            disabled={isDateDisabled}
            className="rounded-md"
            classNames={{
              day: "h-9 w-9 p-0 font-normal aria-selected:opacity-100",
              day_selected:
                "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground shadow-sm",
              day_today: "bg-accent text-accent-foreground font-semibold",
              day_outside: "text-muted-foreground opacity-50",
              day_disabled:
                "text-muted-foreground opacity-50 cursor-not-allowed",
              day_range_middle:
                "aria-selected:bg-accent aria-selected:text-accent-foreground",
              day_hidden: "invisible",
              caption: "flex justify-center pt-1 relative items-center",
              caption_label: "text-sm font-medium",
              nav: "space-x-1 flex items-center",
              nav_button: cn(
                "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100 hover:bg-accent/50 rounded-md",
              ),
              nav_button_previous: "absolute left-1",
              nav_button_next: "absolute right-1",
              table: "w-full border-collapse space-y-1",
              head_row: "flex",
              head_cell:
                "text-muted-foreground rounded-md w-9 font-normal text-[0.8rem] font-medium",
              row: "flex w-full mt-2",
              cell: "h-9 w-9 text-center text-sm p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
            }}
            components={{
              Day: ({ date, ...props }) => {
                const status = getAvailabilityStatus(date);

                return (
                  <div className="relative">
                    <button
                      {...props}
                      className={cn(
                        getDayClassName(date),
                        status === "available" &&
                          "hover:bg-green-50 hover:text-green-700 focus:bg-green-50 focus:text-green-700",
                        status === "limited" &&
                          "hover:bg-orange-50 hover:text-orange-700 focus:bg-orange-50 focus:text-orange-700",
                        status === "unavailable" &&
                          "cursor-not-allowed text-muted-foreground opacity-50",
                      )}
                    >
                      {date.getDate()}
                    </button>
                  </div>
                );
              },
            }}
          />

          <div className="border-t bg-gray-50 p-3 sm:p-4">
            <div className="space-y-2 sm:space-y-3">
              {date && (
                <div className="border-t border-gray-200 pt-2">
                  <div className="text-right">
                    <div className="text-sm font-semibold text-gray-900">
                      {format(date, "dd/MM/yyyy", { locale: ptBR })}
                    </div>
                    <div className="text-xs capitalize text-gray-600">
                      {format(date, "EEEE", { locale: ptBR })}
                    </div>
                    {getAvailabilityBadge(date)}
                  </div>
                </div>
              )}
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
