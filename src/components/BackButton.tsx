"use client";

import { useRouter } from "next/navigation";
import React from "react";

export default function BackButton() {
  const { back } = useRouter();
  return (
    <div className="flex w-full flex-col items-center justify-center">
      <button
        onClick={back}
        className="self-start rounded-full bg-gray-100 p-2 shadow-md transition-colors duration-300 ease-in-out hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="h-6 w-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
          />
        </svg>
      </button>
    </div>
  );
}
