"use server";

import { refresh } from "next/cache";
import prisma from "./prisma";
import { redirect } from "next/navigation";

export async function addToCart(userId: string, productId: string, quantity = 1) {
    if (!userId) {
        redirect("/login");
    }

    await prisma.cartItem.upsert({
        where: { userId_productId: { userId, productId } },
        update: { quantity: { increment: quantity } },
        create: { userId, productId, quantity },
    });

    refresh()
}
