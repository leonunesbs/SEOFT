"use client";

import { Card, CardContent } from "~/components/ui/card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";

import { Button } from "~/components/ui/button";
import { Calendar } from "~/components/ui/calendar";
import { CalendarIcon } from "lucide-react";
import { cn } from "~/lib/utils";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface EvaluationFiltersProps {
  clinics: { id: string; name: string }[];
  collaborators: { id: string; name: string }[];
  selectedClinic: string | undefined;
  selectedCollaborator: string | undefined;
  selectedDate: Date | undefined;
  onClinicChange: (value: string) => void;
  onCollaboratorChange: (value: string) => void;
  onDateChange: (date: Date | undefined) => void;
}

export function EvaluationFilters({
  clinics,
  collaborators,
  selectedClinic,
  selectedCollaborator,
  selectedDate,
  onClinicChange,
  onCollaboratorChange,
  onDateChange,
}: EvaluationFiltersProps) {
  return (
    <Card className="mb-4">
      <CardContent className="flex flex-wrap items-center gap-4 p-4">
        <div className="min-w-[200px] flex-1">
          <Select value={selectedClinic} onValueChange={onClinicChange}>
            <SelectTrigger>
              <SelectValue placeholder="Filtrar por ambulatório" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos os ambulatórios</SelectItem>
              {clinics.map((clinic) => (
                <SelectItem key={clinic.id} value={clinic.id}>
                  {clinic.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="min-w-[200px] flex-1">
          <Select
            value={selectedCollaborator}
            onValueChange={onCollaboratorChange}
          >
            <SelectTrigger>
              <SelectValue placeholder="Filtrar por médico" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos os médicos</SelectItem>
              {collaborators.map((collaborator) => (
                <SelectItem key={collaborator.id} value={collaborator.id}>
                  {collaborator.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="min-w-[200px] flex-1">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !selectedDate && "text-muted-foreground",
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {selectedDate ? (
                  format(selectedDate, "PPP", { locale: ptBR })
                ) : (
                  <span>Filtrar por data</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={onDateChange}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
      </CardContent>
    </Card>
  );
}
