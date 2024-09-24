// import prisma from "@/lib/prisma"
// import { NextRequest, NextResponse } from "next/server"
// import { stringify } from "querystring"


// export const deleteProduct = async (req : NextRequest, route: { params: { id: string } }) => {
//     try {
//         const product = await prisma.book.delete({
//             where: {
//                 id: stringify(route.params.id),
//             },
//         })
//         res.status(200).json(product)
//     } catch (error) {
//         res.status(400).json({ msg: error })
//     }
// }