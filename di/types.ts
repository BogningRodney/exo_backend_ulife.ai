import { IBooksRepository } from "@/src/application/repositories/books.repository.interface";
import { IUsersRepository } from "@/src/application/repositories/users.repository.interface";
import { IAuthenticationService } from "@/src/application/services/authentication.service.interface";

export const DI_SYMBOLS = {
  // Services
  IAuthenticationService: Symbol.for("IAuthenticationService"),
  // Repositories
  IBooksRepository: Symbol.for("IBooksRepository"),
  IUsersRepository: Symbol.for("IUsersRepository"),
};

export interface DI_RETURN_TYPES {
  // Services
  IAuthenticationService: IAuthenticationService;
  // Repositories
  IBooksRepository: IBooksRepository;
  IUsersRepository: IUsersRepository;
}
