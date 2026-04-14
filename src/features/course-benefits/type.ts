import z from "zod";

export const courseBenefit = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
});

export type CourseBenefit = z.infer<typeof courseBenefit>;
export const coursesBenefits = z.array(courseBenefit);

export const createCourseBenefitSchema = z.object({
  title: z.string().min(1, "Judul tidak boleh kosong"),
  description: z.string().min(1, "Deskripsi tidak boleh kosong"),
});
export type CreateCourseBenefitInput = z.infer<typeof createCourseBenefitSchema>;

export const updateCourseBenefitSchema = z.object({
  title: z.string().min(1, "Judul tidak boleh kosong"),
  description: z.string().min(1, "Deskripsi tidak boleh kosong"),
});
export type UpdateCourseBenefitInput = z.infer<typeof updateCourseBenefitSchema>;
