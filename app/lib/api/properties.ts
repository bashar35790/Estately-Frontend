import { serverAction, serverMutation } from "../core/server";

export const getOwnerProperties = async (ownerId: string, status = "") => {
    const statusQuery = status ? `&status=${status}` : "";
    return await serverAction(`/api/properties?ownerId=${ownerId}${statusQuery}`);
}

export const deleteProperty = async (propertyId: string) => {
    return await serverMutation(`/api/properties/${propertyId}`, 'DELETE', null);
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
    return await serverAction(`/api/properties/${id}`);
}

