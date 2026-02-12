"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatedDate } from "@/shared/utils/date";

type UpcomingCoursesProps = {
  courses: {
    course_id: string;
    course_title: string;
    course_batch_name: string;
    course_batch_start_date: string;
    course_batch_status: string;
  }[];
};

export function UpcomingCourses({ courses }: UpcomingCoursesProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Upcoming Courses</CardTitle>
        <CardDescription>Courses starting soon</CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        {courses.map((course) => (
          <div key={course.course_id} className="flex items-center justify-between border-b pb-3 last:border-0">
            <div className="flex flex-col gap-1">
              <p className="text-sm font-medium">{course.course_title}</p>
              <p className="text-xs text-muted-foreground">{course.course_batch_name}</p>
              <p className="text-xs text-muted-foreground">
                Dimulai pada:{" "}
                {/* {new Date(course.course_batch_start_date).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })} */}
                {formatedDate(course.course_batch_start_date)}
              </p>
            </div>

            <Badge variant={course.course_batch_status === "OPEN" ? "default" : "secondary"}>{course.course_batch_status}</Badge>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
