"use client";

import { useEffect, useState } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Badge } from "@/components/ui/badge";
import { IconEdit } from "@tabler/icons-react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Field, FieldDescription, FieldError, FieldLabel } from "@/components/ui/field";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from "@/components/ui/input-group";
import { IconPlus, IconX } from "@tabler/icons-react";
import { EntityDialog } from "@/components/shared/entity-dialog";
import { useParams } from "next/navigation";

import { Seo, SeoUpdateInput, updateSeoSchema } from "../type";
import { useUpdateDetailSeo } from "../hook";

export function SeoEditDialog({ seo }: { seo: Seo }) {
  const [open, setOpen] = useState(false);
  const params = useParams();
  const pageId = params.pageId as string;

  const { mutateAsync: updateSeo, isPending } = useUpdateDetailSeo();

  const form = useForm<SeoUpdateInput>({
    resolver: zodResolver(updateSeoSchema),
    defaultValues: {
      metaTitle: seo.meta_title,
      metaDescription: seo.meta_description,
      keyword: seo.seo_keyword.map((k) => ({ value: k })),
      type: seo.seo_type,
    },
  });

  const {
    fields: keywords,
    append,
    remove,
  } = useFieldArray({
    control: form.control,
    name: "keyword",
  });

  useEffect(() => {
    if (open) {
      form.reset({
        metaTitle: seo.meta_title,
        metaDescription: seo.meta_description,
        keyword: seo.seo_keyword.map((k) => ({ value: k })),
        type: seo.seo_type,
      });
    }
  }, [open, seo, form]);

  const handleUpdate = async (values: SeoUpdateInput) => {
    const formData = new FormData();
    formData.append("metaTitle", values.metaTitle);
    formData.append("metaDescription", values.metaDescription);
    formData.append("type", values.type);
    for (const item of values.keyword) {
      formData.append("keyword", item.value);
    }

    // console.log("Mapped FormData payload sent to API");

    toast.promise(
      updateSeo({
        pageId,
        seoId: seo.seo_id,
        body: formData,
      }),
      {
        loading: "Updating SEO metadata...",
        success: () => {
          setOpen(false);
          return "SEO metadata berhasil diperbarui";
        },
        error: (err) => err.message || "Failed to update SEO",
      },
    );
  };

  return (
    <EntityDialog
      open={open}
      onOpenChange={setOpen}
      title="Edit SEO"
      description="Perbarui informasi SEO page ini"
      isPending={isPending}
      saveLabel="Update"
      onSubmit={form.handleSubmit(handleUpdate)}
      trigger={
        <div className="w-full relative flex cursor-pointer select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover:bg-accent hover:text-accent-foreground">
          <IconEdit className="h-4 w-4" />
          <span>Edit Metadata</span>
        </div>
      }
    >
      <Controller
        name="metaTitle"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field className="md:col-span-2 gap-1" data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor="metaTitle">Meta Title</FieldLabel>
            <Input {...field} id="metaTitle" placeholder="Masukan meta title..." aria-invalid={fieldState.invalid} autoComplete="off" />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      <Controller
        name="metaDescription"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field className="md:col-span-2 gap-1" data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor="metaDescription">Meta Description</FieldLabel>
            <Textarea {...field} id="metaDescription" placeholder="Masukan meta description..." aria-invalid={fieldState.invalid} autoComplete="off" className="min-h-20" />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      <Controller
        name="type"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field className="lg:col-span-1 gap-1" data-invalid={fieldState.invalid}>
            <FieldLabel>Type</FieldLabel>
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Pilih tipe Page SEO" />
              </SelectTrigger>
              <SelectContent position="popper">
                <SelectGroup>
                  <SelectItem value="ARTICLE">Article</SelectItem>
                  <SelectItem value="WEBSITE">Website</SelectItem>
                  <SelectItem value="PROFILE">Profile</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      <Controller
        name="keyword"
        control={form.control}
        render={({ fieldState }) => (
          <Field className="lg:col-span-2 gap-1" data-invalid={fieldState.invalid}>
            <FieldLabel>Keyword</FieldLabel>
            <FieldDescription>Ketik Keyword lalu tekan Enter</FieldDescription>
            <InputGroup>
              <InputGroupInput
                placeholder="Masukan Keyword..."
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    const value = e.currentTarget.value.trim();
                    if (!value) return;
                    append({ value });
                    e.currentTarget.value = "";
                  }
                }}
              />
              <InputGroupAddon align="inline-end">
                <InputGroupButton
                  variant="secondary"
                  onClick={(e, value) => {
                    e.preventDefault();
                    const trimmedValue = value.trim();
                    if (!trimmedValue) return;
                    append({ value: trimmedValue });
                    const input = e.currentTarget.closest('[data-slot="input-group"]')?.querySelector("input");
                    if (input) input.value = "";
                  }}
                >
                  <IconPlus />
                </InputGroupButton>
              </InputGroupAddon>
            </InputGroup>
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            <div className="flex flex-wrap gap-2 mt-2">
              {keywords.map((item, index) => (
                <Badge key={item.id} variant="outline" className="flex items-center gap-1.5">
                  {item.value}
                  <button type="button" onClick={() => remove(index)} className="rounded-full hover:bg-muted p-0.5">
                    <IconX className="size-3" />
                  </button>
                </Badge>
              ))}
            </div>
          </Field>
        )}
      />
    </EntityDialog>
  );
}
