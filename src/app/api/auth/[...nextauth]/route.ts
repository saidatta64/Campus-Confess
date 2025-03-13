import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import AppleProvider from "next-auth/providers/apple";
import { NextAuthOptions } from "next-auth";

export const  authOptions : NextAuthOptions ={
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    AppleProvider({
      clientId : process.env.APPLE_ID!,
      clientSecret : process.env.APPLE_SECRET!,
    }),
   ],
   pages : {
      signIn : './auth/signin',
      signOut : './auth/signout',
      error : './auth/error'
   },
   callbacks : {
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub!;
      }
      return session;
    },
    async jwt({token ,user}){
      if(user) token.sub  = user.id
      return token;
      }
   },
   session : {strategy: "jwt"},
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export {handler as GET,handler as POST};