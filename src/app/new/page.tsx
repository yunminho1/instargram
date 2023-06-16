import NewPost from "@/components/NewPost";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { Metadata } from "next";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { describe } from "node:test";

export const metadata: Metadata = {
  title: "New post",
  description: "Create new post",
};
export default async function NewPostPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    redirect("/auth/signin");
  }
  return <NewPost user={session.user} />;
}
