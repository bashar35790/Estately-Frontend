'use server';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const createSubscription = async (subInfo: any) => {
    try {
        const response = await fetch(`${baseUrl}/api/subscriptions`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(subInfo),
        });

        return response.json();
    } catch (error) {
        console.error(error);
    }
}
