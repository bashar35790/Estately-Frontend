"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button, Spinner } from "@heroui/react";
import { Heart } from "lucide-react";

interface FavoriteButtonProps {
    propertyId: string;
    initialFavorite?: boolean;
}

export function FavoriteButton({
    propertyId,
    initialFavorite = false,
}: FavoriteButtonProps) {
    const [isFavorite, setIsFavorite] = useState(initialFavorite);
    const [isLoading, setIsLoading] = useState(false);

    const handleFavorite = async () => {
        if (isLoading) return;

        const previous = isFavorite;

        // Optimistic UI
        setIsFavorite(!previous);
        setIsLoading(true);

        try {
            const res = await fetch("/api/favorites", {
                method: previous ? "DELETE" : "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    propertyId,
                }),
            });

            if (!res.ok) {
                throw new Error("Request failed");
            }
        } catch (error) {
            console.error(error);
            setIsFavorite(previous);
            alert("Something went wrong.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <motion.div
            whileHover={{
                scale: 1.02,
            }}
            whileTap={{
                scale: 0.98,
            }}
            className="w-full"
        >
            <Button
                onPress={handleFavorite}
                className={`w-full h-14 rounded-2xl font-bold flex items-center justify-center gap-2 border-2 transition-all ${isFavorite
                        ? "bg-rose-50 border-rose-100 text-rose-500"
                        : "bg-default-100 border-transparent text-default-600 hover:bg-default-200"
                    }`}
            >
                {isLoading ? (
                    <Spinner size="sm" color="current" />
                ) : (
                    <Heart
                        size={20}
                        className={isFavorite ? "fill-current" : ""}
                    />
                )}
                {isFavorite ? "Saved to Favorites" : "Add to Favorites"}
            </Button>
        </motion.div>
    );
}
