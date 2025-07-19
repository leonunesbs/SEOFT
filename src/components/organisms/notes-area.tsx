// app/notes/NotesArea.tsx
"use client";

import { CheckCircle2, Clock, Save } from "lucide-react";
import { startTransition, useEffect, useRef, useState } from "react";

import { FaUserMd } from "react-icons/fa";
import { Textarea } from "../ui/textarea";
import { updateNoteAction } from "~/app/(withSidebar)/notes/actions";
import { useForm } from "react-hook-form";

type NotesForm = {
  note: string;
};

export default function NotesArea({
  initialNote,
  collaboratorName,
}: {
  initialNote: string;
  collaboratorName: string;
}) {
  const { register, watch, reset } = useForm<NotesForm>({
    defaultValues: { note: initialNote },
  });
  const [saving, setSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<string | null>(null);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const debounce = useRef<NodeJS.Timeout | null>(null);

  // Se o initialNote mudar (por exemplo, troca de colaborador), resetamos o form
  useEffect(() => {
    reset({ note: initialNote });
    setLastSaved(initialNote);
    setHasUnsavedChanges(false);
  }, [initialNote, reset]);

  // Monitoramos o valor do campo
  const noteValue = watch("note");

  // Debounce e autosave via Server Action
  useEffect(() => {
    const hasChanges = noteValue !== lastSaved;
    setHasUnsavedChanges(hasChanges);

    if (!hasChanges) {
      return;
    }

    clearTimeout(debounce.current!);

    debounce.current = setTimeout(() => {
      setSaving(true);
      startTransition(() => {
        updateNoteAction(noteValue).finally(() => {
          setSaving(false);
          setLastSaved(noteValue);
          setHasUnsavedChanges(false);
        });
      });
    }, 1000); // Aumentei para 1 segundo para dar mais tempo ao usuário

    return () => clearTimeout(debounce.current!);
  }, [noteValue, lastSaved]);

  // Determina qual status mostrar
  const getStatusDisplay = () => {
    if (saving) {
      return {
        icon: <Save className="h-4 w-4 animate-pulse" />,
        text: "Salvando...",
        textMobile: "Salvando...",
        color: "text-muted-foreground",
      };
    }

    if (hasUnsavedChanges) {
      return {
        icon: <Clock className="h-4 w-4" />,
        text: "Auto-salvando...",
        textMobile: "Auto-salvando...",
        color: "text-amber-600",
      };
    }

    return {
      icon: <CheckCircle2 className="h-4 w-4" />,
      text: "Salvo",
      textMobile: "Salvo",
      color: "text-green-600",
    };
  };

  const status = getStatusDisplay();

  return (
    <div className="space-y-4">
      {/* Header com status - responsivo */}
      <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
        <div className="space-y-2">
          <div className="flex gap-2">
            <div className="flex aspect-square size-8 items-center justify-center rounded-lg border">
              <FaUserMd />
            </div>
            <div className="flex w-full flex-col gap-0.5 leading-none">
              <span className="font-semibold">SEOFT</span>
              <span className="line-clamp-1">{collaboratorName}</span>
            </div>
          </div>
        </div>

        {/* Status indicator - responsivo */}
        <div className="flex h-6 items-center justify-end sm:justify-start">
          <div className={`flex items-center gap-2 text-sm ${status.color}`}>
            {status.icon}
            <span className="hidden sm:inline">{status.text}</span>
            <span className="sm:hidden">{status.textMobile}</span>
          </div>
        </div>
      </div>

      {/* Textarea container */}
      <div>
        <Textarea
          {...register("note")}
          placeholder="Digite suas anotações aqui..."
          className="min-h-[200px] sm:min-h-[250px]"
        />

        {/* Subtle border indicator for saving state */}
        {saving && (
          <div className="pointer-events-none absolute inset-0 animate-pulse rounded-md border-2 border-blue-500/30" />
        )}

        {/* Character count */}
        <div className="mt-2 text-right">
          <span className="text-xs text-muted-foreground">
            {noteValue.length} caracteres
          </span>
        </div>
      </div>
    </div>
  );
}
