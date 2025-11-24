"use client";

import { Button } from "@chakra-ui/react";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { useState, useTransition } from "react";
import { addToWishlist, removeFromWishlist } from "@/app/actions/wishlist";
import { toaster } from "@/components/ui/toaster";
import { useRouter } from "next/navigation";

interface AddToWishlistButtonProps {
    productId: string;
    userId?: string;
    isInWishlist: boolean;
    wishlistItemId?: string;
}

export function AddToWishlistButton({
    productId,
    userId,
    isInWishlist: initialIsInWishlist,
    wishlistItemId: initialWishlistItemId
}: AddToWishlistButtonProps) {
    const [isInWishlist, setIsInWishlist] = useState(initialIsInWishlist);
    const [wishlistItemId, setWishlistItemId] = useState(initialWishlistItemId);
    const [isPending, startTransition] = useTransition();
    const router = useRouter();

    const handleClick = async () => {
        if (!userId) {
            router.push("/login");
            return;
        }

        if (isInWishlist && wishlistItemId) {
            // Remove from wishlist
            const previousState = { isInWishlist, wishlistItemId };
            setIsInWishlist(false);
            setWishlistItemId(undefined);

            startTransition(async () => {
                const result = await removeFromWishlist(wishlistItemId);

                if (!result.success) {
                    setIsInWishlist(previousState.isInWishlist);
                    setWishlistItemId(previousState.wishlistItemId);
                    toaster.create({
                        title: "Error",
                        description: result.error || "Failed to remove from wishlist",
                        type: "error",
                    });
                } else {
                    toaster.create({
                        title: "Removed from wishlist",
                        description: "Item has been removed from your wishlist",
                        type: "success",
                    });
                    router.refresh();
                }
            });
        } else {
            // Add to wishlist
            const previousState = { isInWishlist, wishlistItemId };
            setIsInWishlist(true);

            startTransition(async () => {
                const result = await addToWishlist(productId);

                if (!result.success) {
                    setIsInWishlist(previousState.isInWishlist);
                    setWishlistItemId(previousState.wishlistItemId);
                    toaster.create({
                        title: "Error",
                        description: result.error || "Failed to add to wishlist",
                        type: "error",
                    });
                } else {
                    toaster.create({
                        title: "Added to wishlist",
                        description: "Item has been added to your wishlist",
                        type: "success",
                    });
                    router.refresh();
                }
            });
        }
    };

    return (
        <Button
            size={{ base: "lg", md: "xl" }}
            variant="outline"
            colorPalette={isInWishlist ? "red" : "green"}
            borderRadius="full"
            onClick={handleClick}
            disabled={isPending}
        >
            {isInWishlist ? <FaHeart /> : <FaRegHeart />}
            {isInWishlist ? "Remove from wishlist" : "Add to wishlist"}
        </Button>
    );
}
