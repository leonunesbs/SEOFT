"use client";

import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Calendar as CalendarIcon } from "lucide-react";
import { useState } from "react";
import { cn, localToUTC, utcToLocal } from "~/lib/utils";

import { Button } from "~/components/ui/button";
import { Calendar } from "~/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";

interface ScheduleDatePickerProps {
  date?: Date;
  onDateChange?: (date: Date | undefined) => void;
  placeholder?: string;
  minDate?: Date;
  className?: string;
}

// Função para verificar se uma data é válida para agendamento
function isValidScheduleDate(date: Date): boolean {
  const dayOfWeek = date.getDay(); // 0 = Domingo, 1 = Segunda, 2 = Terça, 4 = Quinta
  return dayOfWeek === 1 || dayOfWeek === 2 || dayOfWeek === 4;
}

export function ScheduleDatePicker({
  date,
  onDateChange,
  placeholder = "Selecione uma data",
  minDate,
  className,
}: ScheduleDatePickerProps) {
  const [isOpen, setIsOpen] = useState(false);

  // Função para lidar com mudanças de data
  const handleDateChange = (selectedDate: Date | undefined) => {
    console.log(
      "ScheduleDatePicker - handleDateChange called with:",
      selectedDate,
    );
    if (onDateChange && selectedDate) {
      // Converter data local para UTC para armazenamento
      const utcDate = localToUTC(selectedDate);
      console.log("ScheduleDatePicker - converted to UTC:", utcDate);
      onDateChange(utcDate);
      // Fechar o popover após selecionar uma data
      setIsOpen(false);
    } else if (onDateChange) {
      onDateChange(undefined);
    }
  };

  // Converter data UTC para local para exibição no calendário
  const displayDate = date ? utcToLocal(date) : undefined;

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[280px] justify-start text-left font-normal",
            !displayDate && "text-muted-foreground",
            className,
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {displayDate
            ? format(displayDate, "PPP", { locale: ptBR })
            : placeholder}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <div className="border-b bg-muted/50 p-3">
          <p className="text-center text-sm text-muted-foreground">
            Segunda T, Terça T, Quinta M
          </p>
        </div>
        <Calendar
          mode="single"
          selected={displayDate}
          onSelect={handleDateChange}
          defaultMonth={displayDate}
          disabled={(date) => {
            // Desabilitar datas antes da data mínima
            if (minDate && date < minDate) return true;

            // Desabilitar datas que não são válidas para agendamento
            return !isValidScheduleDate(date);
          }}
          initialFocus
          classNames={{
            day_disabled: "text-muted-foreground opacity-30 cursor-not-allowed",
          }}
        />
      </PopoverContent>
    </Popover>
  );
}
