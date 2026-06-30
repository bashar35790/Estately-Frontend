const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
export const serverAction = async (path: string) => {
    try {
        const res = await fetch(`${baseUrl}${path}`, {
            cache: 'no-store',
        });

        // handle HTTP errors
        if (!res.ok) {
            console.error("API Error:", res.status);
            return [];
        }

        return await res.json();
    } catch (error) {
        console.error("Error fetching data:", error);
        return [];
    }
};

export const serverMutation = async (path: string, method: string, body: any) => {
    try {
        const res = await fetch(`${baseUrl}${path}`, {
            method,
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        });
        //handle 401, 404, 403
        return res.json();

    } catch (error) {
        console.log("Error fetching properties", error);
        return null;
    }
}
