import { DeleteDialog } from "@/components/shared/dialog-delete";

export function CourseFieldDeleteDialog({ courseFieldId }: { courseFieldId: string }) {
  return (
    <DeleteDialog
      variables={courseFieldId}
      onDelete={async (id) => {
        // TODO: integrate API
        console.log("delete course field:", id);
      }}
      isPending={false}
      title="Delete this course field"
      description="Apakah kamu yakin akan menghapus bidang course ini?"
      loadingMessage="Menghapus bidang course..."
      successMessage="Bidang course berhasil dihapus"
      errorMessage="Gagal menghapus bidang course"
    />
  );
}
