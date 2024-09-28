"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { signIn, signOut } from "@/auth";
import prisma from "@/lib/prisma";
import { signUpSchema } from "@/lib/zod";
import { Cookie } from "@/src/entities/models/cookie";
import { signUpController } from "@/src/interface-adapters/controllers/auth/sign-up.controller";
import { AuthError } from "next-auth";

const bcryptjs = require("bcryptjs");

export async function handleCredentialsSignin({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  try {
    await signIn("credentials", { email, password, redirectTo: "/" });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return {
            message: "Invalid credentials",
          };
        default:
          return {
            message: "Something went wrong.",
          };
      }
    }
    throw error;
  }
}

export async function handlesSignOut() {
  await signOut();
}

export async function handleSignUp({
  name,
  email,
  password,
  confirmPassword,
}: {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}) {
  let sessionCookie: Cookie;
  try {
    const { cookie } = await signUpController({
      name,
      email,
      password,
      confirmPassword,
    });
    sessionCookie = cookie;
  } catch (error) {
    console.error("Error creating account:", error);
    return {
      success: false,
      message: "An unexpected error occurred. Please try again.",
    };
  }

  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  );

  redirect("/");
}
