import React from "react";
import { Card, CardContent } from "./ui/card";
import Image from "next/image";
import Link from "next/link";
import { ProjectElement } from "@/types/project";

export default function ProjectCard({
  description,
  name,
  url,
  githubUrl,
  tech,
  image,
}: ProjectElement) {
  function renderTechList(tech: string[]) {
    return tech.map((t, index) => (
      <div
        className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400"
        key={index}
      >
        <span className="text-gray-500 dark:text-gray-40">
          {t}
          {index !== tech.length - 1 && ","}
        </span>
        {}
      </div>
    ));
  }

  function filterName(name: string) {
    if (name.includes("-")) {
      return name
        .replace(/-/g, " ")
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
    } else if (name.includes("_")) {
      return name
        .replace(/_/g, " ")
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
    } else {
      return name.charAt(0).toUpperCase() + name.slice(1);
    }
  }

  return (
    <Card>
      <CardContent className="flex flex-col items-start gap-4 mt-4">
        {image.map((img, index) => (
          <Image
            key={index}
            alt={img.alt}
            className="aspect-[3/2] w-full overflow-hidden rounded-xl object-cover"
            height="200"
            src={img.url ? img.url : "https://placehold.co/600x400/png"}
            width="300"
          />
        ))}
        <div className="space-y-2">
          <h3 className="text-xl font-bold">{filterName(name)}</h3>
          <p className="text-gray-500 dark:text-gray-400">{description}</p>
          <div className="flex gap-2 items-center">{renderTechList(tech)}</div>
          <div className="flex gap-2">
            {url && (
              <Link
                className="inline-flex h-9 items-center justify-center rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
                target="_blank"
                rel="noopener noreferrer"
                href={url}
              >
                Live Demo
              </Link>
            )}
            <Link
              className="inline-flex h-9 items-center justify-center rounded-md border  border-gray-200 bg-white px-4 py-2 text-sm font-medium shadow-sm transition-colors hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50  dark:border-gray-800 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus-visible:ring-gray-300"
              target="_blank"
              rel="noopener noreferrer"
              href={githubUrl}
            >
              Source Code
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
