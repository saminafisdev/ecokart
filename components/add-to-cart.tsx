"use client"

import { addToCart } from "@/lib/actions";
import { Button, ButtonGroup } from "@chakra-ui/react"
import Link from "next/link";
import { redirect } from "next/navigation";

interface AddToCartButtonProps {
    productId: string;
    userId?: string;
    stock: number;
    isProductInCart?: boolean;
}

export function AddToCartButton({ productId, userId, stock, isProductInCart }: AddToCartButtonProps) {
    if (!userId) {
        redirect("/login");
    }

    return (
        isProductInCart ? (
            <Button size={{ base: "lg", md: "xl" }}
                variant={"outline"}
                colorPalette={"green"}
                borderRadius={"full"}
                asChild><Link href="/cart">View in cart</Link></Button>
        ) : (
            <Button
                size={{ base: "lg", md: "xl" }}
                variant={"outline"}
                colorPalette={"green"}
                borderRadius={"full"}
                disabled={stock <= 0}
                onClick={async () => await addToCart(userId!, productId)}
            >
                Add to cart
            </Button>)
    )
}