import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { NextAuthProvider } from "@/components/providers";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Analytics } from "@/components/Analytics";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Ember & Thyme — Modern Restaurant",
    template: "%s — Ember & Thyme",
  },
  description: "Modern seasonal cuisine crafted with fire, smoke, and heart.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
  metadataBase: new URL("https://example.com"),
  openGraph: {
    title: "Ember & Thyme",
    description: "Modern seasonal cuisine crafted with fire, smoke, and heart.",
    type: "website",
    url: "https://example.com",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <NextAuthProvider>
          <Analytics />
          <Header />
          {children}
          <Footer />
        </NextAuthProvider>
      </body>
    </html>
  );
}
