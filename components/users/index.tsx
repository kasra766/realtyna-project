import React from "react";
import { DataTable } from "@/components/shared";
import { AddUser } from "./add-user";
import { EditUser } from "./edit-user";
import { DeleteUser } from "./delete-user";

export function Users() {
  return (
    <>
      <div className="flex gap-2">
        <AddUser />
        <EditUser />
        <DeleteUser />
      </div>
      <DataTable />
    </>
  );
}
