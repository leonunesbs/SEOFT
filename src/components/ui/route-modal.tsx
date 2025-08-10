"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";

import { useRouter } from "next/navigation";

type RouteModalProps = {
  title?: string;
  children: React.ReactNode;
  contentClassName?: string;
};

export function RouteModal({
  title,
  children,
  contentClassName,
}: RouteModalProps) {
  const router = useRouter();

  return (
    <Dialog
      open
      onOpenChange={(open) => {
        if (!open) router.back();
      }}
    >
      <DialogContent className={contentClassName ?? "sm:max-w-3xl"}>
        {title ? (
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
          </DialogHeader>
        ) : null}
        {children}
      </DialogContent>
    </Dialog>
  );
}
