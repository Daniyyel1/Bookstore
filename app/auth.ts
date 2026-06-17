import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { User } from "./model/user-model";
import bcrypt from "bcryptjs";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  secret: process.env.AUTH_SECRET,
  session: {
    strategy: "jwt",
  },
    callbacks: {
  session({ session, token }) {
    session.user.id = token.sub ?? '';  // 
    return session;
  }
},

  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,

      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),

    GitHub({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,

      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),

    Credentials({
      async authorize(credentials) {
        if (credentials === null) return null;

        const email = credentials?.email as string;
        const password = credentials?.password as string;

        try {
          const user = await User.findOne({email: email});
          if (user) {
            const isMatch  = await bcrypt.compare(password, user.password)
            if (isMatch) {
              return user;
            } else {
              throw new Error("check your password");
            }
          } else {
            throw new Error("user not found");
          }
        } catch (error) {
          throw new Error(
            error instanceof Error ? error.message : "Authorization failed",
          );
        }
      },
    }),

    // auth.ts

  ],
});
