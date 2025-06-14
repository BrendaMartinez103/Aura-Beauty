// import NextAuth from "next-auth";
// import CredentialsProvider from "next-auth/providers/credentials";
// import { NextAuthOptions } from "next-auth";

// const authOptions: NextAuthOptions = {
//   providers: [
//     CredentialsProvider({
//       name: "Credentials",
//       credentials: {
//         username: { label: "Username", type: "text", placeholder: "Enter your username" },
//         password: { label: "Password", type: "password", placeholder: "Enter your password" },
//       },
//      async authorize(credentials: Record<string, any>) {

//         // Add logic here to look up the user from the credentials supplied
//         const user = { id: 1, name: "User", email: "user@example.com" }; // Example user

//         if (user) {
//           return user;
//         } else {
//           return null;
//         }
//       },
//     }),
//   ],
//   pages: {
//     signIn: '/auth/signin',  // Custom sign-in page
//   },
//   session: {
//     strategy: "jwt",
//   },
//   callbacks: {
//     async jwt({ token, user }) {
//       if (user) {
//         token.id = user.id;
//       }
//       return token;
//     },
//     async session({ session, token }) {
//       if (token) {
//         session.user.id = token.id;
//       }
//       return session;
//     },
//   },
// };

// export default NextAuth(authOptions);