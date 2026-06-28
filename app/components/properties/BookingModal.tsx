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
                        className="fixed inset-0 z-999 bg-black/75 backdrop-blur-md min-h-screen"
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
                                    background: "linear-gradient(145deg, #0f0f1a 0%, #13131f 50%, #0d0d17 100%)",
                                    border: "1px solid rgba(255,255,255,0.08)",
                                    boxShadow: "0 32px 80px rgba(0,0,0,0.8), 0 0 0 1px rgba(139,92,246,0.15), inset 0 1px 0 rgba(255,255,255,0.05)",
                                }}
                            >
                                {/* Glow accent top */}
                                <div
                                    className="absolute inset-x-0 top-0 h-px"
                                    style={{ background: "linear-gradient(90deg, transparent, rgba(139,92,246,0.6), rgba(59,130,246,0.6), transparent)" }}
                                />

                                {/* Purple glow blob */}
                                <div
                                    className="absolute -top-24 -right-24 w-72 h-72 rounded-full pointer-events-none"
                                    style={{ background: "radial-gradient(circle, rgba(139,92,246,0.12) 0%, transparent 70%)" }}
                                />

                                {/* Close Button */}
                                <button
                                    onClick={onClose}
                                    className="absolute top-5 right-5 z-10 flex items-center justify-center w-9 h-9 rounded-full transition-all duration-200"
                                    style={{
                                        background: "rgba(255,255,255,0.06)",
                                        border: "1px solid rgba(255,255,255,0.08)",
                                        color: "rgba(255,255,255,0.5)",
                                    }}
                                    onMouseEnter={(e) => {
                                        (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.12)";
                                        (e.currentTarget as HTMLButtonElement).style.color = "rgba(255,255,255,0.9)";
                                    }}
                                    onMouseLeave={(e) => {
                                        (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.06)";
                                        (e.currentTarget as HTMLButtonElement).style.color = "rgba(255,255,255,0.5)";
                                    }}
                                    aria-label="Close modal"
                                >
                                    <X size={16} />
                                </button>

                                {/* Header */}
                                <div className="px-8 pt-8 pb-6">
                                    {/* Step pill */}
                                    <div className="flex items-center gap-3 mb-4">
                                        <span
                                            className="text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full"
                                            style={{
                                                background: "rgba(139,92,246,0.15)",
                                                color: "#a78bfa",
                                                border: "1px solid rgba(139,92,246,0.25)",
                                            }}
                                        >
                                            Step {step} of 2
                                        </span>
                                        {/* Step track */}
                                        <div className="flex gap-1.5 ml-1">
                                            <div
                                                className="h-1 w-12 rounded-full transition-all duration-500"
                                                style={{ background: step >= 1 ? "rgba(139,92,246,0.8)" : "rgba(255,255,255,0.1)" }}
                                            />
                                            <div
                                                className="h-1 w-12 rounded-full transition-all duration-500"
                                                style={{ background: step >= 2 ? "rgba(139,92,246,0.8)" : "rgba(255,255,255,0.1)" }}
                                            />
                                        </div>
                                    </div>

                                    <h2
                                        className="text-2xl sm:text-3xl font-bold tracking-tight mb-1"
                                        style={{ color: "#ffffff", fontFamily: "var(--font-heading, inherit)" }}
                                    >
                                        Book This Property
                                    </h2>
                                    <p style={{ color: "rgba(255,255,255,0.45)", fontSize: "0.875rem" }}>
                                        {property.title} &bull; {property.location}
                                    </p>
                                </div>

                                {/* Divider */}
                                <div style={{ height: "1px", background: "rgba(255,255,255,0.06)", margin: "0 2rem" }} />

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
                                                            style={{ color: "rgba(255,255,255,0.55)" }}
                                                        >
                                                            <Calendar size={12} />
                                                            Move-in Date <span style={{ color: "#f87171" }}>*</span>
                                                        </label>
                                                        <div className="relative">
                                                            <input
                                                                type="date"
                                                                value={formData.moveInDate}
                                                                onChange={(e) => setFormData({ ...formData, moveInDate: e.target.value })}
                                                                className="w-full px-4 py-3.5 rounded-xl text-sm outline-none transition-all duration-200"
                                                                style={{
                                                                    background: "rgba(255,255,255,0.05)",
                                                                    border: formData.moveInDate
                                                                        ? "1px solid rgba(139,92,246,0.5)"
                                                                        : "1px solid rgba(255,255,255,0.08)",
                                                                    color: "#ffffff",
                                                                    colorScheme: "dark",
                                                                }}
                                                                onFocus={(e) => {
                                                                    e.currentTarget.style.border = "1px solid rgba(139,92,246,0.6)";
                                                                    e.currentTarget.style.background = "rgba(139,92,246,0.06)";
                                                                    e.currentTarget.style.boxShadow = "0 0 0 3px rgba(139,92,246,0.12)";
                                                                }}
                                                                onBlur={(e) => {
                                                                    e.currentTarget.style.border = formData.moveInDate
                                                                        ? "1px solid rgba(139,92,246,0.5)"
                                                                        : "1px solid rgba(255,255,255,0.08)";
                                                                    e.currentTarget.style.background = "rgba(255,255,255,0.05)";
                                                                    e.currentTarget.style.boxShadow = "none";
                                                                }}
                                                            />
                                                        </div>
                                                    </div>

                                                    {/* Contact Number */}
                                                    <div>
                                                        <label
                                                            className="text-xs font-semibold uppercase tracking-widest mb-2 flex items-center gap-1.5"
                                                            style={{ color: "rgba(255,255,255,0.55)" }}
                                                        >
                                                            <Phone size={12} />
                                                            Contact Number <span style={{ color: "#f87171" }}>*</span>
                                                        </label>
                                                        <div className="relative">
                                                            <input
                                                                type="tel"
                                                                placeholder="+1 (555) 000-0000"
                                                                value={formData.contactNumber}
                                                                onChange={(e) => setFormData({ ...formData, contactNumber: e.target.value })}
                                                                className="w-full px-4 py-3.5 rounded-xl text-sm outline-none transition-all duration-200"
                                                                style={{
                                                                    background: "rgba(255,255,255,0.05)",
                                                                    border: formData.contactNumber
                                                                        ? "1px solid rgba(139,92,246,0.5)"
                                                                        : "1px solid rgba(255,255,255,0.08)",
                                                                    color: "#ffffff",
                                                                }}
                                                                onFocus={(e) => {
                                                                    e.currentTarget.style.border = "1px solid rgba(139,92,246,0.6)";
                                                                    e.currentTarget.style.background = "rgba(139,92,246,0.06)";
                                                                    e.currentTarget.style.boxShadow = "0 0 0 3px rgba(139,92,246,0.12)";
                                                                }}
                                                                onBlur={(e) => {
                                                                    e.currentTarget.style.border = formData.contactNumber
                                                                        ? "1px solid rgba(139,92,246,0.5)"
                                                                        : "1px solid rgba(255,255,255,0.08)";
                                                                    e.currentTarget.style.background = "rgba(255,255,255,0.05)";
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
                                                        style={{ color: "rgba(255,255,255,0.55)" }}
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
                                                            background: "rgba(255,255,255,0.05)",
                                                            border: "1px solid rgba(255,255,255,0.08)",
                                                            color: "#ffffff",
                                                        }}
                                                        onFocus={(e) => {
                                                            e.currentTarget.style.border = "1px solid rgba(139,92,246,0.6)";
                                                            e.currentTarget.style.background = "rgba(139,92,246,0.06)";
                                                            e.currentTarget.style.boxShadow = "0 0 0 3px rgba(139,92,246,0.12)";
                                                        }}
                                                        onBlur={(e) => {
                                                            e.currentTarget.style.border = "1px solid rgba(255,255,255,0.08)";
                                                            e.currentTarget.style.background = "rgba(255,255,255,0.05)";
                                                            e.currentTarget.style.boxShadow = "none";
                                                        }}
                                                    />
                                                </div>

                                                {/* Error */}
                                                {error && (
                                                    <p className="text-sm" style={{ color: "#f87171" }}>{error}</p>
                                                )}

                                                {/* Info bar */}
                                                <div
                                                    className="flex gap-3 p-4 rounded-2xl"
                                                    style={{
                                                        background: "rgba(139,92,246,0.07)",
                                                        border: "1px solid rgba(139,92,246,0.15)",
                                                    }}
                                                >
                                                    <Info size={18} className="shrink-0 mt-0.5" style={{ color: "#a78bfa" }} />
                                                    <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.55)" }}>
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
                                                        background: "rgba(255,255,255,0.04)",
                                                        border: "1px solid rgba(255,255,255,0.08)",
                                                    }}
                                                >
                                                    <h3 className="text-lg font-bold mb-4" style={{ color: "#ffffff" }}>
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
                                                            style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
                                                        >
                                                            <div className="flex items-center gap-2" style={{ color: "rgba(255,255,255,0.4)" }}>
                                                                {row.icon}
                                                                <span className="text-sm">{row.label}</span>
                                                            </div>
                                                            <span className="text-sm font-semibold" style={{ color: "rgba(255,255,255,0.85)" }}>
                                                                {row.value}
                                                            </span>
                                                        </div>
                                                    ))}

                                                    {/* Service Fee */}
                                                    <div
                                                        className="flex items-center justify-between py-3"
                                                        style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
                                                    >
                                                        <span className="text-sm" style={{ color: "rgba(255,255,255,0.4)" }}>
                                                            Service Fee
                                                        </span>
                                                        <span className="text-sm font-semibold" style={{ color: "#a78bfa" }}>
                                                            $99.00
                                                        </span>
                                                    </div>

                                                    {/* Total */}
                                                    <div className="flex items-center justify-between pt-2">
                                                        <span className="text-base font-bold" style={{ color: "#ffffff" }}>
                                                            Total Amount
                                                        </span>
                                                        <span
                                                            className="text-xl font-bold"
                                                            style={{ background: "linear-gradient(90deg, #a78bfa, #60a5fa)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}
                                                        >
                                                            ${totalAmount.toLocaleString()}
                                                        </span>
                                                    </div>
                                                </div>

                                                {/* Error */}
                                                {error && (
                                                    <p className="text-sm" style={{ color: "#f87171" }}>{error}</p>
                                                )}

                                                {/* Secure badge */}
                                                <div
                                                    className="flex items-center gap-3 p-4 rounded-2xl"
                                                    style={{
                                                        background: "rgba(34,197,94,0.07)",
                                                        border: "1px solid rgba(34,197,94,0.15)",
                                                    }}
                                                >
                                                    <ShieldCheck size={20} style={{ color: "#4ade80" }} />
                                                    <span className="text-sm font-medium" style={{ color: "rgba(255,255,255,0.7)" }}>
                                                        Secure payment powered by Stripe
                                                    </span>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>

                                {/* Divider */}
                                <div style={{ height: "1px", background: "rgba(255,255,255,0.06)", margin: "0 2rem" }} />

                                {/* Footer */}
                                <div className="px-8 py-6">
                                    {step === 1 ? (
                                        <div className="w-full">
                                            <button
                                                onClick={handleNext}
                                                className="w-full h-14 flex items-center justify-center gap-2 rounded-2xl font-bold text-base transition-all duration-200"
                                                style={{
                                                    background: "linear-gradient(135deg, #7c3aed 0%, #4f46e5 100%)",
                                                    color: "#ffffff",
                                                    boxShadow: "0 8px 32px rgba(124,58,237,0.4), 0 0 0 1px rgba(124,58,237,0.3)",
                                                }}
                                                onMouseEnter={(e) => {
                                                    (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 12px 40px rgba(124,58,237,0.6), 0 0 0 1px rgba(124,58,237,0.4)";
                                                    (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-1px)";
                                                }}
                                                onMouseLeave={(e) => {
                                                    (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 8px 32px rgba(124,58,237,0.4), 0 0 0 1px rgba(124,58,237,0.3)";
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
                                                    background: "rgba(255,255,255,0.06)",
                                                    border: "1px solid rgba(255,255,255,0.1)",
                                                    color: "rgba(255,255,255,0.7)",
                                                }}
                                                onMouseEnter={(e) => {
                                                    (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.1)";
                                                    (e.currentTarget as HTMLButtonElement).style.color = "#ffffff";
                                                }}
                                                onMouseLeave={(e) => {
                                                    (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.06)";
                                                    (e.currentTarget as HTMLButtonElement).style.color = "rgba(255,255,255,0.7)";
                                                }}
                                            >
                                                Back
                                            </button>
                                            <button
                                                onClick={handleBooking}
                                                disabled={isSubmitting}
                                                className="flex-1 h-14 flex items-center justify-center gap-2 rounded-2xl font-bold text-base transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
                                                style={{
                                                    background: "linear-gradient(135deg, #7c3aed 0%, #4f46e5 100%)",
                                                    color: "#ffffff",
                                                    boxShadow: "0 8px 32px rgba(124,58,237,0.4)",
                                                }}
                                                onMouseEnter={(e) => {
                                                    if (!isSubmitting) {
                                                        (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 12px 40px rgba(124,58,237,0.6)";
                                                        (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-1px)";
                                                    }
                                                }}
                                                onMouseLeave={(e) => {
                                                    (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 8px 32px rgba(124,58,237,0.4)";
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