"use client";

import ExperienceCardV2 from "@/components/ExperienceCardV2";
import { api } from "@/trpc/react";

export default function Experience() {
  const [experiences] = api.experience.list.useSuspenseQuery();

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
