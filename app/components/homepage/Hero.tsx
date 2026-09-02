"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, MapPin, Home, DollarSign } from "lucide-react";
import { motion } from "framer-motion";

export default function HeroSection() {
    const router = useRouter();
    const [searchData, setSearchData] = useState({
        location: "",
        propertyType: "",
        minPrice: "",
        maxPrice: ""
    });

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        const params = new URLSearchParams();
        if (searchData.location) params.append("location", searchData.location);
        if (searchData.propertyType) params.append("propertyType", searchData.propertyType);
        if (searchData.minPrice) params.append("minPrice", searchData.minPrice);
        if (searchData.maxPrice) params.append("maxPrice", searchData.maxPrice);
        
        router.push(`/all-properties?${params.toString()}`);
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: { 
            opacity: 1, 
            y: 0, 
            transition: { 
                type: "spring" as const, stiffness: 50, damping: 20 
            } 
        }
    };

    return (
        <section className="relative min-h-screen w-full overflow-hidden bg-gray-900 text-white flex flex-col justify-center">
            {/* Background Video Layer */}
            <div
                className="absolute inset-0 z-0 h-full w-full pointer-events-none overflow-hidden bg-cover bg-center bg-no-repeat"
                style={{
                    backgroundImage: `url('https://images.unsplash.com/photo-1602941525421-8f8b81d3edbb?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`,
                }}
            >
                <iframe
                    src="https://player.vimeo.com/video/1203055512?background=1&autoplay=1&loop=1&byline=0&title=0&muted=1&playsinline=1"
                    className="absolute top-1/2 left-1/2 h-[56.25vw] min-h-full w-[177.78vh] min-w-full -translate-x-1/2 -translate-y-1/2 object-cover"
                    frameBorder="0"
                    allow="autoplay; fullscreen"
                    allowFullScreen
                    title="Hero Background Video"
                />
                {/* Subtle dark overlay */}
                <div className="absolute inset-0 bg-black/50 z-10" />
            </div>

            {/* Content Container */}
            <div className="relative z-10 flex flex-col items-center justify-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center h-full">
                {/* Main Hero Body */}
                <motion.div 
                    className="max-w-4xl mx-auto w-full"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <motion.h1 variants={itemVariants} className="text-4xl font-bold leading-tight tracking-tight text-white sm:text-6xl md:text-7xl lg:text-8xl drop-shadow-2xl">
                        Find Your Perfect Home, <span className="italic text-primary">Anywhere.</span>
                    </motion.h1>
                    <motion.p variants={itemVariants} className="text-lg text-slate-200 md:text-xl max-w-2xl mx-auto mt-6 drop-shadow-md">
                        Discover premium villas, sky-high penthouses, and storied estates from the world&apos;s most thoughtful hosts.
                    </motion.p>

                    {/* Search Bar Container */}
                    <motion.div variants={itemVariants} className="mt-12 bg-white/10 backdrop-blur-xl border border-white/20 p-2 md:p-3 rounded-3xl shadow-2xl mx-auto max-w-5xl transition-all">
                        <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-3">
                            
                            {/* Location */}
                            <div className="flex-1 bg-white rounded-2xl flex items-center px-4 py-3 md:py-0 h-14 md:h-16 group transition-colors">
                                <MapPin className="text-primary mr-3 w-5 h-5 shrink-0" />
                                <div className="w-full text-left">
                                    <label className="text-[10px] font-bold uppercase tracking-wider text-gray-500 block">Location</label>
                                    <input 
                                        type="text" 
                                        placeholder="Where do you want to live?" 
                                        className="w-full bg-transparent text-black placeholder:text-gray-400 text-sm focus:outline-none font-medium"
                                        value={searchData.location}
                                        onChange={(e) => setSearchData({...searchData, location: e.target.value})}
                                    />
                                </div>
                            </div>

                            {/* Property Type */}
                            <div className="flex-1 bg-white rounded-2xl flex items-center px-4 py-3 md:py-0 h-14 md:h-16 transition-colors relative">
                                <Home className="text-primary mr-3 w-5 h-5 shrink-0" />
                                <div className="w-full text-left">
                                    <label className="text-[10px] font-bold uppercase tracking-wider text-gray-500 block">Property Type</label>
                                    <select 
                                        className="w-full bg-transparent text-black placeholder:text-gray-400 text-sm focus:outline-none font-medium appearance-none cursor-pointer"
                                        value={searchData.propertyType}
                                        onChange={(e) => setSearchData({...searchData, propertyType: e.target.value})}
                                    >
                                        <option value="">All Types</option>
                                        <option value="villa">Villa</option>
                                        <option value="apartment">Apartment</option>
                                        <option value="house">House</option>
                                        <option value="penthouse">Penthouse</option>
                                        <option value="studio">Studio</option>
                                    </select>
                                </div>
                            </div>

                            {/* Price Range */}
                            <div className="flex-1 bg-white rounded-2xl flex items-center px-4 py-3 md:py-0 h-14 md:h-16 transition-colors">
                                <DollarSign className="text-primary mr-3 w-5 h-5 shrink-0" />
                                <div className="w-full text-left flex items-center gap-2">
                                    <div className="flex-1">
                                        <label className="text-[10px] font-bold uppercase tracking-wider text-gray-500 block">Min Price</label>
                                        <input 
                                            type="number" 
                                            placeholder="$0" 
                                            className="w-full bg-transparent text-black placeholder:text-gray-400 text-sm focus:outline-none font-medium"
                                            value={searchData.minPrice}
                                            onChange={(e) => setSearchData({...searchData, minPrice: e.target.value})}
                                        />
                                    </div>
                                    <div className="w-px h-8 bg-gray-200"></div>
                                    <div className="flex-1 pl-2">
                                        <label className="text-[10px] font-bold uppercase tracking-wider text-gray-500 block">Max Price</label>
                                        <input 
                                            type="number" 
                                            placeholder="Any" 
                                            className="w-full bg-transparent text-black placeholder:text-gray-400 text-sm focus:outline-none font-medium"
                                            value={searchData.maxPrice}
                                            onChange={(e) => setSearchData({...searchData, maxPrice: e.target.value})}
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Submit Button */}
                            <button 
                                type="submit"
                                className="h-14 md:h-16 bg-primary hover:bg-secondary hover:text-black text-white font-bold px-8 rounded-full transition-all shadow-lg shadow-primary/25 flex items-center justify-center gap-2 shrink-0 md:min-w-[140px]"
                            >
                                <Search className="w-5 h-5" />
                                <span>Search</span>
                            </button>
                        </form>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
