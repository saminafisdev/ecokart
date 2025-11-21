import { Avatar, Box, Button, Carousel, Heading, Image, Stack, Text } from "@chakra-ui/react";
import SimilarItems from "@/components/similar-items";
import ProductDetails from "@/components/product-details";

const items = [1, 2, 3, 4]

export default function Page() {
    return (
        <Box py={4}>
            <Stack direction={{ base: "column", lg: "row" }} gap={12} py="3">
                <Carousel.Root slideCount={4} width="full" maxW={{ base: "full", lg: "2xl" }} flex="1">
                    <Carousel.ItemGroup>
                        {items.map((_, index) => (
                            <Carousel.Item key={index} index={index}>
                                <Image
                                    src="https://images.unsplash.com/photo-1550009158-9ebf69173e03?q=80&w=1201&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                    width="full"
                                    height="auto"
                                    rounded={"md"}
                                />
                            </Carousel.Item>
                        ))}
                    </Carousel.ItemGroup>
                    <Carousel.Control>
                        <Carousel.PrevTrigger />
                        <Carousel.IndicatorGroup display={{ base: "none", md: "flex" }}>
                            {items.map((item, index) => (
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
                                        src="https://images.unsplash.com/photo-1550009158-9ebf69173e03?q=80&w=1201&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                        objectFit="cover"
                                        rounded={"md"}
                                    />
                                </Carousel.Indicator>
                            ))}
                        </Carousel.IndicatorGroup>
                        <Carousel.NextTrigger />
                    </Carousel.Control>
                </Carousel.Root>

                <Box flex="1">
                    <Heading size={{ base: "xl", md: "2xl" }} fontWeight={"bold"}>Retro Blue Version Colro 19831 Rx210z New Refurbished</Heading>
                    <hr />
                    <Stack direction="row" py={2} gap={3}>
                        <Avatar.Root>
                            <Avatar.Fallback />
                        </Avatar.Root>
                        <Stack gap={0}>
                            <Text>Ahmed Collers</Text>
                        </Stack>
                    </Stack>
                    <hr />
                    <Stack py={"4"}>
                        <Text fontWeight={"semibold"} fontSize={{ base: "2xl", md: "3xl" }}>$21.99</Text>
                    </Stack>
                    <hr />
                    <Stack width="full" gap={3} py={4}>
                        <Button size={{ base: "lg", md: "xl" }} variant={"solid"} colorPalette={"green"} borderRadius={"full"}>Buy it now</Button>
                        <Button size={{ base: "lg", md: "xl" }} variant={"outline"} colorPalette={"green"} borderRadius={"full"}>Add to cart</Button>
                        <Button size={{ base: "lg", md: "xl" }} variant={"outline"} colorPalette={"green"} borderRadius={"full"}>Add to wishlist</Button>
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