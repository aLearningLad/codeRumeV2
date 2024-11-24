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
import { Inter, Baskervville } from "next/font/google";
import Navbar from "./components/forVisitorLayout/Navbar";
import Footer from "./components/forVisitorLayout/Footer";
import { Toaster } from "react-hot-toast";

const baskerville = Baskervville({ weight: "400", subsets: ["latin"] });
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
    "Code. Collaborate. Share | codeRume is the lightweight, easy-to-use code collaboration platform where rookies and savants gel, build incredible projects, and learn from one another",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={baskerville.className}>
          <Toaster />
          <link
            rel="icon"
            sizes="<generated>"
            type="image<generated>"
            href="/assets/crlogo.png"
          />
          <SignedOut>
            <main className=" w-full min-h-screen relative items-center bg-white flex flex-col ">
              <Navbar />
              <VisitorLanding />
              <Footer />
            </main>
          </SignedOut>
          <ClerkProvider dynamic>
            <SignedIn>
              <main className=" w-full min-h-screen bg-slate-900 p-2 md:p-3 lg:p-5">
                <Providers>{children}</Providers>
              </main>
            </SignedIn>
          </ClerkProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
