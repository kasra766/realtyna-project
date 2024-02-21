import React from "react";
import { toast } from "sonner";

import { addUser, fetchUsers } from "@/services/api";

import type { UserInfo } from "@/services/types";
import { useUserInfo, useUserInfoAction } from "@/store/user-info-context";

export function useAddUser(
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
) {
  const { rowSelection } = useUserInfo();
  const { dispatch, setRowSelection } = useUserInfoAction();
  async function addUserHandler(data: Omit<UserInfo, "id">) {
    try {
      setLoading(true);
      const resJson = await addUser(JSON.stringify(data));
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
      const newRowSelection = Object.entries(rowSelection).reduce(
        (prev, [key]) => {
          prev[Number(key) + 1] = true;
          return prev;
        },
        {} as { [key: number]: boolean },
      );

      setRowSelection(newRowSelection);
      toast.success(res.message);
    } catch (e) {
      toast.error(String(e));
    } finally {
      setLoading(false);
    }
  }

  return addUserHandler;
}
