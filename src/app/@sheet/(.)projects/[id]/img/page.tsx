import DetailImage from "@/components/DetailImage";
import Sheets from "@/components/Sheets";
import React from "react";

export default function ModalProjectImage() {
  return (
    <Sheets className="w-[80dvw] border-0 bg-transparent">
      <div className="flex w-full flex-col items-center justify-center gap-5 p-5">
        <DetailImage className="w-9/12" />
      </div>
    </Sheets>
  );
}
