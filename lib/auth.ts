import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { getDb } from "./mongodb";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        console.log("[Login] authorize called");
        console.log("[Login] Credentials provided:", { 
          email: credentials?.email, 
          hasPassword: !!credentials?.password 
        });

        if (!credentials?.email || !credentials?.password) {
          console.log("[Login] Missing email or password");
          throw new Error("Please enter email and password");
        }

        console.log("[Login] Attempting to connect to MongoDB...");
        const db = await getDb();
        console.log("[Login] MongoDB connected, looking up user...");
        
        const user = await db.collection("users").findOne({ 
          email: credentials.email.toLowerCase() 
        });

        if (!user) {
          console.log("[Login] User not found:", credentials.email);
          throw new Error("No user found with this email");
        }

        console.log("[Login] User found, verifying password...");
        const isValidPassword = await bcrypt.compare(
          credentials.password,
          user.passwordHash
        );

        if (!isValidPassword) {
          console.log("[Login] Invalid password for:", credentials.email);
          throw new Error("Invalid password");
        }

        console.log("[Login] Authentication successful for:", credentials.email);
        return {
          id: user._id.toString(),
          email: user.email,
          name: user.name || user.email.split("@")[0],
        };
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  pages: {
    signIn: "/login",
    error: "/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).id = token.id;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};
