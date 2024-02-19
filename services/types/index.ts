import React from "react";

type UserInfoKey = "id" | "full_name" | "email" | "phone";
export type UserInfo = Record<UserInfoKey, string>;

export type SelectedUser = { [key: number]: boolean };
export interface StateType {
  users: UserInfo[];
  selectedUser: SelectedUser;
  rowSelection: {};
}

export interface StateActions {
  dispatch: React.Dispatch<ActionType>;
  setRowSelection: React.Dispatch<React.SetStateAction<{}>>;
}
export type ActionType =
  | { type: "setUsers"; payload: StateType["users"] }
  | { type: "selectedUser"; payload: StateType["selectedUser"] }
  | { type: "addUser"; payload: StateType["users"][number] };
