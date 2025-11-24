import { Box, Text, VStack } from "@chakra-ui/react";

export default function Loading() {
    return (
        <Box
            position="fixed"
            top="0"
            left="0"
            right="0"
            bottom="0"
            display="flex"
            alignItems="center"
            justifyContent="center"
            bg="white"
            zIndex="9999"
        >
            <VStack gap={8}>
                <Text fontWeight="bold" fontSize="4xl">
                    <Text as="span" color="green.500">eco</Text>Kart
                </Text>

                <Box
                    position="relative"
                    width="130px"
                    height="100px"
                    bgRepeat="no-repeat"
                    bgImage="linear-gradient(#10b981, #10b981), linear-gradient(#34d399, #6ee7b7), linear-gradient(#34d399, #6ee7b7)"
                    bgSize="80px 70px, 30px 50px, 30px 30px"
                    bgPos="0 0, 80px 20px, 100px 40px"
                    _after={{
                        content: '""',
                        position: "absolute",
                        bottom: "10px",
                        left: "12px",
                        width: "10px",
                        height: "10px",
                        bg: "#fff",
                        borderRadius: "50%",
                        boxSizing: "content-box",
                        border: "10px solid #000",
                        boxShadow: "78px 0 0 -10px #fff, 78px 0 #000",
                        animation: "wheelSk 0.75s ease-in infinite alternate"
                    }}
                    _before={{
                        content: '""',
                        position: "absolute",
                        right: "100%",
                        top: "0px",
                        height: "70px",
                        width: "70px",
                        bgImage: "linear-gradient(#fff 45px, transparent 0), linear-gradient(#fff 45px, transparent 0), linear-gradient(#fff 45px, transparent 0)",
                        bgRepeat: "no-repeat",
                        bgSize: "30px 4px",
                        bgPos: "0px 11px, 8px 35px, 0px 60px",
                        animation: "lineDropping 0.75s linear infinite"
                    }}
                />

                <Text color="gray.600" fontSize="lg">
                    Loading your shopping experience...
                </Text>
            </VStack>

            <style>{`
                @keyframes wheelSk {
                    0%, 50%, 100% { transform: translatey(0) }
                    30%, 90% { transform: translatey(-3px) }
                }

                @keyframes lineDropping {
                    0% {
                        background-position: 100px 11px, 115px 35px, 105px 60px;
                        opacity: 1;
                    }
                    50% { background-position: 0px 11px, 20px 35px, 5px 60px }
                    60% { background-position: -30px 11px, 0px 35px, -10px 60px }
                    75%, 100% {
                        background-position: -30px 11px, -30px 35px, -30px 60px;
                        opacity: 0;
                    }
                }
            `}</style>
        </Box>
    );
}