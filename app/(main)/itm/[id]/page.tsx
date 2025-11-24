import { Avatar, Box, Button, Carousel, Heading, Image, Stack, Text } from "@chakra-ui/react";
import SimilarItems from "@/components/similar-items";
import ProductDetails from "@/components/product-details";
import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import { getServerSession } from "@/lib/get-server-session";
import { AddToCartButton } from "@/components/add-to-cart";

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
    const session = await getServerSession();
    const { id } = await params;

    const product = await prisma.product.findUnique({
        where: { id },
        include: {
            store: true,
            reviews: {
                include: {
                    customer: true
                }
            }
        }
    });

    if (!product) {
        notFound();
    }

    const existingCartItem = session?.user.id
        ? await prisma.cartItem.findFirst({
            where: {
                productId: product.id,
                userId: session.user.id,
            },
        })
        : null;

    const isProductInCart = !!existingCartItem;


    // Use product images or fallback
    const images = product.imageUrl.length > 0
        ? product.imageUrl
        : ["https://placehold.co/600x400?text=No+Image"];

    return (
        <Box py={4}>
            <Stack direction={{ base: "column", lg: "row" }} gap={12} py="3">
                <Carousel.Root slideCount={images.length} width="full" maxW={{ base: "full", lg: "2xl" }} flex="1">
                    <Carousel.ItemGroup>
                        {images.map((img, index) => (
                            <Carousel.Item key={index} index={index}>
                                <Image
                                    src={img}
                                    width="full"
                                    height="auto"
                                    maxH={{ base: "300px", md: "400px", lg: "500px" }}
                                    objectFit="contain"
                                    rounded={"md"}
                                    alt={`${product.name} image ${index + 1}`}
                                />
                            </Carousel.Item>
                        ))}
                    </Carousel.ItemGroup>
                    <Carousel.Control>
                        <Carousel.PrevTrigger />
                        <Carousel.IndicatorGroup display={{ base: "none", md: "flex" }}>
                            {images.map((img, index) => (
                                <Carousel.Indicator
                                    key={index}
                                    index={index}
                                    unstyled
                                    _current={{
                                        outline: "2px solid currentColor",
                                        outlineOffset: "2px",
                                    }}
                                >
                                    <Image
                                        w={{ base: "20", md: "32", lg: "40" }}
                                        maxW={{ base: "20", md: "32", lg: "40" }}
                                        aspectRatio="16/9"
                                        src={img}
                                        objectFit="cover"
                                        rounded={"md"}
                                        alt={`Thumbnail ${index + 1}`}
                                    />
                                </Carousel.Indicator>
                            ))}
                        </Carousel.IndicatorGroup>
                        <Carousel.NextTrigger />
                    </Carousel.Control>
                </Carousel.Root>

                <Box flex="1">
                    <Heading size={{ base: "xl", md: "2xl" }} fontWeight={"bold"}>{product.name}</Heading>
                    <hr />
                    <Stack direction="row" py={2} gap={3} align="center">
                        <Avatar.Root>
                            <Avatar.Fallback name={product.store.name} />
                        </Avatar.Root>
                        <Stack gap={0}>
                            <Text fontWeight="medium">{product.store.name}</Text>
                        </Stack>
                    </Stack>
                    <hr />
                    <Stack py={"4"}>
                        <Text fontWeight={"semibold"} fontSize={{ base: "2xl", md: "3xl" }}>
                            ${Number(product.price).toFixed(2)}
                        </Text>
                        <Text color="gray.600">{product.description}</Text>
                        <Text fontSize="sm" color={product.stock > 0 ? "green.600" : "red.600"}>
                            {product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}
                        </Text>
                    </Stack>
                    <hr />
                    <Stack width="full" gap={3} py={4}>
                        <Button
                            size={{ base: "lg", md: "xl" }}
                            variant={"solid"}
                            colorPalette={"green"}
                            borderRadius={"full"}
                            disabled={product.stock <= 0}
                        >
                            Buy it now
                        </Button>
                        <AddToCartButton productId={product.id} userId={session?.user.id} stock={product.stock} isProductInCart={isProductInCart} />
                        <Button size={{ base: "lg", md: "xl" }} variant={"outline"} colorPalette={"green"} borderRadius={"full"}>
                            Add to wishlist
                        </Button>
                    </Stack>
                </Box>
            </Stack>
            <hr />
            <SimilarItems />
            <hr />
            <ProductDetails />
        </Box>
    )
}