import NextAuth, { DefaultSession } from "next-auth";
import { UserRole } from "@prisma/client";
import { PrismaAdapter } from "@auth/prisma-adapter";

import { getUserByID }  from "../data/user";
import { db } from "./lib/db";
import authConfig from "./auth.config";
import { Session } from "inspector/promises";

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
            
            const existingUser = await getUserByID(user.id); // В инете посмотрел решение вроже user.id!, но я не уверен
        
            if (!existingUser?.emailVerified) return false;
            // TODO: Add 2FA check
            return true;
        },
        async session({ token, session }) {
            if (token.sub && session.user){
                session.user.id = token.sub;
            }
            if (token.role && session.user) {
                session.user.role = token.role as UserRole;
            }
            return session;
        },
        async jwt ({ token }) { 
            if (!token.sub) return token;
            const existingUser = await getUserByID(token.sub)
            if (!existingUser) return token;
            token.role = existingUser.role;
            return token;
        }

    },
    adapter: PrismaAdapter(db),
    session: { strategy: "jwt" },
    ...authConfig,
});
