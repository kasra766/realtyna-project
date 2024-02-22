import type { ActionType, ReducerState } from "@/services/types";

export function reducer(state: ReducerState, action: ActionType) {
  const { payload, type } = action;

  switch (type) {
    case "setUsers": {
      return { ...state, users: payload };
    }

    case "selectedUser": {
      return { ...state, selectedUser: payload };
    }
    default:
      throw new Error();
  }
}
