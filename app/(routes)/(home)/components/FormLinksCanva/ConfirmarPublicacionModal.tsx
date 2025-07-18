"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

type Props = {
  open: boolean;
  setOpen: (value: boolean) => void;
  onConfirm: () => void;
};

export const ConfirmarPublicaciónModal = ({
  open,
  setOpen,
  onConfirm,
}: Props) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-[400px] text-center">
        <DialogHeader>
          <DialogTitle>¿Estás seguro de publicar?</DialogTitle>
        </DialogHeader>
        <p className="text-muted-foreground text-sm text-start">
          Se enviará un anuncio a todos los cursos conectados.
        </p>
        <DialogFooter className="flex justify-center gap-4 mt-4">
          <Button variant="outline" onClick={() => setOpen(false)} className="cursor-pointer">
            Cancelar
          </Button>
          <Button className="bg-eggplant-950 text-white cursor-pointer" onClick={onConfirm}>
            Confirmar publicación
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
