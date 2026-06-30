import { redirect } from "next/navigation";
import { auth } from "../auth"; 
import { headers } from "next/headers";


type Session = typeof auth.$Infer.Session;
type User = Session["user"];

export const getUserSession = async (): Promise<User | null> => {
    const session = await auth.api.getSession({
        headers: await headers()
    });

    return session?.user || null;
}

export const getUserToken = async (): Promise<string | null> => {
    const session = await auth.api.getSession({
        headers: await headers()
    });

    return session?.session?.token || null;
}


export const requireRole = async (role: string): Promise<User> => {
    const user = await getUserSession();
    
    if (!user) {
        redirect('/auth/signin');
    }
    
    if (user?.userRole !== role) {
        redirect('/unauthorized');
    }
    
    return user;
}

