import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { auth } from "./app/lib/auth";

export async function proxy(request: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: request.headers,
    });

    // if (session?.user?.userRole === "tenant" && session?.user?.plan === "free") {
    //   return NextResponse.redirect(new URL("/plan", request.url));
    // }

    // if (session?.user?.userRole === "owner" && session?.user?.plan === "free") {
    //   return NextResponse.redirect(new URL("/plan", request.url));
    // }

    if (!session) {
      return NextResponse.redirect(new URL("/auth/login", request.url));
    }

    return NextResponse.next();
  } catch (error) {
    console.error("Proxy Auth Error:", error);
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
