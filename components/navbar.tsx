import { Box, Button, Container, HStack, Icon, Input, InputGroup, Text } from "@chakra-ui/react";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";
import Link from "next/link";

export default function Navbar() {
    return (
        <Box as={"header"} pt="6" borderBottom={"1px solid"} borderColor={"gray.200"}>
            <Container>
                <HStack gap={10}>
                    <Text fontWeight={"bold"} fontSize={"2xl"}><Text as="span" color="green.500">eco</Text>Kart</Text>
                    <InputGroup startElement={<CiSearch />}>
                        <Input placeholder="Search anything" borderRadius={"full"} bg="white" fontSize={"lg"} p="4" colorPalette={"green"} color={"black"} />
                    </InputGroup>
                    <Icon size={"md"}>
                        <FaUser />
                    </Icon>
                    <Link href="/cart">
                        <Icon size={"md"}>
                            <FaShoppingCart />
                        </Icon>
                    </Link>
                </HStack>

                <HStack gap={10} mt="5" overflowX="auto" whiteSpace="nowrap" pb="2">
                    <Text fontSize={"sm"}>All Categories</Text>
                    <Text fontSize={"sm"}>Electronics</Text>
                    <Text fontSize={"sm"}>Home & Kitchen</Text>
                    <Text fontSize={"sm"}>Beauty & Health</Text>
                    <Text fontSize={"sm"}>Men's Fashion</Text>
                    <Text fontSize={"sm"}>Women's Fashion</Text>
                </HStack>
            </Container>
        </Box>
    )
}