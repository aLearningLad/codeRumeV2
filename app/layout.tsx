import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Providers } from "./lib/Providers";
import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import VisitorLanding from "./components/forVisitors/VisitorLanding";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "codeRume V2",
  description:
    "Code. Collaborate. Share | codeRume is the lightweight, easy-to-use code collaboration platform where rookies and savants gel, built incredible projects, and learn from one another",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <SignedOut>
            <VisitorLanding />
          </SignedOut>

          <SignedIn>
            <Providers>{children}</Providers>
          </SignedIn>
        </body>
      </html>
    </ClerkProvider>
  );
}
