'use server';

import { serverMutation } from "../core/server";

export const createSubscription = async (subInfo: any) => {
    try {
        const response = await serverMutation("/api/subscriptions", "POST", subInfo);
        return response;
    } catch (error) {
        console.error(error);
    }
}
