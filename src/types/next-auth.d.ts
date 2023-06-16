import { AuthUser } from "@/model/user";
import Nextauth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: AuthUser;
  }
}
