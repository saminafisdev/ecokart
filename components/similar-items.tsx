import { Box, Flex, Heading, Image, ScrollArea, Stack, Text } from "@chakra-ui/react";

interface Product {
    id: number;
    name: string;
    price: number;
    image: string;
}

interface SimilarItemsProps {
    title?: string;
    products?: Product[];
}

const defaultProducts: Product[] = [
    {
        id: 1,
        name: "Vintage Camera Pro",
        price: 299.99,
        image: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=400&auto=format&fit=crop"
    },
    {
        id: 2,
        name: "Classic Headphones",
        price: 149.99,
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&auto=format&fit=crop"
    },
    {
        id: 3,
        name: "Smart Watch Elite",
        price: 399.99,
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&auto=format&fit=crop"
    },
    {
        id: 4,
        name: "Wireless Speaker",
        price: 89.99,
        image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&auto=format&fit=crop"
    },
    {
        id: 5,
        name: "Gaming Mouse RGB",
        price: 79.99,
        image: "https://images.unsplash.com/photo-1527814050087-3793815479db?w=400&auto=format&fit=crop"
    },
    {
        id: 6,
        name: "Mechanical Keyboard",
        price: 159.99,
        image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400&auto=format&fit=crop"
    },
    {
        id: 7,
        name: "USB-C Hub Pro",
        price: 49.99,
        image: "https://images.unsplash.com/photo-1625948515291-69613efd103f?w=400&auto=format&fit=crop"
    },
    {
        id: 8,
        name: "Laptop Stand",
        price: 39.99,
        image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&auto=format&fit=crop"
    }
];

export default function SimilarItems({ title = "Similar Items", products = defaultProducts }: SimilarItemsProps) {
    return (
        <Box py={8}>
            <Heading size="2xl" mb={6} fontWeight="bold">
                {title}
            </Heading>

            <ScrollArea.Root width="full" size="sm">
                <ScrollArea.Viewport>
                    <ScrollArea.Content py={2}>
                        <Flex gap={6} flexWrap="nowrap" pb={2}>
                            {products.map((product) => (
                                <Box
                                    key={product.id}
                                    flexShrink={0}
                                    width="280px"
                                    borderWidth="1px"
                                    borderRadius="lg"
                                    overflow="hidden"
                                    transition="all 0.3s ease"
                                    cursor="pointer"
                                    _hover={{
                                        transform: "translateY(-8px)",
                                        shadow: "xl",
                                        borderColor: "green.500"
                                    }}
                                >
                                    <Box position="relative" overflow="hidden">
                                        <Image
                                            src={product.image}
                                            alt={product.name}
                                            width="full"
                                            height="200px"
                                            objectFit="cover"
                                            transition="transform 0.3s ease"
                                            _hover={{
                                                transform: "scale(1.1)"
                                            }}
                                        />
                                    </Box>

                                    <Stack gap={2} p={4}>
                                        <Text
                                            fontSize="md"
                                            fontWeight="semibold"
                                            lineClamp={2}
                                            minHeight="3rem"
                                        >
                                            {product.name}
                                        </Text>

                                        <Text
                                            fontSize="2xl"
                                            fontWeight="bold"
                                            color="green.600"
                                        >
                                            ${product.price.toFixed(2)}
                                        </Text>
                                    </Stack>
                                </Box>
                            ))}
                        </Flex>
                    </ScrollArea.Content>
                </ScrollArea.Viewport>
                <ScrollArea.Scrollbar orientation="horizontal">
                    <ScrollArea.Thumb />
                </ScrollArea.Scrollbar>
            </ScrollArea.Root>
        </Box>
    );
}
