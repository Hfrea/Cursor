import type { NextAuthOptions, User } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { z } from "zod";
import bcrypt from "bcrypt";
import { prisma } from "@/lib/prisma";

const credentialsSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials): Promise<User | null> => {
        const parsed = credentialsSchema.safeParse(credentials);
        if (!parsed.success) return null;
        const { email, password } = parsed.data;
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user || !user.passwordHash) return null;
        const valid = await bcrypt.compare(password, user.passwordHash);
        if (!valid) return null;
        return { id: user.id, email: user.email, name: user.name, image: user.image, role: user.role } as User;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user && typeof (user as unknown as { role?: string }).role === "string") {
        (token as unknown as { role?: string }).role = (user as unknown as { role?: string }).role;
      }
      return token;
    },
    async session({ session, token }) {
      type AnyObj = Record<string, unknown>;
      if (session.user && typeof (token as AnyObj).role === "string") {
        (session.user as AnyObj).role = (token as AnyObj).role;
      }
      return session;
    },
  },
};
