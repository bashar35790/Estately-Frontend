"use client";

import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
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
    ChevronRight,
    LogOut,
    X,
} from "lucide-react";
import { Button, Drawer } from "@heroui/react";
import { LayoutSideContentLeft, Person } from "@gravity-ui/icons";
import Logo from "../../utility/Logo";

// Types

interface NavItem {
    icon: React.ComponentType<{ size?: number; className?: string }>;
    href: string;
    label: string;
}

interface SessionUserWithRole {
    name?: string | null;
    image?: string | null;
    userRole?: string | null;
}

interface SessionShape {
    user?: SessionUserWithRole;
}


// Shared bits — brand avatar (the signature element, reused in 3 places)

const BrandAvatar = ({
    src,
    alt,
    size = 44,
}: {
    src?: string | null;
    alt?: string | null;
    size?: number;
}) => (
    <div
        className="relative shrink-0 rounded-full bg-gradient-to-br from-primary to-secondary p-[2px]"
        style={{ height: size, width: size }}
    >
        <div className="relative h-full w-full overflow-hidden rounded-full bg-[#0b0f0d]">
            <Image
                src={src || "https://api.dicebear.com/7.x/avataaars/svg?seed=Lucky"}
                alt={alt || "User profile"}
                fill
                sizes={`${size}px`}
                className="object-cover"
            />
        </div>
    </div>
);


// Shared bits — nav list, used by both the desktop rail and the mobile drawer


const NavList = ({
    navItems,
    pathname,
    onNavigate,
    density = "comfortable",
}: {
    navItems: NavItem[];
    pathname: string;
    onNavigate?: () => void;
    density?: "comfortable" | "compact";
}) => (
    <nav className="flex-1 space-y-1.5 overflow-y-auto">
        {navItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
                <Link
                    key={item.label}
                    href={item.href}
                    onClick={onNavigate}
                    className={cn(
                        "group relative flex items-center gap-4 rounded-2xl border font-body font-semibold transition-all duration-300",
                        density === "comfortable"
                            ? "px-4 py-3.5 text-[13.5px]"
                            : "px-4 py-4 text-[15px]",
                        isActive
                            ? "border-primary/20 bg-gradient-to-r from-primary/15 via-primary/5 to-transparent text-secondary shadow-[0_0_24px_-8px_rgba(30,172,112,0.35)]"
                            : "border-transparent text-white/45 hover:border-white/5 hover:bg-white/5 hover:text-white"
                    )}
                >
                    <Icon
                        size={18}
                        className={cn(
                            "shrink-0 transition-colors duration-300",
                            isActive ? "text-secondary" : "text-white/25 group-hover:text-white"
                        )}
                    />
                    <span className="flex-1">{item.label}</span>
                    {isActive && <ChevronRight size={14} className="text-secondary" />}
                </Link>
            );
        })}
    </nav>
);

// Desktop persistent rail

const DesktopSidebar = ({
    navItems,
    pathname,
    session,
    userRole,
}: {
    navItems: NavItem[];
    pathname: string;
    session: SessionShape | null;
    userRole: string;
}) => (
    <aside className="hidden w-72 shrink-0 lg:sticky lg:top-0 lg:z-40 lg:flex lg:h-screen lg:flex-col border-r border-white/5 bg-[#0b0f0d]">
        {/* Header / wordmark */}
        <div className="border-b border-white/5 p-8">
            <Link href="/" className="flex items-center gap-3 transition hover:opacity-80">
                <Logo />
                <span className="font-heading text-2xl font-bold tracking-tight text-white">
                    Estate<span className="text-secondary">ly</span>
                </span>
            </Link>
        </div>

        <div className="flex-1 overflow-y-auto px-4 py-6">
            <p className="mb-4 px-4 font-body text-[10px] font-bold uppercase tracking-[0.25em] text-white/20">
                Navigation
            </p>
            <NavList navItems={navItems} pathname={pathname} />
        </div>

        {/* Profile summary */}
        {session?.user && (
            <div className="border-t border-white/5 p-6">
                <div className="flex items-center gap-4 rounded-[22px] border border-white/5 bg-white/[0.03] px-3 py-4 transition-all hover:bg-white/[0.05]">
                    <BrandAvatar src={session.user.image} alt={session.user.name} size={44} />
                    <div className="min-w-0 flex-1">
                        <p className="mb-1 truncate font-body text-sm font-bold leading-none text-white">
                            {session.user.name}
                        </p>
                        <p className="font-body text-[10px] font-extrabold uppercase tracking-widest text-secondary">
                            {userRole}
                        </p>
                    </div>
                </div>
            </div>
        )}
    </aside>
);

// Mobile top bar + drawer

