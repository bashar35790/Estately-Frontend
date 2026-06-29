"use server";

import { serverMutation } from "../core/server";
import { revalidatePath } from "next/cache";

/**
 * Delete a property by ID
 */
export const deletePropertyAction = async (propertyId: string) => {
    try {
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
        const res = await fetch(`${baseUrl}/api/properties/${propertyId}`, {
            method: "DELETE",
        });
        revalidatePath("/dashboard/owner/properties");
        return res.json();
    } catch (error) {
        console.error("Error deleting property:", error);
        return null;
    }
};

/**
 * Update property status (pending / approved / rejected)
 */
export const updatePropertyStatusAction = async (propertyId: string, status: string) => {
    try {
        const result = await serverMutation(`/api/properties/${propertyId}/status`, "PATCH", { status });
        revalidatePath("/dashboard/owner/properties");
        return result;
    } catch (error) {
        console.error("Error updating property status:", error);
        return null;
    }
};

/**
 * Approve a booking request
 */
export const approveBookingAction = async (bookingId: string) => {
    try {
        const result = await serverMutation(`/api/bookings/${bookingId}/status`, "PATCH", { status: "confirmed" });
        revalidatePath("/dashboard/owner/bookings");
        return result;
    } catch (error) {
        console.error("Error approving booking:", error);
        return null;
    }
};

/**
 * Reject a booking request
 */
export const rejectBookingAction = async (bookingId: string) => {
    try {
        const result = await serverMutation(`/api/bookings/${bookingId}/status`, "PATCH", { status: "rejected" });
        revalidatePath("/dashboard/owner/bookings");
        return result;
    } catch (error) {
        console.error("Error rejecting booking:", error);
        return null;
    }
};
