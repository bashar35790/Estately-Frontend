import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "./components/navbar/Navbar";
import Link from "next/link";
import Logo from "./utility/Logo";
import LoginButton from "./utility/Button";

import { Playfair_Display, Manrope } from "next/font/google";
import { ToastContainer } from "react-toastify/unstyled";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
});



export const metadata: Metadata = {
  title: "Estately | Find, Book & Manage Rental Properties Online",
  description: "Discover, book, and manage rental properties with RentNest. Browse verified listings, save favorites, make secure payments, and connect with trusted property owners through a seamless rental experience.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html
      lang="en"
      className={`${playfair.variable} ${manrope.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col font-body">
        <Navbar
          brand={
            <Link href="/" className="flex items-center gap-3 rounded-full transition hover:opacity-90">
              <Logo />
              <div>
                <p className="text-lg font-semibold text-white">Estate<span className="text-primary">ly</span></p>
              </div>
            </Link>
          }
          items={[
            { label: "Home", href: "/" },
            { label: "All Properties", href: "/all-properties" },
          ]}
          rightContent={
            <>
              <Link href="/auth/login" className="text-sm font-medium text-slate-200 transition hover:text-white">
                Login
              </Link>
              <LoginButton href="/auth/signup" />
            </>
          }
        />
        <main>
          {children}
        </main>
        <ToastContainer />
      </body>
    </html>
  );
}
