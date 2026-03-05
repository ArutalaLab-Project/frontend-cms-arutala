"use client";
import { CalendarIcon } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { DateRange } from "react-day-picker";
import { Calendar } from "../ui/calendar";
import { id as localeId } from "date-fns/locale";
import { format } from "date-fns";

import { cn } from "@/shared/lib/cn";

import { InputGroup, InputGroupAddon, InputGroupInput } from "../ui/input-group";

function formatDateId(date: Date): string {
  return format(date, "dd/MM/yyyy", { locale: localeId });
}

export function RangeDatePicker({ value, onChange, placeholder = "Pilih rentang tanggal" }: { value?: DateRange; onChange: (value: DateRange | undefined) => void; placeholder?: string }) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <div className="cursor-pointer">
          <InputGroup className="pointer-events-none">
            <InputGroupInput
              readOnly
              placeholder={placeholder}
              value={value?.from ? (value.to ? `${formatDateId(value.from)} - ${formatDateId(value.to)}` : formatDateId(value.from)) : ""}
              className={cn(!value?.from && "text-muted-foreground", "cursor-pointer")}
            />
            <InputGroupAddon>
              <CalendarIcon size={16} />
            </InputGroupAddon>
          </InputGroup>
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar mode="range" locale={localeId} selected={value} onSelect={onChange} numberOfMonths={2} />
      </PopoverContent>
    </Popover>
  );
}

export function SingleDatePicker({ value, onChange, placeholder = "Pilih tanggal" }: { value?: Date; onChange: (date: Date | undefined) => void; placeholder?: string }) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <div className="cursor-pointer">
          <InputGroup className="pointer-events-none">
            <InputGroupInput readOnly placeholder={placeholder} value={value ? formatDateId(value) : ""} className={cn(!value && "text-muted-foreground", "cursor-pointer")} />
            <InputGroupAddon>
              <CalendarIcon size={16} />
            </InputGroupAddon>
          </InputGroup>
        </div>
      </PopoverTrigger>
      <PopoverContent className="p-0" align="start">
        <Calendar mode="single" locale={localeId} selected={value} onSelect={onChange} />
      </PopoverContent>
    </Popover>
  );
}