const MobileNav = ({
    navItems,
    pathname,
    session,
    userRole,
    onSignOut,
}: {
    navItems: NavItem[];
    pathname: string;
    session: SessionShape | null;
    userRole: string;
    onSignOut: () => void;
}) => (
    <div className="lg:hidden">
        {/* Spacer so page content clears the fixed bar */}
        <div className="h-16" />

        <Drawer>
            {/* The whole bar is the trigger — HeroUI v3 only wires up the first
                child as the Drawer trigger, so hamburger + avatar live inside
                one full-width button rather than as two separate triggers. */}
            <Button
                variant="ghost"
                className="fixed inset-x-0 top-0 z-50 h-16 w-full min-w-0 justify-between rounded-none border-b border-white/5 bg-[#0b0f0d]/95 px-4 backdrop-blur-xl hover:bg-[#0b0f0d]/95"
            >
                <span className="flex items-center gap-3">
                    <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/5 bg-white/5 text-white/70">
                        <LayoutSideContentLeft />
                    </span>
                    <span className="font-heading text-lg font-bold tracking-tight text-white">
                        Estate<span className="text-secondary">ly</span>
                    </span>
                </span>

                <BrandAvatar src={session?.user?.image} alt={session?.user?.name} size={36} />
            </Button>

            <Drawer.Backdrop className="bg-black/70 backdrop-blur-sm">
                <Drawer.Content placement="left" className="w-[85%] max-w-sm">
                    <Drawer.Dialog className="flex h-full flex-col bg-[#0b0f0d] text-white">
                        {/* Header */}
                        <div className="flex items-start justify-between p-6 pb-4">
                            {session?.user ? (
                                <div className="flex items-center gap-4">
                                    <BrandAvatar
                                        src={session.user.image}
                                        alt={session.user.name}
                                        size={52}
                                    />
                                    <div className="min-w-0">
                                        <p className="truncate font-heading text-lg font-bold leading-tight text-white">
                                            {session.user.name}
                                        </p>
                                        <p className="mt-0.5 font-body text-[11px] font-extrabold uppercase tracking-widest text-secondary">
                                            {userRole}
                                        </p>
                                    </div>
                                </div>
                            ) : (
                                <Link
                                    href="/"
                                    className="flex items-center gap-3"
                                >
                                    <Logo />
                                    <span className="font-heading text-xl font-bold text-white">
                                        Estate<span className="text-secondary">ly</span>
                                    </span>
                                </Link>
                            )}

                            <Drawer.CloseTrigger
                                aria-label="Close menu"
                                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/5 bg-white/5 text-white/50 transition hover:bg-white/10 hover:text-white"
                            >
                                <X size={16} />
                            </Drawer.CloseTrigger>
                        </div>

                        <div className="mx-6 mb-2 border-t border-white/5" />

                        {/* Nav list */}
                        <div className="flex-1 overflow-y-auto px-4 py-2">
                            <NavList
                                navItems={navItems}
                                pathname={pathname}
                                density="compact"
                            />
                        </div>

                        {/* Sign out */}
                        <div className="border-t border-white/5 p-4">
                            <button
                                onClick={onSignOut}
                                className="flex w-full items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 py-3.5 font-body text-sm font-bold text-white transition-all hover:border-red-500/20 hover:bg-red-500/10 hover:text-red-400"
                            >
                                <LogOut size={16} />
                                Sign out
                            </button>
                        </div>
                    </Drawer.Dialog>
                </Drawer.Content>
            </Drawer.Backdrop>
        </Drawer>
    </div>
);

// Root component

export function DashboardSidebar() {
    const pathname = usePathname();
    const router = useRouter();
    const { data: session } = authClient.useSession();
    const sessionUser = session?.user as SessionUserWithRole | undefined;
    const userRole = sessionUser?.userRole || "tenant";

    const ownerNavLinks: NavItem[] = [
        { icon: House, href: "/dashboard/owner", label: "Overview" },
        { icon: MapPin, href: "/dashboard/owner/properties", label: "My Properties" },
        { icon: PlusCircle, href: "/dashboard/owner/properties/new", label: "Post Property" },
        { icon: Mail, href: "/dashboard/owner/bookings", label: "Booking Requests" },
        { icon: Person, href: "/dashboard/profile", label: "Profile" },
    ];

    const tenantNavLinks: NavItem[] = [
        { icon: LayoutDashboard, href: "/dashboard/tenant", label: "Dashboard" },
        { icon: MapPin, href: "/dashboard/tenant/properties", label: "My Bookings" },
        { icon: Bookmark, href: "/dashboard/tenant/favorites", label: "My Favorites" },
        { icon: Settings, href: "/dashboard/profile", label: "Profile" },
    ];

    const adminNavLinks: NavItem[] = [
        { icon: House, href: "/dashboard/admin", label: "Admin Panel" },
        { icon: Users, href: "/dashboard/admin/users", label: "User Control" },
        { icon: Building, href: "/dashboard/admin/properties", label: "Properties" },
        { icon: Mail, href: "/dashboard/admin/bookings", label: "Bookings" },
        { icon: CreditCard, href: "/dashboard/admin/transactions", label: "Transactions" },
        { icon: Settings, href: "/dashboard/profile", label: "Profile Settings" },
    ];

    const navLinksMap = {
        owner: ownerNavLinks,
        tenant: tenantNavLinks,
        admin: adminNavLinks,
    };

    const navItems = navLinksMap[userRole as keyof typeof navLinksMap] || navLinksMap.tenant;

    // NOTE: verify this matches your actual authClient (better-auth) signature —
    // adjust the fetchOptions/redirect below if your setup differs.
    const handleSignOut = async () => {
        try {
            await authClient.signOut({
                fetchOptions: {
                    onSuccess: () => router.push("/login"),
                },
            });
        } catch (error) {
            console.error("Sign out failed:", error);
        }
    };

    return (
        <>
            <DesktopSidebar
                navItems={navItems}
                pathname={pathname}
                session={session as SessionShape | null}
                userRole={userRole}
            />
            <MobileNav
                navItems={navItems}
                pathname={pathname}
                session={session as SessionShape | null}
                userRole={userRole}
                onSignOut={handleSignOut}
            />
        </>
    );
}
