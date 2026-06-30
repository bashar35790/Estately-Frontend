import { requireRole } from '@/lib/core/session';

const TenantLayout = async({children}:{ children: React.ReactNode }) => {
    await requireRole('tenant');
    return children;
};

export default TenantLayout;