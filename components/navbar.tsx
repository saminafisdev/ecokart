import { Box, Button, Container, Flex, HStack, Icon, Input, InputGroup, Text } from "@chakra-ui/react";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";
import Link from "next/link";
import { signOutAction } from "@/app/actions/auth";
import { getServerSession } from "@/lib/get-server-session";

export default async function Navbar() {
    const session = await getServerSession()

    console.log(session?.user)

    return (
        <Box as={"header"} pt="6" borderBottom={"1px solid"} borderColor={"gray.200"}>
            <Container>
                <Flex align="center" justify="space-between" wrap="wrap" gap={{ base: 4, md: 10 }}>
                    <Text fontWeight={"bold"} fontSize={"2xl"}><Text as="span" color="green.500">eco</Text>Kart</Text>

                    <Box order={{ base: 3, md: 2 }} w={{ base: "100%", md: "auto" }} flex={{ md: 1 }}>
                        <InputGroup startElement={<CiSearch />} w="full">
                            <Input placeholder="Search anything" borderRadius={"full"} bg="white" fontSize={"lg"} p="4" colorPalette={"green"} color={"black"} />
                        </InputGroup>
                    </Box>

                    <HStack gap={4} order={{ base: 2, md: 3 }}>
                        <form action={signOutAction}>
                            <Button type="submit" size={"md"} variant={"ghost"}>
                                <FaUser />
                                {
                                    session?.user && (
                                        <Text>Welcome {session.user.name}</Text>
                                    )
                                }
                            </Button>
                        </form>
                        <Link href="/cart">
                            <Icon size={"md"}>
                                <FaShoppingCart />
                            </Icon>
                        </Link>
                    </HStack>
                </Flex>

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