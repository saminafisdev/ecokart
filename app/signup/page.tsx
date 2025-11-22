"use client";

import {
    Box,
    Button,
    Heading,
    Input,
    Stack,
    Text,
    Field,
    Card,
    Fieldset
} from "@chakra-ui/react";
import Link from "next/link";
import { signUpAction } from "../actions/auth";

export default function SignUpPage() {
    return (
        <Box
            minH="100vh"
            display="flex"
            alignItems="center"
            justifyContent="center"
            py={12}
            px={4}
        >
            <Card.Root
                maxW="md"
                width="full"
                p={8}
            >
                <Card.Body>
                    <Stack gap={6}>
                        <Stack gap={2} textAlign="center">
                            <Heading size={{ base: "xl", md: "2xl" }} fontWeight="bold">
                                Create Account
                            </Heading>
                            <Text color="fg.muted">
                                Sign up to get started with ecoKart
                            </Text>
                        </Stack>

                        {/* {error && (
                            <Box
                                p={4}
                                borderRadius="md"
                                bg="red.50"
                                borderWidth="1px"
                                borderColor="red.200"
                            >
                                <Text color="red.700" fontSize="sm">
                                    {error}
                                </Text>
                            </Box>
                        )} */}

                        <form action={signUpAction}>
                            <Fieldset.Root colorPalette={"green"}>
                                <Stack gap={4}>
                                    <Fieldset.Content>
                                        <Field.Root required>
                                            <Field.Label>Full Name</Field.Label>
                                            <Input
                                                name="name"
                                                placeholder="John Doe"
                                                size="lg"
                                                required
                                            />
                                        </Field.Root>

                                        <Field.Root required>
                                            <Field.Label>Email</Field.Label>
                                            <Input
                                                name="email"
                                                type="email"
                                                placeholder="you@example.com"
                                                size="lg"
                                                required
                                            />
                                        </Field.Root>

                                        <Field.Root required>
                                            <Field.Label>Password</Field.Label>
                                            <Input
                                                name="password"
                                                type="password"
                                                placeholder="••••••••"
                                                size="lg"
                                                required
                                                minLength={8}
                                            />
                                            <Field.HelperText>
                                                Must be at least 8 characters
                                            </Field.HelperText>
                                        </Field.Root>
                                    </Fieldset.Content>

                                    <Button
                                        type="submit"
                                        colorPalette="green"
                                        size="lg"
                                        width="full"
                                        mt={2}
                                    >
                                        Create Account
                                    </Button>
                                </Stack>
                            </Fieldset.Root>
                        </form>

                        <Stack gap={2} textAlign="center">
                            <Text fontSize="sm" color="fg.muted">
                                Already have an account?{" "}
                                <Link href="/login">
                                    <Text as="span" color="green.600" fontWeight="semibold">
                                        Sign in
                                    </Text>
                                </Link>
                            </Text>
                        </Stack>
                    </Stack>
                </Card.Body>
            </Card.Root>
        </Box>
    );
}