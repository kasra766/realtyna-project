import { NextRequest } from "next/server";
import { randomGenerator } from "@/lib/id-generator";
import { data } from "@/constants/data";
import type { UsersAndIds } from "@/services/types";

const users = new Set(data);
export async function GET() {
  const usersList = Array.from(users);
  return Response.json({
    data: {
      usersInfo: usersList,
    },
  });
}

export async function POST(request: NextRequest) {
  const data = await request.json();
  const usersList = Array.from(users);
  const isUserExist = usersList.some(user => user.email === data.email);
  if (isUserExist) {
    return Response.json(
      { message: "Another user is exist with this email" },
      { status: 400 },
    );
  }
  usersList.unshift({ id: randomGenerator(), ...data });
  users.clear();
  usersList.forEach(user => users.add(user));

  return Response.json({ message: "User Added" });
}

export async function PUT(request: NextRequest) {
  const data = await request.json();
  const { id } = data;

  const usersList = Array.from(users);
  const indexOfUser = usersList.findIndex(user => user.id === id);
  if (indexOfUser === -1) {
    return Response.json({ message: "User is not exist" }, { status: 400 });
  }
  const newUsersList = [
    ...usersList.slice(0, indexOfUser),
    data,
    ...usersList.slice(indexOfUser + 1),
  ];

  users.clear();
  newUsersList.forEach(user => {
    users.add(user);
  });

  return Response.json({ message: "User info updated" }, { status: 200 });
}

export async function DELETE(request: NextRequest) {
  const data = await request.json();
  const ids: string[] = data.ids;

  const usersList = Array.from(users);

  const usersThatNotBeDelete = usersList.reduce(
    (prev, cur, index) => {
      if (!ids.includes(cur.id)) {
        prev.remainUsers.push(cur);
      } else {
        prev.foundIds.push(cur.id);
      }
      return prev;
    },
    { remainUsers: [], foundIds: [] } as UsersAndIds,
  );
  const { foundIds, remainUsers } = usersThatNotBeDelete;
  const notFoundIds = ids.reduce((prev, cur) => {
    if (!foundIds.includes(cur)) {
      prev.push(cur);
    }
    return prev;
  }, [] as string[]);
  // const indexOfUser = usersList.findIndex(user => user.id === id);

  if (notFoundIds.length > 0) {
    return Response.json(
      { message: `These users are not exist: ${JSON.stringify(notFoundIds)}` },
      { status: 400 },
    );
  }

  users.clear();
  remainUsers.forEach(user => {
    users.add(user);
  });

  return Response.json({ message: "Users Deleted" }, { status: 200 });
}
