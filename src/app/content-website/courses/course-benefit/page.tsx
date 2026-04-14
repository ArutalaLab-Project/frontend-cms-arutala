"use client";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { CourseBenefitList } from "@/features/course-benefits/component/course-benefits-list";
import { CourseBenefitAddDialog } from "@/features/course-benefits/component/course-benefits-add";
import { IconCircleArrowLeft } from "@tabler/icons-react";
import { useRouter } from "next/navigation";

export default function CourseBenefitPage() {
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
              <h6 className="text-lg font-medium">Course Benefit</h6>
            </div>
          </div>
          <CourseBenefitAddDialog />
        </div>
        <Separator className="my-4" />
        <CourseBenefitList />
      </div>
    </div>
  );
}
