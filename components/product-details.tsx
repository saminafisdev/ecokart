"use client";

import { Avatar, Box, Flex, HStack, Stack, Tabs, Text } from "@chakra-ui/react";
import { LuInfo, LuStar, LuStarHalf } from "react-icons/lu";

interface Review {
    id: number;
    author: string;
    rating: number;
    date: string;
    comment: string;
    verified?: boolean;
}

interface ProductDetailsProps {
    about?: string[];
    reviews?: Review[];
}

const defaultAbout = [
    "Premium quality construction with durable materials",
    "Vintage-inspired design with modern functionality",
    "Compatible with all standard accessories",
    "Energy-efficient and eco-friendly components",
    "Backed by manufacturer's 2-year warranty",
    "Easy to use with intuitive controls",
    "Lightweight and portable design",
    "Available in multiple color options"
];

const defaultReviews: Review[] = [
    {
        id: 1,
        author: "Sarah Johnson",
        rating: 5,
        date: "2025-11-15",
        comment: "Absolutely love this product! The quality exceeded my expectations and it arrived quickly. Highly recommend to anyone looking for a reliable option.",
        verified: true
    },
    {
        id: 2,
        author: "Michael Chen",
        rating: 4,
        date: "2025-11-10",
        comment: "Great product overall. The design is sleek and it works perfectly. Only minor issue is that the instructions could be clearer.",
        verified: true
    },
    {
        id: 3,
        author: "Emma Williams",
        rating: 5,
        date: "2025-11-08",
        comment: "Best purchase I've made this year! The attention to detail is impressive and customer service was excellent.",
        verified: false
    },
    {
        id: 4,
        author: "David Martinez",
        rating: 4.5,
        date: "2025-11-05",
        comment: "Very satisfied with this purchase. Good value for money and performs exactly as described. Would buy again!",
        verified: true
    }
];

const StarRating = ({ rating }: { rating: number }) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const emptyStars = 5 - Math.ceil(rating);

    return (
        <HStack gap={1} color="yellow.500">
            {[...Array(fullStars)].map((_, i) => (
                <LuStar key={`full-${i}`} fill="currentColor" />
            ))}
            {hasHalfStar && <LuStarHalf fill="currentColor" />}
            {[...Array(emptyStars)].map((_, i) => (
                <LuStar key={`empty-${i}`} />
            ))}
        </HStack>
    );
};

export default function ProductDetails({ about = defaultAbout, reviews = defaultReviews }: ProductDetailsProps) {
    const averageRating = reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length;

    return (
        <Box py={8}>
            <Tabs.Root defaultValue="about" variant="enclosed" colorPalette="green" size="lg">
                <Tabs.List>
                    <Tabs.Trigger value="about" gap={2}>
                        <LuInfo />
                        About This Item
                    </Tabs.Trigger>
                    <Tabs.Trigger value="reviews" gap={2}>
                        <LuStar />
                        Reviews ({reviews.length})
                    </Tabs.Trigger>
                </Tabs.List>

                <Tabs.Content value="about" py={6}>
                    <Stack gap={3}>
                        {about.map((item, index) => (
                            <Flex key={index} gap={3} alignItems="flex-start">
                                <Box
                                    mt={2}
                                    width="6px"
                                    height="6px"
                                    borderRadius="full"
                                    bg="green.500"
                                    flexShrink={0}
                                />
                                <Text fontSize="lg" lineHeight="tall">
                                    {item}
                                </Text>
                            </Flex>
                        ))}
                    </Stack>
                </Tabs.Content>

                <Tabs.Content value="reviews" py={6}>
                    <Stack gap={6}>
                        {/* Reviews Summary */}
                        <Box
                            p={6}
                            borderWidth="1px"
                            borderRadius="lg"
                            bg="bg.muted"
                        >
                            <Flex gap={4} alignItems="center" flexWrap="wrap">
                                <Box>
                                    <Text fontSize="4xl" fontWeight="bold">
                                        {averageRating.toFixed(1)}
                                    </Text>
                                </Box>
                                <Stack gap={1}>
                                    <StarRating rating={averageRating} />
                                    <Text fontSize="sm" color="fg.muted">
                                        Based on {reviews.length} reviews
                                    </Text>
                                </Stack>
                            </Flex>
                        </Box>

                        {/* Individual Reviews */}
                        <Stack gap={4}>
                            {reviews.map((review) => (
                                <Box
                                    key={review.id}
                                    p={6}
                                    borderWidth="1px"
                                    borderRadius="lg"
                                    transition="all 0.2s"
                                    _hover={{
                                        shadow: "md",
                                        borderColor: "green.500"
                                    }}
                                >
                                    <Stack gap={3}>
                                        <Flex justifyContent="space-between" alignItems="flex-start" flexWrap="wrap" gap={3}>
                                            <HStack gap={3}>
                                                <Avatar.Root size="sm">
                                                    <Avatar.Fallback name={review.author} />
                                                </Avatar.Root>
                                                <Stack gap={0}>
                                                    <HStack gap={2}>
                                                        <Text fontWeight="semibold">
                                                            {review.author}
                                                        </Text>
                                                        {review.verified && (
                                                            <Text
                                                                fontSize="xs"
                                                                px={2}
                                                                py={0.5}
                                                                bg="green.100"
                                                                color="green.700"
                                                                borderRadius="full"
                                                                fontWeight="medium"
                                                            >
                                                                Verified Purchase
                                                            </Text>
                                                        )}
                                                    </HStack>
                                                    <Text fontSize="sm" color="fg.muted">
                                                        {new Date(review.date).toLocaleDateString('en-US', {
                                                            year: 'numeric',
                                                            month: 'long',
                                                            day: 'numeric'
                                                        })}
                                                    </Text>
                                                </Stack>
                                            </HStack>
                                            <StarRating rating={review.rating} />
                                        </Flex>
                                        <Text fontSize="md" lineHeight="tall">
                                            {review.comment}
                                        </Text>
                                    </Stack>
                                </Box>
                            ))}
                        </Stack>
                    </Stack>
                </Tabs.Content>
            </Tabs.Root>
        </Box>
    );
}
