import { Box, HStack, Skeleton, Stack } from "@chakra-ui/react";

export default async function Loading() {
    return (
        <Box py={4}>
            <Stack direction={{ base: "column", lg: "row" }} gap={12} py="3">
                {/* Carousel Skeleton */}
                <Box width="full" maxW={{ base: "full", lg: "2xl" }} flex="1">
                    <Skeleton height={{ base: "300px", md: "400px", lg: "500px" }} width="full" borderRadius="md" />
                    <HStack mt={4} gap={2} display={{ base: "none", md: "flex" }}>
                        {[1, 2, 3, 4].map((i) => (
                            <Skeleton key={i} height="80px" width="80px" borderRadius="md" />
                        ))}
                    </HStack>
                </Box>

                {/* Product Info Skeleton */}
                <Box flex="1">
                    {/* Title */}
                    <Skeleton height="40px" width="80%" mb={4} />
                    <Box as="hr" my={4} />

                    {/* Store Info */}
                    <Stack direction="row" py={2} gap={3} align="center">
                        <Skeleton height="40px" width="40px" borderRadius="full" />
                        <Skeleton height="20px" width="150px" />
                    </Stack>
                    <Box as="hr" my={4} />

                    {/* Price & Description */}
                    <Stack py={4} gap={4}>
                        <Skeleton height="36px" width="120px" />
                        <Stack gap={2}>
                            <Skeleton height="16px" width="full" />
                            <Skeleton height="16px" width="full" />
                            <Skeleton height="16px" width="80%" />
                        </Stack>
                        <Skeleton height="20px" width="100px" />
                    </Stack>
                    <Box as="hr" my={4} />

                    {/* Buttons */}
                    <Stack width="full" gap={3} py={4}>
                        <Skeleton height="50px" width="full" borderRadius="full" />
                        <Skeleton height="50px" width="full" borderRadius="full" />
                        <Skeleton height="50px" width="full" borderRadius="full" />
                    </Stack>
                </Box>
            </Stack>

            <Box as="hr" my={4} />

            {/* Similar Items Placeholder */}
            <Box py={4}>
                <Skeleton height="30px" width="200px" mb={6} />
                <HStack gap={4} overflow="hidden">
                    {[1, 2, 3, 4].map((i) => (
                        <Box key={i} width="250px" flexShrink={0}>
                            <Skeleton height="250px" width="full" borderRadius="md" mb={2} />
                            <Skeleton height="20px" width="80%" mb={1} />
                            <Skeleton height="20px" width="40%" />
                        </Box>
                    ))}
                </HStack>
            </Box>

            <Box as="hr" my={4} />

            {/* Product Details Placeholder */}
            <Box py={4}>
                <Skeleton height="30px" width="200px" mb={4} />
                <Stack gap={2}>
                    <Skeleton height="16px" width="full" />
                    <Skeleton height="16px" width="full" />
                    <Skeleton height="16px" width="90%" />
                    <Skeleton height="16px" width="full" />
                </Stack>
            </Box>
        </Box>
    )
}
