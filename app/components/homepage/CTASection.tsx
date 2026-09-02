import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function CTASection() {
    return (
        <section className="w-full py-16 md:py-24 bg-background border-t border-zinc-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* ── CTA Card ─────────────────────────────────────── */}
                <div
                    className="relative overflow-hidden rounded-3xl px-8 sm:px-14 py-16 sm:py-20 flex flex-col lg:flex-row items-center justify-between gap-10"
                    style={{
                        background: "linear-gradient(135deg, #0c1810 0%, #1a3020 40%, #2a5239 70%, #1a3020 100%)",
                    }}
                >
                    {/* Decorative blurred orbs */}
                    <div
                        className="absolute top-0 right-0 w-72 h-72 rounded-full opacity-20 pointer-events-none"
                        style={{
                            background: "radial-gradient(circle, #1eac70 0%, transparent 70%)",
                            transform: "translate(25%, -30%)",
                        }}
                    />
                    <div
                        className="absolute bottom-0 left-0 w-56 h-56 rounded-full opacity-15 pointer-events-none"
                        style={{
                            background: "radial-gradient(circle, #a3cf16 0%, transparent 70%)",
                            transform: "translate(-30%, 30%)",
                        }}
                    />

                    {/* Left: Text */}
                    <div className="relative z-10 max-w-xl space-y-4 text-center lg:text-left">
                        <p className="text-xs font-semibold uppercase tracking-widest text-primary/80 font-body">
                            Start Today
                        </p>
                        <h2
                            className="text-3xl sm:text-4xl md:text-5xl font-semibold text-white leading-tight"
                            style={{ fontFamily: "'Playfair Display', serif" }}
                        >
                            Find your perfect{" "}
                            <span className="text-primary italic">estate</span>
                            {" "}today
                        </h2>
                        <p className="text-sm text-white/60 leading-relaxed font-body max-w-md mx-auto lg:mx-0">
                            Browse hundreds of verified, premium listings. Whether you are
                            looking to rent, lease, or invest — your ideal home is waiting on
                            Estatly.
                        </p>

                        {/* Stats row */}
                        <div className="flex flex-wrap items-center justify-center lg:justify-start gap-8 pt-2">
                            {[
                                { value: "500+", label: "Verified Listings" },
                                { value: "1.2k+", label: "Happy Tenants" },
                                { value: "98%", label: "Satisfaction Rate" },
                            ].map((stat) => (
                                <div key={stat.label} className="text-center lg:text-left">
                                    <p
                                        className="text-2xl font-black text-primary"
                                        style={{ fontFamily: "'Playfair Display', serif" }}
                                    >
                                        {stat.value}
                                    </p>
                                    <p className="text-xs text-white/50 uppercase tracking-widest font-semibold mt-0.5">
                                        {stat.label}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right: Buttons */}
                    <div className="relative z-10 flex flex-col sm:flex-row lg:flex-col gap-4 w-full sm:w-auto lg:w-auto">
                        <Link
                            href="/all-properties"
                            className="group inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-primary text-white font-semibold text-sm hover:bg-secondary hover:text-black transition-all duration-300 shadow-lg shadow-primary/30 whitespace-nowrap"
                        >
                            Browse All Properties
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                        <Link
                            href="/auth/signup"
                            className="group inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full border border-white/20 text-white font-semibold text-sm hover:border-primary hover:bg-white/5 transition-all duration-300 whitespace-nowrap"
                        >
                            Create Free Account
                        </Link>
                    </div>
                </div>

            </div>
        </section>
    );
}
