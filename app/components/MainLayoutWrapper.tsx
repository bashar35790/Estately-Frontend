"use client";

import { usePathname } from "next/navigation";
import { ReactNode } from "react";

export function MainLayoutWrapper({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isDashboard = pathname?.includes("dashboard");

  return (
    <main className="flex-1 flex flex-col">
      {children}
    </main>
  );
}
