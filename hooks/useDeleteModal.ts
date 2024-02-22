import React, { useState } from "react";
import { toast } from "sonner";

import { useUserInfo, useUserInfoAction } from "@/store/user-info-context";

import { deleteUsers, fetchUsers } from "@/services/api";

export function useDeleteModal() {
  const { dispatch, setRowSelection } = useUserInfoAction();
  const { rowSelection, users } = useUserInfo();
  const [loading, setLoading] = useState(false);

  async function submit(
    setOpen: React.Dispatch<React.SetStateAction<boolean>>,
  ) {
    const listOfEmail = Object.keys(rowSelection).reduce((prev, cur) => {
      const email = users[Number(cur)].email;
      prev.push(email);
      return prev;
    }, [] as string[]);

    try {
      setLoading(true);
      const resJson = await deleteUsers(
        JSON.stringify({ emails: listOfEmail }),
      );
      const res = await resJson.json();
      if (resJson.status !== 200) {
        throw new Error(res.message);
      }
      const fetchUsersInfo = await fetchUsers();
      const parseUsersInfo = await fetchUsersInfo.json();

      dispatch({
        type: "setUsers",
        payload: parseUsersInfo.data.usersInfo,
      });
      setRowSelection({});
      toast.success(res.message);
    } catch (e) {
      toast.error(String(e));
    } finally {
      setLoading(false);
    }

    setOpen(false);
  }

  return {
    submit,
    loading,
  };
}
