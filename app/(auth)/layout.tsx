import { Text } from "@chakra-ui/react";
import Link from "next/link";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <Link href="/">
                <Text fontWeight={"bold"} fontSize={"2xl"}><Text as="span" color="green.500">eco</Text>Kart</Text>
            </Link>
            {children}
        </>
    )
}