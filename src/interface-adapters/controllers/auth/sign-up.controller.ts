import { z } from "zod";

import { signUpUseCase } from "@/src/application/use-cases/auth/sign-up.use-case";
import { InputParseError } from "@/src/entities/errors/common";

const inputSchema = z.object({
  name: z.string().min(8).max(31),
  email: z.string().min(8).max(31),
  password: z.string().min(8).max(31),
  confirmPassword: z.string().min(8).max(31),
});

export async function signUpController(
  input: Partial<z.infer<typeof inputSchema>>
): Promise<ReturnType<typeof signUpUseCase>> {
  const { data, error: inputParseError } = inputSchema.safeParse(input);

  if (inputParseError) {
    throw new InputParseError("Invalid data", { cause: inputParseError });
  }

  return await signUpUseCase(data);
}
