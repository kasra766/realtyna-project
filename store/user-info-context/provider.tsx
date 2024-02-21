"use client";
import React, { useMemo, useReducer } from "react";
import { UserInfoActionContext, UserInfoContext } from "./context.hook";
import { reducer } from "./reducer";
import type { StateType } from "@/services/types";

const initialState: StateType = {
  users: [],
  selectedUser: [],
  rowSelection: {},
};
export function UserInfoProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [rowSelection, setRowSelection] = React.useState({});

  const actionValue = useMemo(() => ({ dispatch, setRowSelection }), []);
  return (
    <UserInfoContext.Provider value={{ ...state, rowSelection }}>
      <UserInfoActionContext.Provider value={actionValue}>
        {children}
      </UserInfoActionContext.Provider>
    </UserInfoContext.Provider>
  );
}
