
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const getProperties = async (ownerId: string, status = "pending") => {
    try {
        const res = await fetch(`${baseUrl}/api/properties?ownerId=${ownerId}&status=${status}`)
        return res.json();

    } catch (error) {
        console.log("Error fetching properties", error);
        return null;
    }
}

