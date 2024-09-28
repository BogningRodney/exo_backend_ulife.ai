import { IUsersRepository } from "@/src/application/repositories/users.repository.interface";
import { User } from "@/src/entities/models/user";
import { injectable } from "inversify";

const bcryptjs = require("bcryptjs");

@injectable()
export class MockUsersRepository implements IUsersRepository {
  private _users: User[];

  constructor() {
    this._users = [
      {
        id: "1",
        name: "kratos",
        email: "kratos@gmail.com",
        password: bcryptjs.hash("one-password", 10),
      },
    ];
  }

  async getUser(id: string): Promise<User | null> {
    const user = this._users.find((u) => u.id === id) ?? null;
    return user;
  }

  async createUser(input: User): Promise<User> {
    this._users.push(input);
    return input;
  }
}
