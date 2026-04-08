import z from "zod";

export const courseField = z.object({
  id: z.string(),
  field: z.string(),
});

export type CourseField = z.infer<typeof courseField>;
export const coursesFields = z.array(courseField);

export const createCourseFieldSchema = z.object({
  field: z.string().min(1, "Nama bidang tidak boleh kosong"),
});
export type CreateCourseFieldInput = z.infer<typeof createCourseFieldSchema>;

export const updateCourseFieldSchema = z.object({
  field: z.string().min(1, "Nama bidang tidak boleh kosong"),
});
export type UpdateCourseFieldInput = z.infer<typeof updateCourseFieldSchema>;
