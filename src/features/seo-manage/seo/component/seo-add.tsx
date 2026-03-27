import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useEffect, useRef, useState } from "react";
import { Field, FieldDescription, FieldError, FieldLabel } from "@/components/ui/field";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useCreateSeo } from "../hook";
import { SeoInput, seoInputSchema } from "../type";
import { PlusCircle } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { useParams } from "next/navigation";
import { EntityDialog } from "@/components/shared/entity-dialog";
import Image from "next/image";
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from "@/components/ui/input-group";
import { IconPlus, IconX } from "@tabler/icons-react";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export function SeoAddDialog() {
  const [open, setOpen] = useState(false);
  const { mutateAsync, isPending } = useCreateSeo();
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const params = useParams();
  const pageId = params.pageId as string;
  const form = useForm<SeoInput>({
    resolver: zodResolver(seoInputSchema),
    defaultValues: {
      metaTitle: "",
      metaDescription: "",
      keyword: [],
      type: "WEBSITE",
      referenceImage: undefined,
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

  const handleSubmit = async (values: SeoInput) => {
    const formData = new FormData();
    formData.append("metaTitle", values.metaTitle);
    formData.append("metaDescription", values.metaDescription);
    formData.append("type", values.type);
    for (const item of values.keyword) {
      formData.append("keyword", item.value);
    }

    if (values.referenceImage) {
      formData.append("referenceImage", values.referenceImage);
    }

    toast.promise(mutateAsync({ pageId: pageId, body: formData }), {
      loading: "Menambah SEO pada Page...",
      success: () => {
        setPreviewImage(null);
        form.reset();
        return "Menambah SEO berhasil";
      },
      error: (err) => err.message || "Failed to add SEO",
    });
    setOpen(false);
  };

  useEffect(() => {
    return () => {
      if (previewImage) URL.revokeObjectURL(previewImage);
    };
  }, [previewImage]);

  return (
    <EntityDialog
      open={open}
      onOpenChange={setOpen}
      title="Add Seo in This Page"
      description="Make changes here. Click save when you're done"
      isPending={isPending}
      saveLabel="Create"
      onSubmit={form.handleSubmit(handleSubmit)}
      trigger={
        <Button size="sm">
          Tambah SEO <PlusCircle />
        </Button>
      }
    >
      <Controller
        name="referenceImage"
        control={form.control}
        render={({ field, fieldState }) => (
          <div className="lg:col-span-2">
            <Field data-invalid={fieldState.invalid} orientation="horizontal" className="grid grid-cols-1 md:grid-cols-[1fr,160px] gap-2 items-start">
              <FieldLabel htmlFor="mitraLogo">Cover SEO</FieldLabel>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg, image/png, image/webp"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (!file) return;
                  field.onChange(file);
                  if (previewImage) URL.revokeObjectURL(previewImage);
                  setPreviewImage(URL.createObjectURL(file));
                }}
              />
              <div className="flex flex-row items-center gap-4">
                {previewImage ? (
                  <div className="relative h-40 w-40 rounded-md overflow-hidden border">
                    <Image src={previewImage} alt="mitra-logo" fill unoptimized className="object-contain" />
                  </div>
                ) : null}
                <Button type="button" size="sm" variant="outline" onClick={() => fileInputRef.current?.click()}>
                  {previewImage ? "Ganti Logo" : "Upload Logo"}
                </Button>
              </div>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          </div>
        )}
      />

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
                    // Clear the input using the ref from context if we had access,
                    // but here we can just find it in the DOM or let InputGroupButton handle it.
                    // Let's improve InputGroupButton to allow clearing.
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
