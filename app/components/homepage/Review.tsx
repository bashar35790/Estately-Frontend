"use client";

import React from "react";
import Image from "next/image";
import { Star, Quote } from "lucide-react";

/**
 * Review Interface for Type Safety
 */
interface Review {
  id: string;
  name: string;
  role: string;
  avatar: string;
  content: string;
  rating: number;
}

/**
 * Placeholder Data
 * In the future, this will come from a database.
 */
const PLACEHOLDER_REVIEWS: Review[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    role: "Property Owner",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format&fit=crop",
    content: "Estately has completely transformed how I manage my rental properties. The interface is intuitive and the support is top-notch.",
    rating: 5,
  },
  {
    id: "2",
    name: "Michael Chen",
    role: "Tenant",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop",
    content: "Finding my dream home was so easy with Estately. The filters and communication tools are better than any other platform I've used.",
    rating: 5,
  },
  {
    id: "3",
    name: "Emily Rodriguez",
    role: "Real Estate Agent",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=150&auto=format&fit=crop",
    content: "As an agent, I need reliability and speed. Estately delivers both. My clients love the transparency of the whole process.",
    rating: 4,
  },
];

/**
 * ClientReviews Component
 * Follows the glassmorphism design language of the signup page.
 */
export default function ClientReviews() {
  return (
    <section className="relative w-full py-24 overflow-hidden">
      <div className="container relative z-10 mx-auto px-4">
        {/* Header Section */}
        <div className="mb-16 text-center">
          <span className="inline-block px-3 py-1 mb-4 text-[11px] font-bold uppercase tracking-widest text-[#A3CF16] bg-[#A3CF16]/10 rounded-full">
            Testimonials
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-zinc-900 dark:text-white mb-6">
            Hear from our community
          </h2>
          <p className="text-zinc-600 dark:text-white/55 max-w-xl mx-auto text-lg leading-relaxed">
            Discover why thousands of homeowners and tenants trust Estately for their real estate journey.
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PLACEHOLDER_REVIEWS.map((review) => (
            <div
              key={review.id}
              className="
                relative w-full group flex flex-col
                rounded-[28px] border border-zinc-200/60 dark:border-white/18
                bg-white/70 dark:bg-white/9 p-8 sm:p-10
                shadow-[0_8px_32px_rgba(0,0,0,0.04)] dark:shadow-[0_8px_48px_rgba(0,0,0,0.35)]
                backdrop-blur-[22px]
                transition-all duration-500 hover:translate-y-[-8px] hover:border-[#A3CF16]/30 dark:hover:border-[#A3CF16]/30
              "
            >
              {/* Quote Icon Background */}
              <div className="absolute top-8 right-10 text-zinc-100 dark:text-white/3 group-hover:text-[#A3CF16]/10 transition-colors duration-500">
                <Quote size={80} fill="currentColor" strokeWidth={0} />
              </div>

              {/* Rating Stars */}
              <div className="flex gap-1 mb-8">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={18}
                    className={
                      i < review.rating 
                        ? "text-[#A3CF16] fill-[#A3CF16]" 
                        : "text-zinc-200 dark:text-white/10"
                    }
                  />
                ))}
              </div>

              {/* Review Content */}
              <blockquote className="flex-1">
                <p className="text-zinc-700 dark:text-white/80 text-[17px] leading-[1.6] italic font-medium">
                  &quot;{review.content}&quot;
                </p>
              </blockquote>

              {/* Divider */}
              <div className="my-8 h-px w-full bg-zinc-100 dark:bg-white/8" />

              {/* Author Information */}
              <div className="flex items-center gap-5">
                <div className="relative h-14 w-14 shrink-0">
                  <div className="absolute inset-0 rounded-full bg-linear-to-tr from-[#A3CF16] to-[#7aad00] opacity-20 blur-xs" />
                  <div className="relative h-full w-full overflow-hidden rounded-full border-2 border-white dark:border-white/10 shadow-sm">
                    <Image
                      src={review.avatar}
                      alt={review.name}
                      fill
                      sizes="56px"
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                </div>
                <div>
                  <h4 className="font-bold text-zinc-900 dark:text-white text-lg leading-tight mb-1">
                    {review.name}
                  </h4>
                  <p className="text-[11px] text-zinc-500 dark:text-white/40 uppercase tracking-[0.15em] font-bold">
                    {review.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
