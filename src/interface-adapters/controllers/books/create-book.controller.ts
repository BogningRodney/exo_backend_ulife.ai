import { z } from "zod";

import { getInjection } from "@/di/container";
import { createBookUseCase } from "@/src/application/use-cases/books/create-book.use-case";
import { UnauthenticatedError } from "@/src/entities/errors/auth";
import { InputParseError } from "@/src/entities/errors/common";
import { Book, BookInsert } from "@/src/entities/models/book";
import prisma from "@/lib/prisma";

function presenter(book: Book) {
  return {
    id: book.id,
    author: book.author,
    title: book.title,
    genre: book.genre,
  };
}

const inputSchema = z.object({
  title: z.string(),
  genre: z.string(),
  author: z.string().nullable(),
});

export async function createBookController(
  input:
    | {
        title: string;
        genre: string;
        author: string | null;
      }
    | undefined,
  userEmail: string
): Promise<ReturnType<typeof presenter>> {
  const userId = prisma.user.findFirst({
    where: { email: userEmail },
    select: {
      id: true,
    },
  });

  const { data, error: inputParseError } = inputSchema.safeParse(input);

  if (inputParseError) {
    throw new InputParseError("Invalid data", { cause: inputParseError });
  }

  const book = await createBookUseCase(data, userId);

  return presenter(book);
}
