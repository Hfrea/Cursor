import NextAuth, { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: (DefaultSession["user"] & { id?: string; role?: "OWNER" | "CUSTOMER" }) | null;
  }

  interface User extends DefaultUser {
    role?: "OWNER" | "CUSTOMER";
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role?: "OWNER" | "CUSTOMER";
  }
}
