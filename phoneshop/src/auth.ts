import NextAuth, { DefaultSession } from "next-auth";
import { UserRole } from "@prisma/client";
import { PrismaAdapter } from "@auth/prisma-adapter";

import { getUserByID }  from "../data/user";
import { db } from "./lib/db";
import authConfig from "./auth.config";
import { Session } from "inspector/promises";
import { getAccountByUserId } from "../data/account";

export const {
    handlers: { GET, POST },
    auth, 
    signIn,
    signOut,
} = NextAuth({
    pages: {
        signIn: "/login",
        error: "/error"
    },
    events: {
        async linkAccount({user}){
            await db.user.update({
            where: {id: user.id},
            data: { emailVerified: new Date()}
            })
        }
    },
    callbacks: {
        async signIn({ user, account }) {
            // Allow OAuth without email Verification
            if (account?.provider !== "credentials") return true; 
            
            if (!user.id) {
                console.error("User ID is undefined");
                return false;
            }
            const existingUser = await getUserByID(user.id); // В инете посмотрел решение вроже user.id!, но я не уверен
        
            if (!existingUser?.emailVerified) return false;
            // TODO: Add 2FA check
            return true;
        },
        async session({ token, session }) {
            if (token.sub && session.user){
                session.user.id = token.sub;
            }
            if (token.role && session.user && token.number) {
                session.user.role = token.role as UserRole;
                session.user.number = token.number as string;
            }
            if (token.role && session.user) {
                session.user.role = token.role as UserRole;
            }
            if (session.user) {
                session.user.name = token.name;
                session.user.email = token.email ?? session.user.email; 
                session.user.isOAuth = token.isOAuth as boolean;
            }
            return session;
        },
        async jwt ({ token }) { 
            if (!token.sub) return token;
            const existingUser = await getUserByID(token.sub)
            if (!existingUser) return token;

            const existingAccount = await getAccountByUserId(
                existingUser.id
            );

            token.isOAuth = !!existingAccount;
            token.name = existingUser.name;
            token.email = existingUser.email;
            token.role = existingUser.role;
            token.number = existingUser.number;
            
            return token;
        }

    },
    adapter: PrismaAdapter(db),
    session: { strategy: "jwt" },
    ...authConfig,
});
