"use client";
import { ButtonGroup, ButtonGroupSeparator } from "@/components/ui/button-group";
import { Item, ItemActions, ItemContent, ItemDescription, ItemTitle } from "@/components/ui/item";
import { useCourseBenefit } from "@/features/course-benefits/hook";
import { CourseBenefitEditDialog } from "./course-benefits-edit";
import { CourseBenefitDeleteDialog } from "./course-benefits-delete";

export function CourseBenefitList() {
  const { data: courseBenefits } = useCourseBenefit();
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
      {courseBenefits?.map((benefit) => {
        return (
          <Item variant="outline" key={benefit.id}>
            <ItemContent>
              <ItemTitle>{benefit.title}</ItemTitle>
              <ItemDescription>{benefit.description}</ItemDescription>
            </ItemContent>
            <ItemActions>
              <ButtonGroup>
                <CourseBenefitEditDialog courseBenefit={benefit} />
                <ButtonGroupSeparator />
                <CourseBenefitDeleteDialog courseBenefitId={benefit.id} />
              </ButtonGroup>
            </ItemActions>
          </Item>
        );
      })}
    </div>
  );
}
