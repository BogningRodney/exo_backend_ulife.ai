"use server"
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import prisma from '@/lib/prisma'
import React from 'react'

const page = async () => {

    const books = await prisma.book.findMany()


  return (
    <div className="flex  flex-col items-center justify-center p-24 gap-12">

        <h1 className="text-4xl font-semibold"> Our Books </h1>
        <div className='grid grid-cols-3 gap-4'>
            { books.map((book) => (
            <Card className=''>
                <CardHeader className='text-base font-semibold'>
                    Title: {book.title}
                </CardHeader>

                <CardContent>
                    Genre: {book.genre} <br />
                    author: {book.author}
                </CardContent>
            </Card>
            ))}
        </div>
    </div>
  )
}

export default page
