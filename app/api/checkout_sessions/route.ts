import { NextResponse } from 'next/server'
import { headers } from 'next/headers'
import { stripe } from '@/lib/stripe';
import Stripe from 'stripe';
import { auth } from '@/lib/auth';

export async function POST() {
    try {
        const headersList = await headers()
        const origin = headersList.get('origin')

        const userdata = await auth.api.getSession({
            headers: await headers()
        })

        const userSession = userdata?.user;


        const PRICE_ID = "prod_UkyEkjpWlT6o8t";


        const session: Stripe.Checkout.Session = await stripe.checkout.sessions.create({
            customer_email: userSession?.email,
            line_items: [
                {
                    price: PRICE_ID,
                    quantity: 1,
                },
            ],
            metadata: {
                priceId: PRICE_ID,
                userId: userSession?.id || '',
                userEmail: userSession?.email || '',
            },
            mode: 'subscription',
            success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${origin}/plan`,
        });


        if (!session.url) {
            return NextResponse.json(
                { error: 'Failed to create checkout session URL' },
                { status: 500 }
            );
        }

        return NextResponse.redirect(session.url, 303)
    } catch (err: any) {
        return NextResponse.json(
            { error: err.message },
            { status: err.statusCode || 500 }
        )
    }
}