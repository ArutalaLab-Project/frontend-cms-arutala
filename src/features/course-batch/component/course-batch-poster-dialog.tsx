"use client";

import { useRef, useState, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { EntityDialog } from "@/components/shared/entity-dialog";
import { useUploadCourseBatch } from "../hook";
import { CourseBatch, CourseBatchUploadPosterInput, courseBatchUploadPosterInputSchema } from "../type";
import { useParams } from "next/navigation";
import { AspectRatio } from "@/components/ui/aspect-ratio";

export function CourseBatchPosterDialog({ courseBatch }: { courseBatch: CourseBatch }) {
  const [open, setOpen] = useState(false);
  const [previewPoster, setPreviewPoster] = useState<string | null>(courseBatch.poster_url);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const params = useParams();

  const courseId = params.courseId as string;
  const { mutateAsync, isPending } = useUploadCourseBatch();

  const form = useForm<CourseBatchUploadPosterInput>({
    resolver: zodResolver(courseBatchUploadPosterInputSchema),
    defaultValues: {
      poster: undefined,
    },
  });

  const handleUpdateProfile = async (values: CourseBatchUploadPosterInput) => {
    if (!values.poster) {
      toast.error("Silakan pilih poster terlebih dahulu");
      return;
    }

    const formData = new FormData();
    formData.append("poster", values.poster);

    toast.promise(
      mutateAsync({
        courseId: courseId,
        batchId: courseBatch.course_batch_id,
        formData: formData,
      }),
      {
        loading: "Updating poster...",
        success: () => {
          setOpen(false);
          return "poster berhasil diperbarui";
        },
        error: (err) => err.message || "Failed to update poster",
      },
    );
  };

  useEffect(() => {
    return () => {
      if (previewPoster && previewPoster !== courseBatch.poster_url) {
        URL.revokeObjectURL(previewPoster);
      }
    };
  }, [previewPoster, courseBatch.poster_url]);

  return (
    <EntityDialog
      open={open}
      onOpenChange={setOpen}
      title="Update Poster"
      description="Pilih poster untuk batch ini"
      isPending={isPending}
      saveLabel="Update Poster"
      onSubmit={form.handleSubmit(handleUpdateProfile)}
      className="sm:max-w-85 max-w-md!"
      contentClassName="!grid-cols-1"
      trigger={
        <div className="cursor-pointer hover:opacity-80 transition-opacity min-w-24 items-center flex justify-center">
          {courseBatch.poster_url ? (
            <div className="cursor-pointer hover:opacity-80 transition-opacity min-w-24 items-center flex justify-center">
              <AspectRatio ratio={4 / 2} className="bg-accent rounded-lg border">
                <Image src={courseBatch.poster_url} alt={courseBatch.name} fill className="object-contain" />
              </AspectRatio>
            </div>
          ) : (
            <Button variant="outline" size="sm">
              Upload Poster
            </Button>
          )}
        </div>
      }
    >
      <Controller
        name="poster"
        control={form.control}
        render={({ field, fieldState }) => (
          <div className="pt-4 pb-1">
            <Field data-invalid={fieldState.invalid} className="w-full flex flex-col items-center gap-3">
              <FieldLabel htmlFor="poster" className="sr-only">
                poster
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
                  if (previewPoster && previewPoster !== courseBatch.poster_url) {
                    URL.revokeObjectURL(previewPoster);
                  }
                  setPreviewPoster(URL.createObjectURL(file));
                }}
              />

              <div className="relative h-80 w-80 rounded-lg overflow-hidden border bg-muted shrink-0">
                {previewPoster ? (
                  <Image src={previewPoster} alt="preview-profile" fill unoptimized className="object-contain p-2" />
                ) : (
                  <div className="flex items-center justify-center h-full text-muted-foreground italic text-sm">No image</div>
                )}
              </div>

              <Button type="button" variant="outline" className="w-full" onClick={() => fileInputRef.current?.click()}>
                {previewPoster ? "Pilih Poster Lain" : "Upload Poster"}
              </Button>

              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          </div>
        )}
      />
    </EntityDialog>
  );
}
