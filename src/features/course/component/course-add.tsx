"use client";

import { useState } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { PlusCircle, Trash2 } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import { courseField, CourseInput, courseInputSchema } from "../type";
import { useCourseBenefit, useCourseCategory, useCourseField, useCreateCourse } from "../hook";

/* -------------------------------------------------------------------------- */
/* Dummy Data (Ganti dengan API)                                              */
/* -------------------------------------------------------------------------- */

// const categories = [
//   { id: "1", name: "Web Development" },
//   { id: "2", name: "Project Management" },
// ];

// const fields = [
//   { id: "1", name: "Software Engineering" },
//   { id: "2", name: "Business" },
// ];

// const benefits = [
//   { id: "b1", name: "E-Certificate" },
//   { id: "b2", name: "Lifetime Access" },
// ];

/* -------------------------------------------------------------------------- */

export function CourseAddDialog() {
  const [open, setOpen] = useState(false);
  const { mutateAsync, isPending } = useCreateCourse();
  const { data: coursescategory } = useCourseCategory();
  const { data: coursesfield } = useCourseField();
  const { data: coursesbenefits } = useCourseBenefit();

  // console.log(coursescategory);
  // console.log(coursesfield);

  const form = useForm<CourseInput>({
    resolver: zodResolver(courseInputSchema),
    defaultValues: {
      courseTitle: "",
      courseDescription: "",
      courseCategoryId: "",
      courseFieldId: "",
      courseBenefits: [],
      courseMaterials: [],
    },
  });

  const {
    fields: materialFields,
    append: appendMaterial,
    remove: removeMaterial,
  } = useFieldArray({
    control: form.control,
    name: "courseMaterials",
  });

  const {
    fields: benefitFields,
    append: appendBenefit,
    remove: removeBenefit,
  } = useFieldArray({
    control: form.control,
    name: "courseBenefits",
  });

  const handleCreate = async (values: CourseInput) => {
    // console.log(values);
    toast.promise(mutateAsync(values), {
      loading: "Membuat course...",
      success: () => {
        setOpen(false);
        form.reset();
        return "Course berhasil dibuat";
      },
      error: (err) => err.message || "Gagal membuat course",
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm">
          Tambah Course <PlusCircle className="ml-2 w-4 h-4" />
        </Button>
      </DialogTrigger>

      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-3xl">
        {/* <form onSubmit={form.handleSubmit(handleCreate)} className="space-y-6"> */}
        <form onSubmit={form.handleSubmit(handleCreate, (err) => console.log("ERROR:", err))} className="space-y-6">
          <DialogHeader>
            <DialogTitle>Tambah Course</DialogTitle>
            <DialogDescription>Isi detail course di bawah ini</DialogDescription>
          </DialogHeader>

          {/* ================= BASIC INFO ================= */}

          <div className="space-y-4">
            <Controller name="courseTitle" control={form.control} render={({ field }) => <Input {...field} placeholder="Course Title" />} />

            <Controller name="courseDescription" control={form.control} render={({ field }) => <textarea {...field} placeholder="Course Description" className="w-full border rounded-md p-2 min-h-25" />} />

            <Controller
              name="courseCategoryId"
              control={form.control}
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose Category" />
                  </SelectTrigger>
                  <SelectContent>
                    {coursescategory?.map((cat) => (
                      <SelectItem key={cat.id} value={cat.id}>
                        {cat.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />

            <Controller
              name="courseFieldId"
              control={form.control}
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose Field" />
                  </SelectTrigger>
                  <SelectContent>
                    {coursesfield?.map((f) => (
                      <SelectItem key={f.id} value={f.id}>
                        {f.field}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
          </div>

          {/* ================= MATERIALS ================= */}

          <div className="space-y-4">
            <h3 className="font-semibold">Course Materials</h3>

            {materialFields.map((item, index) => (
              <div key={item.id} className="border p-4 rounded-md space-y-2">
                <Controller name={`courseMaterials.${index}.title`} control={form.control} render={({ field }) => <Input {...field} placeholder="Title" />} />

                <Controller name={`courseMaterials.${index}.description`} control={form.control} render={({ field }) => <Input {...field} placeholder="Description" />} />

                <Controller name={`courseMaterials.${index}.orderNum`} control={form.control} render={({ field }) => <Input type="number" {...field} onChange={(e) => field.onChange(Number(e.target.value))} />} />

                <Button type="button" variant="destructive" size="sm" onClick={() => removeMaterial(index)}>
                  <Trash2 className="w-4 h-4 mr-1" />
                  Remove
                </Button>
              </div>
            ))}

            <Button
              type="button"
              variant="outline"
              onClick={() =>
                appendMaterial({
                  title: "",
                  description: "",
                  orderNum: materialFields.length + 1,
                })
              }
            >
              + Add Material
            </Button>
          </div>

          {/* ================= BENEFITS ================= */}

          <div className="space-y-4">
            <h3 className="font-semibold">Course Benefits</h3>

            {benefitFields.map((item, index) => (
              <div key={item.id} className="flex gap-2 items-center">
                <Controller
                  name={`courseBenefits.${index}.courseBenefitId`}
                  control={form.control}
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger>
                        <SelectValue placeholder="Choose Benefit" />
                      </SelectTrigger>
                      <SelectContent>
                        {coursesbenefits?.map((b) => (
                          <SelectItem key={b.id} value={b.id}>
                            {b.title}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />

                <Controller name={`courseBenefits.${index}.orderNum`} control={form.control} render={({ field }) => <Input type="number" {...field} onChange={(e) => field.onChange(Number(e.target.value))} />} />

                <Button type="button" variant="destructive" size="icon" onClick={() => removeBenefit(index)}>
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            ))}

            <Button
              type="button"
              variant="outline"
              onClick={() =>
                appendBenefit({
                  courseBenefitId: "",
                  orderNum: benefitFields.length + 1,
                })
              }
            >
              + Add Benefit
            </Button>
          </div>

          {/* ================= FOOTER ================= */}

          <DialogFooter>
            <Button type="submit" disabled={isPending}>
              {isPending ? "Creating..." : "Create Course"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
