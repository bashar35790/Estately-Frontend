import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";

async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const userRole = (session?.user as { userRole?: string } | undefined)?.userRole;

  if (!session?.user) {
    redirect("/auth/login");
  }

  if (userRole !== "admin") {
    redirect(`/dashboard/${userRole || "tenant"}`);
  }

  return <>{children}</>;
}

export default AdminLayout;
