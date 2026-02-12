import { z } from "zod";

export const courseBatchPriceSchema = z.object({
  basePrice: z.string(),
  discountType: z.string(),
  discountValue: z.string(),
  finalPrice: z.string(),
});

export const courseBatchSchema = z.object({
  name: z.string(),
  status: z.string(),
  posterUrl: z.string(),
  registration_start: z.string(),
  registration_end: z.string(),
  start_date: z.string(),
  end_date: z.string(),
  instructor: z.object({
    name: z.string(),
    jobTitle: z.string(),
    companyName: z.string(),
    profileUrl: z.string(),
  }),
  price: courseBatchPriceSchema,
});

export const courseSchema = z.object({
  course_id: z.string(),
  course_title: z.string(),
  course_description: z.string(),
  course_category_name: z.string(),
  course_field_name: z.string(),
  course_batch: courseBatchSchema,
});

export type Course = z.infer<typeof courseSchema>;

export const courseDetailSchema = z.object({
  course_id: z.string(),
  course_title: z.string(),
  course_description: z.string(),
  course_category_name: z.string(),
  course_field_name: z.string(),
  courseBenefit: z.array(
    z.object({
      title: z.string(),
      description: z.string(),
    }),
  ),
  courseMaterial: z.array(
    z.object({
      title: z.string(),
      description: z.string(),
    }),
  ),
  courseBatch: z.array(
    z.object({
      name: z.string(),
      status: z.string(),
      posterUrl: z.string(),
      registration_start: z.string(),
      registration_end: z.string(),
      start_date: z.string(),
      end_date: z.string(),
      batch_status: z.string(),
      instructor_name: z.string(),
      instrutor_job_title: z.string(),
      instructor_company_name: z.string(),
      instructor_profile_url: z.string(),
      base_price: z.number(),
      discount_type: z.number(),
      discount_value: z.number(),
      final_price: z.number(),
    }),
  ),
});

export type CourseDetail = z.infer<typeof courseDetailSchema>;

// Skema input create course

/**
 * Course Benefit Schema
 */
const courseBenefitSchema = z.object({
  courseBenefitId: z.string().uuid(),
  orderNum: z.number().int().positive(),
});

/**
 * Course Material Schema
 */
const courseMaterialSchema = z.object({
  title: z.string().min(5, "Title is required"),
  description: z.string().min(50, "Description is required"),
  orderNum: z.number().int().positive(),
});

/**
 * Main Course Input Schema
 */
export const courseInputSchema = z
  .object({
    courseTitle: z.string().min(5, "Title minimal 3 karakter"),
    courseDescription: z.string().min(50, "Deskripsi minimal 10 karakter"),

    courseCategoryId: z.string().uuid(),
    courseFieldId: z.string().uuid(),

    // courseBenefits: z.array(courseBenefitSchema).min(1, "Minimal 1 benefit"),
    courseBenefits: z.array(courseBenefitSchema),

    courseMaterials: z.array(courseMaterialSchema),
    // courseMaterials: z.array(courseMaterialSchema).min(1, "Minimal 1 material"),
  })
  .strict();

export type CourseInput = z.infer<typeof courseInputSchema>;

export const courseCategory = z.object({
  id: z.string(),
  name: z.string(),
  min_duration: z.string(),
  max_duration: z.string(),
});

export type CourseCategory = z.infer<typeof courseCategory>;
export const coursesCategories = z.array(courseCategory);

export const courseField = z.object({
  id: z.string(),
  field: z.string(),
});

export type CourseField = z.infer<typeof courseField>;
export const coursesFields = z.array(courseField);

export const courseBenefit = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
});

export type CourseBenefit = z.infer<typeof courseBenefit>;
export const coursesBenefit = z.array(courseBenefit);
