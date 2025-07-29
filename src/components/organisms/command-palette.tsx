"use client";

import * as React from "react";

import { Calendar, Plus, Search, Settings, User } from "lucide-react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandLoading,
} from "~/components/ui/command";

import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { api } from "~/trpc/react";
import { useDebounce } from "~/hooks/use-debounce";
import { useRouter } from "next/navigation";

// ============================================================================
// TYPES
// ============================================================================

interface Patient {
  id: string;
  refId: string;
  name: string;
  birthDate: string;
}

interface CommandPaletteProps {
  trigger?: React.ReactNode;
}

// ============================================================================
// UTILITIES
// ============================================================================

function formatAge(birthDate: string): number {
  const today = new Date();
  const birth = new Date(birthDate);
  let age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();

  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--;
  }

  return age;
}

function formatDate(date: string): string {
  return new Date(date).toLocaleDateString("pt-BR", {
    timeZone: "UTC",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

// ============================================================================
// COMPONENTS
// ============================================================================

function QuickActions({ onNavigate }: { onNavigate: (path: string) => void }) {
  const actions = [
    {
      title: "Novo Paciente",
      icon: <Plus className="mr-2 h-4 w-4" />,
      action: () => onNavigate("/patients/add"),
      shortcut: "⌘N",
    },
    {
      title: "Buscar Pacientes",
      icon: <Search className="mr-2 h-4 w-4" />,
      action: () => onNavigate("/patients/search"),
      shortcut: "⌘S",
    },
    {
      title: "Configurações",
      icon: <Settings className="mr-2 h-4 w-4" />,
      action: () => onNavigate("/settings"),
      shortcut: "⌘,",
    },
  ];

  return (
    <CommandGroup heading="Ações Rápidas">
      {actions.map((action) => (
        <CommandItem key={action.title} onSelect={action.action}>
          <div className="flex w-full items-center justify-between">
            <div className="flex items-center">
              {action.icon}
              <span>{action.title}</span>
            </div>
            <Badge variant="outline" className="text-xs">
              {action.shortcut}
            </Badge>
          </div>
        </CommandItem>
      ))}
    </CommandGroup>
  );
}

function PatientItem({
  patient,
  onSelect,
}: {
  patient: Patient;
  onSelect: (patient: Patient) => void;
}) {
  return (
    <CommandItem onSelect={() => onSelect(patient)}>
      <div className="flex w-full items-center justify-between">
        <div className="flex items-center">
          <User className="mr-2 h-4 w-4" />
          <div className="flex flex-col">
            <span className="font-medium">{patient.name}</span>
            <span className="text-xs text-muted-foreground">
              Prontuário: {patient.refId}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Calendar className="h-3 w-3" />
          <span>{formatDate(patient.birthDate)}</span>
          <Badge variant="secondary" className="text-xs">
            {formatAge(patient.birthDate)} anos
          </Badge>
        </div>
      </div>
    </CommandItem>
  );
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export function CommandPalette({ trigger }: CommandPaletteProps) {
  const [open, setOpen] = React.useState(false);
  const [query, setQuery] = React.useState("");
  const router = useRouter();

  const debouncedQuery = useDebounce(query, 300);

  const { data: patients = [], isLoading } = api.patient.search.useQuery(
    debouncedQuery,
    { enabled: debouncedQuery.trim().length > 0 },
  );

  const handleNavigate = (path: string) => {
    router.push(path);
    setOpen(false);
  };

  const handlePatientSelect = (patient: Patient) => {
    handleNavigate(`/patients/${patient.id}`);
  };

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  React.useEffect(() => {
    if (!open) {
      setQuery("");
    }
  }, [open]);

  return (
    <>
      {trigger && (
        <Button
          variant="outline"
          className="h-9 w-9 p-0 xl:h-10 xl:w-60 xl:justify-start xl:px-3 xl:py-2"
          onClick={() => setOpen(true)}
        >
          <Search className="h-4 w-4 xl:mr-2" />
          <span className="hidden xl:inline-flex">Buscar pacientes...</span>
          <kbd className="pointer-events-none absolute right-1.5 top-2 hidden h-6 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium xl:flex">
            ⌘K
          </kbd>
        </Button>
      )}

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput
          placeholder="Buscar por nome ou número do prontuário..."
          value={query}
          onValueChange={setQuery}
          autoFocus
        />
        <CommandList>
          {!query.trim() && <QuickActions onNavigate={handleNavigate} />}

          {query.trim() && isLoading && <CommandLoading />}

          {query.trim() && !isLoading && patients.length > 0 && (
            <CommandGroup heading={`Pacientes (${patients.length})`}>
              {patients.map((patient) => (
                <PatientItem
                  key={patient.id}
                  patient={patient}
                  onSelect={handlePatientSelect}
                />
              ))}
            </CommandGroup>
          )}

          {query.trim() && !isLoading && patients.length === 0 && (
            <CommandEmpty>
              Nenhum paciente encontrado para &quot;{query}&quot;
            </CommandEmpty>
          )}
        </CommandList>
      </CommandDialog>
    </>
  );
}
