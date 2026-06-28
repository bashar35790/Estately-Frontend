import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { addFavorite, removeFavorite, checkFavoriteStatus } from "@/lib/action/favorites";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export function useFavorite(propertyId: string, initialFavorite: boolean = false) {
    const { data: session } = authClient.useSession();
    const [isFavorite, setIsFavorite] = useState(initialFavorite);
    const [isLoading, setIsLoading] = useState(false);
    const [isChecking, setIsChecking] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const checkStatus = async () => {
            if (!session?.user) {
                setIsChecking(false);
                return;
            }
            try {
                const result = await checkFavoriteStatus(propertyId, session.user.id);
                if (result?.isFavorite !== undefined) {
                    setIsFavorite(result.isFavorite);
                }
            } catch (error) {
                console.error("Failed to check favorite status", error);
            } finally {
                setIsChecking(false);
            }
        };

        checkStatus();
    }, [propertyId, session?.user]);

    const toggleFavorite = async () => {
        if (!session?.user) {
            router.push("/auth/sign-in");
            return;
        }

        if (isLoading) return;

        const previousState = isFavorite;
        setIsFavorite(!previousState);
        setIsLoading(true);

        try {
            if (previousState) {
                const res = await removeFavorite(propertyId, session.user.id);
                // Depending on how serverMutation wraps the response, you might need to check res.ok
                if (res && res.message === "Failed to remove favorite") throw new Error("Failed");
                toast.success("Removed from Favorites");
            } else {
                const res = await addFavorite(propertyId, session.user.id);
                if (res && res.message === "Failed to add favorite") throw new Error("Failed");
                toast.success("Added to Favorites");
            }
        } catch (error) {
            console.error(error);
            setIsFavorite(previousState);
            toast.error("Something went wrong.");
        } finally {
            setIsLoading(false);
        }
    };

    return {
        isFavorite,
        isLoading,
        isChecking,
        toggleFavorite
    };
}
