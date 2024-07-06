"use client";

import { useRouter } from "next/navigation";

export default function ErrorComponent({
  error,
}: {
  error: Error & { digest?: string };
}) {
  const router = useRouter();
  console.error(error);

  return (
    <div className="flex min-h-[100dvh] flex-col items-center justify-center px-4 py-12 text-center">
      <div className="max-w-md space-y-4">
        <h2 className="text-3xl font-semibold text-gray-900 dark:text-gray-50">
          Oops! Something went wrong.
        </h2>
        <p className="text-gray-500 dark:text-gray-400">{error.message}</p>
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
