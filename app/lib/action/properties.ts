"use server";

import { BookingPayloadType } from "@/types/booking";
import { serverAction, serverMutation } from "../core/server";
import { ReviewPayload } from "@/types/review";

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
    const response = await serverMutation("/api/add-properties", "POST", data);
    return response;
  } catch (error) {
    console.error(error);
  }
};

export const addBooking = async (data: BookingPayloadType) => {
  try {
    const response = await serverMutation("/api/bookings", "POST", data);
    return response;
  } catch (error) {
    console.error(error);
  }
};

export const getReviews = async (propertyId: string) => {
  try {
    const response = await serverAction(
      `/api/reviews?propertyId=${propertyId}`,
    );
    return Array.isArray(response) ? response : [];
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const getAllReviews = async () => {
  try {
    const response = await serverAction(`/api/all-reviews`);
    return Array.isArray(response) ? response : [];
  } catch (error) {
    console.error("Get all reviews error:", error);
    return [];
  }
};

export const addReview = async (data: ReviewPayload) => {
  try {
    const response = await serverMutation("/api/add-review", "POST", data);
    return response;
  } catch (error) {
    console.error(error);
  }
};
