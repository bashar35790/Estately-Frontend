import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import PropertyCard from "@/components/properties/PropertiesCard";

const mockProperty = {
  _id: "507f1f77bcf86cd799439011",
  title: "Luxury Beachfront Villa",
  description: "A beautiful villa by the beach",
  location: "Malibu, CA",
  propertyType: "villa",
  price: 5000,
  rentType: "monthly",
  bedrooms: 4,
  bathrooms: 3,
  size: 2500,
  amenities: ["Pool", "Ocean View"],
  isFeatured: true,
  status: "approved",
  ownerId: "owner-1",
  ownerName: "John Doe",
  ownerEmail: "john@example.com",
  images: ["https://example.com/image.jpg"],
};

describe("PropertyCard", () => {
  it("renders property title", () => {
    render(<PropertyCard property={mockProperty} />);
    expect(screen.getByText("Luxury Beachfront Villa")).toBeDefined();
  });

  it("renders property location", () => {
    render(<PropertyCard property={mockProperty} />);
    expect(screen.getByText("Malibu, CA")).toBeDefined();
  });

  it("renders property price", () => {
    render(<PropertyCard property={mockProperty} />);
    expect(screen.getByText("$5,000")).toBeDefined();
  });

  it("renders rent type", () => {
    render(<PropertyCard property={mockProperty} />);
    expect(screen.getByText("monthly", { exact: false })).toBeDefined();
  });

  it("renders property type badge", () => {
    render(<PropertyCard property={mockProperty} />);
    expect(screen.getByText("villa")).toBeDefined();
  });

  it("renders feature badge for featured properties", () => {
    render(<PropertyCard property={mockProperty} />);
    expect(screen.getByText("Featured")).toBeDefined();
  });

  it("does not render Featured badge for non-featured properties", () => {
    render(<PropertyCard property={{ ...mockProperty, isFeatured: false }} />);
    expect(screen.queryByText("Featured")).toBeNull();
  });
});
