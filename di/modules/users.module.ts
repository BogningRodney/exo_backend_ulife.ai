import { ContainerModule, interfaces } from "inversify";

import { IUsersRepository } from "@/src/application/repositories/users.repository.interface";
import { UsersRepository } from "@/src/interface-adapters/infrastructure/repositories/users.repository";
import { MockUsersRepository } from "@/src/interface-adapters/infrastructure/repositories/users.repository.mock";

import { DI_SYMBOLS } from "../types";

const initializeModule = (bind: interfaces.Bind) => {
  if (process.env.NODE_ENV === "test") {
    bind<IUsersRepository>(DI_SYMBOLS.IUsersRepository).to(MockUsersRepository);
  } else {
    bind<IUsersRepository>(DI_SYMBOLS.IUsersRepository).to(UsersRepository);
  }
};

export const UsersModule = new ContainerModule(initializeModule);
