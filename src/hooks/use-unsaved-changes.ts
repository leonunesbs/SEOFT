"use client";

import { useEffect } from "react";

/**
 * Warns the user about unsaved changes on tab close/refresh and link clicks.
 * If `onAttemptNavigate` is provided, it will be called for in-app link clicks
 * so the caller can present a custom confirmation UI (e.g., shadcn AlertDialog).
 */
export function useUnsavedChanges(
  hasUnsavedChanges: boolean,
  message = "Você tem alterações não salvas. Tem certeza que deseja sair?",
  onAttemptNavigate?: (href: string) => void,
) {
  // Warn on tab close / refresh / external navigation
  useEffect(() => {
    if (!hasUnsavedChanges) return;

    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      event.preventDefault();
      event.returnValue = message;
      return message;
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [hasUnsavedChanges, message]);

  // Intercept link clicks (including Next.js <Link>)
  useEffect(() => {
    if (!hasUnsavedChanges) return;

    const handleClickCapture = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      if (!target) return;

      const anchor = target.closest("a");
      if (!anchor) return;

      // Ignore modifiers, new tab, download and hash links
      if (
        event.ctrlKey ||
        event.metaKey ||
        event.shiftKey ||
        event.altKey ||
        anchor.getAttribute("target") === "_blank" ||
        anchor.hasAttribute("download")
      ) {
        return;
      }

      const href = anchor.getAttribute("href");
      if (!href || href.startsWith("#")) return;

      if (onAttemptNavigate) {
        // Defer navigation to the caller's confirmation UI
        event.preventDefault();
        event.stopPropagation();
        onAttemptNavigate(href);
        return;
      }

      const confirmed = window.confirm(message);
      if (!confirmed) {
        event.preventDefault();
        event.stopPropagation();
      }
    };

    document.addEventListener("click", handleClickCapture, true);
    return () =>
      document.removeEventListener("click", handleClickCapture, true);
  }, [hasUnsavedChanges, message, onAttemptNavigate]);
}
