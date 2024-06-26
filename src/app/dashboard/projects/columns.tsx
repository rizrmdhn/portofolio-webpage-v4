"use client";

import {
  ArrowDown,
  ArrowUp,
  EllipsisVertical,
  LoaderCircle,
  Pencil,
  Trash,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { ColumnDef } from "@tanstack/react-table";
import moment from "moment";
import { UploadButton } from "@/lib/uploadthing";
import { toast } from "@/components/ui/use-toast";
import { useAction } from "next-safe-action/hooks";
import {
  deleteProjectAction,
  deleteProjectImage,
} from "@/server/actions/project-action";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { InferSelectModel } from "drizzle-orm";
import { projectViews, projects } from "@/server/db/schema";

export type Projects = InferSelectModel<typeof projects> & {
  projectView: InferSelectModel<typeof projectViews>;
};

export const columns: ColumnDef<Projects>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "description",
    header: () => {
      return <p className="hidden xl:block">Description</p>;
    },
    cell: ({ row }) => {
      return (
        <p className="line-clamp-1 hidden max-w-sm xl:block">
          {row.getValue<string>("description")}
        </p>
      );
    },
  },
  {
    accessorKey: "tech",
    header: () => {
      return <p className="hidden xl:block">Tech</p>;
    },
    cell: ({ row }) => {
      // get the first 3 techs
      return (
        <ul className="hidden xl:flex xl:flex-wrap xl:gap-1">
          {row
            .getValue<string[]>("tech")
            .slice(0, 2)
            .map((tech, idx) => (
              <li
                key={idx}
                className="rounded-md border px-2 py-1 dark:border-white"
              >
                {tech}
              </li>
            ))}
        </ul>
      );
    },
  },
  {
    accessorKey: "projectView.count",
    header: "Views",
  },
  {
    accessorKey: "created_at",
    header: ({ column }) => {
      return (
        <Button
          className="hidden xl:block"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Created At
          {column.getIsSorted() === "asc" ? (
            <ArrowDown className="ml-2 size-4" />
          ) : column.getIsSorted() === "desc" ? (
            <ArrowUp className="ml-2 size-4" />
          ) : null}
        </Button>
      );
    },
    cell: ({ row }) => {
      return (
        <p className="hidden xl:block">
          {moment(row.original.created_at)
            .locale("id")
            .format("dddd, DD MMMM YYYY HH:mm")}
        </p>
      );
    },
  },
  {
    accessorKey: "updated_at",
    header: ({ column }) => {
      return (
        <Button
          className="hidden xl:block"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Updated At
          {column.getIsSorted() === "asc" ? (
            <ArrowDown className="ml-2 size-4" />
          ) : column.getIsSorted() === "desc" ? (
            <ArrowUp className="ml-2 size-4" />
          ) : null}
        </Button>
      );
    },
    cell: ({ row }) => {
      return (
        <p className="hidden xl:block">
          {moment(row.original.updated_at)
            .locale("id")
            .format("dddd, DD MMMM YYYY HH:mm")}
        </p>
      );
    },
  },
  {
    accessorKey: "image_url",
    header: () => {
      return <p className="hidden xl:block">Image</p>;
    },
    cell: ({ row }) => {
      const router = useRouter();

      const { execute, isExecuting } = useAction(deleteProjectImage, {
        onSuccess(args) {
          if (args.data?.status === "success") {
            toast({
              title: "Success",
              description: args.data?.message,
            });
          }
        },
        onError(args) {
          toast({
            title: "Error",
            description: args.error.serverError,
            variant: "destructive",
          });
        },
      });

      return row.original.image_url === null ? (
        <UploadButton
          input={{
            projectId: row.original.id,
          }}
          className="hidden ut-button:w-[150px] ut-button:p-4 ut-allowed-content:hidden ut-label:hidden xl:block"
          endpoint="imageUploader"
          onClientUploadComplete={() => {
            // Do something with the response
            toast({
              title: "Success",
              description: "Upload Completed",
            });

            router.refresh();
          }}
          onUploadError={(error: Error) => {
            toast({
              title: "Error",
              description: error.message,
            });
          }}
        />
      ) : (
        <Button
          disabled={isExecuting}
          className="hidden w-[150px] p-4 xl:block"
          onClick={() => {
            execute({ id: row.original.id });
          }}
        >
          {isExecuting ? (
            <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
          ) : null}
          Delete
        </Button>
      );
    },
  },
  {
    accessorKey: "action",
    header: "Action",
    cell: ({ row }) => {
      const { execute, isExecuting } = useAction(deleteProjectAction, {
        onSuccess(args) {
          if (args.data?.status === "success") {
            toast({
              title: "Success",
              description: args.data?.message,
            });
          }
        },
        onError(args) {
          toast({
            title: "Error",
            description: args.error.serverError,
            variant: "destructive",
          });
        },
      });

      return (
        <DropdownMenu>
          <DropdownMenuTrigger>
            <EllipsisVertical className="size-4 text-black dark:text-white" />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem asChild>
              <Link
                href={`/dashboard/projects/${row.original.id}/edit`}
                className="flex flex-row"
              >
                <Pencil className="mr-4 size-4" />
                Edit
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => execute({ id: row.original.id })}>
              <Trash className="mr-4 size-4" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
