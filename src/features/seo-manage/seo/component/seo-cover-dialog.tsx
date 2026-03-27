"use client";

import { useRef, useState, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { EntityDialog } from "@/components/shared/entity-dialog";
import { useParams } from "next/navigation";

import { Seo, SeoCoverUpdateInput, updateSeoCoverSchema } from "../type";
import { useUpdateSeoCover } from "../hook";
import { IconPhotoEdit } from "@tabler/icons-react";

export function SeoCoverDialog({ seo }: { seo: Seo }) {
  const [open, setOpen] = useState(false);
  const [previewLogo, setPreviewLogo] = useState<string | null>(seo.seo_reference_image);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const params = useParams();
  const pageId = params.pageId as string;

  const { mutateAsync: updateSeoCover, isPending } = useUpdateSeoCover();

  const form = useForm<SeoCoverUpdateInput>({
    resolver: zodResolver(updateSeoCoverSchema),
    defaultValues: {
      referenceImage: undefined,
    },
  });

  const handleUpdateLogo = async (values: SeoCoverUpdateInput) => {
    if (!values.referenceImage) {
      toast.error("Silakan pilih cover terlebih dahulu");
      return;
    }

    const formData = new FormData();
    formData.append("referenceImage", values.referenceImage);

    toast.promise(
      updateSeoCover({
        pageId,
        seoId: seo.seo_id,
        body: formData,
      }),
      {
        loading: "Updating Cover SEO...",
        success: () => {
          setOpen(false);
          return "Cover SEO berhasil diperbarui";
        },
        error: (err) => err.message || "Failed to update cover",
      },
    );
  };

  useEffect(() => {
    return () => {
      if (previewLogo && previewLogo !== seo.seo_reference_image) {
        URL.revokeObjectURL(previewLogo);
      }
    };
  }, [previewLogo, seo.seo_reference_image]);

  return (
    <EntityDialog
      open={open}
      onOpenChange={setOpen}
      title="Update Cover SEO"
      description="Pilih file cover baru untuk referensi SEO page ini"
      isPending={isPending}
      saveLabel="Update Cover"
      onSubmit={form.handleSubmit(handleUpdateLogo)}
      className="sm:max-w-md max-w-md!"
      contentClassName="!grid-cols-1"
      trigger={
        <div className="w-full relative flex cursor-pointer select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover:bg-accent hover:text-accent-foreground">
          <IconPhotoEdit className="h-4 w-4" />
          <span>Edit Cover</span>
        </div>
      }
    >
      <Controller
        name="referenceImage"
        control={form.control}
        render={({ field, fieldState }) => (
          <div className="flex flex-col items-center gap-4 py-4">
            <Field data-invalid={fieldState.invalid} className="w-full flex flex-col items-center gap-3">
              <FieldLabel htmlFor="referenceImage" className="sr-only">
                Cover SEO
              </FieldLabel>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg, image/png, image/webp"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (!file) return;
                  field.onChange(file);
                  if (previewLogo && previewLogo !== seo.seo_reference_image) {
                    URL.revokeObjectURL(previewLogo);
                  }
                  setPreviewLogo(URL.createObjectURL(file));
                }}
              />

              <div className="relative h-60 w-full rounded-md overflow-hidden border bg-muted">
                {previewLogo ? (
                  <Image src={previewLogo} alt="preview-logo" fill unoptimized className="object-contain p-4" />
                ) : (
                  <div className="flex items-center justify-center h-full text-muted-foreground italic text-sm">No image selected</div>
                )}
              </div>

              <Button type="button" variant="outline" onClick={() => fileInputRef.current?.click()}>
                {previewLogo ? "Pilih Cover Lain" : "Upload Cover"}
              </Button>

              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          </div>
        )}
      />
    </EntityDialog>
  );
}
