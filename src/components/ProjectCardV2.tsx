import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { api } from "@/trpc/react";
import { Globe } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { FaGithub } from "react-icons/fa";

interface ProjectCardProps {
  id: string;
  title: string;
  description: string;
  image: string;
  link: string | null;
  url: string | null;
  views: number;
  tags: string[];
}

export default function ProjectCardV2({
  id,
  title,
  description,
  image,
  link,
  url,
  views,
  tags,
}: ProjectCardProps) {
  const utils = api.useUtils();
  const incrementViewMutation = api.project.incrementView.useMutation({
    onSuccess: async () => {
      await utils.project.list.invalidate();
    },
  });

  return (
    <Card className="overflow-hidden">
      <div className="relative aspect-video">
        <Image
          src={image || "/placeholder.svg"}
          alt={title}
          fill
          className="object-cover transition-transform hover:scale-105"
        />
      </div>
      <CardContent className="p-4">
        <h3 className="mb-2 text-xl font-semibold">{title}</h3>
        <p className="mb-4 text-sm text-muted-foreground">{description}</p>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center rounded-md bg-muted px-2 py-1 text-xs font-medium ring-1 ring-inset ring-gray-500/10"
            >
              {tag}
            </span>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex flex-row justify-between p-4 pt-0">
        <div className="flex items-center gap-2">
          {link && (
            <Link
              href={link}
              target="_blank"
              className="inline-flex items-center gap-2 text-sm hover:underline"
              onClick={() => incrementViewMutation.mutate({ id })}
            >
              <FaGithub className="h-4 w-4" />
              View on GitHub
            </Link>
          )}
          {url && (
            <Link
              href={url}
              target="_blank"
              className="inline-flex items-center gap-2 text-sm hover:underline"
              onClick={() => incrementViewMutation.mutate({ id })}
            >
              <Globe className="h-4 w-4" />
              View Live
            </Link>
          )}
        </div>
        <div className="flex items-center gap-2">
          <p className="text-sm">{views} Views</p>
        </div>
      </CardFooter>
    </Card>
  );
}
