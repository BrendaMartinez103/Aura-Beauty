import { DefaultSession, DefaultUser } from 'next-auth'

declare module 'next-auth' {
  interface Session {
    user: {
      id: string
      email: string
      rol: string
    } & DefaultSession['user']
  }

  interface User extends DefaultUser {
    id: string
    email: string
    rol: string
  }
}

declare module '@auth/core/jwt' {
  interface JWT {
    id: string
    email: string
    rol: string
  }
}
