"use client";

import ProjectCardV2 from "@/components/ProjectCardV2";
import { Skeleton } from "@/components/ui/skeleton";
import { api } from "@/trpc/react";

export default function Project() {
  const { data: projects, isLoading } = api.project.list.useQuery();

  if (isLoading || !projects) {
    return (
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex flex-col space-y-3">
            <div className="h-[200px]">
              <Skeleton className="h-full w-full rounded-xl" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-4 w-[250px]" />
              <Skeleton className="h-4 w-[200px]" />
            </div>
            <div className="flex gap-2">
              <Skeleton className="h-4 w-[60px] rounded-full" />
              <Skeleton className="h-4 w-[60px] rounded-full" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {projects.map((proj) => (
        <ProjectCardV2
          key={proj.id}
          id={proj.id}
          title={proj.name}
          description={proj.description ?? "No description provided."}
          image={proj.image_url ?? "/images/loader.png"}
          link={proj.github_url}
          url={proj.url}
          views={proj.projectView.count}
          tags={proj.tech}
        />
      ))}
    </div>
  );
}
