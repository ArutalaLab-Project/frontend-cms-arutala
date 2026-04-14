"use client";

import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { EntityDialog } from "@/components/shared/entity-dialog";
import { IconListDetails } from "@tabler/icons-react";
import { CourseBenefit, UpdateCourseBenefitInput, updateCourseBenefitSchema } from "../type";
import { Textarea } from "@/components/ui/textarea";
import { useUpdateCourseBenefit } from "../hook";

export function CourseBenefitEditDialog({ courseBenefit }: { courseBenefit: CourseBenefit }) {
  const [open, setOpen] = useState(false);

  const { mutateAsync: updateCourseBenefit, isPending } = useUpdateCourseBenefit();

  const form = useForm<UpdateCourseBenefitInput>({
    resolver: zodResolver(updateCourseBenefitSchema),
    defaultValues: { title: "", description: "" },
  });

  useEffect(() => {
    if (open) {
      form.reset({ title: courseBenefit.title, description: courseBenefit.description });
    }
  }, [open, courseBenefit, form]);

  const handleUpdate = async (values: UpdateCourseBenefitInput) => {
    await updateCourseBenefit({ id: courseBenefit.id, payload: values });
    setOpen(false);
  };

  return (
    <EntityDialog
      open={open}
      onOpenChange={setOpen}
      title="Edit Course Benefit"
      description="Perbarui judul dan deskripsi benefit di bawah ini."
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
        name="title"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field className="col-span-2 gap-1" data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor="title-edit">Judul Benefit</FieldLabel>
            <Input {...field} id="title-edit" placeholder="Masukan judul benefit..." aria-invalid={fieldState.invalid} autoComplete="off" />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
      <Controller
        name="description"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field className="col-span-2 gap-1" data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor="description-edit">Deskripsi Benefit</FieldLabel>
            <Textarea {...field} id="description-edit" placeholder="Masukan deskripsi benefit..." aria-invalid={fieldState.invalid} autoComplete="off" />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
    </EntityDialog>
  );
}
