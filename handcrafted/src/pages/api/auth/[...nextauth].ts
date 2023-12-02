import NextAuth from "next-auth";
//@ts-ignore
import Providers from "next-auth/providers";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

export default NextAuth({
  providers: [
    Providers.Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    Providers.GitHub({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    Providers.Auth0({
      clientId: process.env.AUTH0_CLIENT_ID,
      clientSecret: process.env.AUTH0_CLIENT_SECRET,
      domain: process.env.AUTH0_DOMAIN,
    }),
    Providers.Credentials({
        name: 'Credentials',
        credentials: {
          username: { label: 'Username', type: 'text', placeholder: 'jsmith' },
          password: { label: 'Password', type: 'password' },
        },
        async authorize(credentials: any, req: Response) {
          try {
            // Your custom logic to validate credentials and retrieve user data
            const res = await fetch("/your/endpoint", {
              method: 'POST',
              body: JSON.stringify(credentials),
              headers: { "Content-Type": "application/json" },
            });
    
            const user = await res.json();
    
            // If no error and we have user data, return it
            if (res.ok && user) {
              return Promise.resolve(user);
            }
    
            // Return null if user data could not be retrieved
            return Promise.resolve(null);
          } catch (error) {
            // Handle any errors during the authorization process
            console.error('Authentication error:', error);
            return Promise.resolve(null);
          }
        },
      }),
  ],
  adapter: PrismaAdapter(prisma),
});
