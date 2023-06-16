import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { addBookMarks, removeBookMark } from "@/service/user";
import { withSessionUser } from "@/util/session";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest) {
  return withSessionUser(async (user) => {
    const { id, bookmark } = await req.json();

    if (!id || bookmark == null) {
      return new Response("Bad Request", { status: 400 });
    }

    const request = bookmark ? addBookMarks : removeBookMark;
    return request(user.id, id) //
      .then((res) => NextResponse.json(res))
      .catch((error) => new Response(JSON.parse(error), { status: 500 }));
  });
}
