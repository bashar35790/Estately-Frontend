import { serverAction } from "../core/server";

export interface TenantBooking {
  _id: string;
  propertyId: string;
  tenantId: string;
  ownerId: string;
  moveInDate: string;
  amount: number;
  bookingStatus: string;
  paymentStatus: string;
  createdAt: string;
  propertyTitle?: string;
  ownerName?: string;
  ownerEmail?: string;
}

export interface TenantStats {
  totalBookings: number;
  activeBookings: number;
  favoriteProperties: number;
  totalPaid: number;
}

export const getTenantBookingsApi = async (tenantId: string): Promise<TenantBooking[]> => {
  const data = await serverAction(`/api/bookings?tenantId=${tenantId}&includeDetails=true`);
  return Array.isArray(data) ? data : [];
};

export const getTenantStatsApi = async (tenantId: string): Promise<TenantStats> => {
  const data = await serverAction(`/api/tenant-stats?tenantId=${tenantId}`);
  return (
    data ?? {
      totalBookings: 0,
      activeBookings: 0,
      favoriteProperties: 0,
      totalPaid: 0,
    }
  );
};
