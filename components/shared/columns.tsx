import * as React from "react";
import { ColumnDef } from "@tanstack/react-table";
import { CaretSortIcon } from "@radix-ui/react-icons";

import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";

import type { UserInfo } from "@/services/types";

export const columns: ColumnDef<UserInfo>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={value => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={value => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "full_name",
    header: "Full Name",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("full_name")}</div>
    ),
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <div className="lowercase">{row.getValue("email")}</div>,
  },
  {
    accessorKey: "phone",
    header: () => <div className="text-right">Phone</div>,
    cell: ({ row }) => (
      <div className="text-right font-medium">{row.getValue("phone")}</div>
    ),
  },
];
