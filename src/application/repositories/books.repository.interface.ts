import type { Book, BookInsert } from "@/src/entities/models/book";

export interface IBooksRepository {
  createBook(book: BookInsert): Promise<Book>;
  deleteBook(bookId: string): void;
  // getBook(id: number): Promise<Book | undefined>;
  // getBooksForUser(userId: string): Promise<Book[]>;
  // updateBook(id: number, input: Partial<BookInsert>): Promise<Book>;
}
