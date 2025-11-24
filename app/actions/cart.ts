"use server";

import { getServerSession } from "@/lib/get-server-session";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function deleteCartItem(cartItemId: string) {
    try {
        const session = await getServerSession();

        if (!session?.user) {
            return { success: false, error: "Unauthorized" };
        }

        // Verify the cart item belongs to the user
        const cartItem = await prisma.cartItem.findUnique({
            where: { id: cartItemId },
        });

        if (!cartItem) {
            return { success: false, error: "Cart item not found" };
        }

        if (cartItem.userId !== session.user.id) {
            return { success: false, error: "Unauthorized" };
        }

        // Delete the cart item
        await prisma.cartItem.delete({
            where: { id: cartItemId },
        });

        revalidatePath("/cart");
        return { success: true };
    } catch (error) {
        console.error("Error deleting cart item:", error);
        return { success: false, error: "Failed to delete cart item" };
    }
}

export async function updateCartItemQuantity(cartItemId: string, quantity: number) {
    try {
        const session = await getServerSession();

        if (!session?.user) {
            return { success: false, error: "Unauthorized" };
        }

        if (quantity < 1) {
            return { success: false, error: "Quantity must be at least 1" };
        }

        // Verify the cart item belongs to the user
        const cartItem = await prisma.cartItem.findUnique({
            where: { id: cartItemId },
            include: { product: true },
        });

        if (!cartItem) {
            return { success: false, error: "Cart item not found" };
        }

        if (cartItem.userId !== session.user.id) {
            return { success: false, error: "Unauthorized" };
        }

        // Check if quantity exceeds stock
        if (quantity > cartItem.product.stock) {
            return { success: false, error: `Only ${cartItem.product.stock} items available` };
        }

        // Update the cart item quantity
        await prisma.cartItem.update({
            where: { id: cartItemId },
            data: { quantity },
        });

        revalidatePath("/cart");
        return { success: true };
    } catch (error) {
        console.error("Error updating cart item quantity:", error);
        return { success: false, error: "Failed to update quantity" };
    }
}
