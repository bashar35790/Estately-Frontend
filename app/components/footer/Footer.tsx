"use client"

import Link from "next/link";
import {
    MapPin,
    Phone,
    Mail,

} from "lucide-react";
import { LogoFacebook, LogoLinkedin } from "@gravity-ui/icons";
import { usePathname } from "next/navigation";

export default function Footer() {
    const pathname = usePathname()
    if (pathname.includes("dashboard")) {
        return null;
    }

    return (
        <footer className="bg-white border-t border-gray-200 w-full">
            <div className="mx-auto container px-6 py-16">
                <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">

                    {/* Brand */}

                    <div>
                        <h2 className="text-3xl font-heading text-primary">
                            Estatly
                        </h2>

                        <p className="mt-5 text-sm leading-7 text-gray-600">
                            Discover premium rental properties with trusted owners,
                            secure booking, and a seamless online experience.
                        </p>

                        <div className="mt-6 space-y-3 text-sm text-gray-600">

                            <div className="flex items-center gap-3">
                                <MapPin size={18} className="text-primary" />
                                Dhaka, Bangladesh
                            </div>

                            <div className="flex items-center gap-3">
                                <Phone size={18} className="text-primary" />
                                +880 1700-000000
                            </div>

                            <div className="flex items-center gap-3">
                                <Mail size={18} className="text-primary" />
                                hello@estatly.com
                            </div>

                        </div>
                    </div>

                    {/* Links */}

                    <div>
                        <h3 className="text-xl font-heading text-text">
                            Quick Links
                        </h3>

                        <div className="mt-5 flex flex-col gap-3 text-sm">

                            <Link href="/">Home</Link>

                            <Link href="/properties">All Properties</Link>

                            <Link href="/about">About</Link>

                            <Link href="/contact">Contact</Link>

                        </div>
                    </div>

                    {/* Properties */}

                    <div>
                        <h3 className="text-xl font-heading text-text">
                            Explore
                        </h3>

                        <div className="mt-5 flex flex-col gap-3 text-sm">

                            <Link href="#">Apartments</Link>

                            <Link href="#">Villas</Link>

                            <Link href="#">Family Homes</Link>

                            <Link href="#">Luxury Rentals</Link>

                        </div>
                    </div>

                    {/* Newsletter */}

                    <div>

                        <h3 className="text-xl font-heading text-text">
                            Newsletter
                        </h3>

                        <p className="mt-4 text-sm text-gray-600">
                            Subscribe to receive the latest properties and offers.
                        </p>

                        <div className="mt-5 flex">

                            <input
                                type="email"
                                placeholder="Your email"
                                className="w-full rounded-l-xl border border-gray-300 px-4 py-3 outline-none focus:border-primary"
                            />

                            <button className="rounded-r-xl bg-primary px-6 text-white transition hover:bg-secondary hover:text-black">
                                Join
                            </button>

                        </div>

                    </div>

                </div>

                {/* Bottom */}

                <div className="mt-14 flex flex-col items-center justify-between gap-5 border-t border-gray-200 pt-8 md:flex-row">

                    <p className="text-sm text-gray-500">
                        © 2026 Estatly. All rights reserved.
                    </p>

                    <div className="flex gap-4">

                        <a
                            href="#"
                            className="rounded-full border p-3 transition hover:border-primary hover:bg-primary hover:text-white"
                        >
                            <LogoFacebook className="w-5 h-5" />
                        </a>

                        <a
                            href="#"
                            className="rounded-full border p-3 transition hover:border-primary hover:bg-primary hover:text-white"
                        >
                            <LogoLinkedin className="w-5 h-5" />
                        </a>

                        <a
                            href="#"
                            className="rounded-full border p-3 transition hover:border-primary hover:bg-primary hover:text-white"
                        >
                            <Mail size={18} />
                        </a>

                    </div>

                </div>

            </div>
        </footer>
    );
}
