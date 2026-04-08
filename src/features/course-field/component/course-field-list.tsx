"use client";
import { ButtonGroup, ButtonGroupSeparator } from "@/components/ui/button-group";
import { Item, ItemActions, ItemContent, ItemTitle } from "@/components/ui/item";
import { useCourseField } from "@/features/course-field/hook";
import { CourseFieldEditDialog } from "./course-field-edit";
import { CourseFieldDeleteDialog } from "./course-field-delete";

export function CourseFieldList() {
  const { data: courseFields } = useCourseField();
  return (
    <div className="grid grid-cols-3 gap-2">
      {courseFields?.map((field) => {
        return (
          <Item variant="outline" key={field.id}>
            <ItemContent>
              <ItemTitle>{field.field}</ItemTitle>
            </ItemContent>
            <ItemActions>
              <ButtonGroup>
                <CourseFieldEditDialog courseField={field} />
                <ButtonGroupSeparator />
                <CourseFieldDeleteDialog courseFieldId={field.id} />
              </ButtonGroup>
            </ItemActions>
          </Item>
        );
      })}
    </div>
  );
}
