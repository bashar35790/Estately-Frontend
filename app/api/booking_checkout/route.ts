import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { stripe } from "@/lib/stripe";
import Stripe from "stripe";
import { auth } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { propertyId, moveInDate, contactNumber, notes } = body;

    if (!propertyId) {
      return NextResponse.json({ error: "propertyId is required" }, { status: 400 });
    }

    const headersList = await headers();
    const origin = headersList.get("origin") || "http://localhost:3000";

    const userdata = await auth.api.getSession({
      headers: req.headers,
    });

    const userSession = userdata?.user || { id: body.tenantId, email: body.email };
    if (!userSession?.id || !userSession?.email) {
      console.log("No user session found in booking_checkout");
      return NextResponse.json({ error: "Unauthorized. Please ensure you are logged in." }, { status: 401 });
    }

    // 3. Backend fetches the property from MongoDB.
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:5000";
    const propRes = await fetch(`${baseUrl}/api/properties/${propertyId}`);
    
    if (!propRes.ok) {
        return NextResponse.json({ error: "Failed to fetch property" }, { status: 404 });
    }
    
    const property = await propRes.json();

    if (!property || !property.price) {
      return NextResponse.json({ error: "Property not found or invalid price" }, { status: 404 });
    }

    // 4. Backend uses the property's price dynamically.
    const serviceFeeCents = Number(process.env.BOOKING_SERVICE_FEE_CENTS) || 0;
    const unitAmount = Math.round((property.price * 100) + serviceFeeCents);

    // 7. Create the Stripe session dynamically
    const session: Stripe.Checkout.Session = await stripe.checkout.sessions.create({
      customer_email: userSession.email,
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: property.title,
              images: property.images?.length ? [property.images[0]] : undefined,
            },
            unit_amount: unitAmount,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      metadata: {
        propertyId: property._id?.toString() || "",
        tenantId: userSession.id || "",
        ownerId: property.ownerId || "",
        moveInDate: moveInDate || "",
        contactNumber: contactNumber || "",
        notes: notes || "",
        amount: (property.price + (serviceFeeCents / 100)).toString(),
      },
      success_url: `${origin}/booking-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/all-properties/${property._id}`,
    });

    if (!session.url) {
      return NextResponse.json({ error: "Failed to create checkout session URL" }, { status: 500 });
    }

    return NextResponse.json({ url: session.url });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: err.statusCode || 500 });
  }
}
