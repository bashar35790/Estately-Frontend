import { serverAction } from "../core/server";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface OwnerProperty {
    _id: string;
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
    images?: string[];
    rejectionFeedback?: string;
}

export interface OwnerBooking {
    _id: string;
    propertyId: string;
    tenantId: string;
    ownerId: string;
    moveInDate: string;
    contactNumber: string;
    notes: string;
    amount: number;
    bookingStatus: string;
    paymentStatus: string;
    transactionId: string;
    createdAt: string;
    // Populated fields (optional, joined on frontend)
    tenantName?: string;
    tenantEmail?: string;
    propertyTitle?: string;
}

// ─── Owner API Functions ──────────────────────────────────────────────────────

/**
 * Fetch all properties for the owner (server-safe, no-store cache)
 */
export const getOwnerPropertiesApi = async (ownerId: string): Promise<OwnerProperty[]> => {
    const data = await serverAction(`/api/properties?ownerId=${ownerId}`);
    return Array.isArray(data) ? data : [];
};

/**
 * Fetch all bookings for the owner
 */
export const getOwnerBookingsApi = async (ownerId: string): Promise<OwnerBooking[]> => {
    const data = await serverAction(`/api/bookings?ownerId=${ownerId}`);
    return Array.isArray(data) ? data : [];
};

/**
 * Get owner analytics stats
 */
export const getOwnerStats = async (ownerId: string) => {
    return await serverAction(`/api/owner-stats?ownerId=${ownerId}`);
};
