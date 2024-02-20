"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { FormField } from "@/components/shared/text-field";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import {
  useUserInfo,
  useUserInfoAction,
} from "@/store/user-info-context/context.hook";

import { addUser, fetchUsers, updateUser } from "@/services/api";

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
  const { rowSelection } = useUserInfo();
  const { dispatch, setRowSelection } = useUserInfoAction();
  const [open, setOpen] = useState(false);
  const { reset, control, handleSubmit } = useForm<Omit<UserInfo, "id">>({
    defaultValues: {
      phone,
      email,
      full_name,
    },
  });

  async function submitForm(data: Omit<UserInfo, "id">) {
    console.table({ ...data, id });

    if (!id) {
      await addUser(JSON.stringify(data));
      const fetchUsersInfo = await fetchUsers();
      const parseUsersInfo = await fetchUsersInfo.json();

      dispatch({
        type: "setUsers",
        payload: parseUsersInfo.data.usersInfo,
      });
      const newRowSelection = Object.entries(rowSelection).reduce(
        (prev, [key]) => {
          prev[Number(key) + 1] = true;
          return prev;
        },
        {} as { [key: number]: boolean },
      );

      setRowSelection(newRowSelection);
    } else {
      await updateUser(JSON.stringify({ ...data, id }));
      const fetchUsersInfo = await fetchUsers();
      const parseUsersInfo = await fetchUsersInfo.json();
      dispatch({
        type: "setUsers",
        payload: parseUsersInfo.data.usersInfo,
      });
    }
    reset();
    setOpen(false);
  }
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent className="sm:max-w-[425px]">
        <AlertDialogHeader>
          <AlertDialogTitle className="first-letter:capitalize">
            {id ? "edit user info" : "add user"}
          </AlertDialogTitle>
        </AlertDialogHeader>
        <form onSubmit={handleSubmit(submitForm)}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="full_name" className="text-right">
                Full Name
              </Label>
              <FormField
                id="full_name"
                name="full_name"
                type="text"
                className="col-span-3"
                placeholder="John Doe"
                rules={{
                  required: { value: true, message: "this field is required" },
                }}
                control={control}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">
                Email
              </Label>
              <FormField
                id="email"
                name="email"
                type="email"
                className="col-span-3"
                placeholder="yourEmail@yahoo.com"
                rules={{
                  required: { value: true, message: "email is required" },
                  pattern: {
                    value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
                    message: "email isn't valid",
                  },
                }}
                control={control}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="phone" className="text-right">
                Phone
              </Label>
              <FormField
                id="phone"
                name="phone"
                type="tel"
                className="col-span-3"
                placeholder="123-456-7890"
                rules={{
                  required: "phone is number is required",
                  pattern: {
                    value:
                      /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/g,
                    message: "phone number is not valid",
                  },
                }}
                control={control}
              />
            </div>
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <Button type="submit" className="first-letter:capitalize">
              submit
            </Button>
          </AlertDialogFooter>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
}
