import NextAuth from "next-auth";
import credentials from "next-auth/providers/credentials";
import { signInSchema } from "./lib/zod";
import prisma from "./lib/prisma";

const bcryptjs = require("bcryptjs")

const publicRoutes = ["/auth/signin", "/auth/signup"];
const authRoutes = ["/auth/signin", "/auth/signup"];


export const { handlers, signIn, signOut, auth} = NextAuth({
    providers: [

        credentials({

            credentials: {
                email: { label: "Email", type: "email", placeholder: "Email" },
                password: { label: "Password", type: "password", placeholder: "Password" },
            },

            async authorize(credentials) {
                
                let user = null

                // validate credentials

                const parsedCredentials = signInSchema.safeParse(credentials)

                if(!parsedCredentials.success) {

                    console.log("Invalid credentials: ", parsedCredentials.error.errors)

                    return null
                    
                }

                // get user

                user = await prisma.user.findUnique({

                    where: {

                        email: credentials.email as string
                    }
                })

                if(!user){

                    console.log("Invalid credentials")

                    return null
                }

                if(!user.password){

                    console.log("User has no password")

                    return null
                }

                const isPasswordValid = await bcryptjs.compare(credentials.password as string, user.password)

                if(!isPasswordValid) {

                    console.log("Invalid password")

                    return null
                }

                const { password, ...userWithoutPassword } = user
                
                return userWithoutPassword
            }
        })
    ],

    callbacks:{
        authorized({ request: { nextUrl }, auth }) {
            const isLoggedIn = !!auth?.user;
            const { pathname } = nextUrl;

            // Allow access to public routes for all users
            if (publicRoutes.includes(pathname)) {
                return true;
            }

            // Redirect logged-in users away from auth routes
            if (authRoutes.includes(pathname)) {
                if (isLoggedIn) {
                    return Response.redirect(new URL('/', nextUrl));
                }
                return true; // Allow access to auth pages if not logged in
            }

            // Allow access if the user is authenticated
            return isLoggedIn;
        }
    },

    pages: {
        signIn: "/auth/signin"
    }
})