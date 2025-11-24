"use client";

import {
    Box,
    Button,
    Flex,
    Heading,
    HStack,
    IconButton,
    Image,
    Stack,
    Text,
    VStack,
    EmptyState,
    Badge
} from "@chakra-ui/react";
import { LuHeart, LuTrash2, LuShoppingCart } from "react-icons/lu";
import { useState, useTransition } from "react";
import Link from "next/link";
import { removeFromWishlist } from "@/app/actions/wishlist";
import { toaster } from "@/components/ui/toaster";

export interface WishlistItem {
    id: string;
    name: string;
    price: number;
    image: string;
    inStock: boolean;
    stock: number;
    productId: string;
}

interface WishlistClientProps {
    initialWishlistItems: WishlistItem[];
}

export default function WishlistClient({ initialWishlistItems }: WishlistClientProps) {
    const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>(initialWishlistItems);
    const [isPending, startTransition] = useTransition();

    const removeItem = async (id: string) => {
        // Optimistic update
        const previousItems = wishlistItems;
        setWishlistItems(items => items.filter(item => item.id !== id));

        startTransition(async () => {
            const result = await removeFromWishlist(id);

            if (!result.success) {
                // Revert on error
                setWishlistItems(previousItems);
                toaster.create({
                    title: "Error",
                    description: result.error || "Failed to remove item",
                    type: "error",
                });
            } else {
                toaster.create({
                    title: "Item removed",
                    description: "Item has been removed from your wishlist",
                    type: "success",
                });
            }
        });
    };

    if (wishlistItems.length === 0) {
        return (
            <Box py={12}>
                <EmptyState.Root>
                    <EmptyState.Content>
                        <EmptyState.Indicator>
                            <LuHeart />
                        </EmptyState.Indicator>
                        <VStack textAlign="center">
                            <EmptyState.Title fontSize="2xl">Your wishlist is empty</EmptyState.Title>
                            <EmptyState.Description fontSize="md">
                                Explore our products and add items to your wishlist
                            </EmptyState.Description>
                        </VStack>
                        <Button colorPalette="green" size="lg" mt={4} asChild>
                            <Link href="/">
                                Continue Shopping
                            </Link>
                        </Button>
                    </EmptyState.Content>
                </EmptyState.Root>
            </Box>
        );
    }

    return (
        <Box py={8}>
            <Heading size={{ base: "xl", md: "2xl" }} mb={8} fontWeight="bold">
                My Wishlist ({wishlistItems.length} {wishlistItems.length === 1 ? 'item' : 'items'})
            </Heading>

            <Stack gap={4}>
                {wishlistItems.map((item) => (
                    <Box
                        key={item.id}
                        p={{ base: 4, md: 6 }}
                        borderWidth="1px"
                        borderRadius="lg"
                        transition="all 0.2s"
                        _hover={{
                            shadow: "md",
                            borderColor: "green.500"
                        }}
                    >
                        <Flex gap={4} direction={{ base: "column", sm: "row" }}>
                            {/* Product Image */}
                            <Box
                                flexShrink={0}
                                width={{ base: "full", sm: "120px" }}
                                height={{ base: "200px", sm: "120px" }}
                            >
                                <Image
                                    src={item.image}
                                    alt={item.name}
                                    width="full"
                                    height="full"
                                    objectFit="cover"
                                    borderRadius="md"
                                />
                            </Box>

                            {/* Product Details */}
                            <Stack flex="1" gap={3} justifyContent="space-between">
                                <Box>
                                    <Heading size={{ base: "md", md: "lg" }} mb={2}>
                                        <Link href={`/itm/${item.productId}`}>
                                            {item.name}
                                        </Link>
                                    </Heading>
                                    {!item.inStock && (
                                        <Badge colorPalette="red" size="sm">
                                            Out of Stock
                                        </Badge>
                                    )}
                                    {item.inStock && (
                                        <VStack alignItems="flex-start" gap={1}>
                                            <Badge colorPalette="green" size="sm">
                                                In Stock
                                            </Badge>
                                            <Text color="gray.600" fontSize="xs">
                                                {item.stock} {item.stock === 1 ? 'item' : 'items'} available
                                            </Text>
                                        </VStack>
                                    )}
                                </Box>

                                <Flex
                                    direction={{ base: "column", md: "row" }}
                                    gap={4}
                                    alignItems={{ base: "flex-start", md: "center" }}
                                    justifyContent="space-between"
                                >
                                    {/* Price */}
                                    <Text fontSize="xl" fontWeight="bold" color="green.600">
                                        ${item.price.toFixed(2)}
                                    </Text>

                                    {/* Actions */}
                                    <HStack gap={2}>
                                        <Button
                                            colorPalette="green"
                                            size="sm"
                                            disabled={!item.inStock}
                                            asChild={item.inStock}
                                        >
                                            {item.inStock ? (
                                                <Link href={`/itm/${item.productId}`}>
                                                    <LuShoppingCart />
                                                    Add to Cart
                                                </Link>
                                            ) : (
                                                <>
                                                    <LuShoppingCart />
                                                    Add to Cart
                                                </>
                                            )}
                                        </Button>
                                        <IconButton
                                            aria-label="Remove from wishlist"
                                            variant="ghost"
                                            colorPalette="red"
                                            onClick={() => removeItem(item.id)}
                                            size="sm"
                                        >
                                            <LuTrash2 />
                                        </IconButton>
                                    </HStack>
                                </Flex>
                            </Stack>
                        </Flex>
                    </Box>
                ))}
            </Stack>

            <Box mt={8}>
                <Button
                    variant="outline"
                    colorPalette="green"
                    size="lg"
                    asChild
                >
                    <Link href="/">
                        Continue Shopping
                    </Link>
                </Button>
            </Box>
        </Box>
    );
}
