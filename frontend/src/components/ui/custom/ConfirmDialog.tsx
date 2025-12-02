import { type Dispatch, type SetStateAction } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../ui/dialog";
import { Button } from "../../ui/button";

interface DeleteDialogProps {
  onDelete: () => void;
  open: boolean | undefined;
  onOpenChange: Dispatch<SetStateAction<boolean>>;
  title?: string;
  description?: string;
  actionText?: string;
  closeText?: string;
}

function ConfirmationDialog({
  onDelete,
  open,
  onOpenChange,
  title = "Confirmation Dialog",
  description = "Confirm your actions",
  actionText = "Confirm",
  closeText = "Close",
}: DeleteDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">{closeText}</Button>
          </DialogClose>
          <Button type="submit" onClick={onDelete}>
            {actionText}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default ConfirmationDialog;
