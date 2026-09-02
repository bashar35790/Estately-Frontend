"use client";

import { useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Search, SlidersHorizontal, X } from "lucide-react";

export default function PropertyFilter() {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const [location, setLocation] = useState(() => searchParams.get("location") ?? "");
    const [propertyType, setPropertyType] = useState(() => searchParams.get("propertyType") ?? "all");

    const updateUrl = (loc: string, type: string) => {
        const params = new URLSearchParams(searchParams.toString());
        if (loc.trim()) params.set("location", loc.trim()); else params.delete("location");
        if (type !== "all") params.set("propertyType", type); else params.delete("propertyType");
        params.delete("page");
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

    const hasFilters = location || propertyType !== "all";

    return (
        <form onSubmit={handleSearch} className="flex flex-col sm:flex-row items-stretch gap-3 w-full md:max-w-2xl">

            {/* Search input */}
            <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400 pointer-events-none" />
                <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="Search by city or area..."
                    className="w-full h-12 pl-11 pr-4 bg-white border border-zinc-200 text-zinc-800 placeholder-zinc-400 rounded-xl focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all text-sm font-medium shadow-sm"
                />
            </div>

            {/* Property type select */}
            <div className="relative">
                <SlidersHorizontal className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400 pointer-events-none" />
                <select
                    value={propertyType}
                    onChange={handleTypeChange}
                    className="h-12 pl-10 pr-8 bg-white border border-zinc-200 text-zinc-700 rounded-xl focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all appearance-none text-sm font-medium cursor-pointer shadow-sm"
                >
                    <option value="all">All Types</option>
                    <option value="villa">Villa</option>
                    <option value="apartment">Apartment</option>
                    <option value="house">House</option>
                    <option value="penthouse">Penthouse</option>
                    <option value="studio">Studio</option>
                </select>
                <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2">
                    <svg width="10" height="6" viewBox="0 0 10 6" fill="none">
                        <path d="M1 1l4 4 4-4" stroke="#9ca3af" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </div>
            </div>

            {/* Search button */}
            <button
                type="submit"
                className="h-12 px-6 bg-zinc-900 text-white rounded-xl text-sm font-semibold hover:bg-primary transition-all duration-300 shadow-sm whitespace-nowrap"
            >
                Search
            </button>

            {/* Clear */}
            {hasFilters && (
                <button
                    type="button"
                    onClick={handleClear}
                    className="h-12 w-12 flex items-center justify-center rounded-xl border border-zinc-200 text-zinc-500 hover:border-primary hover:text-primary transition-all bg-white shadow-sm"
                    aria-label="Clear filters"
                >
                    <X className="w-4 h-4" />
                </button>
            )}
        </form>
    );
}
