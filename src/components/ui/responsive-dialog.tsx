"use client";

import * as React from "react";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "~/components/ui/drawer";

import { useIsMobileOrIOSHome } from "~/hooks/use-mobile";

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
  const isMobileOrIOSHome = useIsMobileOrIOSHome();

  if (isMobileOrIOSHome) {
    return (
      <Drawer open={open} onOpenChange={onOpenChange}>
        <DrawerTrigger asChild>{trigger}</DrawerTrigger>
        <DrawerContent className={className}>
          <div className="mx-auto w-full max-w-xl">
            <DrawerHeader>
              <DrawerTitle>{title}</DrawerTitle>
              {description && (
                <DrawerDescription>{description}</DrawerDescription>
              )}
            </DrawerHeader>
            <div className="flex-1 overflow-y-auto px-4 pb-4">{children}</div>
            {footer && <DrawerFooter>{footer}</DrawerFooter>}
          </div>
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
          {description && <DrawerDescription>{description}</DrawerDescription>}
        </DialogHeader>
        <div className="max-h-[70vh] overflow-y-auto px-1 pb-4">{children}</div>
        {footer && <DialogFooter>{footer}</DialogFooter>}
      </DialogContent>
    </Dialog>
  );
}
