import { UserRole } from "@prisma/client";
import NextAuth, { DefaultSession } from "next-auth";

export type ExtenededUser = DefaultSession["user"] & {
    role: UserRole;
    isOAuth: boolean;
    number?: string;
    image?: string;
};

declare module "next-auth" {
    interface Session{
        user: ExtenededUser;
    }
}
