import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getUserByUserName } from "@/service/user";
import { withSessionUser } from "@/util/session";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET() {
  return withSessionUser(async (user) =>
    getUserByUserName(user.username) //
      .then((data) => NextResponse.json(data))
  );
}
