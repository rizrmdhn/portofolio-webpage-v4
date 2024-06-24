import { SocialMedia } from "@/types";
import Link from "next/link";
import React from "react";

export default function SocialMediaCard({ icon, link, name }: SocialMedia) {
  return (
    <div className="flex flex-col items-center justify-center space-y-2">
      <Link
        className="p-4 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-300 ease-in-out shadow-md"
        target="_blank"
        rel="noopener noreferrer"
        href={link}
      >
        {icon}
      </Link>
    </div>
  );
}
