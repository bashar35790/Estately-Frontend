"use client";

import { motion } from "framer-motion";
import { Bed, Bath, Maximize, DollarSign } from "lucide-react";

interface PropertyInfoCardsProps {
    property: {
        price: number;
        rentType: string;
        bedrooms: number;
        bathrooms: number;
        size: number;
    };
}

export function PropertyInfoCards({ property }: PropertyInfoCardsProps) {
    const items = [
        {
            label: "Price",
            value: `$${property.price.toLocaleString()}`,
            subfix: `/${property.rentType}`,
            icon: DollarSign,
            color: "text-primary",
        },
        {
            label: "Bedrooms",
            value: property.bedrooms,
            subfix: "Beds",
            icon: Bed,
            color: "text-blue-500",
        },
        {
            label: "Bathrooms",
            value: property.bathrooms,
            subfix: "Baths",
            icon: Bath,
            color: "text-purple-500",
        },
        {
            label: "Size",
            value: property.size.toLocaleString(),
            subfix: "sqft",
            icon: Maximize,
            color: "text-orange-500",
        },
    ];

    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {items.map((item, index) => (
                <motion.div
                    key={item.label}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                    <div className="p-4 flex flex-col items-center text-center space-y-2 bg-white dark:bg-zinc-900 rounded-3xl shadow-sm border border-default-100 dark:border-white/5">
                        <div className={`${item.color} bg-default-100 dark:bg-zinc-800 p-2 rounded-xl`}>
                            <item.icon size={20} />
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-foreground font-heading">
                                {item.value}
                                <span className="text-xs text-default-500 font-normal ml-1 font-body">
                                    {item.subfix}
                                </span>
                            </p>
                            <p className="text-[10px] uppercase tracking-widest text-default-400 font-medium font-body">
                                {item.label}
                            </p>
                        </div>
                    </div>
                </motion.div>
            ))}
        </div>
    );
}
