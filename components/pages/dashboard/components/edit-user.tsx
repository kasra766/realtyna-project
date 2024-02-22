"use client";
import React, { useMemo } from "react";
import { Pencil1Icon } from "@radix-ui/react-icons";

import { ModalForAddOrUpdateUserInfo } from "@/components/shared";
import { Button } from "@/components/ui/button";

import { useUserInfo } from "@/store/user-info-context";

export function EditUser() {
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
    <ModalForAddOrUpdateUserInfo {...user} key={user?.email}>
      <Button variant="outline" className="gap-2" disabled={!activeEdit}>
        <Pencil1Icon />
        Edit User
      </Button>
    </ModalForAddOrUpdateUserInfo>
  );
}
