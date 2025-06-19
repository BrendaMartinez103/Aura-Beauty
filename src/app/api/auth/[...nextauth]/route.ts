import { prisma } from "@/db/client";
import bcrypt from "bcryptjs";
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: {
          label: "Email",
          type: "text",
          placeholder: "Enter your email",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Enter your password",
        },
      },
      async authorize(credentials) {
        if(!credentials?.email || !credentials?.password) {
          return null;
        }

        // 🔍 Buscar primero en administrador
        const admin = await prisma.administrador.findUnique({ where: { email: credentials.email } });
        if (admin) {
          const valid = await bcrypt.compare(credentials.password, admin.password);
          if (!valid) {
            return null;
          }
          return {
            id: admin.id.toString(),
            email: admin.email,
            rol: "admin"
          }
        }

        // Si no es administrador, buscar en cliente

        const cliente = await prisma.cliente.findUnique({ where: { email: credentials.email } });
        if (!cliente) {
          return null
        }

        const valid = await bcrypt.compare(credentials.password, cliente.password);
        if (!valid) {
          return null
        }

        return {
          id: cliente.id.toString(),
          email: cliente.email,
          rol: "cliente",
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === "development",
  callbacks: {
  async jwt({ token, user }) {
    if (user) {
      token.id = user.id
      token.email = user.email
      token.rol = user.rol
    }
    return token
  },
  async session({ session, token }) {
    if (token) {
      session.user.id = token.id
      session.user.rol = token.rol
    }
    return session
  }
}

}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
