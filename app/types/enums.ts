export const PropertyStatus = {
  Pending: "pending",
  Approved: "approved",
  Rejected: "rejected",
} as const;
export type PropertyStatus = (typeof PropertyStatus)[keyof typeof PropertyStatus];

export const BookingStatus = {
  Pending: "pending",
  Confirmed: "confirmed",
  Approved: "approved",
  Cancelled: "cancelled",
} as const;
export type BookingStatus = (typeof BookingStatus)[keyof typeof BookingStatus];

export const PaymentStatus = {
  Paid: "paid",
  Unpaid: "unpaid",
  Refunded: "refunded",
} as const;
export type PaymentStatus = (typeof PaymentStatus)[keyof typeof PaymentStatus];

export const PropertyType = {
  House: "house",
  Apartment: "apartment",
  Condo: "condo",
  Villa: "villa",
} as const;
export type PropertyType = (typeof PropertyType)[keyof typeof PropertyType];

export const RentType = {
  Rent: "rent",
  Sale: "sale",
  Lease: "lease",
} as const;
export type RentType = (typeof RentType)[keyof typeof RentType];
