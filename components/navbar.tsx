import { Box, Button, Container, Flex, HStack, Icon, Input, InputGroup, Text, Badge, Menu } from "@chakra-ui/react";
import { FaRegHeart, FaRegUser } from "react-icons/fa";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { CiSearch } from "react-icons/ci";
import { LuLogOut, LuLogIn } from "react-icons/lu";
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

    // Get cart item count for logged-in users
    const cartItemCount = session?.user
        ? await prisma.cartItem.count({
            where: { userId: session.user.id }
        })
        : 0;

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

                    <HStack gap={0} order={{ base: 2, md: 3 }}>
                        {/* User Menu */}
                        <Menu.Root>
                            <Menu.Trigger asChild>
                                <Button variant={"ghost"}>
                                    <Icon size={"md"}>
                                        <FaRegUser />
                                    </Icon>
                                </Button>
                            </Menu.Trigger>
                            <Menu.Positioner>
                                <Menu.Content>
                                    {session?.user ? (
                                        <>
                                            <Menu.Item value="profile" disabled>
                                                <Text fontWeight="semibold">{session.user.name}</Text>
                                            </Menu.Item>
                                            <Menu.Item value="wishlist" asChild display={{ base: "flex", md: "none" }}>
                                                <Link href="/wishlist">
                                                    <FaRegHeart />
                                                    Wishlist
                                                </Link>
                                            </Menu.Item>
                                            <Menu.Item value="logout" asChild>
                                                <form action={signOutAction}>
                                                    <button type="submit" style={{ display: "flex", alignItems: "center", gap: "8px", width: "100%" }}>
                                                        <LuLogOut />
                                                        Logout
                                                    </button>
                                                </form>
                                            </Menu.Item>
                                        </>
                                    ) : (
                                        <>
                                            <Menu.Item value="login" asChild>
                                                <Link href="/login">
                                                    <LuLogIn />
                                                    Login
                                                </Link>
                                            </Menu.Item>
                                            <Menu.Item value="signup" asChild>
                                                <Link href="/signup">
                                                    <FaRegUser />
                                                    Sign Up
                                                </Link>
                                            </Menu.Item>
                                        </>
                                    )}
                                </Menu.Content>
                            </Menu.Positioner>
                        </Menu.Root>

                        {/* Wishlist - Desktop only */}
                        <Button variant={"ghost"} asChild display={{ base: "none", md: "inline-flex" }}>
                            <Link href="/wishlist">
                                <FaRegHeart />
                            </Link>
                        </Button>

                        {/* Cart */}
                        <Button variant={"ghost"} asChild position="relative">
                            <Link href="/cart">
                                <Icon size={"md"}>
                                    <AiOutlineShoppingCart />
                                </Icon>
                            </Link>
                            {cartItemCount > 0 && (
                                <Badge
                                    position="absolute"
                                    top="-8px"
                                    right="-8px"
                                    colorPalette="green"
                                    borderRadius="full"
                                    fontSize="xs"
                                    minW="20px"
                                    h="20px"
                                    display="flex"
                                    alignItems="center"
                                    justifyContent="center"
                                >
                                    {cartItemCount}
                                </Badge>
                            )}
                        </Button>
                    </HStack>
                </Flex>

                <HStack gap={10} mt="5" overflowX="auto" whiteSpace="nowrap" pb="2">
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