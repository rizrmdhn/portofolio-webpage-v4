"use client";

import ExperienceCardV2 from "@/components/ExperienceCardV2";
import { Skeleton } from "@/components/ui/skeleton";
import { api } from "@/trpc/react";

export default function Experience() {
  const { data: experiences, isLoading } = api.experience.list.useQuery();

  if (isLoading || !experiences) {
    return (
      <div className="grid gap-6 md:grid-cols-2">
        {[1, 2, 3].map((i) => (
          <div key={i} className="rounded-lg border p-4">
            <div className="space-y-3">
              <Skeleton className="h-4 w-[250px]" />
              <Skeleton className="h-4 w-[200px]" />
              <Skeleton className="h-4 w-[150px]" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-2/3" />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {experiences.map((exp) => (
        <ExperienceCardV2
          key={exp.id}
          title={exp.name}
          company={exp.company}
          period={exp.date}
          description={exp.description}
        />
      ))}
    </div>
  );
}
