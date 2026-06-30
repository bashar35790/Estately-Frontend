"use server";

import { revalidatePath } from "next/cache";
import { serverMutation } from "../core/server";

export const updateUserRoleAction = async (userId: string, userRole: string) => {
  const result = await serverMutation(`/api/admin/users/${userId}/role`, "PATCH", { userRole });
  revalidatePath("/dashboard/admin/users");
  revalidatePath("/dashboard/admin");
  return result;
};

export const updateAdminPropertyStatusAction = async (
  propertyId: string,
  status: string,
  rejectionFeedback = "",
) => {
  const result = await serverMutation(`/api/properties/${propertyId}/status`, "PATCH", {
    status,
    rejectionFeedback,
  });

  revalidatePath("/dashboard/admin/properties");
  revalidatePath("/dashboard/admin");
  revalidatePath("/dashboard/owner/properties");
  return result;
};

export const updateAdminPropertyAction = async (
  propertyId: string,
  payload: Record<string, unknown>,
) => {
  const result = await serverMutation(`/api/admin/properties/${propertyId}`, "PATCH", payload);
  revalidatePath("/dashboard/admin/properties");
  revalidatePath("/dashboard/owner/properties");
  return result;
};

export const deleteAdminPropertyAction = async (propertyId: string) => {
  const result = await serverMutation(`/api/properties/${propertyId}`, "DELETE", {});
  revalidatePath("/dashboard/admin/properties");
  revalidatePath("/dashboard/admin");
  revalidatePath("/dashboard/owner/properties");
  return result;
};
