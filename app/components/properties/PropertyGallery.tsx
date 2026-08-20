"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

interface Props {
    images: string[];
}

export function PropertyGallery({ images }: Props) {
    const [selectedImage, setSelectedImage] = useState(images?.[0]);

    return (
        <section className="space-y-4">
            <motion.div
                initial={{
                    opacity: 0,
                    scale: 0.97,
                }}
                animate={{
                    opacity: 1,
                    scale: 1,
                }}
                transition={{
                    duration: 0.45,
                }}
                className="relative rounded-3xl overflow-hidden"
            >
                <Image
                    src={selectedImage}
                    alt="Property"
                    width={1000}
                    height={1000}
                    className="w-full h-[520px] object-cover"
                    priority={true}
                />

                <div className="absolute top-6 left-6">
                    <span className="bg-primary text-white px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-widest shadow-lg">
                        Featured Property
                    </span>
                </div>

                <div className="absolute bottom-6 right-6 bg-black/60 text-white px-4 py-2 rounded-full text-sm backdrop-blur">
                    {images.length} Photos
                </div>
            </motion.div>

            <div className="grid grid-cols-5 gap-4 relative">
                {images.map((image, index) => (
                    <motion.button
                        key={index}
                        whileHover={{
                            scale: 1.04,
                        }}
                        whileTap={{
                            scale: 0.95,
                        }}
                        onClick={() => setSelectedImage(image)}
                        className={`overflow-hidden rounded-2xl border-2 transition-all ${selectedImage === image
                            ? "border-primary"
                            : "border-transparent"
                            }`}
                    >
                        <Image
                            src={image}
                            alt=""
                            width={1000}
                            height={1000}
                            className="h-24 w-full object-cover"
                        />
                    </motion.button>
                ))}
            </div>
        </section>
    );
}
