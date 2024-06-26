import React from "react";

export const metadata = {
  title: "Settings | My Portfolio",
  description: "Generated by create-t3-app",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default async function SettingsPage() {
  return (
    <>
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl">Statistics</h1>
      </div>
      <div className="flex items-center">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Will be updated soon when shadcn released the new chart
        </p>
      </div>
    </>
  );
}
