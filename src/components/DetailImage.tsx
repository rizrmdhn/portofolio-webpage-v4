"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import React from "react";

type DetailImageProps = {
  className?: string;
};

export default function DetailImage({ className }: DetailImageProps) {
  const searchParams = useSearchParams();

  const image = searchParams.get("image");
  return (
    <Image
      alt={"Project Image"}
      className={cn(
        "w-[80%] overflow-hidden rounded-xl object-cover",
        className,
      )}
      height="1080"
      src={image ? image : "/images/loader.png"}
      width="1920"
    />
  );
}
