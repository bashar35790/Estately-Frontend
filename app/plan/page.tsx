'use client';
import React, { useState } from 'react';
import Link from 'next/link';
// Gravity UI Icons for clean property management vibes
import {
    Check,
    CircleQuestion,
    ChevronDown,
    Person,
    Briefcase,
    Rocket,
    Star,
    House
} from '@gravity-ui/icons';

const PricingPage = () => {
    // State to toggle between 'landlord' and 'tenant' pricing tiers
    const [billingTarget, setBillingTarget] = useState('landlord');
    // State to track opened accordion items in the FAQ section
    const [openFaq, setOpenFaq] = useState(null);

    const toggleFaq = (index: any) => {
        setOpenFaq(openFaq === index ? null : index);
    };

    // Data structured for Landlords
    const landlordPlans = [
        {
            name: 'Starter',
            id: 'landlord_starter',
            price: '$0',
            period: '/forever',
            description: 'Perfect for DIY landlords managing their first single property or unit.',
            icon: <House className="w-5 h-5 text-zinc-400" />,
            features: [
                'Manage up to 1 property unit',
                'Basic digital lease templates',
                'Standard maintenance request tracking',
                'Online rent collection (standard processing days)'
            ],
            cta: 'Start Free',
            popular: false
        },
        {
            name: 'Growth',
            id: 'landlord_growth',
            price: '$29',
            period: '/month',
            description: 'Our most popular choice for expanding portfolios needing automated tools.',
            icon: <Rocket className="w-5 h-5 text-primary" />,
            features: [
                'Manage up to 15 property units',
                'Automated late fee reminders',
                'Advanced background & credit checks',
                'Expense tracking & tax reporting tools'
            ],
            cta: 'Upgrade to Growth',
            popular: true
        },
        {
            name: 'Pro Portfolio',
            id: 'landlord_pro',
            price: '$79',
            period: '/month',
            description: 'Uncapped potential and priority tools for elite property managers.',
            icon: <Star className="w-5 h-5 text-secondary" />,
            features: [
                'Unlimited property units & buildings',
                'Premium multi-channel syndication (Zillow, Trulia, etc.)',
                'Dedicated portal for staff/team collaboration',
                '24/7 Priority support & custom branding'
            ],
            cta: 'Go Pro Portfolio',
            popular: false
        }
    ];

    // Data structured for Tenants
    const tenantPlans = [
        {
            name: 'Basic',
            id: 'tenant_basic',
            price: '$0',
            period: '/forever',
            description: 'Essential portal features to pay rent and communicate with your landlord.',
            icon: <Person className="w-5 h-5 text-zinc-400" />,
            features: [
                'Free secure online rent payment',
                'Submit & track maintenance requests',
                'Digital storage for active lease agreements',
                'Automated rent day notifications'
            ],
            cta: 'Get Started',
            popular: false
        },
        {
            name: 'Premium Tenant',
            id: 'tenant_premium',
            price: '$9',
            period: '/month',
            description: 'Build your credit score and protect your home automatically.',
            icon: <Star className="w-5 h-5 text-primary" />,
            features: [
                'Rent payment reporting to credit bureaus',
                'Integrated Renters Insurance coverage options',
                'Zero-fee ACH rent processing bank transfers',
                'Exclusive local moving & lifestyle rewards'
            ],
            cta: 'Go Premium',
            popular: true
        }
    ];

    const activePlans = billingTarget === 'landlord' ? landlordPlans : tenantPlans;

    const faqs = [
        {
            question: 'Can I change or cancel plans whenever I want?',
            answer: 'Yes, absolutely. All paid plans operate on a flexible month-to-month basis. You can easily upgrade, downgrade, or cancel your renewal configurations through your account settings dashboard at any time with no penalties.'
        },
        {
            question: 'How secure is the rent collection payment network?',
            answer: 'Security is our utmost priority. All transaction pipelines utilize enterprise-grade, bank-level encryption alongside fully PCI-compliant vendor gateways to secure direct tenant-to-landlord funds routing.'
        },
        {
            question: 'What is credit reporting for tenants?',
            answer: 'Our Premium Tenant plan allows you to automatically report your on-time rent payments to major credit bureaus. This historical data helps consistently build and improve your overall credit score over the lease lifecycle.'
        },
        {
            question: 'Are there hidden setup fees for property portfolios?',
            answer: 'None at all. There are no initiation charges, contractual fine prints, or onboarding fees. You pay the transparent flat rate highlighted above according to your active active unit capacities.'
        }
    ];

    return (
        <div className="w-full min-h-screen bg-zinc-50 text-zinc-800 py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">

                {/* Header Title Typography */}
                <div className="text-center max-w-3xl mx-auto mb-12">
                    <span className="text-xs font-semibold uppercase tracking-widest text-primary">
                        Transparent Pricing
                    </span>
                    <h1 className="text-3xl sm:text-4xl font-extrabold text-zinc-900 mt-2 tracking-tight">
                        Flexible plans tailored to your property goals
                    </h1>
                    <p className="text-zinc-600 mt-3 text-sm sm:text-base leading-relaxed">
                        Whether you are a landlord managing a growing real estate portfolio or a tenant looking for a seamless renting experience, we have got you covered.
                    </p>
                </div>

                {/* Switch Segment Control Toggle Grid Wrapper */}
                <div className="flex justify-center mb-16">
                    <div className="p-1.5 bg-zinc-200/80 border border-zinc-300/60 rounded-xl flex items-center gap-1 shadow-inner">
                        <button
                            onClick={() => setBillingTarget('landlord')}
                            className={`flex items-center gap-2 px-5 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${billingTarget === 'landlord'
                                ? 'bg-white text-zinc-900 shadow-md border border-zinc-200'
                                : 'text-zinc-600 hover:text-zinc-900'
                                }`}
                        >
                            <Briefcase className="w-4 h-4" />
                            For Landlords
                        </button>
                        <button
                            onClick={() => setBillingTarget('tenant')}
                            className={`flex items-center gap-2 px-5 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${billingTarget === 'tenant'
                                ? 'bg-white text-zinc-900 shadow-md border border-zinc-200'
                                : 'text-zinc-600 hover:text-zinc-900'
                                }`}
                        >
                            <Person className="w-4 h-4" />
                            For Tenants
                        </button>
                    </div>
                </div>

                {/* Pricing Cards Grid Layout Layout */}
                <div className={`grid grid-cols-1 gap-8 items-start mb-24 ${billingTarget === 'tenant' ? 'md:grid-cols-2 max-w-4xl mx-auto' : 'md:grid-cols-3'}`}>
                    {activePlans.map((plan, idx) => (
                        <div
                            key={idx}
                            className={`relative bg-white border rounded-2xl p-6 shadow-md flex flex-col justify-between min-h-[480px] transition-all duration-300 hover:-translate-y-1 ${plan.popular
                                ? 'border-primary ring-2 ring-primary/10'
                                : 'border-zinc-200 hover:border-zinc-300'
                                }`}
                        >
                            {/* Popular Highlight Pill */}
                            {plan.popular && (
                                <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 text-[10px] font-bold text-white bg-primary rounded-full uppercase tracking-wider shadow-sm">
                                    Most Popular
                                </span>
                            )}

                            {/* Plan Name & Core Header Metadata */}
                            <div>
                                <div className="flex items-center justify-between gap-2 mb-3">
                                    <h3 className="text-xl font-bold text-zinc-900">{plan.name}</h3>
                                    <div className="p-2 bg-zinc-100 rounded-lg border border-zinc-200">
                                        {plan.icon}
                                    </div>
                                </div>
                                <p className="text-xs text-zinc-600 leading-relaxed min-h-[36px]">
                                    {plan.description}
                                </p>

                                {/* Dynamic Price Indicator Text Block */}
                                <div className="my-6 flex items-baseline gap-1">
                                    <span className="text-4xl font-black text-zinc-900 tracking-tight">{plan.price}</span>
                                    <span className="text-xs text-zinc-500 font-medium">{plan.period}</span>
                                </div>

                                <hr className="border-zinc-200 mb-6" />

                                {/* Checklist Array Mapping */}
                                <ul className="space-y-3">
                                    {plan.features.map((feature, fIdx) => (
                                        <li key={fIdx} className="flex items-start gap-2.5 text-xs text-zinc-700">
                                            <div className="w-4 h-4 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0 mt-0.5">
                                                <Check className="w-3 h-3" />
                                            </div>
                                            <span className="leading-normal">{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Plan Action CTA Button */}
                            <div className="mt-8">
                                <form action="/api/checkout_sessions" method="POST">
                                    <input type="hidden" name="plan_id" value={plan.id} />
                                    <button type="submit" role="link"
                                        className={`block w-full text-center text-xs font-semibold px-4 py-3 rounded-xl transition duration-200 ${plan.popular
                                            ? 'bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/20'
                                            : 'bg-zinc-100 hover:bg-zinc-200 text-zinc-800 border border-zinc-300/60'
                                            }`}
                                    >
                                        {plan.cta}
                                    </button>
                                </form>
                            </div>
                        </div>
                    ))}
                </div>

                {/* FAQ Accordion Section Layout Wrapper */}
                <div className="max-w-3xl mx-auto border-t border-zinc-200 pt-16">
                    <div className="text-center mb-10">
                        <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-white border border-zinc-200 text-zinc-500 mb-3 shadow-sm">
                            <CircleQuestion className="w-5 h-5" />
                        </div>
                        <h2 className="text-xl sm:text-2xl font-bold text-zinc-900">Frequently Asked Questions</h2>
                        <p className="text-xs text-zinc-500 mt-1">Have concerns regarding billing, automation or features? Find instant clarity below.</p>
                    </div>

                    <div className="space-y-3">
                        {faqs.map((faq, idx) => {
                            const isOpen = openFaq === idx;
                            return (
                                <div
                                    key={idx}
                                    className="bg-white border border-zinc-200 rounded-xl overflow-hidden transition-colors duration-200"
                                >
                                    <button
                                        onClick={() => toggleFaq(idx)}
                                        className="w-full flex items-center justify-between text-left p-4 gap-4 text-zinc-700 hover:text-zinc-900 transition"
                                    >
                                        <span className="text-sm font-semibold">{faq.question}</span>
                                        <ChevronDown
                                            className={`w-4 h-4 text-zinc-400 shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180 text-primary' : ''
                                                }`}
                                        />
                                    </button>

                                    {/* Collapsible Accordion Element View Body */}
                                    <div
                                        className={`transition-all duration-300 ease-in-out overflow-hidden ${isOpen ? 'max-h-40 border-t border-zinc-100' : 'max-h-0'
                                            }`}
                                    >
                                        <div className="p-4 text-xs text-zinc-600 leading-relaxed bg-zinc-50/50">
                                            {faq.answer}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

            </div>
        </div>
    );
};

export default PricingPage;
