"use client";

import { Loader2, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { createClient } from "@/utils/supabase/client";

type DeleteJobButtonProps = {
  jobId: string;
};

export default function DeleteJobButton({ jobId }: DeleteJobButtonProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleDeleteJob = async (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const supabase = createClient();
      const { error } = await supabase.from("jobs").delete().eq("id", jobId);
      if (error) {
        console.error(error);
        toast.error("Error al eliminar el empleo");
        return;
      }
      toast.success("Empleo eliminado correctamente");
      setIsOpen(false);
      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error("Error al eliminar el empleo");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2 bg-transparent">
          <Trash2 className="w-4 h-4" />
          Eliminar
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            ¿Estás seguro de querer eliminar este empleo?
          </AlertDialogTitle>
          <AlertDialogDescription>
            Esta acción no se puede deshacer. Esta acción eliminará el empleo
            permanentemente y eliminará los datos del servidor.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isLoading}>Cancelar</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDeleteJob}
            disabled={isLoading}
            asChild
          >
            <Button
              variant="destructive"
              disabled={isLoading}
              className="gap-2"
            >
              {isLoading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                "Eliminar"
              )}
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
