import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Provider } from "@/components/ui/provider";
import Navbar from "@/components/navbar";
import { Container, Alert } from "@chakra-ui/react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "EcoKart",
  description: "EcoKart: Your sustainable shopping companion.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Provider>
          <Alert.Root status="warning" borderRadius={0}>
            <Alert.Indicator />
            <Alert.Title>
              🚧 This site is currently in development. Features may be unstable.
            </Alert.Title>
          </Alert.Root>
          <Container>
            {children}
          </Container>
        </Provider>
      </body>
    </html>
  );
}
