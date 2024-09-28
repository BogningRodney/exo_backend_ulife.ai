import { Container } from "inversify";

import { BooksModule } from "./modules/books.module";
import { DI_RETURN_TYPES, DI_SYMBOLS } from "./types";
import { UsersModule } from "./modules/users.module";
import { AuthenticationModule } from "./modules/authentication.module";

const ApplicationContainer = new Container({
  defaultScope: "Singleton",
});

export const initializeContainer = () => {
  ApplicationContainer.load(BooksModule);
  ApplicationContainer.load(UsersModule);
  ApplicationContainer.load(AuthenticationModule);
};

export const destroyContainer = () => {
  ApplicationContainer.unload(BooksModule);
  ApplicationContainer.unload(UsersModule);
  ApplicationContainer.unload(AuthenticationModule);
};

if (process.env.NODE_ENV !== "test") {
  initializeContainer();
}

export function getInjection<K extends keyof typeof DI_SYMBOLS>(
  symbol: K
): DI_RETURN_TYPES[K] {
  return ApplicationContainer.get(DI_SYMBOLS[symbol]);
}

export { ApplicationContainer };
