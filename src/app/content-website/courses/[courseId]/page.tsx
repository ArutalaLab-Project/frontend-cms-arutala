// export default async function Page() {
//   return (
//     <div className="flex flex-1 flex-col">
//       <div className="p-4 lg:px-6">Detail Course</div>
//     </div>
//   );
// }

"use client";

import { useCourseDetail } from "@/features/course/hook";
import { useParams } from "next/navigation";

export default function CourseDetailPage() {
  const params = useParams();
  const courseId = params.courseId as string;

  const { data, isLoading, isError, error } = useCourseDetail(courseId);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {(error as Error).message}</div>;
  }

  if (!data) {
    return <div>Course not found</div>;
  }

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">{data.course_title}</h1>

      <p className="text-muted-foreground">{data.course_description}</p>

      <div>
        <h2 className="font-semibold">Category</h2>
        <p>{data.course_category_name}</p>
      </div>

      <div>
        <h2 className="font-semibold">Field</h2>
        <p>{data.course_field_name}</p>
      </div>

      <div>
        <h2 className="font-semibold">Benefits</h2>
        <ul className="list-disc pl-5">
          {data.courseBenefit?.map((benefit) => (
            <li key={benefit.title}>{benefit.description}</li>
          ))}
        </ul>
      </div>

      <div>
        <h2 className="font-semibold">Materials</h2>
        <ul className="list-disc pl-5">
          {data.courseMaterial?.map((material) => (
            <li key={material.title}>{material.description}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
