"use server";
import { auth } from "../auth";
import { headers } from "next/headers";

import { serverAction, serverMutation } from "../core/server";

export const getOwnerBookings = async (ownerId: string) => {
  return await serverAction(`/api/bookings?ownerId=${ownerId}`);
};

export const updateBookingStatus = async (
  bookingId: string,
  status: string,
) => {
  return await serverMutation(`/api/bookings/${bookingId}/status`, 'PATCH', { status });
};

export const getCurrentUser = async () => {
  const session = await auth.api.getSession({
    headers: await headers(), // you need to pass the headers object.
  });
  return session?.user;
};
