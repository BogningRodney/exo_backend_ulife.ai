"use server"

import prisma from "@/lib/prisma";

export async function createBook(formData: FormData){
    await prisma.book.create({
        data: {
            title: formData.get('title') as string,
            genre: formData.get('genre') as string,
            author: formData.get('author') as string
        }
    })
}

export async function deleteBook(id: string) {
    await prisma.book.delete({where: { id }})
}