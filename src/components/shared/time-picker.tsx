"use client";

import * as React from "react";
import { ClockIcon } from "lucide-react";
import { Input } from "../ui/input";
import { cn } from "@/shared/lib/cn";

export interface TimePickerProps extends React.InputHTMLAttributes<HTMLInputElement> {
  onTimeChange?: (time: string) => void;
}

export function TimeInput({ className, value, onChange, onTimeChange, ...props }: TimePickerProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) onChange(e);
    if (onTimeChange) onTimeChange(e.target.value);
  };

  return (
    <div className="relative w-full">
      <Input type="text" value={value} onChange={handleChange} className={cn("pl-9", className)} placeholder="00:00" {...props} />
      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
        <ClockIcon className="h-4 w-4 text-muted-foreground" />
      </div>
    </div>
  );
}
