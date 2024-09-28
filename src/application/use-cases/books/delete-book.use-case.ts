import { getInjection } from "@/di/container";

export async function deleteBookUseCase(IdBook: string) {
  const booksRepository = getInjection("IBooksRepository");

  await booksRepository.deleteBook(IdBook);
}
