"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";

export default function PropertyFilter() {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const initialLocation = searchParams.get("location") || "";
    const initialType = searchParams.get("propertyType") || "";

    const [location, setLocation] = useState(initialLocation);
    const [propertyType, setPropertyType] = useState(initialType);

    // Sync state if URL changes from outside
    useEffect(() => {
        setLocation(searchParams.get("location") || "");
        setPropertyType(searchParams.get("propertyType") || "");
    }, [searchParams]);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        updateUrl(location, propertyType);
    };

    const handleClear = () => {
        setLocation("");
        setPropertyType("");
        updateUrl("", "");
    };

    const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newType = e.target.value;
        setPropertyType(newType);
        updateUrl(location, newType);
    };

    const updateUrl = (loc: string, type: string) => {
        const params = new URLSearchParams(searchParams.toString());
        
        if (loc) {
            params.set("location", loc);
        } else {
            params.delete("location");
        }

        if (type && type !== "all") {
            params.set("propertyType", type);
        } else {
            params.delete("propertyType");
        }

        router.push(`${pathname}?${params.toString()}`);
    };

    return (
        <form onSubmit={handleSearch} className="flex flex-col sm:flex-row items-center gap-4 w-full md:max-w-md">
            <div className="relative w-full">
                <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="Search estates or locations..."
                    className="w-full h-12 pl-4 pr-10 bg-zinc-900 border border-white/10 text-white placeholder-zinc-500 rounded-sm focus:outline-none focus:border-amber-500/50 transition-colors text-sm font-light tracking-wide"
                />

                {location && (
                    <button
                        type="button"
                        onClick={handleClear}
                        className="absolute right-3 top-0 bottom-0 my-auto text-zinc-500 hover:text-amber-500 text-xs transition-colors"
                    >
                        ✕
                    </button>
                )}
            </div>

            <div className="relative w-full sm:max-w-[160px]">
                <select
                    aria-label="Filter by property type"
                    value={propertyType}
                    onChange={handleTypeChange}
                    className="w-full h-12 px-4 bg-zinc-900 border border-white/10 text-zinc-300 rounded-sm focus:outline-none focus:border-amber-500/50 transition-colors appearance-none text-sm font-light tracking-wide cursor-pointer"
                >
                    <option value="all">All Properties</option>
                    <option value="villa">Villas</option>
                    <option value="apartment">Apartments</option>
                    <option value="house">Houses</option>
                    <option value="penthouse">Penthouses</option>
                    <option value="studio">Studios</option>
                </select>
                <div className="absolute right-4 top-0 bottom-0 my-auto h-1.5 w-1.5 border-r border-b border-amber-500 rotate-45 pointer-events-none" />
            </div>
            {/* Hidden submit button to allow enter to submit */}
            <button type="submit" className="hidden">Search</button>
        </form>
    );
}
