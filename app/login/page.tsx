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
import { loginAction } from "../actions/auth";

export default function SignInPage() {
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
                                Welcome Back
                            </Heading>
                            <Text color="fg.muted">
                                Sign in to your ecoKart account
                            </Text>
                        </Stack>

                        <form action={loginAction}>
                            <Fieldset.Root colorPalette="green">
                                <Stack gap={4}>
                                    <Fieldset.Content>
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
                                            />
                                        </Field.Root>
                                    </Fieldset.Content>

                                    <Stack gap={2}>
                                        <Link href="/forgot-password">
                                            <Text
                                                fontSize="sm"
                                                color="green.600"
                                                fontWeight="semibold"
                                                textAlign="right"
                                                _hover={{ textDecoration: "underline" }}
                                            >
                                                Forgot password?
                                            </Text>
                                        </Link>

                                        <Button
                                            type="submit"
                                            colorPalette="green"
                                            size="lg"
                                            width="full"
                                        >
                                            Sign In
                                        </Button>
                                    </Stack>
                                </Stack>
                            </Fieldset.Root>
                        </form>

                        <Stack gap={2} textAlign="center">
                            <Text fontSize="sm" color="fg.muted">
                                Don't have an account?{" "}
                                <Link href="/signup">
                                    <Text as="span" color="green.600" fontWeight="semibold">
                                        Sign up
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