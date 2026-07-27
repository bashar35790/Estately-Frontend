"use client";
import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { addProperties } from "@/lib/action/properties";
import { PropertyStatus } from "@/types/enums";

interface FormErrors {
  [key: string]: string | undefined;
  title?: string;
  description?: string;
  location?: string;
  propertyType?: string;
  price?: string;
  rentType?: string;
  bedrooms?: string;
  bathrooms?: string;
  size?: string;
  amenities?: string;
  images?: string;
}

interface PropertyPayload {
  title: string;
  description: string;
  location: string;
  propertyType: string;
  price: number;
  rentType: string;
  bedrooms: number;
  bathrooms: number;
  size: number;
  amenities: string[];
  extraFeatures: string[];
  isFeatured: boolean;
  status: string;
  ownerId: string;
  ownerName: string;
  ownerEmail: string;
  images: string[];
}

interface OwnerUser {
  id?: string;
  name?: string | null;
  email?: string | null;
}

export function usePropertyForm(owner: OwnerUser) {
  const router = useRouter();
  const [isFeatured, setIsFeatured] = useState<boolean>(false);
  const [errors, setErrors] = useState<FormErrors>({});

  const validate = useCallback((formData: FormData, images: string[]): FormErrors => {
    const data = Object.fromEntries(formData.entries());
    const newErrors: FormErrors = {};
    if (!data.title) newErrors.title = "Property title is required";
    if (!data.description) newErrors.description = "Description is required";
    if (!data.location) newErrors.location = "Location is required";
    if (!data.propertyType) newErrors.propertyType = "Property type is required";
    if (!data.price) newErrors.price = "Rent price is required";
    if (!data.rentType) newErrors.rentType = "Rent type is required";
    if (!data.bedrooms) newErrors.bedrooms = "Number of bedrooms is required";
    if (!data.bathrooms) newErrors.bathrooms = "Number of bathrooms is required";
    if (!data.size) newErrors.size = "Property size is required";
    if (!data.amenities) newErrors.amenities = "At least one amenity is required";
    if (images.length === 0) newErrors.images = "At least one property image is required";
    return newErrors;
  }, []);

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>, images: string[]) => {
      e.preventDefault();

      const formData = new FormData(e.currentTarget);
      const newErrors = validate(formData, images);

      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        return;
      }

      setErrors({});

      const data = Object.fromEntries(formData.entries());
      const payload: PropertyPayload = {
        title: data.title as string,
        description: data.description as string,
        location: data.location as string,
        propertyType: data.propertyType as string,
        price: Number(data.price),
        rentType: data.rentType as string,
        bedrooms: Number(data.bedrooms),
        bathrooms: Number(data.bathrooms),
        size: Number(data.size),
        amenities: (data.amenities as string).split(",").map(i => i.trim()),
        extraFeatures: data.extraFeatures ? (data.extraFeatures as string).split(",").map(i => i.trim()) : [],
        isFeatured,
        status: PropertyStatus.Pending,
        ownerId: owner?.id || "",
        ownerName: owner?.name || "",
        ownerEmail: owner?.email || "",
        images,
      };

      const res = await addProperties(payload);

      if (res.insertedId) {
        toast.success("Property added successfully!");
        setTimeout(() => {
          router.push("/dashboard/owner/properties");
        }, 1000);
      }
    },
    [isFeatured, owner, router, validate],
  );

  return {
    isFeatured,
    errors,
    setIsFeatured,
    setErrors,
    handleSubmit,
  };
}
