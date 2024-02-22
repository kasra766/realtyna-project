import { NextRequest } from "next/server";
import { randomGenerator } from "@/lib/id-generator";
import { dataMap } from "@/constants/data";
import type { UserInfo } from "@/services/types";

const usersMap: Map<string, UserInfo> = new Map(Object.entries(dataMap));
export async function GET() {
  const usersMapList = Array.from(usersMap.values()).reverse();
  return Response.json({
    data: {
      usersInfo: usersMapList,
    },
  });
}

export async function POST(request: NextRequest) {
  const data = await request.json();

  const isUserExist = usersMap.has(data.email);
  if (isUserExist) {
    return Response.json(
      { message: "Another user already exists with this email address" },
      { status: 400 },
    );
  }

  usersMap.set(data.email, { id: randomGenerator(), ...data });
  return Response.json({ message: "User Added" });
}

export async function PUT(request: NextRequest) {
  const data = await request.json();
  const { email } = data;

  const isUserExist = usersMap.has(email);

  if (!isUserExist) {
    return Response.json({ message: "User is not exist" }, { status: 400 });
  }

  usersMap.set(email, data);
  return Response.json({ message: "User info updated" }, { status: 200 });
}

export async function DELETE(request: NextRequest) {
  const data = await request.json();
  const emails: string[] = data.emails;

  let error = false;
  emails.forEach(email => {
    if (error) return;
    if (usersMap.has(email)) {
      usersMap.delete(email);
    } else {
      error = true;
    }
  });

  if (error) {
    return Response.json(
      { message: "Some users do not exist" },
      { status: 400 },
    );
  }

  return Response.json({ message: "Users Deleted" }, { status: 200 });
}
