"use client";

import {
    Box,
    Button,
    Flex,
    Heading,
    HStack,
    IconButton,
    Image,
    NumberInput,
    Separator,
    Stack,
    Text,
    VStack,
    EmptyState,
    Input,
    Group
} from "@chakra-ui/react";
import { LuShoppingCart, LuTrash2, LuArrowRight } from "react-icons/lu";
import { useState, useTransition } from "react";
import Link from "next/link";
import { deleteCartItem, updateCartItemQuantity } from "@/app/actions/cart";
import { toaster } from "@/components/ui/toaster";

export interface CartItem {
    id: string;
    name: string;
    price: number;
    quantity: number;
    image: string;
    inStock: boolean;
    stock: number;
}

interface CartClientProps {
    initialCartItems: CartItem[];
}

export default function CartClient({ initialCartItems }: CartClientProps) {
    const [cartItems, setCartItems] = useState<CartItem[]>(initialCartItems);
    const [isPending, startTransition] = useTransition();

    const updateQuantity = async (id: string, newQuantity: number) => {
        if (newQuantity < 1) return;

        // Optimistic update
        const previousItems = cartItems;
        setCartItems(items =>
            items.map(item =>
                item.id === id ? { ...item, quantity: newQuantity } : item
            )
        );

        startTransition(async () => {
            const result = await updateCartItemQuantity(id, newQuantity);

            if (!result.success) {
                // Revert on error
                setCartItems(previousItems);
                toaster.create({
                    title: "Error",
                    description: result.error || "Failed to update quantity",
                    type: "error",
                });
            }
        });
    };

    const removeItem = async (id: string) => {
        // Optimistic update
        const previousItems = cartItems;
        setCartItems(items => items.filter(item => item.id !== id));

        startTransition(async () => {
            const result = await deleteCartItem(id);

            if (!result.success) {
                // Revert on error
                setCartItems(previousItems);
                toaster.create({
                    title: "Error",
                    description: result.error || "Failed to remove item",
                    type: "error",
                });
            } else {
                toaster.create({
                    title: "Item removed",
                    description: "Item has been removed from your cart",
                    type: "success",
                });
            }
        });
    };

    const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const tax = subtotal * 0.1; // 10% tax
    const shipping = cartItems.length > 0 ? 15.00 : 0;
    const total = subtotal + tax + shipping;

    if (cartItems.length === 0) {
        return (
            <Box py={12}>
                <EmptyState.Root>
                    <EmptyState.Content>
                        <EmptyState.Indicator>
                            <LuShoppingCart />
                        </EmptyState.Indicator>
                        <VStack textAlign="center">
                            <EmptyState.Title fontSize="2xl">Your cart is empty</EmptyState.Title>
                            <EmptyState.Description fontSize="md">
                                Explore our products and add items to your cart
                            </EmptyState.Description>
                        </VStack>
                        <Button colorPalette="green" size="lg" mt={4} asChild>
                            <Link href="/">
                                Continue Shopping
                            </Link>
                        </Button>
                    </EmptyState.Content>
                </EmptyState.Root>
            </Box>
        );
    }

    return (
        <Box py={8}>
            <Heading size={{ base: "xl", md: "2xl" }} mb={8} fontWeight="bold">
                Shopping Cart ({cartItems.length} {cartItems.length === 1 ? 'item' : 'items'})
            </Heading>

            <Stack direction={{ base: "column", lg: "row" }} gap={8} alignItems="flex-start">
                {/* Cart Items */}
                <Stack flex="2" gap={4} width="full">
                    {cartItems.map((item) => (
                        <Box
                            key={item.id}
                            p={{ base: 4, md: 6 }}
                            borderWidth="1px"
                            borderRadius="lg"
                            transition="all 0.2s"
                            _hover={{
                                shadow: "md",
                                borderColor: "green.500"
                            }}
                        >
                            <Flex gap={4} direction={{ base: "column", sm: "row" }}>
                                {/* Product Image */}
                                <Box
                                    flexShrink={0}
                                    width={{ base: "full", sm: "120px" }}
                                    height={{ base: "200px", sm: "120px" }}
                                >
                                    <Image
                                        src={item.image}
                                        alt={item.name}
                                        width="full"
                                        height="full"
                                        objectFit="cover"
                                        borderRadius="md"
                                    />
                                </Box>

                                {/* Product Details */}
                                <Stack flex="1" gap={3} justifyContent="space-between">
                                    <Box>
                                        <Heading size={{ base: "md", md: "lg" }} mb={2}>
                                            {item.name}
                                        </Heading>
                                        {!item.inStock && (
                                            <Text color="red.500" fontSize="sm" fontWeight="semibold">
                                                Out of Stock
                                            </Text>
                                        )}
                                        {item.inStock && (
                                            <VStack alignItems="flex-start" gap={1}>
                                                <Text color="green.600" fontSize="sm" fontWeight="semibold">
                                                    In Stock
                                                </Text>
                                                <Text color="gray.600" fontSize="xs">
                                                    {item.stock} {item.stock === 1 ? 'item' : 'items'} available
                                                </Text>
                                            </VStack>
                                        )}
                                    </Box>

                                    <Flex
                                        direction={{ base: "column", md: "row" }}
                                        gap={4}
                                        alignItems={{ base: "flex-start", md: "center" }}
                                        justifyContent="space-between"
                                    >
                                        {/* Quantity Controls */}
                                        <HStack gap={2}>
                                            <Text fontSize="sm" fontWeight="medium" minW="60px">
                                                Quantity:
                                            </Text>
                                            <NumberInput.Root
                                                value={item.quantity.toString()}
                                                onValueChange={(e) => updateQuantity(item.id, parseInt(e.value) || 1)}
                                                min={1}
                                                max={item.stock}
                                                width="120px"
                                                size="sm"
                                                disabled={!item.inStock}
                                            >
                                                <NumberInput.Input />
                                                <NumberInput.Control>
                                                    <NumberInput.IncrementTrigger />
                                                    <NumberInput.DecrementTrigger />
                                                </NumberInput.Control>
                                            </NumberInput.Root>
                                        </HStack>

                                        {/* Price and Remove */}
                                        <HStack gap={4}>
                                            <Text fontSize="xl" fontWeight="bold" color="green.600">
                                                ${(item.price * item.quantity).toFixed(2)}
                                            </Text>
                                            <IconButton
                                                aria-label="Remove item"
                                                variant="ghost"
                                                colorPalette="red"
                                                onClick={() => removeItem(item.id)}
                                                size="sm"
                                            >
                                                <LuTrash2 />
                                            </IconButton>
                                        </HStack>
                                    </Flex>
                                </Stack>
                            </Flex>
                        </Box>
                    ))}
                </Stack>

                {/* Order Summary */}
                <Box
                    flex="1"
                    minW={{ base: "full", lg: "350px" }}
                    maxW={{ base: "full", lg: "400px" }}
                    position={{ base: "static", lg: "sticky" }}
                    top="20px"
                >
                    <Box
                        p={6}
                        borderWidth="1px"
                        borderRadius="lg"
                        bg="bg.muted"
                    >
                        <Heading size="lg" mb={6}>
                            Order Summary
                        </Heading>

                        <Stack gap={4}>
                            <Flex justifyContent="space-between">
                                <Text>Subtotal</Text>
                                <Text fontWeight="semibold">${subtotal.toFixed(2)}</Text>
                            </Flex>

                            <Flex justifyContent="space-between">
                                <Text>Shipping</Text>
                                <Text fontWeight="semibold">${shipping.toFixed(2)}</Text>
                            </Flex>

                            <Flex justifyContent="space-between">
                                <Text>Tax (10%)</Text>
                                <Text fontWeight="semibold">${tax.toFixed(2)}</Text>
                            </Flex>

                            <Separator />

                            <Flex justifyContent="space-between" fontSize="xl">
                                <Text fontWeight="bold">Total</Text>
                                <Text fontWeight="bold" color="green.600">
                                    ${total.toFixed(2)}
                                </Text>
                            </Flex>

                            <Button
                                colorPalette="green"
                                size="lg"
                                width="full"
                                mt={4}
                                disabled={cartItems.some(item => !item.inStock)}
                            >
                                Proceed to Checkout
                                <LuArrowRight />
                            </Button>

                            {cartItems.some(item => !item.inStock) && (
                                <Text fontSize="sm" color="red.500" textAlign="center">
                                    Remove out of stock items to proceed
                                </Text>
                            )}

                            <Button
                                variant="outline"
                                colorPalette="green"
                                size="md"
                                width="full"
                                asChild
                            >
                                <Link href="/">
                                    Continue Shopping
                                </Link>
                            </Button>
                        </Stack>
                    </Box>

                    {/* Promo Code Section */}
                    <Box
                        mt={4}
                        p={6}
                        borderWidth="1px"
                        borderRadius="lg"
                    >
                        <Heading size="md" mb={4}>
                            Have a promo code?
                        </Heading>
                        <Group attached width={"full"}>
                            <Input
                                placeholder="Enter code"
                                style={{
                                    flex: 1,
                                    padding: "8px 12px",
                                    borderRadius: "6px",
                                    border: "1px solid #e2e8f0",
                                    fontSize: "14px"
                                }}
                            />
                            <Button colorPalette="green" size="md" disabled>
                                Apply
                            </Button>
                        </Group>
                    </Box>
                </Box>
            </Stack>
        </Box>
    );
}
