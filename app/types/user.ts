// 1. Updated Type Interface to match your exact MongoDB structure
export interface IUser {
    _id: { $oid: string } | string; // Accounts for both raw string and MongoDB $oid format
    name: string;
    email: string;
    emailVerified: boolean;
    image: string;
    createdAt: { $date: string } | string; // Accounts for both raw ISO string and MongoDB $date object
    updatedAt: { $date: string } | string;
    role: "user" | "admin";
    banned: boolean;
    userRole: "tenant" | "landlord" | "admin"; // Added "admin" option from your payload sample
    plan: "free" | "premium";
}