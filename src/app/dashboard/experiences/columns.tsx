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
import { toast } from "@/components/ui/use-toast";
import { useAction } from "next-safe-action/hooks";

import Link from "next/link";
import { InferSelectModel } from "drizzle-orm";
import { experiences } from "@/server/db/schema";
import { deleteExperienceAction } from "@/server/actions/experience-action";

export type Experiences = InferSelectModel<typeof experiences>;

export const columns: ColumnDef<Experiences>[] = [
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
        <p className="line-clamp-2 max-w-sm">
          {row.getValue<string>("description")}
        </p>
      );
    },
  },
  {
    accessorKey: "company",
    header: () => {
      return <p className="hidden xl:block">Company</p>;
    },
  },
  {
    accessorKey: "type",
    header: () => {
      return <p className="hidden xl:block">Type</p>;
    },
  },
  {
    accessorKey: "date",
    header: () => {
      return <p className="hidden xl:block">Date</p>;
    },
    cell: ({ row }) => {
      return (
        <p className="line-clamp-1 hidden xl:block">
          {row.getValue<string>("date")}
        </p>
      );
    },
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
    accessorKey: "action",
    header: "Action",
    cell: ({ row }) => {
      const { execute } = useAction(deleteExperienceAction, {
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
                href={`/dashboard/experiences/${row.original.id}/edit`}
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
