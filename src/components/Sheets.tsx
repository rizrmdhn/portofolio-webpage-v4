"use client";

import { useRouter } from "next/navigation";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { createPortal } from "react-dom";
import { useState } from "react";
import { cn } from "@/lib/utils";

type ModalProps = {
  className?: string;
  children: React.ReactNode;
};

export default function Sheets({ className, children }: ModalProps) {
  const [open, setOpen] = useState(true);

  const router = useRouter();

  const handleOpenChange = () => {
    setOpen(!open);
    setTimeout(() => {
      router.back();
    }, 300);
  };

  return createPortal(
    <Sheet
      defaultOpen={open}
      open={open}
      onOpenChange={() => handleOpenChange()}
    >
      <SheetContent
        className={cn(
          className,
          "sm:w-[400px] sm:max-w-[540px] xl:w-[760px] xl:max-w-none",
        )}
      >
        {children}
      </SheetContent>
    </Sheet>,
    document.getElementById("sheet-root")!,
  );
}
