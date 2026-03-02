import { DeleteDialog } from "@/components/shared/dialog-delete";
import { useDeleteCourseBatch } from "../hook";

export function CourseBatchDeleteDialog({ courseId, batchId }: { courseId: string; batchId: string }) {
  const { mutateAsync, isPending } = useDeleteCourseBatch();

  return (
    <DeleteDialog
      variables={{ courseId, batchId }}
      onDelete={mutateAsync}
      isPending={isPending}
      title="Delete this course batch"
      description="Apakah kamu yakin akan menghapus course batch ini?"
      loadingMessage="Menghapus course batch..."
      successMessage="Course batch berhasil dihapus"
      errorMessage="Gagal menghapus course batch"
    />
  );
}
