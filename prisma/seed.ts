import { books } from "./seedData/books";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

async function main() {
    for (let book of books) {
        await prisma.book.create(
            {
                data : book
            }
        )
    }
}


main().catch(e => {
    console.log(e)
    process.exit(1)
}).finally(() => {
    prisma.$disconnect()
})