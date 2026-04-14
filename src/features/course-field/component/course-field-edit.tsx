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
import { useUpdateCourseField } from "../hook";

export function CourseFieldEditDialog({ courseField }: { courseField: CourseField }) {
  const [open, setOpen] = useState(false);
  const { mutateAsync: updateCourseField, isPending } = useUpdateCourseField();

  const form = useForm<UpdateCourseFieldInput>({
    resolver: zodResolver(updateCourseFieldSchema),
    defaultValues: { fieldName: "" },
  });

  useEffect(() => {
    if (open) {
      form.reset({ fieldName: courseField.field });
    }
  }, [open, courseField, form]);

  const handleUpdate = async (values: UpdateCourseFieldInput) => {
    await updateCourseField({ id: courseField.id, payload: values });
    setOpen(false);
  };

  return (
    <EntityDialog
      open={open}
      onOpenChange={setOpen}
      title="Edit Course Field"
      description="Perbarui nama bidang course di bawah ini."
      isPending={isPending}
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
        name="fieldName"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field className="col-span-2 gap-1" data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor="fieldName">Nama Bidang</FieldLabel>
            <Input {...field} id="fieldName" placeholder="Masukan nama bidang..." aria-invalid={fieldState.invalid} autoComplete="off" />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
    </EntityDialog>
  );
}
