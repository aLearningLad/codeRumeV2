import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Providers } from "./lib/Providers";
import { ClerkProvider, SignedIn, SignedOut } from "@clerk/nextjs";
import VisitorLanding from "./components/forVisitors/VisitorLanding";
import { Baskervville } from "next/font/google";
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
        <link
          rel="icon"
          sizes="<generated>"
          type="image<generated>"
          href="/assets/crlogo.png"
        />
        <body className={baskerville.className}>
          <Toaster />
          <SignedOut>
            <main className=" w-full min-h-screen relative items-center bg-white flex flex-col ">
              <Navbar />
              <VisitorLanding />
              <Footer />
            </main>
          </SignedOut>
          <ClerkProvider dynamic>
            <SignedIn>
              <main className=" w-full min-h-screen">
                <Providers>{children}</Providers>
              </main>
            </SignedIn>
          </ClerkProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
