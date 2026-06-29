"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { authClient } from "@/lib/auth-client";
import Image from "next/image";
import {
    House,
    MapPin,
    PlusCircle,
    Building,
    Mail,
    Settings,
    Bookmark,
    CreditCard,
    Users,
    LayoutDashboard,
    ChevronRight
} from "lucide-react";
import { Button, Drawer } from "@heroui/react";
import { LayoutSideContentLeft, Person } from "@gravity-ui/icons";
import Logo from "../../utility/Logo";

// Define the shape for our navigation items
interface NavItem {
    icon: React.ComponentType<{ size?: number; className?: string }>;
    href: string;
    label: string;
}

interface NavContentProps {
    navItems: NavItem[];
    pathname: string;
    session: any; // Ideally replace with your explicit session type
    userRole: string;
}

/**
 * NavContent Component
 * Separated outside the main render method to prevent state loss and recreation cycles.
 */
const NavContent = ({ navItems, pathname, session, userRole }: NavContentProps) => (
    <div className="flex flex-col h-full bg-slate-950/80 backdrop-blur-xl border-r border-white/5 dark:bg-black/95 transition-all duration-500">
        {/* Sidebar Header with Logo */}
        <div className="p-8 mb-6 border-b border-white/5">
            <Link href="/" className="flex items-center gap-3 transition hover:opacity-80">
                <Logo />
                <span className="text-2xl font-bold tracking-tight text-white">
                    Estate<span className="text-secondary">ly</span>
                </span>
            </Link>
        </div>

        {/* Navigation links section */}
        <nav className="flex-1 px-4 space-y-1 overflow-y-auto custom-scrollbar">
            <p className="px-4 mb-4 text-[10px] font-bold uppercase tracking-[0.25em] text-white/20">
                Navigation
            </p>
            {navItems && navItems.map((item) => {
                const isActive = pathname === item.href;
                const Icon = item.icon;
                return (
                    <Link
                        key={item.label}
                        href={item.href}
                        className={cn(
                            "group relative flex items-center gap-4 rounded-2xl px-4 py-3.5 text-[13.5px] font-semibold transition-all duration-300",
                            isActive
                                ? "bg-secondary/10 text-secondary border border-secondary/20 shadow-[0_0_20px_rgba(163,207,22,0.05)]"
                                : "text-white/40 hover:bg-white/5 hover:text-white border border-transparent"
                        )}
                    >
                        <Icon size={18} className={cn(
                            "transition-colors duration-300",
                            isActive ? "text-secondary" : "text-white/20 group-hover:text-white"
                        )} />
                        <span className="flex-1">{item.label}</span>
                        {isActive && <ChevronRight size={14} className="text-secondary animate-pulse" />}

                        {/* Subtle active glow */}
                        {isActive && (
                            <div className="absolute inset-0 rounded-2xl blur-[10px] bg-secondary/10 -z-10" />
                        )}
                    </Link>
                );
            })}
        </nav>

        {/* User Profile Summary Section */}
        {session?.user && (
            <div className="p-6 mt-auto border-t border-white/5">
                <div className="flex items-center gap-4 px-3 py-4 rounded-[22px] bg-white/[0.03] border border-white/5 transition-all hover:bg-white/[0.05]">
                    <div className="relative h-11 w-11 shrink-0">
                        <div className="absolute inset-0 rounded-full bg-secondary blur-[2px] opacity-20" />
                        <div className="relative h-full w-full overflow-hidden rounded-full border-2 border-white/10">
                            <Image
                                src={session.user.image || "https://api.dicebear.com/7.x/avataaars/svg?seed=Lucky"}
                                alt={session.user.name || "User profile"}
                                fill
                                sizes="44px"
                                className="object-cover"
                            />
                        </div>
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold text-white truncate leading-none mb-1">
                            {session.user.name}
                        </p>
                        <p className="text-[10px] text-secondary font-extrabold uppercase tracking-widest">
                            {userRole}
                        </p>
                    </div>
                </div>
            </div>
        )}
    </div>
);

/**
 * DashboardSidebar Component
 * Redesigned with glassmorphic elements and secure roles routing.
 */
export function DashboardSidebar() {
    const pathname = usePathname();
    const { data: session } = authClient.useSession();

    // Correctly access userRole (using cast to any for custom field access)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const userRole = (session?.user as any)?.userRole || "tenant";

    // Navigation links for different roles
    const ownerNavLinks: NavItem[] = [
        { icon: House, href: "/dashboard/owner", label: "Overview" },
        { icon: MapPin, href: "/dashboard/owner/properties", label: "My Properties" },
        { icon: PlusCircle, href: "/dashboard/owner/properties/new", label: "Post Property" },
        { icon: Mail, href: "/dashboard/owner/bookings", label: "Booking Requests" },
        { icon: Person, href: "/dashboard/profile", label: "Profile" }
    ];

    const tenantNavLinks: NavItem[] = [
        { icon: LayoutDashboard, href: "/dashboard/tenant", label: "Dashboard" },
        { icon: MapPin, href: "/dashboard/tenant/properties", label: "My Bookings" },
        { icon: Bookmark, href: "/dashboard/tenant/favorites", label: "My Favorites" },
        { icon: Settings, href: "/settings", label: "Account Settings" },
    ];

    const adminNavLinks: NavItem[] = [
        { icon: House, href: "/dashboard/admin", label: "Admin Panel" },
        { icon: Users, href: "/dashboard/admin/users", label: "User Control" },
        { icon: Building, href: "/dashboard/admin/properties", label: "Properties" },
        { icon: CreditCard, href: "/dashboard/admin/payments", label: "Booking Management" },
        { icon: Settings, href: "/dashboard/profile", label: "Profile Settings" },
    ];

    const navLinksMap = {
        owner: ownerNavLinks,
        tenant: tenantNavLinks,
        admin: adminNavLinks
    };

    /**
     * Determine which items to show based on user role
     */
    const navItems = navLinksMap[userRole as keyof typeof navLinksMap] || navLinksMap.tenant;

    return (
        <>
            {/* Desktop persistent Sidebar */}
            <aside className="hidden w-72 shrink-0 lg:block h-screen sticky top-0 z-40 bg-zinc-950">
                <NavContent 
                    navItems={navItems} 
                    pathname={pathname} 
                    session={session} 
                    userRole={userRole} 
                />
            </aside>

            {/* Mobile Drawer trigger and content */}
            <div className="lg:hidden">
                <Drawer>
                    <Button className="lg:hidden" variant="secondary">
                        <LayoutSideContentLeft />
                        Sidebar
                    </Button>
                    <Drawer.Backdrop>
                        <Drawer.Content placement="left">
                            <Drawer.Dialog>
                                <Drawer.CloseTrigger />
                                <Drawer.Header>
                                    <Drawer.Heading>Navigation</Drawer.Heading>
                                </Drawer.Header>
                                <Drawer.Body>
                                    <NavContent 
                                        navItems={navItems} 
                                        pathname={pathname} 
                                        session={session} 
                                        userRole={userRole} 
                                    />
                                </Drawer.Body>
                            </Drawer.Dialog>
                        </Drawer.Content>
                    </Drawer.Backdrop>
                </Drawer>
            </div>
        </>
    );
}
