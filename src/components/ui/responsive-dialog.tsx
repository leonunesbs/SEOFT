"use client";

import * as React from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "~/components/ui/drawer";

import { useIsMobile } from "~/hooks/use-mobile";

interface ResponsiveDialogProps {
  trigger: React.ReactNode;
  title: string;
  children: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  className?: string;
  description?: string;
  footer?: React.ReactNode;
}

export function ResponsiveDialog({
  trigger,
  title,
  children,
  open,
  onOpenChange,
  className,
  description,
  footer,
}: ResponsiveDialogProps) {
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <Drawer open={open} onOpenChange={onOpenChange}>
        <DrawerTrigger asChild>{trigger}</DrawerTrigger>
        <DrawerContent className={className}>
          <DrawerHeader>
            <DrawerTitle>{title}</DrawerTitle>
            {description && (
              <p className="text-sm text-muted-foreground">{description}</p>
            )}
          </DrawerHeader>
          <div className="px-4 pb-4">{children}</div>
          {footer && <div className="border-t px-4 py-3">{footer}</div>}
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className={className}>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {description && (
            <p className="text-sm text-muted-foreground">{description}</p>
          )}
        </DialogHeader>
        <div className="max-h-[70vh] overflow-y-auto px-1 pb-4">{children}</div>
        {footer && <div className="border-t pt-4">{footer}</div>}
      </DialogContent>
    </Dialog>
  );
}
