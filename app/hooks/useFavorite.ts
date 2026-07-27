"use client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { addFavorite, removeFavorite, checkFavoriteStatus } from "@/lib/action/favorites";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export function useFavorite(propertyId: string, initialFavorite: boolean = false) {
  const { data: session } = authClient.useSession();
  const router = useRouter();
  const queryClient = useQueryClient();

  const { data: isFavorite = initialFavorite, isLoading: isChecking } = useQuery({
    queryKey: ["favoriteStatus", propertyId, session?.user?.id],
    queryFn: async () => {
      if (!session?.user) return initialFavorite;
      const result = await checkFavoriteStatus(propertyId, session.user.id);
      return result?.isFavorite ?? initialFavorite;
    },
    enabled: !!session?.user,
  });

  const toggleMutation = useMutation({
    mutationFn: async () => {
      if (!session?.user) throw new Error("Not authenticated");
      if (isFavorite) {
        const res = await removeFavorite(propertyId, session.user.id);
        if (res && res.message === "Failed to remove favorite") throw new Error("Failed");
        return "removed";
      } else {
        const res = await addFavorite(propertyId, session.user.id);
        if (res && res.message === "Failed to add favorite") throw new Error("Failed");
        return "added";
      }
    },
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ["favoriteStatus", propertyId, session?.user?.id] });
      const previous = queryClient.getQueryData(["favoriteStatus", propertyId, session?.user?.id]);
      queryClient.setQueryData(["favoriteStatus", propertyId, session?.user?.id], !isFavorite);
      return { previous };
    },
    onError: (_err, _vars, context) => {
      queryClient.setQueryData(["favoriteStatus", propertyId, session?.user?.id], context?.previous);
      toast.error("Something went wrong.");
    },
    onSuccess: (result) => {
      toast.success(result === "added" ? "Added to Favorites" : "Removed from Favorites");
      queryClient.invalidateQueries({ queryKey: ["favorites"] });
    },
  });

  const toggleFavorite = () => {
    if (!session?.user) {
      router.push("/auth/sign-in");
      return;
    }
    toggleMutation.mutate();
  };

  return {
    isFavorite,
    isLoading: toggleMutation.isPending,
    isChecking,
    toggleFavorite,
  };
}
