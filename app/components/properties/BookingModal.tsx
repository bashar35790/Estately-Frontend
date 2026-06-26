"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Phone, Info, ShieldCheck, ChevronRight } from "lucide-react";
import { Modal, Button } from "@heroui/react";

interface BookingModalProps {
    isOpen: boolean;
    onClose: () => void;
    property: {
        title: string;
        price: number;
        rentType: string;
    };
}

export function BookingModal({ isOpen, onClose, property }: BookingModalProps) {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        moveInDate: "",
        contactNumber: "",
        notes: "",
    });

    const handleNext = () => setStep(2);
    const handleBack = () => setStep(1);

    const handleBooking = async () => {
        // Redirect to payment
        window.location.href = `/api/checkout_sessions?propertyTitle=${encodeURIComponent(property.title)}&amount=${property.price}`;
    };

    return (
        <Modal value={isOpen} onValueChange={(val) => { if (!val) onClose(); }}>
            <Modal.Backdrop>
                <Modal.Container placement="auto">
                    <Modal.Dialog className="sm:max-w-2xl dark:bg-zinc-950 font-sans p-0 overflow-hidden rounded-[2rem]">
                        <Modal.CloseTrigger onClick={onClose} />

                        <Modal.Header className="p-8 pb-4 flex flex-col items-start gap-1">
                            <Modal.Heading className="text-3xl font-heading tracking-tight text-foreground">
                                Book {property.title}
                            </Modal.Heading>
                            <p className="text-default-500 font-body text-sm">
                                Secure your dream home in a few simple steps
                            </p>
                        </Modal.Header>

                        <Modal.Body className="px-8 py-4 overflow-visible">
                            <AnimatePresence mode="wait">
                                {step === 1 ? (
                                    <motion.div
                                        key="step1"
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        className="space-y-6"
                                    >
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <label className="text-sm font-semibold text-default-700 font-body">Move-in Date</label>
                                                <div className="relative">
                                                    <Calendar size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-default-400" />
                                                    <input
                                                        type="date"
                                                        value={formData.moveInDate}
                                                        onChange={(e) => setFormData({ ...formData, moveInDate: e.target.value })}
                                                        className="w-full pl-12 pr-4 py-3 bg-default-100 dark:bg-zinc-800 rounded-xl outline-none focus:ring-2 focus:ring-primary/50 transition-all font-body text-sm"
                                                    />
                                                </div>
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-sm font-semibold text-default-700 font-body">Contact Number</label>
                                                <div className="relative">
                                                    <Phone size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-default-400" />
                                                    <input
                                                        type="tel"
                                                        placeholder="+1 (555) 000-0000"
                                                        value={formData.contactNumber}
                                                        onChange={(e) => setFormData({ ...formData, contactNumber: e.target.value })}
                                                        className="w-full pl-12 pr-4 py-3 bg-default-100 dark:bg-zinc-800 rounded-xl outline-none focus:ring-2 focus:ring-primary/50 transition-all font-body text-sm"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-semibold text-default-700 font-body">Additional Notes</label>
                                            <textarea
                                                placeholder="Any special requests or information..."
                                                value={formData.notes}
                                                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                                                className="w-full p-4 bg-default-100 dark:bg-zinc-800 rounded-xl outline-none focus:ring-2 focus:ring-primary/50 transition-all font-body text-sm min-h-[120px]"
                                            />
                                        </div>

                                        <div className="bg-primary/5 p-4 rounded-2xl border border-primary/10 flex gap-4">
                                            <Info className="shrink-0 text-primary" size={20} />
                                            <p className="text-sm text-default-600 font-body">
                                                Your booking request will be sent to the owner for approval after successful payment.
                                            </p>
                                        </div>
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        key="step2"
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        className="space-y-6"
                                    >
                                        <div className="bg-default-50 dark:bg-zinc-900 rounded-3xl p-6 space-y-4 border border-default-100 dark:border-white/5">
                                            <h3 className="text-xl font-bold font-heading">Booking Summary</h3>
                                            <div className="space-y-3">
                                                <div className="flex justify-between pb-3 border-b border-default-100">
                                                    <span className="text-default-500 font-body">Property</span>
                                                    <span className="font-bold text-foreground font-body">{property.title}</span>
                                                </div>
                                                <div className="flex justify-between pb-3 border-b border-default-100">
                                                    <span className="text-default-500 font-body">Rent</span>
                                                    <span className="font-bold text-foreground font-body">${property.price.toLocaleString()} / {property.rentType}</span>
                                                </div>
                                                <div className="flex justify-between pb-3 border-b border-default-100">
                                                    <span className="text-default-500 font-body">Service Fee</span>
                                                    <span className="font-bold text-primary font-body">$99.00</span>
                                                </div>
                                                <div className="flex justify-between pt-2">
                                                    <span className="text-xl font-bold font-heading">Total Amount</span>
                                                    <span className="text-xl font-bold text-primary font-heading">${(property.price + 99).toLocaleString()}</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-3 text-success font-medium bg-success/5 p-4 rounded-2xl border border-success/10">
                                            <ShieldCheck size={24} />
                                            <span className="font-body">Secure Stripe Payment Integrated</span>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </Modal.Body>

                        <Modal.Footer className="p-8 pt-4">
                            {step === 1 ? (
                                <Button
                                    fullWidth
                                    onPress={handleNext}
                                    className="font-bold text-white h-14 text-lg bg-primary rounded-2xl shadow-xl shadow-primary/20 flex items-center justify-center gap-2"
                                >
                                    Proceed to Summary <ChevronRight size={18} />
                                </Button>
                            ) : (
                                <div className="flex w-full gap-4">
                                    <Button
                                        onPress={handleBack}
                                        className="px-8 h-14 font-medium rounded-2xl bg-default-100 text-default-700"
                                    >
                                        Back
                                    </Button>
                                    <Button
                                        fullWidth
                                        onPress={handleBooking}
                                        className="font-bold text-white h-14 text-lg bg-primary rounded-2xl shadow-xl shadow-primary/20"
                                    >
                                        Pay & Confirm Booking
                                    </Button>
                                </div>
                            )}
                        </Modal.Footer>
                    </Modal.Dialog>
                </Modal.Container>
            </Modal.Backdrop>
        </Modal>
    );
}