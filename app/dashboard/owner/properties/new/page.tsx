import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import PostPropertyForm from "./PostPropertyForm";

export const dynamic = "force-dynamic";

async function AddPropertyPage() {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    const owner = session?.user || {};

    return (
        <div>
            <PostPropertyForm owner={owner} />
        </div>
    );
}

export default AddPropertyPage;
