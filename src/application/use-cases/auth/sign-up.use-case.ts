import { getInjection } from "@/di/container";
import { AuthenticationError } from "@/src/entities/errors/auth";
import { Cookie } from "@/src/entities/models/cookie";
import { Session } from "@/src/entities/models/session";
import { User, userSchema } from "@/src/entities/models/user";
import { InputParseError } from "@/src/entities/errors/common";

const bcryptjs = require("bcryptjs");

export async function signUpUseCase(input: {
  name: string | null;
  email: string;
  password: string;
  confirmPassword: string;
}): Promise<{
  session: Session;
  cookie: Cookie;
  user: Pick<User, "email">;
}> {
  try {
    const parsedCredentials = userSchema.safeParse(input);
    if (!parsedCredentials.success) {
      throw new InputParseError("Invalid data.");
    }

    // check if the email is already taken
    const usersRepository = getInjection("IUsersRepository");
    const user = await usersRepository.getUser(input.email);
    if (user) {
      throw new AuthenticationError("Username taken");
    }

    // hash the password
    const hashedPassword = await bcryptjs.hash(input.password, 10);
    const authenticationService = getInjection("IAuthenticationService");

    const newUser = await usersRepository.createUser(input);
    const { cookie, session } = await authenticationService.createSession(
      newUser
    );

    return {
      cookie,
      session,
      user: {
        name: newUser.name,
        email: newUser.email,
        password: hashedPassword,
        confirmPassword: hashedPassword,
      },
    };
  } catch (error) {
    console.error("Error creating account:", error);
  }
}
