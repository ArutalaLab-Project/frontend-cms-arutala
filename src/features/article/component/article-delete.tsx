import { TrashIcon } from "lucide-react";
import { useDeleteArticle } from "../hook";
import { DeleteDialog } from "@/components/shared/dialog-delete";

export function ArticleDeleteDialog({ articleId }: { articleId: string }) {
  const { mutateAsync, isPending } = useDeleteArticle();

  return (
    <DeleteDialog
      variables={articleId}
      onDelete={mutateAsync}
      isPending={isPending}
      title="Delete this artikel"
      description="Apakah kamu yakin akan menghapus artikel ini?"
      loadingMessage="Menghapus artikel..."
      successMessage="Artikel berhasil dihapus"
      errorMessage="Gagal menghapus artikel"
      trigger={
        <div className="w-full relative flex cursor-pointer select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors bg-action-delete text-white data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 ">
          <TrashIcon className="h-4 w-4" />
          <span>Delete</span>
        </div>
      }
    />
  );
}
