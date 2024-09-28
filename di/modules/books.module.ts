import { ContainerModule, interfaces } from "inversify";
import "reflect-metadata";

import { IBooksRepository } from "@/src/application/repositories/books.repository.interface";
import { BooksRepository } from "@/src/interface-adapters/infrastructure/repositories/books.repository";
import { MockBooksRepository } from "@/src/interface-adapters/infrastructure/repositories/books.repository.mock";

import { DI_SYMBOLS } from "../types";

const initializeModule = (bind: interfaces.Bind) => {
  if (process.env.NODE_ENV === "test") {
    bind<IBooksRepository>(DI_SYMBOLS.IBooksRepository).to(MockBooksRepository);
  } else {
    bind<IBooksRepository>(DI_SYMBOLS.IBooksRepository).to(BooksRepository);
  }
};

export const BooksModule = new ContainerModule(initializeModule);
