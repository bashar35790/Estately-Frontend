import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import AddPropertyForm from "@/dashboard/owner/properties/new/PostPropertyForm";

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: vi.fn(),
    back: vi.fn(),
  }),
}));

vi.mock("@/hooks/useImageUpload", () => ({
  useImageUpload: () => ({
    images: [],
    imagePreviews: [],
    isUploading: false,
    uploadError: "",
    handleImageUpload: vi.fn(),
    removeImage: vi.fn(),
    resetImages: vi.fn(),
    setImages: vi.fn(),
    setImagePreviews: vi.fn(),
  }),
}));

vi.mock("@/hooks/usePropertyForm", () => ({
  usePropertyForm: () => ({
    isFeatured: false,
    errors: {},
    setIsFeatured: vi.fn(),
    setErrors: vi.fn(),
    handleSubmit: vi.fn(),
  }),
}));

vi.mock("react-toastify", () => ({
  toast: { success: vi.fn(), error: vi.fn() },
}));

describe("PostPropertyForm", () => {
  const mockOwner = {
    id: "owner-1",
    name: "John Doe",
    email: "john@example.com",
    status: "Premium",
  };

  it("renders the form header", () => {
    render(<AddPropertyForm owner={mockOwner} />);
    expect(screen.getByText("Add New Property")).toBeDefined();
  });

  it("renders owner information", () => {
    render(<AddPropertyForm owner={mockOwner} />);
    expect(screen.getByText(/John Doe/)).toBeDefined();
    expect(screen.getByText("Premium Account")).toBeDefined();
  });

  it("renders all form sections", () => {
    render(<AddPropertyForm owner={mockOwner} />);

    expect(screen.getByText("Basic Information")).toBeDefined();
    expect(screen.getByText("Pricing & Type")).toBeDefined();
    expect(screen.getByText("Specifications")).toBeDefined();
    expect(screen.getByText("Property Images")).toBeDefined();
  });

  it("renders submit and cancel buttons", () => {
    render(<AddPropertyForm owner={mockOwner} />);

    expect(screen.getByText("Submit Listing")).toBeDefined();
    expect(screen.getByText("Cancel")).toBeDefined();
  });

  it("renders form fields", () => {
    render(<AddPropertyForm owner={mockOwner} />);

    expect(screen.getByText("Property Title")).toBeDefined();
    expect(screen.getByText("Description")).toBeDefined();
    expect(screen.getByText("Property Type")).toBeDefined();
    expect(screen.getByText("Rent Price ($)")).toBeDefined();
    expect(screen.getByText("Location")).toBeDefined();
    expect(screen.getByText("Bedrooms")).toBeDefined();
    expect(screen.getByText("Bathrooms")).toBeDefined();
    expect(screen.getByText("Size (Sq Ft)")).toBeDefined();
    expect(screen.getByText("Amenities (Comma separated)")).toBeDefined();
  });
});
