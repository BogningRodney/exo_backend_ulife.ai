import type { User } from "@/src/entities/models/user";

export interface IUsersRepository {
  getUser(id: string): Promise<User | null>;
  createUser(input: User): Promise<User>;
}
