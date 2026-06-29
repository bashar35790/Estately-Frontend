"use client";

import { motion } from "framer-motion";
import { Button, Spinner } from "@heroui/react";
import { Heart } from "lucide-react";
import { useFavorite } from "@/hooks/useFavorite";

interface FavoriteButtonProps {
    propertyId: string;
    initialFavorite?: boolean;
}

export function FavoriteButton({
    propertyId,
    initialFavorite = false,
}: FavoriteButtonProps) {
    const { isFavorite, isLoading, isChecking, toggleFavorite } = useFavorite(propertyId, initialFavorite);

    return (
        <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full"
        >
            <Button
                onPress={toggleFavorite}
                isDisabled={isLoading || isChecking}
                className={`w-full h-14 rounded-2xl font-bold flex items-center justify-center gap-2 border-2 transition-all ${isFavorite
                    ? "bg-rose-50 border-rose-100 text-rose-500"
                    : "bg-default-100 border-transparent text-default-600 hover:bg-default-200"
                    }`}
            >
                {isLoading || isChecking ? (
                    <Spinner size="sm" color="current" />
                ) : (
                    <motion.div
                        animate={{ scale: isFavorite ? [1, 1.2, 1] : 1 }}
                        transition={{ duration: 0.3 }}
                    >
                        <Heart
                            size={20}
                            className={isFavorite ? "fill-current" : ""}
                        />
                    </motion.div>
                )}
                {isFavorite ? "Saved to Favorites" : "Add to Favorites"}
            </Button>
        </motion.div>
    );
}
