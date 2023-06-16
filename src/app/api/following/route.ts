import { AuthUser } from "@/model/user";
import { addFollowing, removeFollowing } from "@/service/user";
import { withSessionUser } from "@/util/session";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest) {
  return withSessionUser(async (user: AuthUser) => {
    const { id: targetId, following } = await req.json();

    if (!targetId || following === undefined) {
      return new Response("Bad Request", { status: 400 });
    }

    const request = following ? addFollowing : removeFollowing;
    return request(user.id, targetId) //
      .then((res) => NextResponse.json(res))
      .catch((error) => new Response(JSON.parse(error), { status: 500 }));
  });
}
