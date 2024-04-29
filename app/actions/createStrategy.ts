'use server'

import { PrismaClient } from "@prisma/client"

export async function createStrategy(id: string, name: string, text: string, sql: string) {
    const prisma = new PrismaClient()
    const r = await prisma.strategy.create({
        data: {
            id,
            updatedAt: new Date(),
            name,
            text,
            sql,
        },
    })
    return r
}