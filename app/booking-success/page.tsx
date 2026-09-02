import { stripe } from "@/lib/stripe";
import { redirect } from "next/navigation";
import Link from "next/link";
import { CheckCircle, Home, CalendarCheck } from "lucide-react";
import { serverMutation } from "@/lib/core/server";
import { BookingStatus, PaymentStatus } from "@/types/enums";

export default async function BookingSuccessPage({
    searchParams,
}: {
    searchParams: Promise<{ session_id?: string }>;
}) {
    const { session_id } = await searchParams;

    if (!session_id) {
        redirect("/");
    }

    let session;
    try {
        session = await stripe.checkout.sessions.retrieve(session_id);
    } catch (error) {
        console.error("Error retrieving session:", error);
    }

    if (!session || session.payment_status !== PaymentStatus.Paid) {
        redirect("/");
    }

    const metadata = session.metadata;

    if (metadata) {
        try {
            // Save booking — the backend deduplicates by transactionId (returns 409 if exists)
            const bookingPayload = {
                propertyId: metadata.propertyId,
                tenantId: metadata.tenantId,
                ownerId: metadata.ownerId,
                moveInDate: metadata.moveInDate,
                contactNumber: metadata.contactNumber,
                notes: metadata.notes,
                amount: Number(metadata.amount),
                bookingStatus: BookingStatus.Pending,
                paymentStatus: PaymentStatus.Paid,
                transactionId: session.payment_intent as string,
            };

            await serverMutation("/api/bookings", "POST", bookingPayload);
        } catch (dbError) {
            console.error("Error saving booking to DB:", dbError);
        }
    }

    return (
        <div className="min-h-screen bg-default-50 flex items-center justify-center p-4 pt-28 md:pt-32">
            <div className="max-w-md w-full bg-white rounded-3xl p-8 shadow-xl border border-default-100 text-center">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="w-10 h-10 text-green-600" />
                </div>
                
                <h1 className="text-3xl font-heading font-bold text-default-900 mb-2">
                    Payment Successful!
                </h1>
                
                <p className="text-default-500 mb-8">
                    Your booking request has been sent to the property owner. You will be notified once it is approved.
                </p>

                <div className="bg-default-50 rounded-2xl p-4 mb-8 text-left space-y-3 border border-default-100">
                    <div className="flex items-center gap-3 text-sm text-default-700">
                        <CalendarCheck className="w-5 h-5 text-primary" />
                        <span>Status: <strong>Pending Approval</strong></span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-default-700">
                        <CheckCircle className="w-5 h-5 text-green-500" />
                        <span>Payment: <strong>Paid</strong></span>
                    </div>
                </div>

                <div className="flex gap-4">
                    <Link 
                        href="/all-properties"
                        className="flex-1 py-3 px-4 bg-default-100 hover:bg-default-200 text-default-700 rounded-xl font-medium transition-colors flex items-center justify-center gap-2"
                    >
                        <Home className="w-4 h-4" />
                        Properties
                    </Link>
                    <Link 
                        href="/"
                        className="flex-1 py-3 px-4 bg-primary hover:bg-primary/90 text-white rounded-xl font-medium transition-colors shadow-lg shadow-primary/25"
                    >
                        Go to Home
                    </Link>
                </div>
            </div>
        </div>
    );
}
