"use client";

import { incrementProjectView } from "@/server/actions/project-view-action";
import { useAction } from "next-safe-action/hooks";
import React from "react";

type SourceCodeButtonProps = {
  id: string;
  github_url: string;
};

export default function SourceCodeButton({
  id,
  github_url,
}: SourceCodeButtonProps) {
  const { execute } = useAction(incrementProjectView);

  return (
    <a
      className="inline-flex h-9 items-center justify-center rounded-md border border-gray-200 bg-white px-4 py-2 text-sm font-medium shadow-sm transition-colors hover:cursor-pointer hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:border-gray-800 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus-visible:ring-gray-300"
      target="_blank"
      rel="noopener noreferrer"
      href={github_url}
      onClick={() => {
        execute({ id });
      }}
    >
      Source Code
    </a>
  );
}
