import { injectable } from "inversify";

import { IUsersRepository } from "@/src/application/repositories/users.repository.interface";
import { DatabaseOperationError } from "@/src/entities/errors/common";
import { User, User } from "@/src/entities/models/user";
import prisma from "@/lib/prisma";

@injectable()
export class UsersRepository implements IUsersRepository {
  async getUser(id: string): Promise<User | null> {
    try {
      const user = prisma.user.findFirst({
        where: { id: id },
        select: {
          id: true,
          name: true,
          email: true,
          password: true,
        },
      });

      return user;
    } catch (err) {
      throw err;
    }
  }

  async createUser(input: User): Promise<User> {
    try {
      const created = await prisma.user.create({
        data: {
          name: input.name,
          email: input.email,
          password: input.password,
        },
      });

      if (created) {
        return created;
      } else {
        throw new DatabaseOperationError("Cannot create user.");
      }
    } catch (err) {
      throw err;
    }
  }
}
