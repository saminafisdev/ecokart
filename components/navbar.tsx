import { Box, Button, Container, Flex, HStack, Icon, Input, InputGroup, Text } from "@chakra-ui/react";
import { FaRegUser } from "react-icons/fa";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { CiSearch } from "react-icons/ci";
import Link from "next/link";
import { signOutAction } from "@/app/actions/auth";
import { getServerSession } from "@/lib/get-server-session";
import prisma from "@/lib/prisma";

export default async function Navbar() {
    const session = await getServerSession()
    const categories = await prisma.category.findMany({
        where: {
            parentCategoryId: null
        }
    })

    return (
        <Box as={"header"} pt="6" borderBottom={"1px solid"} borderColor={"gray.200"}>
            <Container>
                <Flex align="center" justify="space-between" wrap="wrap" gap={{ base: 4, md: 10 }}>
                    <Link href="/">
                        <Text fontWeight={"bold"} fontSize={"2xl"}><Text as="span" color="green.500">eco</Text>Kart</Text>
                    </Link>

                    <Box order={{ base: 3, md: 2 }} w={{ base: "100%", md: "auto" }} flex={{ md: 1 }}>
                        <InputGroup startElement={<CiSearch />} w="full">
                            <Input placeholder="Search anything" borderRadius={"full"} bg="white" fontSize={"lg"} p="4" colorPalette={"green"} color={"black"} />
                        </InputGroup>
                    </Box>

                    <HStack gap={4} order={{ base: 2, md: 3 }}>
                        {/* <form action={signOutAction}>
                            <Button type="submit" size={"md"} variant={"ghost"}>
                                <FaRegUser />
                                {
                                    session?.user && (
                                        <Text>Welcome {session.user.name}</Text>
                                    )
                                }
                            </Button>
                        </form> */}
                        <Button variant={"ghost"} asChild>
                            {
                                session?.user ? (
                                    <Link href="#">
                                        <Icon size={"md"}>
                                            <FaRegUser />
                                        </Icon>
                                    </Link>
                                ) : (
                                    <Link href="/login">
                                        <Icon size={"md"}>
                                            <FaRegUser />
                                        </Icon>
                                    </Link>
                                )
                            }
                        </Button>
                        <Link href="/cart">
                            <Icon size={"md"}>
                                <AiOutlineShoppingCart />
                            </Icon>
                        </Link>
                    </HStack>
                </Flex>

                <HStack gap={10} mt="5" overflowX="auto" whiteSpace="nowrap" pb="2">
                    <Text fontSize={"sm"}>All Categories</Text>
                    {
                        categories.map((category) => (
                            <Link href={`/categories/${category.slug}`} key={category.id}>
                                <Text fontSize={"sm"}>{category.name}</Text>
                            </Link>
                        ))
                    }
                </HStack>
            </Container>
        </Box>
    )
}