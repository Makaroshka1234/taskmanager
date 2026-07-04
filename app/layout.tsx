"use client";
import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import { cn } from "@/lib/utils";

import { useUserStore } from "./store/useUserStore";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { Toaster } from "@/schadComponents/ui/sonner";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const initAuth = useUserStore((state) => state.initAuth);

  useEffect(() => {
    if (pathname === "/login") return;
    initAuth();
  }, [initAuth]);
  return (
    <html
      lang="en"
      className={cn(
        "h-full",
        "antialiased",
        geistSans.variable,
        geistMono.variable,
        "font-sans",
        inter.variable,
      )}
    >
      <body className="min-h-screen h-full flex flex-col">
        <Header />
        <main className="flex-1 flex flex-col h-full overflow-hidden">
          {children}
        </main>
        <Toaster />
      </body>
    </html>
  );
}
