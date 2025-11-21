import { Box, Breadcrumb, Card, CardTitle, Heading, Image, Link as ChakraLink, SimpleGrid, Text } from "@chakra-ui/react";
import Link from "next/link";

export default function Page() {
    return (
        <Box py={4}>
            <Breadcrumb.Root>
                <Breadcrumb.List>
                    <Breadcrumb.Item>
                        <Breadcrumb.Link>Home</Breadcrumb.Link>
                    </Breadcrumb.Item>
                    <Breadcrumb.Separator />
                    <Breadcrumb.Item>
                        <Breadcrumb.Link>Electronics</Breadcrumb.Link>
                    </Breadcrumb.Item>
                </Breadcrumb.List>
            </Breadcrumb.Root>
            <Heading mt={4}>Electronics</Heading>

            <Box borderBottom={"1px solid lightgray"}>
                <Text>All Listings</Text>
                <Text>2320 results</Text>
            </Box>

            <SimpleGrid columns={[1, null, 4]} gap={4} pt={4}>
                <Card.Root>
                    <Image
                        src={"https://images.unsplash.com/photo-1550009158-9ebf69173e03?q=80&w=1201&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"}
                        alt="Electronics"
                        width={"100%"}
                    />
                    <Card.Body>
                        <ChakraLink asChild>
                            <Link href={"#"}>
                                Keyboard Mouse Combo
                            </Link>
                        </ChakraLink>
                        <Text>$49.99</Text>
                        <Text>20 sold</Text>
                    </Card.Body>
                </Card.Root>
                <Card.Root>
                    <Image
                        src={"https://images.unsplash.com/photo-1550009158-9ebf69173e03?q=80&w=1201&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"}
                        alt="Electronics"
                        width={"100%"}
                    />
                    <Card.Body>
                        <ChakraLink asChild>
                            <Link href={"#"}>
                                Keyboard Mouse Combo
                            </Link>
                        </ChakraLink>
                        <Text>$49.99</Text>
                        <Text>20 sold</Text>
                    </Card.Body>
                </Card.Root>
                <Card.Root>
                    <Image
                        src={"https://images.unsplash.com/photo-1550009158-9ebf69173e03?q=80&w=1201&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"}
                        alt="Electronics"
                        width={"100%"}
                    />
                    <Card.Body>
                        <ChakraLink asChild>
                            <Link href={"#"}>
                                Keyboard Mouse Combo
                            </Link>
                        </ChakraLink>
                        <Text>$49.99</Text>
                        <Text>20 sold</Text>
                    </Card.Body>
                </Card.Root>
                <Card.Root>
                    <Image
                        src={"https://images.unsplash.com/photo-1550009158-9ebf69173e03?q=80&w=1201&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"}
                        alt="Electronics"
                        width={"100%"}
                    />
                    <Card.Body>
                        <ChakraLink asChild>
                            <Link href={"#"}>
                                Keyboard Mouse Combo
                            </Link>
                        </ChakraLink>
                        <Text>$49.99</Text>
                        <Text>20 sold</Text>
                    </Card.Body>
                </Card.Root>
                <Card.Root>
                    <Image
                        src={"https://images.unsplash.com/photo-1550009158-9ebf69173e03?q=80&w=1201&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"}
                        alt="Electronics"
                        width={"100%"}
                    />
                    <Card.Body>
                        <ChakraLink asChild>
                            <Link href={"#"}>
                                Keyboard Mouse Combo
                            </Link>
                        </ChakraLink>
                        <Text>$49.99</Text>
                        <Text>20 sold</Text>
                    </Card.Body>
                </Card.Root>
                <Card.Root>
                    <Image
                        src={"https://images.unsplash.com/photo-1550009158-9ebf69173e03?q=80&w=1201&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"}
                        alt="Electronics"
                        width={"100%"}
                    />
                    <Card.Body>
                        <ChakraLink asChild>
                            <Link href={"#"}>
                                Keyboard Mouse Combo
                            </Link>
                        </ChakraLink>
                        <Text>$49.99</Text>
                        <Text>20 sold</Text>
                    </Card.Body>
                </Card.Root>
                <Card.Root>
                    <Image
                        src={"https://images.unsplash.com/photo-1550009158-9ebf69173e03?q=80&w=1201&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"}
                        alt="Electronics"
                        width={"100%"}
                    />
                    <Card.Body>
                        <ChakraLink asChild>
                            <Link href={"#"}>
                                Keyboard Mouse Combo
                            </Link>
                        </ChakraLink>
                        <Text>$49.99</Text>
                        <Text>20 sold</Text>
                    </Card.Body>
                </Card.Root>
                <Card.Root>
                    <Image
                        src={"https://images.unsplash.com/photo-1550009158-9ebf69173e03?q=80&w=1201&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"}
                        alt="Electronics"
                        width={"100%"}
                    />
                    <Card.Body>
                        <ChakraLink asChild>
                            <Link href={"#"}>
                                Keyboard Mouse Combo
                            </Link>
                        </ChakraLink>
                        <Text>$49.99</Text>
                        <Text>20 sold</Text>
                    </Card.Body>
                </Card.Root>
            </SimpleGrid>
        </Box>
    )
}