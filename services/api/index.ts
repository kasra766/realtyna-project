export const fetchUsers = (signal?: AbortSignal) => fetch("/api", { signal });
export const addUser = <T extends string>(data: T) =>
  fetch("/api", { method: "POST", body: data });
export const updateUser = <T extends string>(data: T) =>
  fetch("/api", { method: "PUT", body: data });

export const deleteUsers = <T extends string>(data: T) =>
  fetch("/api", { method: "DELETE", body: data });
