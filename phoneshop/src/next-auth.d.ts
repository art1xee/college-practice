import { UserRole } from "@prisma/client";
import NextAuth, { DefaultSession } from "next-auth";

export type ExtenededUser = DefaultSession["user"] & {
    role: UserRole;
};

declare module "next-auth" {
    interface Session{
        user: ExtenededUser;
    }
}
