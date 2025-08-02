"use client";

import * as React from "react";

import { Calendar, FileText, Plus, Search, Settings, User } from "lucide-react";
import {
  CommandDialog,
  CommandInput,
  CommandItem,
  CommandList,
} from "~/components/ui/command";

import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { api } from "~/trpc/react";
import { cn } from "~/lib/utils";
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

// Constants
const QUICK_ACTIONS = [
  {
    id: "new-patient",
    title: "Novo Paciente",
    description: "Cadastrar um novo paciente",
    icon: Plus,
    color: "green",
    shortcut: "⌘N",
    path: "/patients/add",
  },
  {
    id: "search-patients",
    title: "Buscar Pacientes",
    description: "Pesquisar pacientes existentes",
    icon: Search,
    color: "blue",
    shortcut: "⌘S",
    path: "/patients/search",
  },
  {
    id: "evaluations",
    title: "Avaliações",
    description: "Gerenciar avaliações",
    icon: FileText,
    color: "orange",
    shortcut: "⌘E",
    path: "/evaluations",
  },
  {
    id: "schedule",
    title: "Agenda",
    description: "Visualizar agenda",
    icon: Calendar,
    color: "purple",
    shortcut: "⌘A",
    path: "/antivegf/appointments",
  },
  {
    id: "settings",
    title: "Configurações",
    description: "Configurar sistema",
    icon: Settings,
    color: "gray",
    shortcut: "⌘,",
    path: "/settings",
  },
] as const;

// Utility functions
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

// Color utilities
const colorVariants = {
  green:
    "bg-green-500/10 text-green-600 dark:text-green-400 group-hover:bg-green-500/20",
  blue: "bg-blue-500/10 text-blue-600 dark:text-blue-400 group-hover:bg-blue-500/20",
  orange:
    "bg-orange-500/10 text-orange-600 dark:text-orange-400 group-hover:bg-orange-500/20",
  purple:
    "bg-purple-500/10 text-purple-600 dark:text-purple-400 group-hover:bg-purple-500/20",
  gray: "bg-gray-500/10 text-gray-600 dark:text-gray-400 group-hover:bg-gray-500/20",
} as const;

// Quick Action Item Component
interface QuickActionItemProps {
  action: (typeof QUICK_ACTIONS)[number];
  isSelected: boolean;
  onSelect: () => void;
}

function QuickActionItem({
  action,
  isSelected,
  onSelect,
}: QuickActionItemProps) {
  const Icon = action.icon;

  return (
    <CommandItem
      onSelect={onSelect}
      className={cn(
        "group relative flex cursor-pointer select-none items-center gap-3 rounded-lg px-3 py-3 text-sm outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
        isSelected && "bg-accent text-accent-foreground",
      )}
    >
      <div
        className={cn(
          "flex h-8 w-8 items-center justify-center rounded-full transition-colors",
          colorVariants[action.color],
        )}
      >
        <Icon className="h-4 w-4" />
      </div>
      <div className="flex flex-1 flex-col">
        <div className="flex items-center justify-between">
          <span className="font-medium">{action.title}</span>
          <Badge variant="outline" className="text-xs">
            {action.shortcut}
          </Badge>
        </div>
        <span className="text-xs text-muted-foreground">
          {action.description}
        </span>
      </div>
    </CommandItem>
  );
}

// Patient Item Component
interface PatientItemProps {
  patient: Patient;
  query: string;
  isSelected: boolean;
  onSelect: (patient: Patient) => void;
}

function PatientItem({
  patient,
  query,
  isSelected,
  onSelect,
}: PatientItemProps) {
  return (
    <div
      onClick={() => onSelect(patient)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onSelect(patient);
        }
      }}
      className={cn(
        "group relative flex cursor-pointer select-none items-center gap-3 rounded-lg px-3 py-3 text-sm outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
        isSelected && "bg-accent text-accent-foreground",
      )}
      tabIndex={0}
      role="option"
      aria-selected={isSelected}
    >
      {/* Avatar */}
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
}

// Loading Component
function LoadingState() {
  return (
    <div className="flex items-center justify-center py-8">
      <div className="flex items-center gap-2">
        <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
        <span className="text-sm text-muted-foreground">
          Buscando pacientes...
        </span>
      </div>
    </div>
  );
}

// Search History Component
function SearchHistory({
  history,
  onSelect,
  selectedIndex,
  startIndex,
}: {
  history: string[];
  onSelect: (term: string) => void;
  selectedIndex: number;
  startIndex: number;
}) {
  return (
    <div>
      <div className="px-3 py-2 text-xs font-medium text-muted-foreground">
        Histórico de busca
      </div>
      {history.map((term, index) => (
        <div
          key={term}
          onClick={() => onSelect(term)}
          className={cn(
            "group relative flex cursor-pointer select-none items-center gap-3 rounded-lg px-3 py-2 text-sm outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            selectedIndex === startIndex + index &&
              "bg-accent text-accent-foreground",
          )}
          tabIndex={0}
          role="option"
          aria-selected={selectedIndex === startIndex + index}
        >
          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-muted/50 text-muted-foreground">
            <Search className="h-3 w-3" />
          </div>
          <span className="truncate">{term}</span>
        </div>
      ))}
    </div>
  );
}

