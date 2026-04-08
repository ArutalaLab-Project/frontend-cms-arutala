"use client";

import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { EntityDialog } from "@/components/shared/entity-dialog";
import { CreateCourseFieldInput, createCourseFieldSchema } from "../type";

export function CourseFieldAddDialog() {
  const [open, setOpen] = useState(false);

  const form = useForm<CreateCourseFieldInput>({
    resolver: zodResolver(createCourseFieldSchema),
    defaultValues: { field: "" },
  });

  const handleCreate = async (values: CreateCourseFieldInput) => {
    // TODO: integrate API
    console.log("create course field:", values);
    setOpen(false);
    form.reset();
  };

  return (
    <EntityDialog
      open={open}
      onOpenChange={setOpen}
      title="Tambah Course Field"
      description="Isi nama bidang course yang ingin ditambahkan."
      isPending={false}
      saveLabel="Create"
      onSubmit={form.handleSubmit(handleCreate)}
      className="sm:max-w-md"
      trigger={
        <Button size="sm">
          Tambah Course Field <PlusCircle />
        </Button>
      }
    >
      <Controller
        name="field"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field className="col-span-2 gap-1" data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor="field">Nama Bidang</FieldLabel>
            <Input {...field} id="field" placeholder="Masukan nama bidang..." aria-invalid={fieldState.invalid} autoComplete="off" />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
    </EntityDialog>
  );
}
