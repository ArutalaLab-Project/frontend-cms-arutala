"use client";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { CourseFieldList } from "@/features/course-field/component/course-field-list";
import { CourseFieldAddDialog } from "@/features/course-field/component/course-field-add";
import { IconCircleArrowLeft } from "@tabler/icons-react";
import { useRouter } from "next/navigation";

export default function CourseFieldPage() {
  const router = useRouter();
  return (
    <div className="flex flex-1 flex-col">
      <div className="p-4 lg:px-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button variant="outline" size="icon-sm" onClick={() => router.push(`/content-website/courses`)}>
              <IconCircleArrowLeft className="size-5" />
            </Button>
            <div className="flex flex-col items-start gap-1">
              <h6 className="text-lg font-medium">Course Field</h6>
            </div>
          </div>
          <CourseFieldAddDialog />
        </div>
        <Separator className="my-4" />
        <CourseFieldList />
      </div>
    </div>
  );
}
