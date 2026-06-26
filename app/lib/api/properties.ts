import { serverAction } from "../core/server";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const getOwnerProperties = async (ownerId: string, status = "pending") => {
    try {
        const res = await fetch(`${baseUrl}/api/properties?ownerId=${ownerId}&status=${status}`)
        return res.json();

    } catch (error) {
        console.log("Error fetching properties", error);
        return null;
    }
}

export const getProperty = async () => {
    return serverAction(`/api/properties`);

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

