import React, { useState } from "react";
import { useForm } from "react-hook-form";

import { useAddUser } from "./useAddUser";
import { useUpdateUser } from "./useUpdateUser";
import type { UserInfo } from "@/services/types";

interface argType {
  props: UserInfo;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
type DataType = Omit<UserInfo, "id">;
export function useHandleForm(parameters: argType) {
  const { setOpen, props } = parameters;
  const { id, ...otherField } = props;
  const [loading, setLoading] = useState(false);
  const { reset, control, handleSubmit } = useForm<Omit<UserInfo, "id">>({
    defaultValues: {
      ...otherField,
    },
  });
  const addUserHandler = useAddUser(setLoading);
  const updateUserHandler = useUpdateUser(setLoading);
  async function submitForm(data: DataType) {
    console.log(data);

    const dataForApi = Object.entries(data).reduce(
      (prev, cur) => {
        const [key, value] = cur;
        prev[key] = value.trim();
        return prev;
      },
      {} as Record<string, string>,
    );

    if (!id || id === "") {
      await addUserHandler(dataForApi as DataType);
    } else {
      await updateUserHandler(dataForApi as DataType, id);
    }
    reset();
    setOpen(false);
  }

  return {
    loading,
    submitForm,
    control,
    handleSubmit,
  };
}
