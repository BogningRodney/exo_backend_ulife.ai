import { getInjection } from "@/di/container";
import type { Book } from "@/src/entities/models/book";

export async function createBookUseCase(
  input: {
    title: string;
    genre: string;
    author: string;
  }
): Promise<Book> {
  const booksRepository = getInjection("IBooksRepository");

  const newBook = await booksRepository.createBook(input);

  return newBook;
}
