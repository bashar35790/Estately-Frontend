import PostPropertyForm from './PostPropertyForm'

function AddPropertyPage() {
    const owner = {
        _id: "1",
        name: "John Doe",
        email: "[EMAIL_ADDRESS]",
        status: "Approved",
    };

    return (
        <div>
            <PostPropertyForm owner={owner} />
        </div>
    )
}

export default AddPropertyPage;
