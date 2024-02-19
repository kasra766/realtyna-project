"use client";
import React, { useReducer } from "react";
import { UserInfoActionContext, UserInfoContext } from "./context.hook";
import { reducer } from "./reducer";
import type { StateType } from "@/services/types";
import { data } from "@/constants/data";

const initialState: StateType = {
  users: data,
  selectedUser: [],
  rowSelection: {},
};
export function UserInfoProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [rowSelection, setRowSelection] = React.useState({});

  return (
    <UserInfoContext.Provider value={{ ...state, rowSelection }}>
      <UserInfoActionContext.Provider value={{ dispatch, setRowSelection }}>
        {children}
      </UserInfoActionContext.Provider>
    </UserInfoContext.Provider>
  );
}
