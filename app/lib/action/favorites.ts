"use server"

import { serverAction, serverMutation } from "../core/server";

export const addFavorite = async (propertyId: string, userId: string) => {
    try {
        const response = await serverMutation("/api/favorites", "POST", { propertyId, userId });
        return response;
    } catch (error) {
        console.error(error);
        return { ok: false, message: "Failed to add favorite" };
    }
}

export const removeFavorite = async (propertyId: string, userId: string) => {
    try {
        const response = await serverMutation(`/api/favorites/${propertyId}?userId=${userId}`, "DELETE", {});
        return response;
    } catch (error) {
        console.error(error);
        return { ok: false, message: "Failed to remove favorite" };
    }
}

export const checkFavoriteStatus = async (propertyId: string, userId: string) => {
    try {
        const response = await serverAction(`/api/favorites/check/${propertyId}?userId=${userId}`);
        return response;
    } catch (error) {
        console.error(error);
        return { isFavorite: false };
    }
}

export const getUserFavorites = async (userId: string) => {
    try {
        const response = await serverAction(`/api/favorites?userId=${userId}`);
        return response;
    } catch (error) {
        console.error(error);
        return [];
    }
}
