"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { Button, Spinner } from "@heroui/react";
import Image from "next/image";
import { authClient } from "@/lib/auth-client";
import { addReview, getReviews } from "@/lib/action/properties";
import { ReviewPayload } from "@/types/review";
import { toast } from "react-toastify";

export function PropertyReviews({ propertyId }: { propertyId: string }) {
  const { data: session } = authClient.useSession();
  const user = session?.user;
  const queryClient = useQueryClient();

  const [newReview, setNewReview] = useState("");
  const [rating, setRating] = useState(5);

  const { data: reviews = [], isLoading: isPageLoading } = useQuery({
    queryKey: ["reviews", propertyId],
    queryFn: () => getReviews(propertyId),
    enabled: !!propertyId,
    select: (data) => (Array.isArray(data) ? data : []),
  });

  const submitMutation = useMutation({
    mutationFn: (payload: ReviewPayload) => addReview(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reviews", propertyId] });
      setNewReview("");
      setRating(5);
      toast.success("Review posted successfully!");
    },
    onError: () => {
      toast.error("Something went wrong while posting your review.");
    },
  });

  const handleSubmitReview = async () => {
    if (!newReview.trim() || !user?.id) {
      toast.error("Please log in first to submit a review.");
      return;
    }

    const payload: ReviewPayload = {
      propertyId,
      tenantId: user.id,
      rating: rating,
      comment: newReview.trim(),
      createdAt: new Date().toISOString(),
      userMeta: {
        name: user.name || "Anonymous Tenant",
        email: user.email || "",
        image: user.image || "",
      }
    };

    submitMutation.mutate(payload);
  };

  const averageRating = reviews.length
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
    : "0.0";

  return (
    <section className="space-y-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div>
          <h2 className="text-3xl font-heading font-bold text-default-950 dark:text-white">Tenant Reviews</h2>
          <p className="text-default-500 font-body">See what people are saying about this luxury home</p>
        </div>
        <div className="flex items-center gap-4 bg-primary/10 px-6 py-3 rounded-2xl self-start sm:self-center">
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

      <div className="bg-white dark:bg-zinc-900 border border-default-100 dark:border-white/5 rounded-[32px] p-8 space-y-6 shadow-sm">
        <h3 className="text-xl font-heading font-bold text-default-900 dark:text-white">Write a Review</h3>
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="text-sm font-semibold text-default-700 font-body">Your Rating:</span>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setRating(s)}
                  className={`${rating >= s ? "text-amber-500" : "text-default-300"} hover:scale-110 transition-transform`}
                >
                  <Star size={24} className={rating >= s ? "fill-current" : ""} />
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-2 w-full">
            <label className="text-sm font-body font-semibold text-default-600 dark:text-default-400">
              Review Message
            </label>
            <textarea
              placeholder="Share your experience about this property..."
              value={newReview}
              onChange={(e) => setNewReview(e.target.value)}
              className="w-full min-h-[120px] p-4 rounded-2xl bg-default-50 dark:bg-zinc-800 border border-transparent outline-none focus:ring-2 focus:ring-primary/50 transition-all font-body text-base text-default-900 dark:text-white hover:bg-default-100/70 dark:hover:bg-zinc-800/70"
            />
          </div>

          <div className="flex justify-end">
            <Button
              onPress={handleSubmitReview}
              isDisabled={!newReview.trim() || submitMutation.isPending || !user}
              className="font-bold text-white px-8 h-12 rounded-xl bg-primary shadow-lg shadow-primary/20 transition-all"
            >
              {submitMutation.isPending ? <Spinner size="sm" color="current" /> : "Post Review"}
            </Button>
          </div>
        </div>
      </div>

      <div className="grid gap-6">
        {isPageLoading ? (
          <div className="flex justify-center py-10">
            <Spinner color="accent" />
          </div>
        ) : reviews.length === 0 ? (
          <p className="text-center text-default-400 font-body py-10">
            No reviews found for this property yet. Be the first to review!
          </p>
        ) : (
          <AnimatePresence initial={false}>
            {reviews.map((review, index) => {
              const reviewerName = review.userMeta?.name || "Verified Tenant";
              const reviewerEmail = review.userMeta?.email || "Tenant";
              const reviewerImage = review.userMeta?.image || `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(reviewerName)}`;

              return (
                <motion.div
                  key={review._id}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                >
                  <div className="bg-white dark:bg-zinc-900 border border-default-100 dark:border-white/5 rounded-[32px] p-8 shadow-sm group">
                    <div className="flex flex-col md:flex-row gap-6">
                      <div className="shrink-0">
                        <div className="relative w-16 h-16 rounded-2xl overflow-hidden bg-default-100 border border-default-200/50 dark:border-zinc-800">
                          <Image
                            src={reviewerImage}
                            alt={reviewerName}
                            fill
                            className="object-cover"
                          />
                        </div>
                      </div>
                      <div className="grow space-y-4">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                          <div>
                            <h4 className="text-xl font-bold text-default-900 dark:text-white font-heading">
                              {reviewerName}
                            </h4>
                            <p className="text-sm text-default-400 font-body">
                              {reviewerEmail} &bull; {new Date(review.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
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
                          <p className="relative z-1 text-default-600 dark:text-default-300 font-body italic leading-relaxed text-lg pl-6">
                            {review.comment}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        )}
      </div>
    </section>
  );
}
