"use client";

import { useState, useEffect, ReactNode } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePathname, useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import Image from "next/image";
import { User, Settings, LogOut, LayoutDashboard } from "lucide-react";

/**
 * Navbar Component Props and Interfaces
 */
interface NavbarItem {
  label: string;
  href: string;
}

interface NavbarProps {
  brand: ReactNode;
  items: NavbarItem[];
  rightContent?: ReactNode;
  className?: string;
  position?: "static" | "sticky" | "fixed";
}

/**
 * Navbar Component
 * Session-aware navigation bar with user profile dropdown.
 */
export function Navbar({
  brand,
  items,
  rightContent,
  className,
  position = "fixed",
}: NavbarProps) {
  // Better Auth Session Hook
  const {
    data: session,
    isPending,
  } = authClient.useSession();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (pathname.includes("dashboard")) {
    return null;
  }


  /**
   * Handle Logout process
   */
  const handleLogout = async () => {
    await authClient.signOut();
    setIsProfileOpen(false);
    router.refresh();
    router.push("/");
  };

  /**
   * Filter navigation items based on authentication state
   * Hide "Dashboard" if user is not signed in
   */
  const filteredItems = items.filter(item => {
    if (item.label === "Dashboard") return !!session;
    return true;
  });

  return (
    <nav
      className={cn(
        "w-full text-white z-50 bg-transparent transition-all duration-300",
        isScrolled
          ? "backdrop-blur-xl bg-black/80 shadow-lg shadow-black/20 border-b border-white/10"
          : "backdrop-blur-0 bg-transparent border-b border-transparent",
        position === "sticky" && "sticky top-0",
        position === "fixed" && "fixed top-0 inset-x-0",
        position === "static" && "relative",
        className
      )}
    >
      <header className="flex items-center justify-between gap-4 py-3 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4">
          {/* Mobile Menu Toggle */}
          <button
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-100 md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <span className="sr-only">Menu</span>
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>

          <div className="flex items-center gap-3">{brand}</div>
        </div>

        {/* Desktop Navigation Links */}
        <ul className="hidden items-center gap-8 md:flex">
          {filteredItems.map((item) => {
            const actualHref = item.label === "Dashboard" && session
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              ? `/dashboard/${(session.user as any).userRole || 'tenant'}`
              : item.href;

            return (
              <li key={item.label}>
                <Link
                  href={actualHref}
                  className={cn(
                    "text-sm font-medium transition hover:text-white",
                    pathname.startsWith("/dashboard") && item.label === "Dashboard" || pathname === item.href
                      ? "text-[#A3CF16] border-b-2 border-[#A3CF16] pb-1"
                      : "text-slate-300"
                  )}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Right Section: Auth Action or User Profile */}
        <div className="flex items-center gap-4">
          {isPending ? (
            <div className="h-9 w-9 animate-pulse rounded-full bg-white/10" />
          ) : session ? (
            /* User Profile Avatar with Dropdown */
            <div
              className="relative"
              onMouseEnter={() => setIsProfileOpen(true)}
              onMouseLeave={() => setIsProfileOpen(false)}
            >
              <button
                className="relative h-9 w-9 overflow-hidden rounded-full border-2 border-[#A3CF16]/30 transition-all hover:border-[#A3CF16] focus:outline-none focus:ring-2 focus:ring-[#A3CF16]/40"
                aria-label="User profile"
              >
                <Image
                  src={session.user.image || "https://api.dicebear.com/7.x/avataaars/svg?seed=Lucky"}
                  alt={session.user.name}
                  fill
                  sizes="36px"
                  className="object-cover cursor-pointer"
                />
              </button>

              {/* Dropdown Menu on Hover */}
              {isProfileOpen && (
                <div className="absolute right-0 top-full pt-2 w-60 animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="overflow-hidden rounded-2xl border border-white/10 bg-primary/50 shadow-2xl backdrop-blur-xl">
                    {/* User Profile Summary */}
                    <div className="px-4 py-3 bg-white/3 border-b border-white/5">
                      <p className="text-sm font-bold text-white truncate">{session.user.name}</p>
                      <p className="text-[11px] text-[#A3CF16] font-medium uppercase tracking-wider mb-1">
                        {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                        {(session.user as any).userRole || "Tenant"}
                      </p>
                      <p className="text-xs text-white/40 truncate">{session.user.email}</p>
                    </div>

                    {/* Menu Actions */}
                    <div className="p-1.5 flex flex-col gap-0.5">
                      <Link
                        href={`/dashboard/${(session.user as any).userRole}`}
                        className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-[13px] text-slate-300 transition hover:bg-white/5 hover:text-[#A3CF16]"
                        onClick={() => setIsProfileOpen(false)}
                      >
                        <LayoutDashboard size={15} className="opacity-70" /> Dashboard
                      </Link>
                      <Link
                        href="/dashboard/profile"
                        className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-[13px] text-slate-300 transition hover:bg-white/5 hover:text-[#A3CF16]"
                        onClick={() => setIsProfileOpen(false)}
                      >
                        <User size={15} className="opacity-70" /> Profile Details
                      </Link>
                      <Link
                        href="/"
                        className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-[13px] text-slate-300 transition hover:bg-white/5 hover:text-[#A3CF16]"
                        onClick={() => setIsProfileOpen(false)}
                      >
                        <Settings size={15} className="opacity-70" /> Account Settings
                      </Link>

                      <div className="my-1 h-px bg-white/5" />

                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 rounded-xl px-3 py-2.5 text-[13px] text-rose-400 transition hover:bg-rose-500/10 cursor-pointer"
                      >
                        <LogOut size={15} className="opacity-80" /> Sign Out
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : (
            /* Login/Signup Buttons (Unauthenticated) */
            <div className="hidden md:flex items-center gap-4">
              {rightContent}
            </div>
          )}
        </div>
      </header>

      {/* Mobile Sidebar/Menu */}
      {isMenuOpen && (
        <div className="border-t border-white/10 bg-black/10 backdrop-blur-xl px-4 py-6 md:hidden animate-in slide-in-from-top duration-300 max-h-[calc(100vh-4rem)] overflow-y-auto">
          <ul className="flex flex-col gap-1">
            {filteredItems.map((item) => {
              const actualHref = item.label === "Dashboard" && session
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                ? `/dashboard/${(session.user as any).userRole || 'tenant'}`
                : item.href;

              return (
                <li key={item.label}>
                  <Link
                    href={actualHref}
                    className={cn(
                      "block rounded-xl px-4 py-3 text-[15px] font-medium transition",
                      pathname.startsWith("/dashboard") && item.label === "Dashboard" || pathname === item.href
                        ? "bg-[#A3CF16]/10 text-[#A3CF16]"
                        : "text-slate-300 hover:bg-white/5"
                    )}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="mt-6 pt-6 border-t border-white/5">
            {!session && rightContent && (
              <div className="flex flex-col gap-4">{rightContent}</div>
            )}
            {session && (
              <button
                onClick={handleLogout}
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-rose-500/10 px-4 py-3 text-sm font-semibold text-rose-400 transition hover:bg-rose-500/20"
              >
                <LogOut size={16} /> Logout
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
