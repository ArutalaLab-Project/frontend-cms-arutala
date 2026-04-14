import { DeleteDialog } from "@/components/shared/dialog-delete";
import { useDeleteCourseBenefit } from "../hook";

export function CourseBenefitDeleteDialog({ courseBenefitId }: { courseBenefitId: string }) {
  const { mutateAsync: deleteCourseBenefit, isPending } = useDeleteCourseBenefit();

  return (
    <DeleteDialog
      variables={courseBenefitId}
      onDelete={async (id) => {
        await deleteCourseBenefit(id);
      }}
      isPending={isPending}
      title="Delete this course benefit"
      description="Apakah kamu yakin akan menghapus benefit course ini?"
      loadingMessage="Menghapus benefit course..."
      successMessage="Benefit course berhasil dihapus"
      errorMessage="Gagal menghapus benefit course"
    />
  );
}
