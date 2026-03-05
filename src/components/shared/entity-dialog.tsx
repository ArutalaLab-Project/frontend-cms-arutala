"use client";

import { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { cn } from "@/shared/lib/cn";

interface EntityDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  trigger?: ReactNode;
  title: string;
  description: string;
  children: ReactNode;
  onSubmit: (e: React.FormEvent) => void;
  isPending?: boolean;
  saveLabel?: string;
  cancelLabel?: string;
  className?: string;
  contentClassName?: string;
}

/**
 * A generic dialog component for create/edit actions.
 * Wraps common AlertDialog structure with a form.
 */
export function EntityDialog({
  open,
  onOpenChange,
  trigger,
  title,
  description,
  children,
  onSubmit,
  isPending = false,
  saveLabel = "Save Changes",
  cancelLabel = "Cancel",
  className,
  contentClassName,
}: EntityDialogProps) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      {trigger && <AlertDialogTrigger asChild>{trigger}</AlertDialogTrigger>}
      <AlertDialogContent className={cn("sm:max-w-5xl max-h-[90dvh] flex flex-col p-6 gap-4!", className)}>
        <AlertDialogHeader className="shrink-0">
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>

        <form onSubmit={onSubmit} className="flex flex-col flex-1 min-h-0 overflow-hidden">
          <div className={cn("grid grid-cols-1 lg:grid-cols-2 gap-x-4 gap-y-4 px-1 py-1 overflow-y-auto overflow-x-hidden flex-1 no-scrollbar", contentClassName)}>{children}</div>

          <AlertDialogFooter className="shrink-0 pt-4 flex w-full justify-between items-center sm:justify-between border-t mt-auto">
            <AlertDialogCancel asChild>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  onOpenChange(false);
                }}
              >
                {cancelLabel}
              </Button>
            </AlertDialogCancel>
            <Button type="submit" size="sm" disabled={isPending}>
              {isPending ? "Saving..." : saveLabel}
            </Button>
          </AlertDialogFooter>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
}
