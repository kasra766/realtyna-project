import type { ActionType, StateType } from "@/services/types";

export function reducer(state: StateType, action: ActionType) {
  const { payload, type } = action;

  switch (type) {
    case "setUsers": {
      return { ...state, users: payload };
    }
    case "addUser": {
      const { users } = state;
      const newUsers = [payload, ...users];
      return { ...state, users: newUsers };
    }
    case "selectedUser": {
      return { ...state, selectedUser: payload };
    }
    default:
      throw new Error();
  }
}
