"use server";

import { getServerSession } from "@/lib/get-server-session";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function addToWishlist(productId: string) {
    try {
        const session = await getServerSession();

        if (!session?.user) {
            return { success: false, error: "Unauthorized" };
        }

        // Check if product exists
        const product = await prisma.product.findUnique({
            where: { id: productId },
        });

        if (!product) {
            return { success: false, error: "Product not found" };
        }

        // Check if already in wishlist
        const existingItem = await prisma.wishlistItem.findUnique({
            where: {
                userId_productId: {
                    userId: session.user.id,
                    productId,
                },
            },
        });

        if (existingItem) {
            return { success: false, error: "Already in wishlist" };
        }

        // Add to wishlist
        await prisma.wishlistItem.create({
            data: {
                userId: session.user.id,
                productId,
            },
        });

        revalidatePath("/wishlist");
        return { success: true };
    } catch (error) {
        console.error("Error adding to wishlist:", error);
        return { success: false, error: "Failed to add to wishlist" };
    }
}

export async function removeFromWishlist(wishlistItemId: string) {
    try {
        const session = await getServerSession();

        if (!session?.user) {
            return { success: false, error: "Unauthorized" };
        }

        // Verify the wishlist item belongs to the user
        const wishlistItem = await prisma.wishlistItem.findUnique({
            where: { id: wishlistItemId },
        });

        if (!wishlistItem) {
            return { success: false, error: "Wishlist item not found" };
        }

        if (wishlistItem.userId !== session.user.id) {
            return { success: false, error: "Unauthorized" };
        }

        // Delete the wishlist item
        await prisma.wishlistItem.delete({
            where: { id: wishlistItemId },
        });

        revalidatePath("/wishlist");
        return { success: true };
    } catch (error) {
        console.error("Error removing from wishlist:", error);
        return { success: false, error: "Failed to remove from wishlist" };
    }
}
