import PostPropertyForm from './PostPropertyForm'
import { getCurrentUser } from '@/lib/api/bookings'
async function AddPropertyPage() {
    const owner = await getCurrentUser()
    return (
        <div>
            <PostPropertyForm owner={owner} />
        </div>
    )
}

export default AddPropertyPage;
