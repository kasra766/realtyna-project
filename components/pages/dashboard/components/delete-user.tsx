"use client";
import React from "react";
import { TrashIcon } from "@radix-ui/react-icons";

import { DialogForDelete } from "@/components/shared";
import { Button } from "@/components/ui/button";

import { useUserInfo } from "@/store/user-info-context";

export function DeleteUser() {
  const { rowSelection } = useUserInfo();

  const activeDelete = Object.keys(rowSelection).length > 0;

  return (
    <DialogForDelete>
      <Button variant="outline" disabled={!activeDelete}>
        <TrashIcon />
      </Button>
    </DialogForDelete>
  );
}
