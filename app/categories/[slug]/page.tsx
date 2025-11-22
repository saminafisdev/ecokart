import { Box, Breadcrumb, Card, Heading, Image, Link as ChakraLink, SimpleGrid, Text, Container, Flex, Stack } from "@chakra-ui/react";
import Link from "next/link";
import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;

    const category = await prisma.category.findUnique({
        where: { slug },
        include: {
            products: true,
            subcategories: true
        }
    });

    if (!category) {
        notFound();
    }

    return (
        <Container maxW="container.xl" py={8}>
            <Breadcrumb.Root mb={6}>
                <Breadcrumb.List>
                    <Breadcrumb.Item>
                        <Breadcrumb.Link asChild>
                            <Link href="/">Home</Link>
                        </Breadcrumb.Link>
                    </Breadcrumb.Item>
                    <Breadcrumb.Separator />
                    <Breadcrumb.Item>
                        <Breadcrumb.Link asChild>
                            <Link href="/categories">Categories</Link>
                        </Breadcrumb.Link>
                    </Breadcrumb.Item>
                    <Breadcrumb.Separator />
                    <Breadcrumb.Item>
                        <Breadcrumb.CurrentLink>{category.name}</Breadcrumb.CurrentLink>
                    </Breadcrumb.Item>
                </Breadcrumb.List>
            </Breadcrumb.Root>

            <Heading mb={2} size="2xl">{category.name}</Heading>

            <Box borderBottom={"1px solid"} borderColor="gray.200" pb={4} mb={8}>
                <Text color="gray.500">{category.products.length} results</Text>
            </Box>

            <Flex gap={10} direction={{ base: "column", md: "row" }} align="start">
                {/* Sidebar - Only show if there are subcategories */}
                {category.subcategories.length > 0 && (
                    <Box w={{ base: "full", md: "250px" }} flexShrink={0}>
                        <Heading size="md" mb={4}>Subcategories</Heading>
                        <Stack gap={2}>
                            {category.subcategories.map((sub) => (
                                <ChakraLink asChild key={sub.id} fontSize="md" color="gray.600" _hover={{ color: "green.600", textDecoration: "none" }}>
                                    <Link href={`/categories/${sub.slug}`}>
                                        {sub.name}
                                    </Link>
                                </ChakraLink>
                            ))}
                        </Stack>
                    </Box>
                )}

                {/* Main Content */}
                <Box flex="1" w="full">
                    {category.products.length === 0 ? (
                        <Box textAlign="center" py={10} bg="gray.50" borderRadius="md">
                            <Text fontSize="lg" color="gray.500">No products found in this category.</Text>
                        </Box>
                    ) : (
                        <SimpleGrid columns={{ base: 1, sm: 2, lg: 3 }} gap={6}>
                            {category.products.map((product) => (
                                <Card.Root key={product.id} overflow="hidden" variant="outline" _hover={{ shadow: "md" }} transition="all 0.2s">
                                    <Box position="relative" aspectRatio={4 / 3}>
                                        <Image
                                            src={product.imageUrl[0] || "https://placehold.co/600x400?text=No+Image"}
                                            alt={product.name}
                                            objectFit="cover"
                                            width="100%"
                                            height="100%"
                                        />
                                    </Box>
                                    <Card.Body gap={2}>
                                        <ChakraLink asChild fontWeight="bold" fontSize="lg" lineClamp={1}>
                                            <Link href={`/itm/${product.id}`}>
                                                {product.name}
                                            </Link>
                                        </ChakraLink>
                                        <Text fontSize="md" color="gray.600" lineClamp={2}>
                                            {product.description}
                                        </Text>
                                        <Text fontWeight="bold" fontSize="xl" color="green.600">
                                            ${Number(product.price).toFixed(2)}
                                        </Text>
                                    </Card.Body>
                                </Card.Root>
                            ))}
                        </SimpleGrid>
                    )}
                </Box>
            </Flex>
        </Container>
    );
}
