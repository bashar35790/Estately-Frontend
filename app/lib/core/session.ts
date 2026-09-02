import { redirect } from "next/navigation";
import { cache } from "react";
import { auth } from "../auth"; 
import { headers, cookies } from "next/headers";


type Session = typeof auth.$Infer.Session;
type User = Session["user"];

const COOKIE_NAME = "estately.session_token";

const parseSessionCookie = (value: string): string | null => {
    const lastDot = value.lastIndexOf(".");
    if (lastDot > 0) {
        return value.substring(0, lastDot);
    }
    return null;
};

const getServerSession = cache(async () => {
    try {
        return await auth.api.getSession({ headers: await headers() });
    } catch {
        return null;
    }
});

export const getUserSession = async (): Promise<User | null> => {
    const session = await getServerSession();
    return session?.user || null;
}

export const getUserToken = async (): Promise<string | null> => {
    const session = await getServerSession();
    if (session?.session?.token) return session.session.token;

    try {
        const cookieStore = await cookies();
        const sessionCookie = cookieStore.get(COOKIE_NAME);
        if (sessionCookie?.value) {
            return parseSessionCookie(sessionCookie.value);
        }
    } catch {}

    return null;
}


export const requireRole = async (role: string): Promise<User> => {
    const user = await getUserSession();
    
    if (!user) {
        redirect('/auth/login');
    }
    
    if (user?.userRole !== role) {
        redirect('/unauthorized');
    }
    
    return user;
}

