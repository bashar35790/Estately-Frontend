"use client";

import { useEffect, useState } from "react";
import { getUserFavorites, removeFavorite } from "@/lib/action/favorites";
import { authClient } from "@/lib/auth-client";
import Image from "next/image";
import Link from "next/link";
import { toast } from "react-toastify";
import { HeartOff, MapPin, DollarSign, Home, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface FavoriteProperty {
    _id: string;
    title: string;
    location: string;
    propertyType: string;
    price: number;
    rentType: string;
    images?: string[];
}

export default function TenantFavoritesPage() {
    const { data: session, isPending } = authClient.useSession();
    const [favorites, setFavorites] = useState<FavoriteProperty[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchFavorites = async () => {
            if (session?.user) {
                try {
                    const data = await getUserFavorites(session.user.id);
                    setFavorites(data || []);
                } catch (error) {
                    console.error("Failed to fetch favorites:", error);
                    toast.error("Failed to load favorites.");
                } finally {
                    setIsLoading(false);
                }
            } else if (!isPending) {
                setIsLoading(false);
            }
        };

        fetchFavorites();
    }, [session?.user, isPending]);

    const handleRemove = async (propertyId: string) => {
        if (!session?.user) return;
        
        // Optimistic update
        const previousFavorites = [...favorites];
        setFavorites(favorites.filter((fav) => fav._id !== propertyId));
        
        try {
            const res = await removeFavorite(propertyId, session.user.id);
            if (res && res.message === "Failed to remove favorite") throw new Error("Failed");
            toast.success("Removed from Favorites");
        } catch (error) {
            console.error(error);
            setFavorites(previousFavorites); // Revert on failure
            toast.error("Could not remove favorite.");
        }
    };

    if (isPending || isLoading) {
        return (
            <div className="flex h-64 items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
        );
    }

    if (!session?.user) {
        return (
            <div className="flex h-64 flex-col items-center justify-center space-y-4">
                <p className="text-default-500">Please sign in to view your favorites.</p>
                <Link href="/auth/sign-in" className="px-6 py-2 bg-primary text-white rounded-lg">
                    Sign In
                </Link>
            </div>
        );
    }

    return (
        <div className="p-4 md:p-8 max-w-7xl mx-auto w-full">
            <div className="mb-8">
                <h1 className="text-3xl font-heading font-bold text-default-900">My Favorites</h1>
                <p className="text-default-500 mt-2">Properties you have saved for later.</p>
            </div>

            {favorites.length === 0 ? (
                <div className="bg-default-50 dark:bg-zinc-900 border border-default-200 dark:border-zinc-800 rounded-3xl p-12 text-center flex flex-col items-center justify-center h-80">
                    <Home className="w-16 h-16 text-default-300 mb-4" />
                    <h3 className="text-xl font-semibold text-default-800">No favorites yet</h3>
                    <p className="text-default-500 mt-2 mb-6">Explore properties and save the ones you love.</p>
                    <Link 
                        href="/all-properties"
                        className="px-6 py-3 bg-primary hover:bg-primary/90 text-white font-medium rounded-xl transition-all shadow-lg shadow-primary/20"
                    >
                        Browse Properties
                    </Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <AnimatePresence>
                        {favorites.map((property) => (
                            <motion.div
                                key={property._id}
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.2 }}
                                className="group relative bg-white dark:bg-zinc-900 rounded-3xl overflow-hidden shadow-sm border border-default-200 dark:border-zinc-800 hover:shadow-xl transition-all flex flex-col"
                            >
                                <div className="relative h-48 w-full overflow-hidden">
                                    {property.images && property.images.length > 0 ? (
                                        <Image
                                            src={property.images[0]}
                                            alt={property.title}
                                            fill
                                            className="object-cover group-hover:scale-110 transition-transform duration-500"
                                        />
                                    ) : (
                                        <div className="w-full h-full bg-default-100 flex items-center justify-center">
                                            <Home className="w-8 h-8 text-default-400" />
                                        </div>
                                    )}
                                    <div className="absolute top-3 right-3">
                                        <button
                                            onClick={() => handleRemove(property._id)}
                                            className="p-2.5 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-sm rounded-full text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-500/10 transition-colors shadow-sm"
                                            aria-label="Remove favorite"
                                        >
                                            <HeartOff size={18} />
                                        </button>
                                    </div>
                                    <div className="absolute bottom-3 left-3 flex gap-2">
                                        <span className="px-3 py-1 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md rounded-full text-xs font-semibold capitalize text-default-700 shadow-sm">
                                            {property.propertyType}
                                        </span>
                                    </div>
                                </div>
                                
                                <div className="p-5 flex-1 flex flex-col">
                                    <h3 className="text-lg font-bold text-default-900 line-clamp-1 mb-1">
                                        {property.title}
                                    </h3>
                                    
                                    <div className="flex items-center gap-1.5 text-sm text-default-500 mb-4">
                                        <MapPin size={14} className="shrink-0" />
                                        <span className="line-clamp-1">{property.location}</span>
                                    </div>
                                    
                                    <div className="mt-auto flex items-center justify-between pt-4 border-t border-default-100 dark:border-zinc-800">
                                        <div className="flex flex-col">
                                            <span className="text-xs text-default-500 uppercase tracking-wider font-semibold mb-0.5">Price</span>
                                            <div className="flex items-baseline gap-1 text-primary">
                                                <DollarSign size={14} className="shrink-0" />
                                                <span className="text-xl font-bold">{property.price.toLocaleString()}</span>
                                                <span className="text-sm text-default-500 font-medium">/{property.rentType}</span>
                                            </div>
                                        </div>
                                        
                                        <Link
                                            href={`/all-properties/${property._id}`}
                                            className="px-4 py-2 bg-default-100 hover:bg-default-200 text-default-700 text-sm font-semibold rounded-xl transition-colors"
                                        >
                                            View Details
                                        </Link>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            )}
        </div>
    );
}
