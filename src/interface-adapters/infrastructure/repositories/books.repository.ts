import { injectable } from "inversify";

import { IBooksRepository } from "@/src/application/repositories/books.repository.interface";
import { BookInsert, Book } from "@/src/entities/models/book";

import prisma from "@/lib/prisma";
import { DatabaseOperationError } from "@/src/entities/errors/common";

@injectable()
export class BooksRepository implements IBooksRepository {
  async createBook(book: BookInsert): Promise<Book> {
    try {
      const created = await prisma.book.create({
        data: {
          title: book.title,
          genre: book.genre,
          author: book.author,
        },
      });

      if (created) {
        return created;
      } else {
        throw new DatabaseOperationError("Cannot create book");
      }
    } catch (err) {
      throw err;
    }
  }

  async deleteBook(id: string) {

    try {
      await prisma.book.delete({ where: { id: id } });
    } catch (err) {
      throw err;
    }
  }
}
