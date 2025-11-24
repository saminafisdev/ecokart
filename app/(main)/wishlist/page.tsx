import { getServerSession } from "@/lib/get-server-session";
import prisma from "@/lib/prisma";
import WishlistClient from "@/components/wishlist-client";
import { Box, Button, EmptyState, VStack } from "@chakra-ui/react";
import Link from "next/link";
import { LuLogIn } from "react-icons/lu";

export default async function Page() {
    const session = await getServerSession();

    if (!session?.user) {
        return (
            <Box py={12}>
                <EmptyState.Root>
                    <EmptyState.Content>
                        <EmptyState.Indicator>
                            <LuLogIn />
                        </EmptyState.Indicator>
                        <VStack textAlign="center">
                            <EmptyState.Title fontSize="2xl">Please log in</EmptyState.Title>
                            <EmptyState.Description fontSize="md">
                                You need to be logged in to view your wishlist.
                            </EmptyState.Description>
                        </VStack>
                        <Button colorPalette="green" rounded="full" width={{ base: "full", md: "lg" }} size="lg" mt={4} asChild>
                            <Link href="/login">
                                Log In
                            </Link>
                        </Button>
                    </EmptyState.Content>
                </EmptyState.Root>
            </Box>
        );
    }

    const wishlistItems = await prisma.wishlistItem.findMany({
        where: { userId: session.user.id },
        include: { product: true },
        orderBy: { createdAt: 'desc' }
    });

    const formattedItems = wishlistItems.map(item => ({
        id: item.id,
        name: item.product.name,
        price: Number(item.product.price),
        image: item.product.imageUrl[0] || "https://placehold.co/600x400?text=No+Image",
        inStock: item.product.stock > 0,
        stock: item.product.stock,
        productId: item.product.id
    }));

    return <WishlistClient initialWishlistItems={formattedItems} />;
}
