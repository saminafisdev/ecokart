import { Box, Carousel, HStack, IconButton, Image, Stack, Text } from "@chakra-ui/react";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";

const items = Array.from({ length: 5 })

export default function Home() {
  return (
    <Box py="12">
      <Carousel.Root slideCount={items.length} mx="auto">
        <Carousel.ItemGroup>
          {items.map((_, index) => (
            <Carousel.Item key={index} index={index}>
              <Box w="100%" h="500px" rounded="lg" fontSize="2.5rem">
                <Image
                  aspectRatio="16/9"
                  src="https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?q=80&w=1176&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt={"Carousel image"}
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
          <HStack mt="5" gap="5">
            <Box>
              <Image width={150} height={150} mx={"auto"} borderRadius={"full"} src="https://images.unsplash.com/photo-1550009158-9ebf69173e03?q=80&w=1201&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
              <Text fontWeight={"semibold"} textAlign={"center"}>Computer and Accessories</Text>
            </Box>
            <Box>
              <Image width={150} height={150} mx={"auto"} borderRadius={"full"} src="https://images.unsplash.com/photo-1622810917846-719511f8e618?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8a25pZmUlMjBjaG9wYm9hcmR8ZW58MHx8MHx8fDA%3D" />
              <Text fontWeight={"semibold"} textAlign={"center"}>Kitchen Essentials</Text>
            </Box>
            <Box>
              <Image width={150} height={150} mx={"auto"} borderRadius={"full"} src="https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bWFrZXVwfGVufDB8fDB8fHww" />
              <Text fontWeight={"semibold"} textAlign={"center"}>Makeup</Text>
            </Box>
            <Box>
              <Image width={150} height={150} mx={"auto"} borderRadius={"full"} src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
              <Text fontWeight={"semibold"} textAlign={"center"}>Furniture</Text>
            </Box>
          </HStack>
        </Box>
        <Box as={"section"}>
          <Text fontWeight={"semibold"} fontSize={"2xl"}>Best Selling Products</Text>
          <HStack mt="5" gap="5">
            <Box>
              <Image width={250} height={250} mx={"auto"} borderRadius={"2xl"} src="https://images.unsplash.com/photo-1527814050087-3793815479db?q=80&w=1028&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
              <Text>Logitech</Text>
              <Text fontWeight={"medium"}>$299.99</Text>
            </Box>
            <Box>
              <Image width={250} height={250} mx={"auto"} borderRadius={"2xl"} src="https://images.unsplash.com/photo-1695678458092-f01ccb465ae7?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
              <Text>Keyboard Acron</Text>
              <Text fontWeight={"medium"}>$299.99</Text>
            </Box>
            <Box>
              <Image width={250} height={250} mx={"auto"} borderRadius={"2xl"} src="https://images.unsplash.com/photo-1542272604-787c3835535d?q=80&w=1026&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
              <Text>Men's Denim</Text>
              <Text fontWeight={"medium"}>$299.99</Text>
            </Box>
            <Box>
              <Image width={250} height={250} mx={"auto"} borderRadius={"2xl"} src="https://images.unsplash.com/photo-1491553895911-0055eca6402d?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
              <Text>Men's Shoes</Text>
              <Text fontWeight={"medium"}>$299.99</Text>
            </Box>
          </HStack>
        </Box>
      </Stack>
    </Box>
  );
}
