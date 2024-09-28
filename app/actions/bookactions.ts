"use server";

import { auth } from "@/auth";
import { createBookController } from "@/src/interface-adapters/controllers/books/create-book.controller";
import { deleteBookController } from "@/src/interface-adapters/controllers/books/delete-book.controller";
import { redirect } from "next/navigation";

export async function createBook(formData: FormData) {
  const session = await auth();

  const data = Object.fromEntries(formData.entries());
  await createBookController(data, session?.user?.email);
}

export async function deleteBook(id: string) {
  await deleteBookController(id);
  redirect("/book");
}
