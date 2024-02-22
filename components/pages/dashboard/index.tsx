import React from "react";
import { DataTable } from "@/components/shared";
import { DeleteUser, EditUser, AddUser } from "./components";

export function Dashboard() {
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
