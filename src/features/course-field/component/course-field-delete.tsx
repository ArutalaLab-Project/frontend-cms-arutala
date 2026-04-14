import { DeleteDialog } from "@/components/shared/dialog-delete";
import { useDeleteCourseField } from "../hook";

export function CourseFieldDeleteDialog({ courseFieldId }: { courseFieldId: string }) {
  const { mutateAsync: deleteCourseField, isPending } = useDeleteCourseField();

  return (
    <DeleteDialog
      variables={courseFieldId}
      onDelete={async (id) => {
        await deleteCourseField(id);
      }}
      isPending={isPending}
      title="Delete this course field"
      description="Apakah kamu yakin akan menghapus bidang course ini?"
      loadingMessage="Menghapus bidang course..."
      successMessage="Bidang course berhasil dihapus"
      errorMessage="Gagal menghapus bidang course"
    />
  );
}
