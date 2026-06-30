import { requireRole } from "@/lib/core/session";

async function AdminLayout({ children }: { children: React.ReactNode }) {
 await requireRole('admin')

  return <>{children}</>;
}

export default AdminLayout;
