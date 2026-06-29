const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const getOwnerStats = async (ownerId: string) => {
    try {
        const res = await fetch(`${baseUrl}/api/owner-stats?ownerId=${ownerId}`);
        return res.json();
    } catch (error) {
        console.log("Error fetching owner stats", error);
        return null;
    }
};
