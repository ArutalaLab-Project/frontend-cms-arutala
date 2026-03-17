import z from "zod";

export const seoSchema = z.object({
  seo_id: z.string(),
  meta_title: z.string().min(3, "Meta Title wajib diisi"),
  meta_description: z.string().min(15, "Meta Description minimal 15 karakter"),
  is_active: z.boolean(),
  seo_keyword: z.array(z.string()),
  seo_reference_image: z.string(),
  seo_type: z.enum(["ARTICLE", "WEBSITE", "PROFILE"]),
});

export type Seo = z.infer<typeof seoSchema>;
export const seosSchema = z.array(seoSchema);

export const seoInputSchema = z.object({
  metaTitle: z.string().min(3, "Meta Title wajib diisi"),
  metaDescription: z.string().min(15, "Meta Description minimal 15 karakter"),
  keyword: z.array(z.object({ value: z.string() })).min(1, "SEO harus memiliki setidaknya satu keyword"),
  type: z.enum(["ARTICLE", "WEBSITE", "PROFILE"]),
  referenceImage: z
    .instanceof(File)
    .refine((file) => ["image/jpeg", "image/png", "image/webp"].includes(file.type), "File harus berupa JPG, PNG, atau WEBP")
    .refine((file) => file.size <= 5 * 1024 * 1024, "Ukuran file maksimal 5MB"),
});

export type SeoInput = z.infer<typeof seoInputSchema>;

export const updateSeoSchema = seoInputSchema.omit({ referenceImage: true });
export type SeoUpdateInput = z.infer<typeof updateSeoSchema>;

export const updateSeoCoverSchema = z.object({
  referenceImage: z
    .instanceof(File)
    .refine((file) => ["image/jpeg", "image/png", "image/webp"].includes(file.type), "File harus berupa JPG, PNG, atau WEBP")
    .refine((file) => file.size <= 5 * 1024 * 1024, "Ukuran file maksimal 5MB"),
});
export type SeoCoverUpdateInput = z.infer<typeof updateSeoCoverSchema>;
