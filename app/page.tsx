"use client";
import React, { useMemo } from "react";
import { PlusIcon, Pencil1Icon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import { ModalForAddOrUpdateUserInfo, DataTable } from "@/components/shared";
import { useUserInfo } from "@/store/user-info-context/context.hook";
export default function Home() {
  const { rowSelection, users } = useUserInfo();
  const isSelectUser = Object.keys(rowSelection).length === 1;
  const user = useMemo(() => {
    if (isSelectUser) {
      const index = Object.keys(rowSelection)[0];
      return users[Number(index)];
    }
  }, [isSelectUser, rowSelection, users]);

  const activeEdit = isSelectUser && user;
  return (
    <main className="flex h-full flex-col items-start justify-start p-24">
      <div className="flex gap-2">
        <ModalForAddOrUpdateUserInfo>
          <Button variant="outline" className="gap-2">
            <PlusIcon />
            Add User
          </Button>
        </ModalForAddOrUpdateUserInfo>

        <ModalForAddOrUpdateUserInfo
          {...user}
          key={user as unknown as React.Key}
        >
          <Button variant="outline" className="gap-2" disabled={!activeEdit}>
            <Pencil1Icon />
            Edit User
          </Button>
        </ModalForAddOrUpdateUserInfo>
      </div>

      <DataTable />
    </main>
  );
}
