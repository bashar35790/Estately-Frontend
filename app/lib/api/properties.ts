import { serverAction } from "../core/server";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const getOwnerProperties = async (ownerId: string, status = "") => {
    try {
        const statusQuery = status ? `&status=${status}` : "";
        const res = await fetch(`${baseUrl}/api/properties?ownerId=${ownerId}${statusQuery}`, { cache: 'no-store' });
        return res.json();

    } catch (error) {
        console.log("Error fetching properties", error);
        return null;
    }
}

export const deleteProperty = async (propertyId: string) => {
    try {
        const res = await fetch(`${baseUrl}/api/properties/${propertyId}`, {
            method: 'DELETE',
        });
        return res.json();
    } catch (error) {
        console.log("Error deleting property", error);
        return null;
    }
}

export const getProperty = async (searchParams?: Record<string, string | string[] | undefined>) => {
    let query = "";
    if (searchParams) {
        const params = new URLSearchParams();
        Object.entries(searchParams).forEach(([key, value]) => {
            if (typeof value === "string") {
                params.append(key, value);
            }
        });
        const queryStr = params.toString();
        if (queryStr) query = `?${queryStr}`;
    }
    return serverAction(`/api/properties${query}`);
}

export const getPropertyById = async (id: string) => {
    try {
        const res = await fetch(`${baseUrl}/api/properties/${id}`)
        return res.json();

    } catch (error) {
        console.log("Error fetching property", error);
        return null;
    }

}

