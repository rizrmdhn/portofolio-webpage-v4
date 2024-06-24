import React from "react";
import type { Skills } from "@/types";

export default function SkillCard({ name, icon }: Skills) {
  return (
    <div className="flex flex-col items-center justify-center space-y-2">
      <div className="p-4 rounded-full bg-gray-100 dark:bg-gray-800">
        {icon}
      </div>
      <p className="text-lg font-medium">{name}</p>
    </div>
  );
}
