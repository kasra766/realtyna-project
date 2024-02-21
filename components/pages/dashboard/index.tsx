"use client";
import React, { useMemo } from "react";
import { Pencil1Icon, PlusIcon, TrashIcon } from "@radix-ui/react-icons";

import {
  DataTable,
  DialogForDelete,
  ModalForAddOrUpdateUserInfo,
} from "@/components/shared";
import { Button } from "@/components/ui/button";

import { useUserInfo } from "@/store/user-info-context/context.hook";
import { useFetchUsers } from "@/hooks/useFetchUsers";

export function Dashboard() {
  const { rowSelection, users } = useUserInfo();
  const isSelectUser = Object.keys(rowSelection).length === 1;
  const user = useMemo(() => {
    if (isSelectUser) {
      const index = Object.keys(rowSelection)[0];
      return users[Number(index)];
    }
  }, [isSelectUser, rowSelection, users]);

  const activeEdit = isSelectUser && user;
  const activeDelete = Object.keys(rowSelection).length > 0;

  useFetchUsers();
  return (
    <>
      <div className="flex gap-2">
        <ModalForAddOrUpdateUserInfo>
          <Button variant="outline" className="gap-2">
            <PlusIcon />
            Add User
          </Button>
        </ModalForAddOrUpdateUserInfo>

        <ModalForAddOrUpdateUserInfo {...user} key={user?.email}>
          <Button variant="outline" className="gap-2" disabled={!activeEdit}>
            <Pencil1Icon />
            Edit User
          </Button>
        </ModalForAddOrUpdateUserInfo>
        <DialogForDelete>
          <Button variant="outline" disabled={!activeDelete}>
            <TrashIcon />
          </Button>
        </DialogForDelete>
      </div>

      <DataTable />
    </>
  );
}
