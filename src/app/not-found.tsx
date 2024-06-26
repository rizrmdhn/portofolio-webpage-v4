"use client";

import { useRouter } from "next/navigation";

export default function NotFoundComponent() {
  const router = useRouter();

  return (
    <div className="flex min-h-[100dvh] flex-col items-center justify-center px-4 py-12 text-center">
      <div className="max-w-md space-y-4">
        <h1 className="text-9xl font-bold text-gray-900 dark:text-gray-50">
          404
        </h1>
        <h2 className="text-3xl font-semibold text-gray-900 dark:text-gray-50">
          Oops! Page not found.
        </h2>
        <p className="text-gray-500 dark:text-gray-400">
          The page you are looking for does not exist or has been moved.
        </p>
        <a
          className="inline-flex h-10 items-center justify-center rounded-md bg-gray-900 px-6 text-sm font-medium text-gray-50 shadow transition-colors hover:cursor-pointer hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
          onClick={() => {
            router.back();
          }}
        >
          Go to previous page
        </a>
      </div>
    </div>
  );
}
