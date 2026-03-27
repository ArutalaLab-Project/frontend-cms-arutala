import { TrashIcon } from "lucide-react";
import { useDeleteCourse } from "../hook";
import { DeleteDialog } from "@/components/shared/dialog-delete";

export function CourseDeleteDialog({ courseId }: { courseId: string }) {
  const { mutateAsync, isPending } = useDeleteCourse();

  return (
    <DeleteDialog
      variables={courseId}
      onDelete={mutateAsync}
      isPending={isPending}
      title="Delete this course"
      description="Apakah kamu yakin akan menghapus course ini?"
      loadingMessage="Menghapus course..."
      successMessage="Course berhasil dihapus"
      errorMessage="Gagal menghapus course"
      trigger={
        <div className="w-full relative flex cursor-pointer select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors bg-action-delete text-white data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 ">
          <TrashIcon className="h-4 w-4" />
          <span>Delete</span>
        </div>
      }
    />
  );
}
