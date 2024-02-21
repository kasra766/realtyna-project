"use client";
import React, { useState } from "react";

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { FormContent } from "./form-content";
import type { UserInfo } from "@/services/types";

interface IProps extends Partial<UserInfo> {
  children: React.ReactNode;
}
export function ModalForAddOrUpdateUserInfo({
  children,
  id,
  full_name = "",
  phone = "",
  email = "",
}: IProps) {
  const [open, setOpen] = useState(false);

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent className="sm:max-w-[425px]">
        <AlertDialogHeader>
          <AlertDialogTitle className="first-letter:capitalize">
            {id ? "edit user info" : "add user"}
          </AlertDialogTitle>
        </AlertDialogHeader>
        <FormContent
          setOpen={setOpen}
          id={id ?? ""}
          full_name={full_name}
          phone={phone}
          email={email}
        />
      </AlertDialogContent>
    </AlertDialog>
  );
}
