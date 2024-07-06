"use client";

import Image from "next/image";
import { useSearchParams } from "next/navigation";
import React from "react";

export default function DetailImage() {
  const searchParams = useSearchParams();

  const image = searchParams.get("image");
  return (
    <Image
      alt={"Project Image"}
      className="w-full overflow-hidden rounded-xl object-cover"
      height="1080"
      src={image ? image : "/images/loader.png"}
      width="1920"
    />
  );
}
