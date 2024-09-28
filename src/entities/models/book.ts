import { z } from "zod";

export const selectBookSchema = z.object({
  id: z.string(),
  title: z.string(),
  genre: z.string(),
  author: z.string().nullable(),
});
export type Book = z.infer<typeof selectBookSchema>;

export const insertBookSchema = selectBookSchema.pick({
  title: true,
  genre: true,
  author: true,
});

export type BookInsert = z.infer<typeof insertBookSchema>;
