"use client"

import { addToCart } from "@/lib/actions";
import { Button } from "@chakra-ui/react"
import Link from "next/link";

interface AddToCartButtonProps {
    productId: string;
    userId?: string;
    stock: number;
    isProductInCart?: boolean;
}

export function AddToCartButton({ productId, userId, stock, isProductInCart }: AddToCartButtonProps) {
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