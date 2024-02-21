import { useEffect, useState } from "react";
import { fetchUsers } from "@/services/api";
import { useUserInfoAction } from "@/store/user-info-context";

export function useFetchUsers() {
  const { dispatch } = useUserInfoAction();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;
    const fetchUsersInfo = async () => {
      try {
        setLoading(true);
        const dataJson = await fetchUsers(signal);
        const data = await dataJson.json();
        const usersInfoList = data.data.usersInfo;
        dispatch({ type: "setUsers", payload: usersInfoList });
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };

    fetchUsersInfo();
    return () => controller.abort();
  }, []);

  return loading;
}
