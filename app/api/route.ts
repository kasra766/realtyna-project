import { data } from "@/constants/data";
import { NextRequest } from "next/server";
import { randomGenerator } from "@/lib/id-generator";

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
  users.add({ id: randomGenerator(), ...data });
  return Response.json({ message: "user added" });
}

export async function PUT(request: NextRequest) {
  const data = await request.json();
  const { id } = data;

  const usersList = Array.from(users);
  const indexOfUser = usersList.findIndex(user => user.id === id);
  if (indexOfUser === -1) {
    return Response.json({ message: "user is not exist" }, { status: 400 });
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

  return Response.json({ message: "user info updated" }, { status: 200 });
}

export async function DELETE(request: NextRequest) {
  const data = await request.json();
  const { id } = data;
  const usersList = Array.from(users);
  const indexOfUser = usersList.findIndex(user => user.id === id);
  if (indexOfUser === -1) {
    return Response.json({ message: "user is not exist" }, { status: 400 });
  }

  usersList.splice(indexOfUser, 1);
  users.clear();
  usersList.forEach(user => {
    users.add(user);
  });

  return Response.json({ message: "user deleted" }, { status: 200 });
}
