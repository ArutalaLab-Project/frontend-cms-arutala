import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogFooter, AlertDialogCancel, AlertDialogAction, AlertDialogDescription, AlertDialogMedia } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useDeleteTestimoni } from "@/hooks/use-testimoni";
import { TrashIcon } from "lucide-react";
import { toast } from "sonner";

export function TestimoniDeleteDialog({ testimoniId }: { testimoniId: string }) {
  const { mutateAsync, isPending } = useDeleteTestimoni();

  const handleDelete = async () => {
    toast.promise(mutateAsync(testimoniId), {
      loading: "Menghapus testimoni...",
      success: (res) => {
        if (!res.success) {
          throw new Error(res.message);
        }
        return res.message;
      },
      error: (err) => {
        return err.message || "Failed to delete testimoni";
      },
    });
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive" size="icon-sm">
          <TrashIcon />
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogMedia className="bg-red-100">
            <TrashIcon className="text-red-500" />
          </AlertDialogMedia>
          <AlertDialogTitle>Delete this contributor?</AlertDialogTitle>
          <AlertDialogDescription>Apakah kamu yakin akan menghapus contributor ini?</AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction className="bg-red-600 hover:bg-red-700" onClick={handleDelete}>
            {isPending ? "Deleting..." : "Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
