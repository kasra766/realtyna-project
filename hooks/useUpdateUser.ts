import React from "react";
import { toast } from "sonner";
import { fetchUsers, updateUser } from "@/services/api";
import type { UserInfo } from "@/services/types";
import { useUserInfoAction } from "@/store/user-info-context";

export function useUpdateUser(
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
) {
  const { dispatch } = useUserInfoAction();

  async function updateUserHandler(data: Omit<UserInfo, "id">, id: string) {
    try {
      setLoading(true);
      const resJson = await updateUser(JSON.stringify({ ...data, id }));
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
      toast.success(res.message);
    } catch (e) {
      toast.error(String(e));
    } finally {
      setLoading(false);
    }
  }

  return updateUserHandler;
}
