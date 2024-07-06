import BackButton from "@/components/BackButton";
import DetailImage from "@/components/DetailImage";
import React from "react";

export default async function ProjectDetailPage() {
  return (
    <div className="flex min-h-[100dvh] flex-col items-center justify-center">
      <section className="flex w-9/12 flex-col items-center justify-center gap-10">
        <section className="flex h-full w-full flex-col items-center justify-center self-start">
          <BackButton />
        </section>
        <div className="flex w-full flex-col items-center justify-center">
          <DetailImage />
        </div>
      </section>
    </div>
  );
}
