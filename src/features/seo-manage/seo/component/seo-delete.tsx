import { DeleteDialog } from "@/components/shared/dialog-delete";
import { useDeleteSeo } from "../hook";
import { TrashIcon } from "lucide-react";

export function SeoDeleteDialog({ seoId, pageId }: { seoId: string; pageId: string }) {
  const { mutateAsync, isPending } = useDeleteSeo();

  return (
    <DeleteDialog
      variables={{ pageId: pageId, seoId: seoId }}
      onDelete={mutateAsync}
      isPending={isPending}
      title="Delete this SEO"
      description="Apakah kamu yakin akan menghapus SEO ini?"
      loadingMessage="Menghapus SEO..."
      successMessage="SEO berhasil dihapus"
      errorMessage="Gagal menghapus SEO"
      trigger={
        <div className="w-full relative flex cursor-pointer select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors bg-action-delete text-white data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 ">
          <TrashIcon className="h-4 w-4" />
          <span>Delete</span>
        </div>
      }
    />
  );
}
