"use client";

import React from "react";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { type Projects } from "@/types/project";
import { useAction } from "next-safe-action/hooks";
import { incrementProjectView } from "@/server/actions/project-view-action";
import { FolderGit } from "lucide-react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

export default function ProjectCard({
  id,
  description,
  name,
  url,
  github_url,
  tech,
  image_url,
  projectView,
}: Projects) {
  const searchParams = useSearchParams();
  const { execute } = useAction(incrementProjectView);

  function renderTechList(tech: string[]) {
    return tech.map((t, index) => (
      <div
        className="flex flex-wrap items-center gap-2 text-sm text-gray-500 dark:text-gray-400"
        key={index}
      >
        <span className="dark:text-gray-40 text-gray-500">
          {t}
          {index !== tech.length - 1 && ","}
        </span>
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

  function renenderImage() {
    if (image_url) {
      const params = new URLSearchParams(searchParams);
      params.set("image", image_url);

      return (
        <Link href={`/projects/${id}/img?${params.toString()}`}>
          <Image
            alt={name}
            className="aspect-[3/2] w-full overflow-hidden rounded-xl object-cover hover:cursor-pointer"
            height="200"
            src={image_url ? image_url : "/images/loader.png"}
            width="300"
          />
        </Link>
      );
    } else {
      return (
        <div className="flex aspect-[3/2] w-full flex-col items-center justify-center overflow-hidden rounded-xl bg-gray-100 dark:bg-gray-800">
          <FolderGit className="m-auto h-20 w-20" />
        </div>
      );
    }
  }

  return (
    <Card className="flex max-h-[600px] flex-col justify-between">
      <CardHeader className="flex flex-col gap-4">
        {renenderImage()}
        <CardTitle>{filterName(name)}</CardTitle>
      </CardHeader>
      <CardContent className="mt-4 flex flex-col items-start gap-4">
        <p className="line-clamp-4 text-gray-500 dark:text-gray-400">
          {description}
        </p>
      </CardContent>
      <CardFooter className="flex flex-col items-start justify-start gap-4">
        <div className="flex flex-wrap items-center gap-2">
          {renderTechList(tech)}
        </div>
        <div className="flex gap-2">
          {url && (
            <a
              className="inline-flex h-9 items-center justify-center rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-gray-50 shadow transition-colors hover:cursor-pointer hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
              target="_blank"
              rel="noopener noreferrer"
              href={url}
              onClick={() => {
                execute({ id });
              }}
            >
              Website
            </a>
          )}
          {github_url && (
            <a
              className="inline-flex h-9 items-center justify-center rounded-md border border-gray-200 bg-white px-4 py-2 text-sm font-medium shadow-sm transition-colors hover:cursor-pointer hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:border-gray-800 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus-visible:ring-gray-300"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => {
                execute({ id });
                window.open(github_url ?? "", "_blank");
              }}
            >
              Source Code
            </a>
          )}
        </div>
        <div className="flex w-full justify-between">
          <Link
            className="self-end border-b border-gray-500 text-sm text-gray-500 hover:border-gray-900 hover:text-gray-900 dark:border-gray-400 dark:text-gray-400"
            href={`/projects/${id}`}
          >
            Details
          </Link>
          <p className="self-end text-sm text-gray-500 dark:text-gray-400">
            {projectView.count} views
          </p>
        </div>
      </CardFooter>
    </Card>
  );
}