// Empty State Component
function EmptyState({ query }: { query: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-8 text-center">
      <div className="mb-4 rounded-full bg-muted p-3">
        <Search className="h-6 w-6 text-muted-foreground" />
      </div>
      <p className="text-sm font-medium text-foreground">
        Nenhum paciente encontrado
      </p>
      <p className="mt-1 text-xs text-muted-foreground">
        Tente buscar por &quot;{query}&quot; com outros termos
      </p>
    </div>
  );
}

// Main Component
export function CommandPalette({ trigger }: CommandPaletteProps) {
  const [open, setOpen] = React.useState(false);
  const [query, setQuery] = React.useState("");
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [searchHistory, setSearchHistory] = React.useState<string[]>([]);
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

  // Error handling
  React.useEffect(() => {
    if (error) {
      console.error("Patient search error:", error);
    }
  }, [error]);

  // Navigation handlers
  const handleNavigate = React.useCallback(
    (path: string) => {
      router.push(path);
      setOpen(false);
    },
    [router],
  );

  const handlePatientSelect = React.useCallback(
    (patient: Patient) => {
      // Add to search history
      if (query.trim()) {
        setSearchHistory((prev) => {
          const newHistory = [
            query.trim(),
            ...prev.filter((term) => term !== query.trim()),
          ];
          return newHistory.slice(0, 10); // Keep only last 10 searches
        });
      }
      handleNavigate(`/patients/${patient.id}`);
    },
    [handleNavigate, query],
  );

  // Render conditions
  const showQuickActions = !query.trim();
  const showLoading = query.trim() && isLoading;
  const showPatients = query.trim() && !isLoading && patients.length > 0;
  const showEmpty = query.trim() && !isLoading && patients.length === 0;

  // Filter search history based on current query
  const filteredHistory = searchHistory
    .filter((term) => term.toLowerCase().includes(query.toLowerCase()))
    .slice(0, 3);

  // Reset selected index when query changes
  React.useEffect(() => {
    setSelectedIndex(0);
  }, [query, patients.length]);

  // Keyboard navigation
  const handleKeyDown = React.useCallback(
    (e: KeyboardEvent) => {
      if (!open) return;

      const historyItems = filteredHistory.length;
      const totalItems = showQuickActions
        ? QUICK_ACTIONS.length
        : historyItems + patients.length;

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
            const action = QUICK_ACTIONS[selectedIndex];
            if (action) {
              handleNavigate(action.path);
            }
          } else if (selectedIndex < historyItems) {
            // History item selected
            const historyTerm = filteredHistory[selectedIndex];
            if (historyTerm) {
              setQuery(historyTerm);
            }
          } else {
            const patient = patients[selectedIndex - historyItems];
            if (patient) {
              handlePatientSelect(patient);
            }
          }
          break;
        case "Escape":
          setOpen(false);
          break;
      }
    },
    [
      open,
      showQuickActions,
      filteredHistory,
      patients,
      selectedIndex,
      handleNavigate,
      handlePatientSelect,
    ],
  );

  // Keyboard shortcuts
  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((o) => !o);
      }

      // Quick action shortcuts
      if (open && showQuickActions) {
        const actionMap: Record<string, string> = {
          n: "/patients/add",
          s: "/patients/search",
          e: "/evaluations",
          a: "/antivegf/appointments",
          ",": "/settings",
        };

        const path = actionMap[e.key.toLowerCase()];
        if (path && (e.metaKey || e.ctrlKey)) {
          e.preventDefault();
          handleNavigate(path);
        }
      }
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown, open, showQuickActions, handleNavigate]);

  // Reset state when dialog closes
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
          className="relative"
          onClick={() => setOpen(true)}
        >
          <Search className="h-4 w-4" />
          <span className="hidden pr-6 xl:inline-flex">
            Buscar pacientes...
          </span>
          <kbd className="pointer-events-none absolute right-1.5 top-1/2 hidden h-6 -translate-y-1/2 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium xl:flex">
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
        {showPatients && (
          <div className="border-b px-3 py-2 text-xs text-muted-foreground">
            {patients.length} paciente{patients.length !== 1 ? "s" : ""}{" "}
            encontrado{patients.length !== 1 ? "s" : ""}
            {filteredHistory.length > 0 && (
              <span className="ml-2">
                • {filteredHistory.length} sugestão
                {filteredHistory.length !== 1 ? "ões" : ""} do histórico
              </span>
            )}
          </div>
        )}
        <CommandList>
          {showQuickActions && (
            <div>
              {QUICK_ACTIONS.map((action, index) => (
                <QuickActionItem
                  key={action.id}
                  action={action}
                  isSelected={selectedIndex === index}
                  onSelect={() => handleNavigate(action.path)}
                />
              ))}
            </div>
          )}

          {showLoading && <LoadingState />}

          {showPatients && (
            <div>
              {filteredHistory.length > 0 && (
                <SearchHistory
                  history={filteredHistory}
                  onSelect={(term) => setQuery(term)}
                  selectedIndex={selectedIndex}
                  startIndex={0}
                />
              )}
              {patients.map((patient, index) => (
                <PatientItem
                  key={patient.id}
                  patient={patient}
                  query={query}
                  isSelected={selectedIndex === filteredHistory.length + index}
                  onSelect={handlePatientSelect}
                />
              ))}
            </div>
          )}

          {showEmpty && <EmptyState query={query} />}
        </CommandList>
      </CommandDialog>
    </>
  );
}
