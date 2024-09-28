import { injectable } from "inversify";

import { IBooksRepository } from "@/src/application/repositories/books.repository.interface";
import { Book, BookInsert } from "@/src/entities/models/book";

@injectable()
export class MockBooksRepository implements IBooksRepository {
  private _books: Book[];

  constructor() {
    this._books = [];
  }

  async createBook(book: BookInsert): Promise<Book> {
    const id = "dsfs";
    const created = { ...book, id };
    this._books.push(created);
    return created;
  }
}
