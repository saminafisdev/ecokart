"use server"

import prisma from "@/lib/prisma";

export async function getTopCategories() {
    return await prisma.category.findMany({
        take: 5,
        include: {
            _count: {
                select: { products: true }
            }
        },
        orderBy: {
            products: {
                _count: 'desc'
            }
        }
    });
}

export async function getBestSellingProducts() {
    return await prisma.product.findMany({
        take: 5,
        orderBy: {
            createdAt: 'desc'
        }
    });
}
