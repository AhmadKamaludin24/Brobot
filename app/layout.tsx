import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/ui/Navbar";
import { ClerkProvider } from "@clerk/nextjs";
import { Suspense } from "react";
import LoadingComponent from "@/components/loader/LoadingComponent";
import { Toaster } from "sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Brobot",
  description: "Real time AI companion for your journey",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Suspense fallback={<LoadingComponent/>}>
      <ClerkProvider>
        <html lang="en">
          <body
            className={`${inter.className} antialiased 
        `}>
          <LoadingComponent/>
            <Navbar />
            {children}
            <Toaster position="top-center"/>
          </body>
        </html>
      </ClerkProvider>
    </Suspense>
  );
}
