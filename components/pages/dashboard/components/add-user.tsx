import React from "react";
import { PlusIcon } from "@radix-ui/react-icons";
import { ModalForAddOrUpdateUserInfo } from "@/components/shared";
import { Button } from "@/components/ui/button";

export function AddUser() {
  return (
    <ModalForAddOrUpdateUserInfo>
      <Button variant="outline" className="gap-2">
        <PlusIcon />
        Add User
      </Button>
    </ModalForAddOrUpdateUserInfo>
  );
}
