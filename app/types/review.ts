export interface ReviewPayload {
    _id?: string;
    propertyId: string;
    tenantId: string;
    rating: number;
    comment: string;
    createdAt: string;
    userMeta?: {
        name: string;
        email: string;
        image?: string;
    };
}