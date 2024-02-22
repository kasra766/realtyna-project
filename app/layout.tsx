import React from "react";
import { Inter as FontSans } from "next/font/google";
import type { Metadata } from "next";
import { Toaster } from "@/components/ui/sonner";

import { UserInfoProvider } from "@/store/user-info-context";
import { cn } from "@/lib/utils";
import "@/styles/globals.css";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Users Employee",
  description: "Realtyna Project",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "h-dvh bg-background font-sans antialiased",
          fontSans.variable,
        )}
      >
        <UserInfoProvider>{children}</UserInfoProvider>
        <Toaster richColors />
      </body>
    </html>
  );
}
