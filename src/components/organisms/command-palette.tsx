"use client";

import * as React from "react";

import {
  CommandDialog,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
  CommandLoading,
} from "~/components/ui/command";
import { Plus, Search, Settings, User } from "lucide-react";

import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { api } from "~/trpc/react";
import { useDebounce } from "~/hooks/use-debounce";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

interface Patient {
  id: string;
  refId: string;
  name: string;
  birthDate: string;
}

interface CommandPaletteProps {
  trigger?: React.ReactNode;
}

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

// Função para destacar os termos da busca
function highlightSearchTerm(text: string, searchTerm: string) {
  if (!searchTerm.trim()) return text;

  const regex = new RegExp(
    `(${searchTerm.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`,
    "gi",
  );
  const parts = text.split(regex);

  return parts.map((part, index) =>
    regex.test(part) ? (
      <mark
        key={index}
        className="rounded bg-blue-100 px-1 font-medium text-blue-900 dark:bg-blue-900/50 dark:text-blue-100"
      >
        {part}
      </mark>
    ) : (
      part
    ),
  );
}

export function CommandPalette({ trigger }: CommandPaletteProps) {
  const [open, setOpen] = React.useState(false);
  const [query, setQuery] = React.useState("");
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const debouncedQuery = useDebounce(query, 300);
  const router = useRouter();
  const { status } = useSession();

  const {
    data: patients = [],
    isLoading,
    error,
  } = api.patient.search.useQuery(debouncedQuery, {
    enabled: debouncedQuery.trim().length > 0 && status === "authenticated",
    retry: 1,
    refetchOnWindowFocus: false,
    staleTime: 30000,
  });

  React.useEffect(() => {
    if (error) {
      console.error("Patient search error:", error);
    }
  }, [error]);

  const handleNavigate = React.useCallback(
    (path: string) => {
      router.push(path);
      setOpen(false);
    },
    [router],
  );

  const handlePatientSelect = React.useCallback(
    (patient: Patient) => {
      handleNavigate(`/patients/${patient.id}`);
    },
    [handleNavigate],
  );

  // Render conditions
  const showQuickActions = !query.trim();
  const showLoading = query.trim() && isLoading;
  const showPatients = query.trim() && !isLoading && patients.length > 0;
  const showEmpty = query.trim() && !isLoading && patients.length === 0;

  // Reset selected index when query changes
  React.useEffect(() => {
    setSelectedIndex(0);
  }, [query, patients.length]);

  // Handle keyboard navigation
  const handleKeyDown = React.useCallback(
    (e: KeyboardEvent) => {
      if (!open) return;

      const totalItems = showQuickActions ? 3 : patients.length;

      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          setSelectedIndex((prev) => (prev + 1) % totalItems);
          break;
        case "ArrowUp":
          e.preventDefault();
          setSelectedIndex((prev) => (prev - 1 + totalItems) % totalItems);
          break;
        case "Enter":
          e.preventDefault();
          if (showQuickActions) {
            const actions = [
              () => handleNavigate("/patients/add"),
              () => handleNavigate("/patients/search"),
              () => handleNavigate("/settings"),
            ];
            actions[selectedIndex]?.();
          } else if (patients[selectedIndex]) {
            handlePatientSelect(patients[selectedIndex]);
          }
          break;
      }
    },
    [
      open,
      showQuickActions,
      patients,
      selectedIndex,
      handleNavigate,
      handlePatientSelect,
    ],
  );

  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((o) => !o);
      }
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

  React.useEffect(() => {
    if (!open) {
      setQuery("");
      setSelectedIndex(0);
    }
  }, [open]);

  return (
    <>
      {trigger && (
        <Button
          variant="outline"
          className="h-9 w-9 p-0 xl:h-10 xl:w-60 xl:justify-start xl:px-3 xl:py-2"
          onClick={() => {
            setOpen(true);
          }}
        >
          <Search className="h-4 w-4 xl:mr-2" />
          <span className="hidden xl:inline-flex">Buscar pacientes...</span>
          <kbd className="pointer-events-none absolute right-1.5 top-2 hidden h-6 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium xl:flex">
            ⌘K
          </kbd>
        </Button>
      )}

      <CommandDialog
        open={open}
        onOpenChange={(newOpen) => {
          setOpen(newOpen);
        }}
      >
        <CommandInput
          placeholder="Buscar por nome ou número do prontuário..."
          value={query}
          onValueChange={(newQuery) => {
            setQuery(newQuery);
          }}
          autoFocus
        />
        <CommandList>
          {showQuickActions && (
            <>
              <CommandItem
                onSelect={() => {
                  handleNavigate("/patients/add");
                }}
                className={`group relative flex cursor-pointer select-none items-center gap-3 rounded-lg px-3 py-3 text-sm outline-none transition-all duration-200 hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground active:scale-[0.98] ${selectedIndex === 0 ? "bg-accent text-accent-foreground" : ""}`}
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-500/10 text-green-600 transition-colors group-hover:bg-green-500/20 dark:text-green-400">
                  <Plus className="h-4 w-4" />
                </div>
                <div className="flex flex-1 items-center justify-between">
                  <span className="font-medium">Novo Paciente</span>
                  <Badge variant="outline" className="text-xs">
                    ⌘N
                  </Badge>
                </div>
              </CommandItem>
              <CommandItem
                onSelect={() => {
                  handleNavigate("/patients/search");
                }}
                className={`group relative flex cursor-pointer select-none items-center gap-3 rounded-lg px-3 py-3 text-sm outline-none transition-all duration-200 hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground active:scale-[0.98] ${selectedIndex === 1 ? "bg-accent text-accent-foreground" : ""}`}
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-500/10 text-blue-600 transition-colors group-hover:bg-blue-500/20 dark:text-blue-400">
                  <Search className="h-4 w-4" />
                </div>
                <div className="flex flex-1 items-center justify-between">
                  <span className="font-medium">Buscar Pacientes</span>
                  <Badge variant="outline" className="text-xs">
                    ⌘S
                  </Badge>
                </div>
              </CommandItem>
              <CommandItem
                onSelect={() => {
                  handleNavigate("/settings");
                }}
                className={`group relative flex cursor-pointer select-none items-center gap-3 rounded-lg px-3 py-3 text-sm outline-none transition-all duration-200 hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground active:scale-[0.98] ${selectedIndex === 2 ? "bg-accent text-accent-foreground" : ""}`}
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-500/10 text-purple-600 transition-colors group-hover:bg-purple-500/20 dark:text-purple-400">
                  <Settings className="h-4 w-4" />
                </div>
                <div className="flex flex-1 items-center justify-between">
                  <span className="font-medium">Configurações</span>
                  <Badge variant="outline" className="text-xs">
                    ⌘,
                  </Badge>
                </div>
              </CommandItem>
            </>
          )}

          {showLoading && <CommandLoading>Carregando...</CommandLoading>}

          {showPatients && (
            <>
              {patients.map((patient, index) => {
                return (
                  <div
                    key={patient.id}
                    onClick={() => {
                      handlePatientSelect(patient);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        handlePatientSelect(patient);
                      }
                    }}
                    className={`group relative flex cursor-pointer select-none items-center gap-3 rounded-lg px-3 py-3 text-sm outline-none transition-all duration-200 hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground active:scale-[0.98] ${selectedIndex === index ? "bg-accent text-accent-foreground" : ""}`}
                    tabIndex={0}
                    role="option"
                    aria-selected={selectedIndex === index}
                  >
                    {/* Avatar/Icon */}
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary transition-colors group-hover:bg-primary/20">
                      <User className="h-4 w-4" />
                    </div>

                    {/* Patient Info */}
                    <div className="flex min-w-0 flex-1 flex-col">
                      <div className="flex items-center gap-2">
                        <span className="truncate font-medium">
                          {highlightSearchTerm(patient.name, query)}
                        </span>
                        <span className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs text-muted-foreground">
                          {highlightSearchTerm(patient.refId, query)}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <span>{formatDate(patient.birthDate)}</span>
                        <span>•</span>
                        <span>{formatAge(patient.birthDate)} anos</span>
                      </div>
                    </div>

                    {/* Hover indicator */}
                    <div className="opacity-0 transition-opacity group-hover:opacity-100">
                      <div className="h-1.5 w-1.5 rounded-full bg-primary/60" />
                    </div>
                  </div>
                );
              })}
            </>
          )}

          {showEmpty && (
            <CommandEmpty>
              Nenhum paciente encontrado para &quot;{query}&quot;
            </CommandEmpty>
          )}
        </CommandList>
      </CommandDialog>
    </>
  );
}
