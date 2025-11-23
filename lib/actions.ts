"use server";

import { refresh } from "next/cache";
import prisma from "./prisma";

export async function addToCart(userId: string, productId: string, quantity = 1) {
    return prisma.cartItem.upsert({
        where: { userId_productId: { userId, productId } },
        update: { quantity: { increment: quantity } },
        create: { userId, productId, quantity },
    });

    refresh()
}
