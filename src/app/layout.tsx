import "@/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";

import { TRPCReactProvider } from "@/trpc/react";

import { Inter as FontSans } from "next/font/google";
import { cn } from "@/lib/utils";
import Header from "./_components/Header";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Live Memory ライブ履歴からプロフィールを簡単に作成",
  description:
    "Live Memory はライブ履歴からプロフィールを簡単に作成できるサービスです。",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ja" className={`${GeistSans.variable}`}>
      <body
        className={cn(
          "mt-16 min-h-screen bg-background bg-gradient-to-b from-black to-blue-950 font-sans text-white antialiased",
          fontSans.variable,
        )}
      >
        <TRPCReactProvider>
          <Header />
          {children}
        </TRPCReactProvider>
      </body>
    </html>
  );
}
