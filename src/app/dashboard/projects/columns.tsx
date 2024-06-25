"use client";

import {
  ArrowDown,
  ArrowUp,
  EllipsisVertical,
  ImageUp,
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

export type Projects = {
  id: string;
  name: string;
  description: string | null;
  tech: string[];
  image_url: string | null;
  github_url: string | null;
  url: string | null;
  created_at: string;
  updated_at: string;
  projectView: ProjectViews;
};

export type ProjectViews = {
  id: string;
  count: number;
  project_id: string;
};

export const columns: ColumnDef<Projects>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "description",
    header: "Description",
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
    header: "Image",
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
          className="ut-button:w-[150px] ut-button:p-4 ut-allowed-content:hidden ut-label:hidden"
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
          className="w-[150px] p-4"
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
      const router = useRouter();

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
            <DropdownMenuItem
              onClick={() => {
                router.push(`/dashboard/projects/${row.original.id}/edit`);
              }}
            >
              <Pencil className="mr-4 size-4" />
              Edit
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
