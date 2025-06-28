import { prisma } from '@/db/client'
import bcrypt from 'bcryptjs'
import CredentialsProvider from 'next-auth/providers/credentials'
import { z } from 'zod'
import NextAuth from 'next-auth'
import type { NextAuthConfig } from 'next-auth'

export const authOptions: NextAuthConfig = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        contrasena: { label: 'Contraseña', type: 'password' },
      },
      authorize: async (credentials) => {
        const parsed = z.object({
          email: z.string().email(),
          contrasena: z.string()
        }).safeParse(credentials)

        if (!parsed.success) return null

        const { email, contrasena } = parsed.data

        const admin = await prisma.administrador.findUnique({ where: { email } })
        if (admin && await bcrypt.compare(contrasena, admin.password)) {
          return { id: admin.id.toString(), email: admin.email, rol: 'admin' }
        }

        const cliente = await prisma.cliente.findUnique({ where: { email } })
        if (cliente && await bcrypt.compare(contrasena, cliente.password)) {
          return { id: cliente.id.toString(), email: cliente.email, rol: 'cliente' }
        }

        return null
      }
    })
  ],
  session: {
    strategy: 'jwt',
  },
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
      if (token && session.user) {
        session.user.id = token.id as string
        session.user.rol = token.rol as string
      }
      return session
    }
  },
  secret: process.env.NEXTAUTH_SECRET,
}

export const { auth, handlers, signIn, signOut } = NextAuth(authOptions)
