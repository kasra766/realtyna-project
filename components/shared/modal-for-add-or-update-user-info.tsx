"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { FormField } from "@/components/shared/text-field";
import { useForm } from "react-hook-form";
import type { UserInfo } from "@/services/types";
import { useUserInfoAction } from "@/store/user-info-context/context.hook";

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
  const { dispatch } = useUserInfoAction();
  const [open, setOpen] = useState(false);
  const { control, handleSubmit } = useForm<Omit<UserInfo, "id">>({
    defaultValues: {
      phone,
      email,
      full_name,
    },
  });

  function submitForm(data: Omit<UserInfo, "id">) {
    console.table({ ...data, id });
    if (!id) {
      dispatch({ type: "addUser", payload: { ...data, id: "hello" } });
    }
    setOpen(false);
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="first-letter:capitalize">
            {id ? "edit user info" : "add user"}
          </DialogTitle>
        </DialogHeader>
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
          <DialogFooter>
            <Button type="submit" className="first-letter:capitalize">
              submit
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
