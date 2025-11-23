import { auth } from "@/lib/auth";
import { Box, Carousel, HStack, IconButton, Image, Stack, Text } from "@chakra-ui/react";
import { headers } from "next/headers";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";
import { getTopCategories, getBestSellingProducts } from "@/app/actions/home";
import Link from "next/link";

const items = [
  { id: 1, src: "/banners/sale.png", alt: "Big Sale Banner" },
  { id: 2, src: "/banners/electronics.png", alt: "Electronics Banner" },
  { id: 3, src: "/banners/winter.png", alt: "Winter Collection Banner" },
]

export default async function Home() {
  const session = await auth.api.getSession({
    headers: await headers()
  })

  const [categories, products] = await Promise.all([
    getTopCategories(),
    getBestSellingProducts()
  ]);

  if (session) {
    console.log(session.user)
  }

  return (
    <Box py="12">
      <Carousel.Root slideCount={items.length} mx="auto" autoplay>
        <Carousel.ItemGroup>
          {items.map((item, index) => (
            <Carousel.Item key={item.id} index={index}>
              <Box w="100%" h={{ base: "200px", md: "300px", lg: "500px" }} rounded="lg" fontSize="2.5rem">
                <Image
                  aspectRatio="16/9"
                  src={item.src}
                  alt={item.alt}
                  w="100%"
                  h="100%"
                  objectFit="cover"
                  borderRadius={"xl"}
                />
              </Box>
            </Carousel.Item>
          ))}
        </Carousel.ItemGroup>

        <Carousel.Control justifyContent="center" gap="4">
          <Carousel.PrevTrigger asChild>
            <IconButton size="xs" variant="ghost">
              <LuChevronLeft />
            </IconButton>
          </Carousel.PrevTrigger>

          <Carousel.Indicators />

          <Carousel.NextTrigger asChild>
            <IconButton size="xs" variant="ghost">
              <LuChevronRight />
            </IconButton>
          </Carousel.NextTrigger>
        </Carousel.Control>
      </Carousel.Root>

      <Stack gap={"16"}>
        <Box as={"section"}>
          <Text fontWeight={"semibold"} fontSize={"2xl"}>Top Categories</Text>
          <HStack mt="5" gap="5" overflowX="auto" whiteSpace="nowrap" pb="4" w="full">
            {categories.map((category) => (
              <Box key={category.id} flexShrink={0} w={{ base: "120px", md: "150px" }}>
                <Image
                  w="100%"
                  h="auto"
                  aspectRatio="1/1"
                  mx={"auto"}
                  borderRadius={"full"}
                  objectFit="cover"
                  src={category.imageUrl || "https://placehold.co/150"}
                  alt={category.name}
                />
                <Text fontWeight={"semibold"} textAlign={"center"} whiteSpace="normal" mt="2">
                  <Link href={`/categories/${category.slug}`}>
                    {category.name}
                  </Link>
                </Text>
              </Box>
            ))}
          </HStack>
        </Box>
        <Box as={"section"}>
          <Text fontWeight={"semibold"} fontSize={"2xl"}>Best Selling Products</Text>
          <HStack mt="5" gap="5" overflowX="auto" whiteSpace="nowrap" pb="4" w="full">
            {products.map((product) => (
              <Box key={product.id} flexShrink={0} w={{ base: "150px", md: "200px", lg: "250px" }}>
                <Image
                  w="100%"
                  h="auto"
                  aspectRatio="1/1"
                  mx={"auto"}
                  borderRadius={"2xl"}
                  objectFit="cover"
                  src={product.imageUrl[0] || "https://placehold.co/200"}
                  alt={product.name}
                />
                <Text textAlign={"center"} mt="2" fontWeight="medium" truncate>
                  <Link href={`/itm/${product.id}`}>
                    {product.name}
                  </Link>
                </Text>
                <Text textAlign={"center"} fontWeight={"bold"} color="green.600">
                  ${Number(product.price).toFixed(2)}
                </Text>
              </Box>
            ))}
          </HStack>
        </Box>
      </Stack>
    </Box>
  );
}
