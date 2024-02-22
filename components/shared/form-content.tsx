import React from "react";
import { ReloadIcon } from "@radix-ui/react-icons";

import { Label } from "@/components/ui/label";
import { FormField } from "@/components/shared/text-field";
import {
  AlertDialogCancel,
  AlertDialogFooter,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useHandleForm } from "@/hooks";
import type { UserInfo } from "@/services/types";

interface IProps extends UserInfo {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
export function FormContent(props: IProps) {
  const { setOpen, ...otherField } = props;

  const { loading, submitForm, handleSubmit, control } = useHandleForm({
    setOpen,
    props: otherField,
  });
  return (
    <form onSubmit={handleSubmit(submitForm)}>
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="full_name" className="text-right">
            Full Name
          </Label>
          <FormField
            autoFocus
            id="full_name"
            name="full_name"
            type="text"
            className="col-span-3"
            placeholder="John Doe"
            rules={{
              required: { value: true, message: "This field is required" },
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
              required: { value: true, message: "Email is required" },
              pattern: {
                value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
                message: "Email isn't valid",
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
            placeholder="09189202822"
            rules={{
              required: "Phone number is required",
              pattern: {
                value:
                  /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/g,
                message: "Phone number is not valid",
              },
            }}
            control={control}
          />
        </div>
      </div>
      <AlertDialogFooter>
        <AlertDialogCancel>Cancel</AlertDialogCancel>
        <Button
          type="submit"
          className="first-letter:capitalize"
          disabled={loading}
        >
          {loading ? (
            <>
              <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
              Please wait
            </>
          ) : (
            "Submit"
          )}
        </Button>
      </AlertDialogFooter>
    </form>
  );
}
