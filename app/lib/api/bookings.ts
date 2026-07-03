"use server";
import { auth } from "../auth";
import { headers } from "next/headers";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const getOwnerBookings = async (ownerId: string) => {
  try {
    const res = await fetch(`${baseUrl}/api/bookings?ownerId=${ownerId}`, {
      cache: "no-store",
    });
    return res.json();
  } catch (error) {
    console.log("Error fetching owner bookings", error);
    return [];
  }
};

export const updateBookingStatus = async (
  bookingId: string,
  status: string,
) => {
  try {
    const res = await fetch(`${baseUrl}/api/bookings/${bookingId}/status`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status }),
    });
    return res.json();
  } catch (error) {
    console.log("Error updating booking status", error);
    return null;
  }
};

export const getCurrentUser = async () => {
  const session = await auth.api.getSession({
    headers: await headers(), // you need to pass the headers object.
  });
  return session?.user;
};
