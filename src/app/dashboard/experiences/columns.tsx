"use client";

import {
  ArrowDown,
  ArrowUp,
  EllipsisVertical,
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
import type { ColumnDef, Row } from "@tanstack/react-table";
import moment from "moment-timezone";
import { toast } from "@/components/ui/use-toast";
import Link from "next/link";
import { type InferSelectModel } from "drizzle-orm";
import { type experiences } from "@/server/db/schema";
import { api } from "@/trpc/react";

export type Experiences = InferSelectModel<typeof experiences>;

const ActionCell = ({ row }: { row: Row<Experiences> }) => {
  const deleteMutation = api.experience.delete.useMutation({
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Experience deleted successfully",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
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
        <DropdownMenuItem
          onClick={() => deleteMutation.mutate({ id: row.original.id })}
        >
          <Trash className="mr-4 size-4" />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export const columns: ColumnDef<Experiences>[] = [
  {
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="px-0 hover:bg-transparent"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          No
          {column.getIsSorted() === "asc" ? (
            <ArrowDown className="ml-2 size-4" />
          ) : column.getIsSorted() === "desc" ? (
            <ArrowUp className="ml-2 size-4" />
          ) : null}
        </Button>
      );
    },
    accessorKey: "No",
    accessorFn: (_, rowIndex) => rowIndex + 1,
    id: "index",
    sortingFn: "basic",
    cell: (info) => info.getValue(),
  },
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
      return <p>Company</p>;
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
          variant="ghost"
          className="px-0 hover:bg-transparent"
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
          variant="ghost"
          className="px-0 hover:bg-transparent"
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
    cell: ActionCell,
  },
];
