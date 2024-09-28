"use server";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import prisma from "@/lib/prisma";
import React from "react";
import { createBook, deleteBook } from "../actions/bookactions";
import { auth } from "@/auth";

const page = async () => {
  const session = await auth();

  const books = await prisma.book.findMany();

  return (
    <div className="flex  flex-col items-center justify-center p-24 gap-12">
      <h1 className="text-4xl font-semibold"> Our Books </h1>

      <form action={createBook} className="flex gap-4" method="post">
        <input
          type="text"
          name="title"
          placeholder="Title"
          className="px-2 py-1 rounded-sm border border-black"
        />
        <input
          type="text"
          name="genre"
          placeholder="Type"
          className="px-2 py-1 rounded-sm border border-black"
        />
        <input
          type="text"
          name="author"
          placeholder="Author"
          className="px-2 py-1 rounded-sm border border-black"
        />
        <button
          type="submit"
          className="bg-black text-white px-3 py-2 rounded-sm"
        >
          Add book
        </button>
      </form>

      <div className="grid gri sm:grid-cols-3 gap-4">
        {books.map((book) => (
          <Card className="" key={book.id}>
            <CardHeader className="text-base font-semibold">
              Title: {book.title}
            </CardHeader>

            <CardContent>
              Genre: {book.genre} <br />
              author: {book.author}
              <div className="buttons flex gap-4 my-4">
                <form>
                  <Button formAction={deleteBook(book.id)}>Delete</Button>
                </form>

                <Button>Edit</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default page;
