import { requireRole } from '@/lib/core/session';


const OwnerLayout = async ({ children }:{ children: React.ReactNode }) => {
    await requireRole('owner')
    return children;
};

export default OwnerLayout;