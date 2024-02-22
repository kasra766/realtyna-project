import { NextRequest } from "next/server";
import { randomGenerator } from "@/lib/id-generator";
import { dataMap, emailsList } from "@/constants/data";
import type { UserInfo } from "@/services/types";

const usersMap: Map<string, UserInfo> = new Map(Object.entries(dataMap));
const usersEmails: Set<string> = new Set(emailsList);
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

  const isUserExist = usersEmails.has(data.email);
  if (isUserExist) {
    return Response.json(
      { message: "Another user already exists with this email address" },
      { status: 400 },
    );
  }

  usersEmails.add(data.email);
  const idForNewUser = randomGenerator();
  usersMap.set(idForNewUser, { id: idForNewUser, ...data });
  return Response.json({ message: "User Added" });
}

export async function PUT(request: NextRequest) {
  const data = await request.json();

  const isUserExist = usersMap.has(data.id);

  if (!isUserExist) {
    return Response.json({ message: "User is not exist" }, { status: 400 });
  }

  const oldInfo = usersMap.get(data.id);
  if (oldInfo) {
    usersEmails.delete(oldInfo.email);
    usersEmails.add(data.email);
  }

  usersMap.set(data.id, data);
  return Response.json({ message: "User info updated" }, { status: 200 });
}

export async function DELETE(request: NextRequest) {
  const data = await request.json();
  const ids: string[] = data.ids;

  const error = ids.some(id => {
    if (usersMap.has(id)) {
      const info = usersMap.get(id);
      if (info) {
        usersEmails.delete(info.email);
      }
      usersMap.delete(id);
      return false;
    } else {
      return true;
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
