import { auth } from "@/lib/auth";
import { Box, Carousel, HStack, IconButton, Image, Stack, Text } from "@chakra-ui/react";
import { headers } from "next/headers";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";

const items = [
  { id: 1, src: "/banners/sale.png", alt: "Big Sale Banner" },
  { id: 2, src: "/banners/electronics.png", alt: "Electronics Banner" },
  { id: 3, src: "/banners/winter.png", alt: "Winter Collection Banner" },
]

export default async function Home() {
  const session = await auth.api.getSession({
    headers: await headers()
  })

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
          <Text fontWeight={"semibold"} fontSize={"2xl"}>Top Cateogries</Text>
          <HStack mt="5" gap="5" overflowX="auto" whiteSpace="nowrap" pb="4" w="full">
            <Box flexShrink={0} w={{ base: "120px", md: "150px" }}>
              <Image
                w="100%"
                h="auto"
                aspectRatio="1/1"
                mx={"auto"}
                borderRadius={"full"}
                src="https://images.unsplash.com/photo-1550009158-9ebf69173e03?q=80&w=1201&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              />
              <Text fontWeight={"semibold"} textAlign={"center"} whiteSpace="normal">Computer and Accessories</Text>
            </Box>
            <Box flexShrink={0} w={{ base: "120px", md: "150px" }}>
              <Image
                w="100%"
                h="auto"
                aspectRatio="1/1"
                mx={"auto"}
                borderRadius={"full"}
                src="https://images.unsplash.com/photo-1622810917846-719511f8e618?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8a25pZmUarezBjaG9wYm9hcmR8ZW58MHx8MHx8fDA%3D"
              />
              <Text fontWeight={"semibold"} textAlign={"center"} whiteSpace="normal">Kitchen Essentials</Text>
            </Box>
            <Box flexShrink={0} w={{ base: "120px", md: "150px" }}>
              <Image
                w="100%"
                h="auto"
                aspectRatio="1/1"
                mx={"auto"}
                borderRadius={"full"}
                src="https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bWFrZXVwfGVufDB8fDB8fHww"
              />
              <Text fontWeight={"semibold"} textAlign={"center"} whiteSpace="normal">Makeup</Text>
            </Box>
            <Box flexShrink={0} w={{ base: "120px", md: "150px" }}>
              <Image
                w="100%"
                h="auto"
                aspectRatio="1/1"
                mx={"auto"}
                borderRadius={"full"}
                src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              />
              <Text fontWeight={"semibold"} textAlign={"center"} whiteSpace="normal">Furniture</Text>
            </Box>
          </HStack>
        </Box>
        <Box as={"section"}>
          <Text fontWeight={"semibold"} fontSize={"2xl"}>Best Selling Products</Text>
          <HStack mt="5" gap="5" overflowX="auto" whiteSpace="nowrap" pb="4" w="full">
            <Box flexShrink={0} w={{ base: "150px", md: "200px", lg: "250px" }}>
              <Image w="100%" h="auto" aspectRatio="1/1" mx={"auto"} borderRadius={"2xl"} src="https://images.unsplash.com/photo-1527814050087-3793815479db?q=80&w=1028&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
              <Text textAlign={"center"} mt="2">Logitech</Text>
              <Text textAlign={"center"} fontWeight={"medium"}>$299.99</Text>
            </Box>
            <Box flexShrink={0} w={{ base: "150px", md: "200px", lg: "250px" }}>
              <Image w="100%" h="auto" aspectRatio="1/1" mx={"auto"} borderRadius={"2xl"} src="https://images.unsplash.com/photo-1695678458092-f01ccb465ae7?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
              <Text textAlign={"center"} mt="2">Keyboard Acron</Text>
              <Text textAlign={"center"} fontWeight={"medium"}>$299.99</Text>
            </Box>
            <Box flexShrink={0} w={{ base: "150px", md: "200px", lg: "250px" }}>
              <Image w="100%" h="auto" aspectRatio="1/1" mx={"auto"} borderRadius={"2xl"} src="https://images.unsplash.com/photo-1542272604-787c3835535d?q=80&w=1026&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
              <Text textAlign={"center"} mt="2">Men's Denim</Text>
              <Text textAlign={"center"} fontWeight={"medium"}>$299.99</Text>
            </Box>
            <Box flexShrink={0} w={{ base: "150px", md: "200px", lg: "250px" }}>
              <Image w="100%" h="auto" aspectRatio="1/1" mx={"auto"} borderRadius={"2xl"} src="https://images.unsplash.com/photo-1491553895911-0055eca6402d?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
              <Text textAlign={"center"} mt="2">Men's Shoes</Text>
              <Text textAlign={"center"} fontWeight={"medium"}>$299.99</Text>
            </Box>
          </HStack>
        </Box>
      </Stack>
    </Box>
  );
}
