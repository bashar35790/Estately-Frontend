"use client"
import Image from "next/image";
import { Star, Quote } from "lucide-react";
import { motion, Variants } from "framer-motion";
import { ReviewPayload } from "@/types/review";

// 1. Define Props interface accepting the reviews array
interface ClientReviewsProps {
  reviews: ReviewPayload[];
}

// 2. Accept reviews as a prop
export default function ClientReviews({ reviews }: ClientReviewsProps) {
  
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { type: "spring", stiffness: 60, damping: 20 } 
    }
  };

  return (
    <section className="relative w-full py-16 md:py-24 overflow-hidden border-t border-zinc-200">
      <div className="max-w-7xl relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <span className="inline-block px-3 py-1 mb-4 text-[11px] font-bold uppercase tracking-widest text-primary bg-primary/10 rounded-full">
            Testimonials
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-zinc-900 mb-6">
            Hear from our community
          </h2>
          <p className="text-zinc-600 max-w-xl mx-auto text-lg leading-relaxed font-light">
            Discover why thousands of homeowners and tenants trust Estately for their real estate journey.
          </p>
        </motion.div>

        {/* Reviews Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {reviews.map((review) => (
            <motion.div
              variants={itemVariants}
              key={review._id}
              className="relative w-full group flex flex-col rounded-[28px] border border-zinc-200/60 bg-white/70 p-8 sm:p-10 shadow-[0_8px_32px_rgba(0,0,0,0.04)] backdrop-blur-[22px] transition-all duration-500 hover:translate-y-[-8px] hover:border-primary/30"
            >
              <div className="absolute top-8 right-10 text-zinc-100 group-hover:text-primary/10 transition-colors duration-500">
                <Quote size={80} fill="currentColor" strokeWidth={0} />
              </div>

              <div className="flex gap-1 mb-8">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={18}
                    className={i < review.rating ? "text-primary fill-primary" : "text-zinc-200"}
                  />
                ))}
              </div>

              <blockquote className="flex-1">
                <p className="text-zinc-700 text-[17px] leading-[1.6] italic font-medium relative z-10">
                  &quot;{review?.comment}&quot;
                </p>
              </blockquote>

              <div className="my-8 h-px w-full bg-zinc-100" />

              <div className="flex items-center gap-5">
                <div className="relative h-14 w-14 shrink-0">
                  <div className="absolute inset-0 rounded-full bg-primary opacity-20 blur-sm" />
                  <div className="relative h-full w-full overflow-hidden rounded-full border-2 border-white shadow-sm bg-zinc-100">
                    <Image
                      src={review?.userMeta?.image || "/images/placeholder.jpg"}
                      alt={review?.userMeta?.name || "User Image"}
                      fill
                      sizes="56px"
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                </div>
                <div>
                  <h4 className="font-bold text-zinc-900 text-lg leading-tight mb-1">
                    {review?.userMeta?.name || "User"}
                  </h4>
                  <p className="text-[11px] text-zinc-500 uppercase tracking-[0.15em] font-bold">
                    {review?.createdAt ? new Date(review.createdAt).toLocaleDateString() : "Date Unknown"}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
