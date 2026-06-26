"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { Button, TextField, Label } from "@heroui/react";
import Image from "next/image";
import { authClient } from "@/lib/auth-client";

interface Review {
    id: string;
    name: string;
    email: string;
    date: string;
    rating: number;
    comment: string;
    image?: string;
}

export function PropertyReviews({ propertyId }: { propertyId: string }) {
    const { data: session, isPending, } = authClient.useSession()
    const user = session?.user;
    console.log(user);
    // 1. Initial Sample Data (simulates your database records)
    const [reviews, setReviews] = useState<Review[]>([
        {
            id: "1",
            name: "John Doe",
            email: "john@example.com",
            date: "2024-05-20",
            rating: 5,
            comment: "Absolutely stunning property! The views are even better in person. The host was very responsive and helpful throughout the booking process."
        },
        {
            id: "2",
            name: "Jane Smith",
            email: "jane@example.com",
            date: "2024-05-18",
            rating: 4,
            comment: "Very elegant and spacious. The location is perfect for anyone looking to be in the heart of the city while maintaining privacy."
        }
    ]);

    const [newReview, setNewReview] = useState("");
    const [rating, setRating] = useState(5);

    // 2. Interactive submission (updates state locally for now)
    const handleSubmitReview = () => {
        if (!newReview.trim()) return;

        const review: Review = {
            id: user?.id || "", // Generates a unique mock ID
            name: user?.name || "",
            email: user?.email || "",
            date: new Date().toISOString().split('T')[0], // Formats today's date (YYYY-MM-DD)
            rating: rating,
            comment: newReview,
            image: user?.image || "",
        };

        /* FUTURE DATABASE CONNECTIVITY NOTE:
           When you connect your database API layer later, replace this line with:
           
           const res = await fetch(`/api/properties/${propertyId}/reviews`, { method: "POST", ... })
           const savedReview = await res.json()
           setReviews([savedReview, ...reviews]);
        */
        setReviews([review, ...reviews]);


        // Reset state inputs
        setNewReview("");
        setRating(5);
    };

    // Computes dynamic mathematical average rating from the current data array
    const averageRating = reviews.length
        ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
        : "0.0";

    return (
        <section className="space-y-10">
            {/* Header / Aggregate Metrics */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h2 className="text-3xl font-heading text-foreground">Tenant Reviews</h2>
                    <p className="text-default-500 font-body">See what people are saying about this luxury home</p>
                </div>
                <div className="flex items-center gap-4 bg-primary/10 px-6 py-3 rounded-2xl">
                    <div className="flex text-amber-500">
                        {[1, 2, 3, 4, 5].map((s) => (
                            <Star
                                key={s}
                                size={20}
                                className={Number(averageRating) >= s ? "fill-current" : "opacity-30"}
                            />
                        ))}
                    </div>
                    <span className="text-xl font-bold text-primary">{averageRating} / 5.0</span>
                </div>
            </div>

            {/* Review Input Box */}
            <div className="bg-white dark:bg-zinc-900 border border-default-100 dark:border-white/5 rounded-[32px] p-8 space-y-6 shadow-sm">
                <h3 className="text-xl font-heading text-foreground">Write a Review</h3>
                <div className="space-y-4">
                    <div className="flex items-center gap-3">
                        <span className="text-sm font-semibold text-default-700 font-body">Your Rating:</span>
                        <div className="flex gap-1">
                            {[1, 2, 3, 4, 5].map((s) => (
                                <button
                                    key={s}
                                    type="button"
                                    onClick={() => setRating(s)}
                                    className={`${rating >= s ? "text-amber-500" : "text-default-300"} hover:scale-120 transition-transform`}
                                >
                                    <Star size={24} className={rating >= s ? "fill-current" : ""} />
                                </button>
                            ))}
                        </div>
                    </div>

                    <TextField className="w-full" name="comment" variant="secondary">
                        <Label className="text-sm font-semibold text-default-700 font-body">Review Message</Label>
                        <textarea
                            placeholder="Share your experience about this property..."
                            value={newReview}
                            onChange={(e) => setNewReview(e.target.value)}
                            className="w-full p-4 rounded-2xl bg-default-50 dark:bg-zinc-800 border-none focus:ring-2 focus:ring-primary/50 transition-all font-body text-lg min-h-[120px] outline-none"
                        />
                    </TextField>

                    <div className="flex justify-end">
                        <Button
                            onPress={handleSubmitReview}
                            isDisabled={!newReview.trim()}
                            className="font-bold text-white px-8 h-12 rounded-xl bg-primary shadow-lg shadow-primary/20 disabled:opacity-50"
                        >
                            Post Review
                        </Button>
                    </div>
                </div>
            </div>

            {/* Dynamic Rendered List */}
            <div className="grid gap-6">
                <AnimatePresence initial={false}>
                    {reviews.map((review, index) => (
                        <motion.div
                            key={review.id}
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ duration: 0.4, delay: index * 0.05 }}
                        >
                            <div className="bg-white dark:bg-zinc-900 border border-default-100 dark:border-white/5 rounded-[32px] p-8 shadow-sm group">
                                <div className="flex flex-col md:flex-row gap-6">
                                    <div className="shrink-0">
                                        <div className="relative w-16 h-16 rounded-2xl overflow-hidden bg-default-100">
                                            <Image
                                                src={review.image || `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(review.name)}`}
                                                alt={review.name}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                    </div>
                                    <div className="grow space-y-4">
                                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                                            <div>
                                                <h4 className="text-xl font-bold text-foreground font-heading">{review.name}</h4>
                                                <p className="text-sm text-default-400 font-body">
                                                    {review.email} • {new Date(review.date).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
                                                </p>
                                            </div>
                                            <div className="flex gap-0.5 text-amber-500 bg-amber-500/10 px-3 py-1 rounded-full items-center self-start md:self-center">
                                                {[...Array(review.rating)].map((_, i) => (
                                                    <Star key={i} size={12} className="fill-current" />
                                                ))}
                                            </div>
                                        </div>
                                        <div className="relative">
                                            <Quote className="absolute -top-2 -left-2 text-primary/10 w-12 h-12 z-0" />
                                            <p className="relative z-1 text-default-600 font-body italic leading-relaxed text-lg pl-6">
                                                {review.comment}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
        </section>
    );
}
