"use client";

import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { EntityDialog } from "@/components/shared/entity-dialog";
import { IconListDetails } from "@tabler/icons-react";
import { CourseField, UpdateCourseFieldInput, updateCourseFieldSchema } from "../type";

export function CourseFieldEditDialog({ courseField }: { courseField: CourseField }) {
  const [open, setOpen] = useState(false);

  const form = useForm<UpdateCourseFieldInput>({
    resolver: zodResolver(updateCourseFieldSchema),
    defaultValues: { field: "" },
  });

  useEffect(() => {
    if (open) {
      form.reset({ field: courseField.field });
    }
  }, [open, courseField, form]);

  const handleUpdate = async (values: UpdateCourseFieldInput) => {
    // TODO: integrate API
    console.log("update course field:", courseField.id, values);
    setOpen(false);
  };

  return (
    <EntityDialog
      open={open}
      onOpenChange={setOpen}
      title="Edit Course Field"
      description="Perbarui nama bidang course di bawah ini."
      isPending={false}
      saveLabel="Update"
      onSubmit={form.handleSubmit(handleUpdate)}
      className="sm:max-w-md"
      trigger={
        <Button variant="outline" size="icon-sm">
          <IconListDetails />
        </Button>
      }
    >
      <Controller
        name="field"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field className="col-span-2 gap-1" data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor="field-edit">Nama Bidang</FieldLabel>
            <Input {...field} id="field-edit" placeholder="Masukan nama bidang..." aria-invalid={fieldState.invalid} autoComplete="off" />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
    </EntityDialog>
  );
}
