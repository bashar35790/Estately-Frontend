"use client";

// Explicitly import the Variants type from framer-motion
import { motion, Variants } from "framer-motion";
import { Shield, Home, Clock, Star } from "lucide-react";

export default function WhyChooseUs() {
    const features = [
        {
            icon: <Shield className="w-8 h-8 text-primary" />,
            title: "Trusted by Thousands",
            description: "Every property and owner goes through our rigorous verification process to ensure absolute security and peace of mind."
        },
        {
            icon: <Home className="w-8 h-8 text-primary" />,
            title: "Premium Properties",
            description: "Access an exclusive collection of luxury villas, penthouses, and estates carefully curated for the most discerning guests."
        },
        {
            icon: <Clock className="w-8 h-8 text-primary" />,
            title: "24/7 Concierge Support",
            description: "Our dedicated support team is available around the clock to assist you with everything from booking to your stay."
        },
        {
            icon: <Star className="w-8 h-8 text-primary" />,
            title: "Unforgettable Experiences",
            description: "We don't just offer homes; we offer curated experiences tailored to your lifestyle and highest expectations."
        }
    ];

    // Explicitly typed as Variants to prevent staggering animation errors
    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.2
            }
        }
    };

    // Explicitly typed as Variants to resolve the strict string vs spring transition error
    const cardVariants: Variants = {
        hidden: { opacity: 0, y: 40 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { type: "spring", stiffness: 60, damping: 20 }
        }
    };

    return (
        // Fixed typo: changed "bg-whaite" to "bg-white"
        <section className="bg-white dark:bg-zinc-950 py-24 px-6 sm:px-12 w-full">
            <div className="max-w-7xl mx-auto space-y-16">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.7 }}
                    className="text-center max-w-3xl mx-auto space-y-4"
                >
                    <h2 className="text-3xl md:text-5xl font-light tracking-wide text-zinc-900 dark:text-white">
                        Why Choose <span className="text-primary font-normal">Estately</span>
                    </h2>
                    <p className="text-sm md:text-base text-zinc-500 dark:text-zinc-400 font-light leading-relaxed tracking-wide">
                        We redefine luxury living by offering unparalleled service, exclusive access, and a commitment to perfection. Here is why the world&apos;s elite choose us.
                    </p>
                </motion.div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
                >
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            variants={cardVariants}
                            whileHover={{ y: -10, transition: { duration: 0.2 } }}
                            className="bg-white dark:bg-zinc-900 p-8 rounded-2xl border border-zinc-100 dark:border-white/5 shadow-xl shadow-zinc-200/20 dark:shadow-none flex flex-col items-center text-center group transition-colors hover:border-primary/50"
                        >
                            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                                {feature.icon}
                            </div>
                            <h3 className="text-xl font-medium text-zinc-900 dark:text-white mb-3 tracking-wide">
                                {feature.title}
                            </h3>
                            <p className="text-zinc-500 dark:text-zinc-400 font-light text-sm leading-relaxed">
                                {feature.description}
                            </p>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
