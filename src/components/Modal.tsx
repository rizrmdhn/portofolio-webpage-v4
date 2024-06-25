"use client";

import React from "react";
import { Dialog, DialogOverlay, DialogContent } from "@/components/ui/dialog";
import { useRouter } from "next/navigation";
import { createPortal } from "react-dom";
import { cn } from "@/lib/utils";

type ModalProps = {
  className?: string;
  children: React.ReactNode;
};

export default function Modal({ className, children }: ModalProps) {
  // const [showExitConfirmation, setShowExitConfirmation] = useState(false);
  const router = useRouter();

  // const closeModal = () => {
  //   router.back();
  // };

  const handleOpenChange = () => {
    router.back();
  };

  return createPortal(
    <Dialog defaultOpen={true} open={true} onOpenChange={handleOpenChange}>
      <DialogOverlay>
        <DialogContent
          className={cn(className, "overflow-x-auto overflow-y-auto")}
        >
          {/* <AlertConfirmation
            open={showExitConfirmation}
            setOpen={setShowExitConfirmation}
            confirmationAction={closeModal}
            message="You haven't saved your changes. Please confirm you want to exit without saving."
          /> */}
          {children}
        </DialogContent>
      </DialogOverlay>
    </Dialog>,
    document.getElementById("modal-root")!,
  );
}
