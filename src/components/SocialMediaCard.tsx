import { type SocialMedia } from "@/types/social-media";
import Link from "next/link";
import React from "react";

export default function SocialMediaCard({ icon, link }: SocialMedia) {
  return (
    <div className="flex flex-col items-center justify-center space-y-2">
      <Link
        className="rounded-full bg-gray-100 p-4 shadow-md transition-colors duration-300 ease-in-out hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700"
        target="_blank"
        rel="noopener noreferrer"
        href={link}
      >
        {icon}
      </Link>
    </div>
  );
}
