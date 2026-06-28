"use client";

import { authClient } from "@/lib/auth-client";
import { IUser } from "@/types/user";
import { Card, Avatar, Chip, Spinner } from "@heroui/react";
import { motion, Variants } from "framer-motion";
import { CalendarIcon, MailIcon, UserIcon } from "lucide-react";



export default function UserProfile() {
    const { data: session, isPending } = authClient.useSession();

    const user = session?.user as unknown as IUser | undefined;

    const containerVariants: Variants = {
        hidden: { opacity: 0, y: 15 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.4, ease: "easeOut" }
        }
    };

    // Helper function to handle both raw date strings and nested MongoDB $date formats safely
    const formatMemberDate = (dateField: { $date: string } | string | undefined): string => {
        if (!dateField) return "N/A";
        const dateString = typeof dateField === "object" && "$date" in dateField ? dateField.$date : dateField;
        return new Date(dateString).toLocaleDateString();
    };

    if (isPending) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-background">
                <Spinner />
            </div>
        );
    }

    if (!user) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-background font-body text-text p-4">
                <Card className="p-6 border border-gray-200 shadow-sm max-w-sm text-center">
                    <Card.Header className="flex flex-col gap-2">
                        <Card.Title className="text-xl font-heading font-bold text-danger">
                            Not Authenticated
                        </Card.Title>
                        <p className="text-sm text-gray-500 font-body">
                            Please sign in to view your profile dashboard details.
                        </p>
                    </Card.Header>
                </Card>
            </div>
        );
    }

    return (
        <div className="flex justify-center items-center min-h-screen bg-background font-body text-text p-4">
            <motion.div
                initial="hidden"
                animate="visible"
                variants={containerVariants}
                className="w-full max-w-4xl"
            >
                <Card className="border border-gray-200/50 shadow-md overflow-hidden bg-white rounded-2xl">
                    <div className="h-48 w-full bg-gradient-to-r from-primary to-secondary" />

                    <div className="relative flex flex-col items-center pb-8 px-6 -mt-16">
                        <div className="relative mb-4">
                            <Avatar className="w-32 h-32 border-4 border-white shadow-lg rounded-full ring-2 ring-secondary/60">
                                <Avatar.Image
                                    alt={user?.name || "User Avatar"}
                                    src={user?.image || undefined}
                                />
                                <Avatar.Fallback>
                                    {(user?.name || "US").substring(0, 2).toUpperCase()}
                                </Avatar.Fallback>
                            </Avatar>
                        </div>

                        <h1 className="text-3xl font-heading font-bold text-text mb-2 tracking-wide text-center">
                            {user?.name || "Anonymous User"}
                        </h1>

                        <Chip
                            className="bg-primary text-white font-semibold font-body px-4 py-1 text-xs rounded-full h-auto tracking-wider uppercase border-none"
                        >
                            {user?.userRole || "Guest"}
                        </Chip>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full mt-8">

                            {/* Full Name Card */}
                            <Card className="border border-gray-100 shadow-none bg-gray-50/50 rounded-xl">
                                <Card.Header className="flex flex-row items-center gap-4 p-5">
                                    <div className="text-primary p-2 bg-primary/10 rounded-lg">
                                        <UserIcon className="w-5 h-5" />
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-xs text-gray-400 font-medium tracking-medium uppercase">Full Name</span>
                                        <Card.Title className="text-sm font-bold text-text font-body p-0 mt-0 bg-transparent shadow-none border-none">
                                            {user?.name || "N/A"}
                                        </Card.Title>
                                    </div>
                                </Card.Header>
                            </Card>

                            {/* Email Address Card */}
                            <Card className="border border-gray-100 shadow-none bg-gray-50/50 rounded-xl">
                                <Card.Header className="flex flex-row items-center gap-4 p-5">
                                    <div className="text-primary p-2 bg-primary/10 rounded-lg">
                                        <MailIcon className="w-5 h-5" />
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-xs text-gray-400 font-medium tracking-medium uppercase">Email Address</span>
                                        <Card.Title className="text-sm font-bold text-text font-body p-0 mt-0 bg-transparent shadow-none border-none">
                                            {user?.email || "N/A"}
                                        </Card.Title>
                                    </div>
                                </Card.Header>
                            </Card>

                            {/* System App Role Card */}
                            <Card className="border border-gray-100 shadow-none bg-gray-50/50 rounded-xl">
                                <Card.Header className="flex flex-row items-center gap-4 p-5">
                                    <div className="text-primary p-2 bg-primary/10 rounded-lg">
                                        <UserIcon className="w-5 h-5" />
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-xs text-gray-400 font-medium tracking-medium uppercase">System Role ({user?.plan || "free"})</span>
                                        <Card.Title className="text-sm font-bold text-text font-body p-0 mt-0 bg-transparent shadow-none border-none capitalize">
                                            {user?.userRole || "user"}
                                        </Card.Title>
                                    </div>
                                </Card.Header>
                            </Card>

                            {/* Member Since Card */}
                            <Card className="border border-gray-100 shadow-none bg-gray-50/50 rounded-xl">
                                <Card.Header className="flex flex-row items-center gap-4 p-5">
                                    <div className="text-primary p-2 bg-primary/10 rounded-lg">
                                        <CalendarIcon className="w-5 h-5" />
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-xs text-gray-400 font-medium tracking-medium uppercase">Member Since</span>
                                        <Card.Title className="text-sm font-bold text-text font-body p-0 mt-0 bg-transparent shadow-none border-none">
                                            {/* Fixed parsing method to prevent Object exceptions */}
                                            {formatMemberDate(user?.createdAt)}
                                        </Card.Title>
                                    </div>
                                </Card.Header>
                            </Card>

                        </div>
                    </div>
                </Card>
            </motion.div>
        </div>
    );
}
