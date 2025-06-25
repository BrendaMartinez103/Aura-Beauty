import { prisma } from '@/db/client'
import bcrypt from 'bcryptjs'
import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import { authConfig } from '../config/auth.config'
import z from 'zod'

async function getAdminFromDb(email: string, hashPassword: string) {
  try {
    const admin = await prisma.administrador.findUnique({
      where: { email },
    })
    if (!admin) {
      return null
    }
    const valid = await bcrypt.compare(hashPassword, admin.password)
    if (!valid) {
      return null
    }
    return {
      id: admin.id.toString(),
      email: admin.email,
      rol: 'admin',
    }
  } catch (error) {
    console.log(error)
    throw new Error('Failed to fetch admin.')
  }
}

async function getUserFromDb(email: string, hashPassword: string) {
  try {
    const cliente = await prisma.cliente.findUnique({
      where: { email },
    })
    if (!cliente) {
      return null
    }
    const valid = await bcrypt.compare(hashPassword, cliente.password)
    if (!valid) {
      return null
    }
    return {
      id: cliente.id.toString(),
      email: cliente.email,
      rol: 'cliente',
    }
  } catch (error) {
    console.log(error)
    throw new Error('Failed to fetch user.')
  }
}

export const { auth, handlers, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      authorize: async (credentials) => {
        const parsedCredentials = z
          .object({ email: z.string().email(), contrasena: z.string() })
          .safeParse(credentials)

        if (!parsedCredentials.success) {
          return null
        }
        const { email, contrasena: password } = parsedCredentials.data
        // 🔍 Buscar primero en administrador
        const admin = await getAdminFromDb(email, password)

        if (admin) {
          return admin
        }

        // Si no es administrador, buscar en cliente

        const cliente = await getUserFromDb(email, password)
        if (!cliente) {
          return null
        }

        return cliente
      },
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === 'development',
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
    },
  },
})
