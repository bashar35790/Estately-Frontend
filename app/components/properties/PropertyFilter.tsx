"use client";

import { useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function PropertyFilter() {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const [location, setLocation] = useState(
        () => searchParams.get("location") ?? ""
    );

    const [propertyType, setPropertyType] = useState(
        () => searchParams.get("propertyType") ?? "all"
    );

    const updateUrl = (loc: string, type: string) => {
        const params = new URLSearchParams(searchParams.toString());

        if (loc.trim()) {
            params.set("location", loc.trim());
        } else {
            params.delete("location");
        }

        if (type !== "all") {
            params.set("propertyType", type);
        } else {
            params.delete("propertyType");
        }

        const query = params.toString();

        router.push(query ? `${pathname}?${query}` : pathname);
    };

    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        updateUrl(location, propertyType);
    };

    const handleClear = () => {
        setLocation("");
        setPropertyType("all");
        updateUrl("", "all");
    };

    const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value;
        setPropertyType(value);
        updateUrl(location, value);
    };

    return (
        <form
            onSubmit={handleSearch}
            className="flex flex-col sm:flex-row items-center gap-4 w-full md:max-w-md"
        >
            <div className="relative w-full">
                <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="Search estates or locations..."
                    className="w-full h-12 pl-4 pr-10 bg-zinc-900 border border-white/10 text-white placeholder-zinc-500 rounded-sm focus:outline-none focus:border-primary/50 transition-colors text-sm font-light tracking-wide"
                />

                {location && (
                    <button
                        type="button"
                        onClick={handleClear}
                        className="absolute right-3 top-0 bottom-0 my-auto text-zinc-500 hover:text-primary text-xs transition-colors"
                    >
                        ✕
                    </button>
                )}
            </div>

            <div className="relative w-full sm:max-w-[160px]">
                <select
                    value={propertyType}
                    onChange={handleTypeChange}
                    className="w-full h-12 px-4 bg-zinc-900 border border-white/10 text-zinc-300 rounded-sm focus:outline-none focus:border-primary/50 transition-colors appearance-none text-sm font-light tracking-wide cursor-pointer"
                >
                    <option value="all">All Properties</option>
                    <option value="villa">Villas</option>
                    <option value="apartment">Apartments</option>
                    <option value="house">Houses</option>
                    <option value="penthouse">Penthouses</option>
                    <option value="studio">Studios</option>
                </select>

                <div className="absolute right-4 top-0 bottom-0 my-auto h-1.5 w-1.5 border-r border-b border-primary rotate-45 pointer-events-none" />
            </div>

            <button type="submit" className="hidden">
                Search
            </button>
        </form>
    );
}
