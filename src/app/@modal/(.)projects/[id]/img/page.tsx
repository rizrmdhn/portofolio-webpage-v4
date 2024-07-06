import DetailImage from "@/components/DetailImage";
import Modal from "@/components/Modal";
import React from "react";

export default function ModalProjectImage() {
  return (
    <Modal className="w-[80dvw] border-0 bg-transparent">
      <div className="flex w-full flex-col items-center justify-center gap-5 p-5">
        <DetailImage className="w-full" />
      </div>
    </Modal>
  );
}
