import { verify } from "@node-rs/argon2";
import { getInjection } from "@/di/container";
import { AuthenticationError } from "@/src/entities/errors/auth";
import { Cookie } from "@/src/entities/models/cookie";
import { Session } from "@/src/entities/models/session";
const bcryptjs = require("bcryptjs");

export async function signInUseCase(input: {
  email: string;
  password: string;
}): Promise<{ session: Session; cookie: Cookie }> {
  const authenticationService = getInjection("IAuthenticationService");
  const usersRepository = getInjection("IUsersRepository");

  const existingUser = await usersRepository.getUser(input.email);

  if (!existingUser) {
    throw new AuthenticationError("User does not exist");
  }

  const validPassword = await bcryptjs.hash(input.password, 10);

  if (!validPassword) {
    throw new AuthenticationError("Incorrect username or password");
  }

  return await authenticationService.createSession(existingUser);
}
