"use client";
import React, { useMemo, useReducer, useState } from "react";
import { UserInfoActionContext, UserInfoContext } from "./context.hook";
import { reducer } from "./reducer";
import type { ReducerState } from "@/services/types";

const initialState: ReducerState = {
  users: [],
  selectedUser: [],
};
export function UserInfoProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [rowSelection, setRowSelection] = useState({});

  const actionValue = useMemo(() => ({ dispatch, setRowSelection }), []);
  return (
    <UserInfoContext.Provider value={{ ...state, rowSelection }}>
      <UserInfoActionContext.Provider value={actionValue}>
        {children}
      </UserInfoActionContext.Provider>
    </UserInfoContext.Provider>
  );
}
