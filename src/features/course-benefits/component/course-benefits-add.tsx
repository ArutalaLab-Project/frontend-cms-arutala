"use client";

import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { EntityDialog } from "@/components/shared/entity-dialog";
import { CreateCourseBenefitInput, createCourseBenefitSchema } from "../type";
import { Textarea } from "@/components/ui/textarea";
import { useCreateCourseBenefit } from "../hook";

export function CourseBenefitAddDialog() {
  const [open, setOpen] = useState(false);

  const { mutateAsync: createCourseBenefit, isPending } = useCreateCourseBenefit();

  const form = useForm<CreateCourseBenefitInput>({
    resolver: zodResolver(createCourseBenefitSchema),
    defaultValues: { title: "", description: "" },
  });

  const handleCreate = async (values: CreateCourseBenefitInput) => {
    await createCourseBenefit(values);
    setOpen(false);
    form.reset();
  };

  return (
    <EntityDialog
      open={open}
      onOpenChange={setOpen}
      title="Tambah Course Benefit"
      description="Isi judul dan deskripsi benefit yang ingin ditambahkan."
      isPending={isPending}
      saveLabel="Create"
      onSubmit={form.handleSubmit(handleCreate)}
      className="sm:max-w-md"
      trigger={
        <Button size="sm">
          Tambah Course Benefit <PlusCircle className="ml-2 h-4 w-4" />
        </Button>
      }
    >
      <Controller
        name="title"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field className="col-span-2 gap-1" data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor="title">Judul Benefit</FieldLabel>
            <Input {...field} id="title" placeholder="Masukan judul benefit..." aria-invalid={fieldState.invalid} autoComplete="off" />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
      <Controller
        name="description"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field className="col-span-2 gap-1" data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor="description">Deskripsi Benefit</FieldLabel>
            <Textarea {...field} id="description" placeholder="Masukan deskripsi benefit..." aria-invalid={fieldState.invalid} autoComplete="off" />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
    </EntityDialog>
  );
}
