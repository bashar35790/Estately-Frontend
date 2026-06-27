"use server"

import { serverMutation } from "../core/server";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

interface PropertyPayload {
    title: string;
    description: string;
    location: string;
    propertyType: string;
    price: number;
    rentType: string;
    bedrooms: number;
    bathrooms: number;
    size: number;
    amenities: string[];
    extraFeatures: string[];
    isFeatured: boolean;
    status: string;
    ownerId: string;
    ownerName: string;
    ownerEmail: string;
    images: string[];
}

export const addProperties = async (data: PropertyPayload) => {
    try {
        const response = await fetch(`${baseUrl}/api/add-properties`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })

        return response.json();
    }
    catch (error) {
        console.error(error);
    }
}

export const addReview = async (data: ReviewPayload) => {
    try {
        const response = await serverMutation("/api/add-review", "POST", data)
        return response;
    }
    catch (error) {
        console.error(error);
    }
}

export const addBooking = async (data: BookingPayload) => {
    try {
        const response = await serverMutation("/api/bookings", "POST", data)
        return response;
    }
    catch (error) {
        console.error(error);
    }
}

