export interface BookingPayloadType {
    propertyId: string;
    tenantId: string;
    ownerId: string;
    moveInDate: string;
    contactNumber: string;
    notes: string;
    amount: number;
    bookingStatus: "pending" | "approved" | "rejected";
    paymentStatus: "paid" | "unpaid" | "refunded";
    transactionId: string;
}
