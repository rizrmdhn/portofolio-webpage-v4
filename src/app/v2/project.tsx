"use client";

import ProjectCardV2 from "@/components/ProjectCardV2";
import { api } from "@/trpc/react";

export default function Project() {
  const [projects] = api.project.list.useSuspenseQuery();

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
