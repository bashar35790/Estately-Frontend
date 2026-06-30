import { serverAction } from "../core/server";

export interface AdminStats {
  totalUsers: number;
  totalProperties: number;
  totalBookings: number;
  pendingProperties: number;
  confirmedBookings: number;
  totalRevenue: number;
}

export interface AdminUser {
  _id: string;
  id: string;
  name: string;
  email: string;
  image?: string;
  userRole: "tenant" | "owner" | "admin";
  plan?: string;
  banned?: boolean;
  createdAt?: string;
}

export interface AdminProperty {
  _id: string;
  title: string;
  location: string;
  propertyType: string;
  price: number;
  rentType: string;
  bedrooms: number;
  bathrooms: number;
  size: number;
  ownerId: string;
  ownerName: string;
  ownerEmail: string;
  status: "pending" | "approved" | "rejected" | "active" | "rented";
  isFeatured?: boolean;
  rejectionFeedback?: string;
}

export interface AdminBooking {
  _id: string;
  propertyId: string;
  tenantId: string;
  ownerId: string;
  moveInDate: string;
  contactNumber: string;
  amount: number;
  bookingStatus: string;
  paymentStatus: string;
  transactionId?: string;
  createdAt: string;
  propertyTitle?: string;
  tenantName?: string;
  tenantEmail?: string;
  ownerName?: string;
  ownerEmail?: string;
}

export interface AdminTransaction {
  _id: string;
  transactionId: string;
  propertyName: string;
  tenantName: string;
  ownerName: string;
  amount: number;
  date: string;
}

export const getAdminStatsApi = async (): Promise<AdminStats> => {
  const data = await serverAction("/api/admin/stats");
  return (
    data ?? {
      totalUsers: 0,
      totalProperties: 0,
      totalBookings: 0,
      pendingProperties: 0,
      confirmedBookings: 0,
      totalRevenue: 0,
    }
  );
};

export const getAdminUsersApi = async (): Promise<AdminUser[]> => {
  const data = await serverAction("/api/admin/users");
  return Array.isArray(data) ? data : [];
};

export const getAdminPropertiesApi = async (): Promise<AdminProperty[]> => {
  const data = await serverAction("/api/admin/properties");
  return Array.isArray(data) ? data : [];
};

export const getAdminBookingsApi = async (): Promise<AdminBooking[]> => {
  const data = await serverAction("/api/admin/bookings");
  return Array.isArray(data) ? data : [];
};

export const getAdminTransactionsApi = async (): Promise<AdminTransaction[]> => {
  const data = await serverAction("/api/admin/transactions");
  return Array.isArray(data) ? data : [];
};
