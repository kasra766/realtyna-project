import { useState } from "react";
import { toast } from "sonner";

import { useUserInfo, useUserInfoAction } from "@/store/user-info-context";

import { deleteUsers, fetchUsers } from "@/services/api";

export function useDeleteModal() {
  const [open, setOpen] = useState(false);
  const { dispatch, setRowSelection } = useUserInfoAction();
  const { rowSelection, users } = useUserInfo();
  const [loading, setLoading] = useState(false);

  async function submit() {
    const listOfId = Object.keys(rowSelection).reduce((prev, cur) => {
      const id = users[Number(cur)].id;
      prev.push(id);
      return prev;
    }, [] as string[]);

    try {
      setLoading(true);
      const resJson = await deleteUsers(JSON.stringify({ ids: listOfId }));
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
    console.log(listOfId);
    setOpen(false);
  }

  return {
    submit,
    open,
    loading,
    setOpen,
  };
}
