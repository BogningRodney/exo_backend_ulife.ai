import prisma from "@/lib/prisma";
import { deleteBookUseCase } from "@/src/application/use-cases/books/delete-book.use-case";

export async function deleteBookController(id: string) {
  const idBook = await prisma.book;
  await deleteBookUseCase(idBook);
}
