"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Calendar,
    Phone,
    Info,
    ShieldCheck,
    ChevronRight,
    X,
    MapPin,
    DollarSign,
    FileText,
} from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { toast } from "react-toastify";

interface Property {
    _id: string;
    title: string;
    description: string;
    location: string;
    propertyType: string;
    price: number;
    rentType: "monthly" | "yearly" | "weekly" | "daily";
    bedrooms: number;
    bathrooms: number;
    size: number;
    amenities: string[];
    extraFeatures: string[];
    isFeatured: boolean;
    status: "pending" | "approved" | "rejected";
    ownerId: string;
    ownerName: string;
    ownerEmail: string;
    images: string[];
}

interface BookingModalProps {
    isOpen: boolean;
    onClose: () => void;
    property: Property;
}

export function BookingModal({ isOpen, onClose, property }: BookingModalProps) {
    const { data: session } = authClient.useSession();
    const [step, setStep] = useState(1);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const [formData, setFormData] = useState({
        moveInDate: "",
        contactNumber: "",
        notes: "",
    });

    const totalAmount = property.price + 99;

    const handleNext = () => {
        if (!formData.moveInDate || !formData.contactNumber) {
            setError("Please fill in Move-in Date and Contact Number.");
            return;
        }
        setError(null);
        setStep(2);
    };

    const handleBack = () => {
        setError(null);
        setStep(1);
    };

    const handleBooking = async () => {
        setIsSubmitting(true);
        setError(null);

        try {
            const response = await fetch("/api/booking_checkout", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    propertyId: property._id,
                    tenantId: session?.user?.id || "",
                    email: session?.user?.email || "",
                    moveInDate: formData.moveInDate,
                    contactNumber: formData.contactNumber,
                    notes: formData.notes,
                }),
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.error || "Failed to create checkout session");
            }

            const data = await response.json();

            if (data.url) {
                // Redirect to Stripe checkout
                window.location.href = data.url;
            } else {
                throw new Error("No checkout URL returned");
            }
        } catch (err: any) {
            console.error("Booking error:", err);
            toast.error(err.message || "Failed to process payment");
            setError(err.message || "An error occurred during checkout.");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        key="backdrop"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-999 bg-black/40 backdrop-blur-md min-h-screen"
                    />

                    {/* Modal Container — click outside to close */}
                    <div
                        className="fixed inset-0 z-1000 overflow-y-auto"
                        onClick={onClose}
                    >
                        <div className="flex items-center justify-center mt-20 sm:p-6">
                            <motion.div
                                key="modal"
                                initial={{ opacity: 0, scale: 0.92, y: 32 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.92, y: 32 }}
                                transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
                                onClick={(e) => e.stopPropagation()}
                                className="relative w-full max-w-2xl flex flex-col rounded-[2rem] overflow-hidden"
                                style={{
                                    background: "#ffffff",
                                    border: "1px solid rgba(51,51,51,0.08)",
                                    boxShadow: "0 32px 80px rgba(30,172,112,0.18), 0 0 0 1px rgba(30,172,112,0.08), inset 0 1px 0 rgba(255,255,255,0.6)",
                                    fontFamily: "var(--font-body, 'Manrope', sans-serif)",
                                }}
                            >
                                {/* Glow accent top */}
                                <div
                                    className="absolute inset-x-0 top-0 h-1"
                                    style={{ background: "linear-gradient(90deg, var(--color-primary, #1eac70), var(--color-secondary, #a3cf16))" }}
                                />

                                {/* Brand glow blob */}
                                <div
                                    className="absolute -top-24 -right-24 w-72 h-72 rounded-full pointer-events-none"
                                    style={{ background: "radial-gradient(circle, rgba(30,172,112,0.10) 0%, transparent 70%)" }}
                                />
                                <div
                                    className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full pointer-events-none"
                                    style={{ background: "radial-gradient(circle, rgba(163,207,22,0.08) 0%, transparent 70%)" }}
                                />

                                {/* Close Button */}
                                <button
                                    onClick={onClose}
                                    className="absolute top-5 right-5 z-10 flex items-center justify-center w-9 h-9 rounded-full transition-all duration-200"
                                    style={{
                                        background: "rgba(51,51,51,0.05)",
                                        border: "1px solid rgba(51,51,51,0.08)",
                                        color: "rgba(51,51,51,0.5)",
                                    }}
                                    onMouseEnter={(e) => {
                                        (e.currentTarget as HTMLButtonElement).style.background = "rgba(30,172,112,0.12)";
                                        (e.currentTarget as HTMLButtonElement).style.color = "#1eac70";
                                    }}
                                    onMouseLeave={(e) => {
                                        (e.currentTarget as HTMLButtonElement).style.background = "rgba(51,51,51,0.05)";
                                        (e.currentTarget as HTMLButtonElement).style.color = "rgba(51,51,51,0.5)";
                                    }}
                                    aria-label="Close modal"
                                >
                                    <X size={16} />
                                </button>

                                {/* Header */}
                                <div className="px-8 pt-8 pb-6 relative">
                                    {/* Step pill */}
                                    <div className="flex items-center gap-3 mb-4">
                                        <span
                                            className="text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full"
                                            style={{
                                                background: "rgba(30,172,112,0.1)",
                                                color: "#1eac70",
                                                border: "1px solid rgba(30,172,112,0.25)",
                                            }}
                                        >
                                            Step {step} of 2
                                        </span>
                                        {/* Step track */}
                                        <div className="flex gap-1.5 ml-1">
                                            <div
                                                className="h-1 w-12 rounded-full transition-all duration-500"
                                                style={{ background: step >= 1 ? "#1eac70" : "rgba(51,51,51,0.1)" }}
                                            />
                                            <div
                                                className="h-1 w-12 rounded-full transition-all duration-500"
                                                style={{ background: step >= 2 ? "#1eac70" : "rgba(51,51,51,0.1)" }}
                                            />
                                        </div>
                                    </div>

                                    <h2
                                        className="text-2xl sm:text-3xl font-bold tracking-tight mb-1"
                                        style={{ color: "#333333", fontFamily: "var(--font-heading, 'Playfair Display', serif)" }}
                                    >
                                        Book This Property
                                    </h2>
                                    <p style={{ color: "rgba(51,51,51,0.55)", fontSize: "0.875rem" }}>
                                        {property.title} &bull; {property.location}
                                    </p>
                                </div>

                                {/* Divider */}
                                <div style={{ height: "1px", background: "rgba(51,51,51,0.08)", margin: "0 2rem" }} />

                                {/* Body */}
                                <div
                                    className="px-8 py-6 flex-1 overflow-y-auto"
                                    style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                                >
                                    <AnimatePresence mode="wait">
                                        {step === 1 ? (
                                            <motion.div
                                                key="step1"
                                                initial={{ opacity: 0, x: 24 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                exit={{ opacity: 0, x: -24 }}
                                                transition={{ duration: 0.22 }}
                                                className="space-y-5"
                                            >
                                                {/* Move-in Date + Contact */}
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                                    {/* Move-in Date */}
                                                    <div>
                                                        <label
                                                            className="text-xs font-semibold uppercase tracking-widest mb-2 flex items-center gap-1.5"
                                                            style={{ color: "rgba(51,51,51,0.6)" }}
                                                        >
                                                            <Calendar size={12} />
                                                            Move-in Date <span style={{ color: "#dc2626" }}>*</span>
                                                        </label>
                                                        <div className="relative">
                                                            <input
                                                                type="date"
                                                                value={formData.moveInDate}
                                                                onChange={(e) => setFormData({ ...formData, moveInDate: e.target.value })}
                                                                className="w-full px-4 py-3.5 rounded-xl text-sm outline-none transition-all duration-200"
                                                                style={{
                                                                    background: "#f0f0f0",
                                                                    border: formData.moveInDate
                                                                        ? "1px solid rgba(30,172,112,0.55)"
                                                                        : "1px solid rgba(51,51,51,0.12)",
                                                                    color: "#333333",
                                                                    colorScheme: "light",
                                                                }}
                                                                onFocus={(e) => {
                                                                    e.currentTarget.style.border = "1px solid #1eac70";
                                                                    e.currentTarget.style.background = "#ffffff";
                                                                    e.currentTarget.style.boxShadow = "0 0 0 3px rgba(30,172,112,0.14)";
                                                                }}
                                                                onBlur={(e) => {
                                                                    e.currentTarget.style.border = formData.moveInDate
                                                                        ? "1px solid rgba(30,172,112,0.55)"
                                                                        : "1px solid rgba(51,51,51,0.12)";
                                                                    e.currentTarget.style.background = "#f0f0f0";
                                                                    e.currentTarget.style.boxShadow = "none";
                                                                }}
                                                            />
                                                        </div>
                                                    </div>

                                                    {/* Contact Number */}
                                                    <div>
                                                        <label
                                                            className="text-xs font-semibold uppercase tracking-widest mb-2 flex items-center gap-1.5"
                                                            style={{ color: "rgba(51,51,51,0.6)" }}
                                                        >
                                                            <Phone size={12} />
                                                            Contact Number <span style={{ color: "#dc2626" }}>*</span>
                                                        </label>
                                                        <div className="relative">
                                                            <input
                                                                type="tel"
                                                                placeholder="+1 (555) 000-0000"
                                                                value={formData.contactNumber}
                                                                onChange={(e) => setFormData({ ...formData, contactNumber: e.target.value })}
                                                                className="w-full px-4 py-3.5 rounded-xl text-sm outline-none transition-all duration-200"
                                                                style={{
                                                                    background: "#f0f0f0",
                                                                    border: formData.contactNumber
                                                                        ? "1px solid rgba(30,172,112,0.55)"
                                                                        : "1px solid rgba(51,51,51,0.12)",
                                                                    color: "#333333",
                                                                }}
                                                                onFocus={(e) => {
                                                                    e.currentTarget.style.border = "1px solid #1eac70";
                                                                    e.currentTarget.style.background = "#ffffff";
                                                                    e.currentTarget.style.boxShadow = "0 0 0 3px rgba(30,172,112,0.14)";
                                                                }}
                                                                onBlur={(e) => {
                                                                    e.currentTarget.style.border = formData.contactNumber
                                                                        ? "1px solid rgba(30,172,112,0.55)"
                                                                        : "1px solid rgba(51,51,51,0.12)";
                                                                    e.currentTarget.style.background = "#f0f0f0";
                                                                    e.currentTarget.style.boxShadow = "none";
                                                                }}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Notes */}
                                                <div>
                                                    <label
                                                        className="text-xs font-semibold uppercase tracking-widest mb-2 flex items-center gap-1.5"
                                                        style={{ color: "rgba(51,51,51,0.6)" }}
                                                    >
                                                        <FileText size={12} />
                                                        Additional Notes
                                                    </label>
                                                    <textarea
                                                        placeholder="Any special requests or notes for the owner..."
                                                        value={formData.notes}
                                                        rows={4}
                                                        onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                                                        className="w-full px-4 py-3.5 rounded-xl text-sm outline-none transition-all duration-200 resize-none"
                                                        style={{
                                                            background: "#f0f0f0",
                                                            border: "1px solid rgba(51,51,51,0.12)",
                                                            color: "#333333",
                                                        }}
                                                        onFocus={(e) => {
                                                            e.currentTarget.style.border = "1px solid #1eac70";
                                                            e.currentTarget.style.background = "#ffffff";
                                                            e.currentTarget.style.boxShadow = "0 0 0 3px rgba(30,172,112,0.14)";
                                                        }}
                                                        onBlur={(e) => {
                                                            e.currentTarget.style.border = "1px solid rgba(51,51,51,0.12)";
                                                            e.currentTarget.style.background = "#f0f0f0";
                                                            e.currentTarget.style.boxShadow = "none";
                                                        }}
                                                    />
                                                </div>

                                                {/* Error */}
                                                {error && (
                                                    <p className="text-sm" style={{ color: "#dc2626" }}>{error}</p>
                                                )}

                                                {/* Info bar */}
                                                <div
                                                    className="flex gap-3 p-4 rounded-2xl"
                                                    style={{
                                                        background: "rgba(163,207,22,0.10)",
                                                        border: "1px solid rgba(163,207,22,0.3)",
                                                    }}
                                                >
                                                    <Info size={18} className="shrink-0 mt-0.5" style={{ color: "#1eac70" }} />
                                                    <p className="text-sm leading-relaxed" style={{ color: "rgba(51,51,51,0.7)" }}>
                                                        Your booking will be sent to the owner for approval after successful payment.
                                                    </p>
                                                </div>
                                            </motion.div>
                                        ) : (
                                            <motion.div
                                                key="step2"
                                                initial={{ opacity: 0, x: 24 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                exit={{ opacity: 0, x: -24 }}
                                                transition={{ duration: 0.22 }}
                                                className="space-y-5"
                                            >
                                                {/* Summary card */}
                                                <div
                                                    className="rounded-2xl p-6 space-y-4"
                                                    style={{
                                                        background: "#f0f0f0",
                                                        border: "1px solid rgba(51,51,51,0.08)",
                                                    }}
                                                >
                                                    <h3
                                                        className="text-lg font-bold mb-4"
                                                        style={{ color: "#333333", fontFamily: "var(--font-heading, 'Playfair Display', serif)" }}
                                                    >
                                                        Booking Summary
                                                    </h3>

                                                    {[
                                                        { icon: <MapPin size={15} />, label: "Property", value: property.title },
                                                        { icon: <Calendar size={15} />, label: "Move-in Date", value: formData.moveInDate },
                                                        { icon: <Phone size={15} />, label: "Contact", value: formData.contactNumber },
                                                        {
                                                            icon: <DollarSign size={15} />,
                                                            label: "Rent",
                                                            value: `$${property.price.toLocaleString()} / ${property.rentType}`,
                                                        },
                                                    ].map((row, i) => (
                                                        <div
                                                            key={i}
                                                            className="flex items-center justify-between py-3"
                                                            style={{ borderBottom: "1px solid rgba(51,51,51,0.08)" }}
                                                        >
                                                            <div className="flex items-center gap-2" style={{ color: "rgba(51,51,51,0.5)" }}>
                                                                {row.icon}
                                                                <span className="text-sm">{row.label}</span>
                                                            </div>
                                                            <span className="text-sm font-semibold" style={{ color: "#333333" }}>
                                                                {row.value}
                                                            </span>
                                                        </div>
                                                    ))}

                                                    {/* Service Fee */}
                                                    <div
                                                        className="flex items-center justify-between py-3"
                                                        style={{ borderBottom: "1px solid rgba(51,51,51,0.08)" }}
                                                    >
                                                        <span className="text-sm" style={{ color: "rgba(51,51,51,0.5)" }}>
                                                            Service Fee
                                                        </span>
                                                        <span className="text-sm font-semibold" style={{ color: "#1eac70" }}>
                                                            $99.00
                                                        </span>
                                                    </div>

                                                    {/* Total */}
                                                    <div className="flex items-center justify-between pt-2">
                                                        <span className="text-base font-bold" style={{ color: "#333333" }}>
                                                            Total Amount
                                                        </span>
                                                        <span
                                                            className="text-xl font-bold"
                                                            style={{ background: "linear-gradient(90deg, #1eac70, #a3cf16)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}
                                                        >
                                                            ${totalAmount.toLocaleString()}
                                                        </span>
                                                    </div>
                                                </div>

                                                {/* Error */}
                                                {error && (
                                                    <p className="text-sm" style={{ color: "#dc2626" }}>{error}</p>
                                                )}

                                                {/* Secure badge */}
                                                <div
                                                    className="flex items-center gap-3 p-4 rounded-2xl"
                                                    style={{
                                                        background: "rgba(30,172,112,0.08)",
                                                        border: "1px solid rgba(30,172,112,0.2)",
                                                    }}
                                                >
                                                    <ShieldCheck size={20} style={{ color: "#1eac70" }} />
                                                    <span className="text-sm font-medium" style={{ color: "rgba(51,51,51,0.75)" }}>
                                                        Secure payment powered by Stripe
                                                    </span>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>

                                {/* Divider */}
                                <div style={{ height: "1px", background: "rgba(51,51,51,0.08)", margin: "0 2rem" }} />

                                {/* Footer */}
                                <div className="px-8 py-6">
                                    {step === 1 ? (
                                        <div className="w-full">
                                            <button
                                                onClick={handleNext}
                                                className="w-full h-14 flex items-center justify-center gap-2 rounded-2xl font-bold text-base transition-all duration-200"
                                                style={{
                                                    background: "linear-gradient(135deg, #1eac70 0%, #169c63 100%)",
                                                    color: "#ffffff",
                                                    boxShadow: "0 8px 32px rgba(30,172,112,0.35), 0 0 0 1px rgba(30,172,112,0.25)",
                                                }}
                                                onMouseEnter={(e) => {
                                                    (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 12px 40px rgba(30,172,112,0.5), 0 0 0 1px rgba(30,172,112,0.35)";
                                                    (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-1px)";
                                                }}
                                                onMouseLeave={(e) => {
                                                    (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 8px 32px rgba(30,172,112,0.35), 0 0 0 1px rgba(30,172,112,0.25)";
                                                    (e.currentTarget as HTMLButtonElement).style.transform = "translateY(0)";
                                                }}
                                            >
                                                Proceed to Summary
                                                <ChevronRight size={18} />
                                            </button>
                                        </div>
                                    ) : (
                                        <div className="flex gap-4">
                                            <button
                                                onClick={handleBack}
                                                className="px-8 h-14 rounded-2xl font-medium text-sm transition-all duration-200"
                                                style={{
                                                    background: "rgba(51,51,51,0.05)",
                                                    border: "1px solid rgba(51,51,51,0.12)",
                                                    color: "rgba(51,51,51,0.7)",
                                                }}
                                                onMouseEnter={(e) => {
                                                    (e.currentTarget as HTMLButtonElement).style.background = "rgba(51,51,51,0.1)";
                                                    (e.currentTarget as HTMLButtonElement).style.color = "#333333";
                                                }}
                                                onMouseLeave={(e) => {
                                                    (e.currentTarget as HTMLButtonElement).style.background = "rgba(51,51,51,0.05)";
                                                    (e.currentTarget as HTMLButtonElement).style.color = "rgba(51,51,51,0.7)";
                                                }}
                                            >
                                                Back
                                            </button>
                                            <button
                                                onClick={handleBooking}
                                                disabled={isSubmitting}
                                                className="flex-1 h-14 flex items-center justify-center gap-2 rounded-2xl font-bold text-base transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
                                                style={{
                                                    background: "linear-gradient(135deg, #1eac70 0%, #169c63 100%)",
                                                    color: "#ffffff",
                                                    boxShadow: "0 8px 32px rgba(30,172,112,0.35)",
                                                }}
                                                onMouseEnter={(e) => {
                                                    if (!isSubmitting) {
                                                        (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 12px 40px rgba(30,172,112,0.5)";
                                                        (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-1px)";
                                                    }
                                                }}
                                                onMouseLeave={(e) => {
                                                    (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 8px 32px rgba(30,172,112,0.35)";
                                                    (e.currentTarget as HTMLButtonElement).style.transform = "translateY(0)";
                                                }}
                                            >
                                                {isSubmitting ? (
                                                    <>
                                                        <span
                                                            className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"
                                                        />
                                                        Processing...
                                                    </>
                                                ) : (
                                                    <>
                                                        Pay & Confirm Booking
                                                        <ShieldCheck size={17} />
                                                    </>
                                                )}
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        </div>{/* end centering flex div */}
                    </div>{/* end overflow-y-auto container */}
                </>
            )}
        </AnimatePresence>
    );
}
