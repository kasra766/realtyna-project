"use client";
import { createContext, useContext } from "react";
import type { StateActions, StateType } from "@/services/types";

export const UserInfoContext = createContext<StateType | null>(null);
export const UserInfoActionContext = createContext<StateActions | null>(null);

export function useUserInfo() {
  const state = useContext(UserInfoContext);
  if (!state) {
    throw new Error("user info state is not valid");
  }
  return state;
}

export function useUserInfoAction() {
  const state = useContext(UserInfoActionContext);
  if (!state) {
    throw new Error("user info action state is not valid");
  }
  return state;
}
