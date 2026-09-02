"use client";

import { motion } from "framer-motion";

interface PropertyDescriptionProps {
    description: string;
}

export function PropertyDescription({ description }: PropertyDescriptionProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white rounded-3xl p-8 border border-default-100 shadow-sm"
        >
            <h2 className="text-2xl font-heading text-foreground mb-6">About this property</h2>
            <div className="prose prose-slate max-w-none">
                <p className="text-default-600 font-body leading-relaxed text-lg">
                    {description}
                </p>
            </div>
        </motion.div>
    );
}
