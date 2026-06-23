"use client";

import React, { useState } from "react";
import {
    Form,
    Fieldset,
    TextField,
    Label,
    Input,
    TextArea,
    FieldError,
    Select,
    ListBox,
    Switch,
    Button,
} from "@heroui/react";
import { House, Globe, Thunderbolt, Person, FolderPlus } from "@gravity-ui/icons";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

// Strict Interfaces Definition
interface OwnerInfo {
    _id: string;
    name: string;
    email: string;
    status: string;
}

interface AddPropertyFormProps {
    owner: OwnerInfo;
}

interface FormErrors {
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
}

export default function AddPropertyForm({ owner }: AddPropertyFormProps) {
    const router = useRouter();
    const [isFeatured, setIsFeatured] = useState<boolean>(false);
    const [errors, setErrors] = useState<FormErrors>({});

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData.entries());

        // Client-side Validation Checks
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

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setErrors({});

        const payload = {
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
            status: "Pending",
            ownerInfo: {
                id: owner._id,
                name: owner.name,
                email: owner.email,
            }
        };

        console.log("Submitting Luxury Property Payload:", payload);
        toast.success("Property listing structure validated successfully!");
    };

    // Premium UI Custom Styles
    const textInputClass = "w-full text-text bg-white border border-gray-200 hover:border-primary/40 focus:border-primary rounded-xl h-12 px-4 text-sm outline-none transition-all shadow-[0_2px_4px_rgba(0,0,0,0.01)]";
    const textAreaClass = "w-full text-text bg-white border border-gray-200 hover:border-primary/40 focus:border-primary rounded-xl p-4 text-sm outline-none transition-all shadow-[0_2px_4px_rgba(0,0,0,0.01)]";

    // Custom trigger design class for HeroUI Select Component
    const triggerClass = "flex w-full items-center justify-between text-text bg-white border border-gray-200 hover:border-primary/40 data-[focus=true]:border-primary rounded-xl h-12 px-4 text-sm outline-none transition-all shadow-[0_2px_4px_rgba(0,0,0,0.01)] cursor-pointer";

    return (
        <div className="min-h-screen bg-[#f0f0f0] font-body text-text py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto bg-white border border-white rounded-[32px] p-8 md:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.03)]">

                {/* Form Header */}
                <div className="border-b border-gray-100 pb-6 mb-8">
                    <span className="text-xs font-bold uppercase tracking-widest text-primary/80">Luxury Portfolio</span>
                    <h1 className="text-3xl font-heading font-semibold tracking-tight mt-1">Add New Property</h1>
                    <p className="text-gray-500 text-sm mt-1">
                        List your luxury estate into our system for verification and premium matchmaking.
                    </p>

                    {/* Owner verification tag */}
                    <div className="mt-5 inline-flex items-center gap-2 bg-[#fbfbfb] border border-gray-100 rounded-xl px-4 py-2 text-xs text-gray-600 shadow-sm">
                        <Person size={14} className="text-primary" />
                        Listed by: <span className="font-semibold text-text">{owner.name}</span>
                        <span className="text-primary font-semibold bg-[#1eac70]/10 px-2 py-0.5 rounded-md border border-primary/20">{owner.status} Account</span>
                    </div>
                </div>

                {owner.status !== 'Approved' ? (
                    <div className="p-6 bg-amber-50 border border-amber-200 text-amber-800 rounded-2xl text-sm font-medium">
                        Your owner profile is currently pending approval. You can start creating listings once the admin approves your identity.
                    </div>
                ) : (
                    <Form onSubmit={handleSubmit} className="space-y-8" validationErrors={errors} validationBehavior='aria'>

                        {/* SECTION 1: Basic Estate Info */}
                        <Fieldset className="space-y-6 w-full">
                            <legend className="text-lg font-heading font-medium text-text border-b border-gray-100 w-full pb-2 mb-2 flex items-center gap-2">
                                <House className="text-primary" size={18} /> Basic Information
                            </legend>

                            <TextField name="title" isInvalid={!!errors.title} className="flex flex-col gap-1.5 w-full">
                                <Label className="text-gray-600 font-medium text-sm">Property Title</Label>
                                <Input placeholder="e.g. The Grand Horizon Penthouse" className={textInputClass} />
                                {errors.title && <FieldError className="text-xs text-danger mt-1">{errors.title}</FieldError>}
                            </TextField>

                            <TextField name="description" isInvalid={!!errors.description} className="flex flex-col gap-1.5 w-full">
                                <Label className="text-gray-600 font-medium text-sm">Description</Label>
                                <TextArea
                                    placeholder="Provide an elegant storytelling narrative of your property architecture and scenery..."
                                    rows={4}
                                    className={textAreaClass}
                                />
                                {errors.description && <FieldError className="text-xs text-danger mt-1">{errors.description}</FieldError>}
                            </TextField>
                        </Fieldset>

                        {/* SECTION 2: Pricing & Logistics */}
                        <Fieldset className="space-y-6 w-full">
                            <legend className="text-lg font-heading font-medium text-text border-b border-gray-100 w-full pb-2 mb-2 flex items-center gap-2">
                                <Thunderbolt className="text-secondary" size={18} /> Pricing & Type
                            </legend>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="flex flex-col gap-1.5 w-full">
                                    <Select
                                        name="propertyType"
                                        placeholder="Select Type"
                                        className="w-full"
                                    >
                                        <Label className="text-gray-600 font-medium text-sm mb-1.5 block">Property Type</Label>
                                        <Select.Trigger className={triggerClass}>
                                            <Select.Value />
                                            <Select.Indicator />
                                        </Select.Trigger>
                                        <Select.Popover className="bg-white border border-gray-100 shadow-xl rounded-xl p-1">
                                            <ListBox aria-label="Property Type">
                                                <ListBox.Item id="penthouse" textValue="Penthouse" className="rounded-lg data-[hover=true]:bg-gray-50">
                                                    Penthouse
                                                    <ListBox.ItemIndicator />
                                                </ListBox.Item>
                                                <ListBox.Item id="villa" textValue="Luxury Villa" className="rounded-lg data-[hover=true]:bg-gray-50">
                                                    Luxury Villa
                                                    <ListBox.ItemIndicator />
                                                </ListBox.Item>
                                                <ListBox.Item id="apartment" textValue="Apartment" className="rounded-lg data-[hover=true]:bg-gray-50">
                                                    Apartment
                                                    <ListBox.ItemIndicator />
                                                </ListBox.Item>
                                                <ListBox.Item id="mansion" textValue="Mansion" className="rounded-lg data-[hover=true]:bg-gray-50">
                                                    Mansion
                                                    <ListBox.ItemIndicator />
                                                </ListBox.Item>
                                            </ListBox>
                                        </Select.Popover>
                                    </Select>
                                    {errors.propertyType && <span className="text-xs text-danger mt-1">{errors.propertyType}</span>}
                                </div>

                                <div className="grid grid-cols-2 gap-3">
                                    <TextField name="price" isInvalid={!!errors.price} className="space-y-1.5 w-full">
                                        <Label className="text-gray-600 font-medium text-sm block">Rent Price ($)</Label>
                                        <Input placeholder="Price" type="number" className={textInputClass} />
                                    </TextField>

                                    <div className="flex flex-col gap-1.5 w-full">
                                        <Select
                                            name="rentType"
                                            placeholder="Select Cycle"
                                            className="w-full"
                                        >
                                            <Label className="text-gray-600 font-medium text-sm mb-1.5 block">Cycle</Label>
                                            <Select.Trigger className={triggerClass}>
                                                <Select.Value />
                                                <Select.Indicator />
                                            </Select.Trigger>
                                            <Select.Popover className="bg-white border border-gray-100 shadow-xl rounded-xl p-1">
                                                <ListBox aria-label="Rent Cycle" defaultSelectedKeys={["monthly"]}>
                                                    <ListBox.Item id="monthly" textValue="Monthly" className="rounded-lg data-[hover=true]:bg-gray-50">
                                                        Monthly
                                                        <ListBox.ItemIndicator />
                                                    </ListBox.Item>
                                                    <ListBox.Item id="weekly" textValue="Weekly" className="rounded-lg data-[hover=true]:bg-gray-50">
                                                        Weekly
                                                        <ListBox.ItemIndicator />
                                                    </ListBox.Item>
                                                    <ListBox.Item id="daily" textValue="Daily" className="rounded-lg data-[hover=true]:bg-gray-50">
                                                        Daily
                                                        <ListBox.ItemIndicator />
                                                    </ListBox.Item>
                                                </ListBox>
                                            </Select.Popover>
                                        </Select>
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-end">
                                <TextField name="location" isInvalid={!!errors.location} className="flex flex-col gap-1.5 w-full relative">
                                    <Label className="text-gray-600 font-medium text-sm">Location</Label>
                                    <div className="relative flex items-center">
                                        <Globe size={16} className="absolute left-4 text-gray-400 pointer-events-none z-10" />
                                        <Input
                                            name="location"
                                            placeholder="e.g. Beverly Hills, CA"
                                            className={`${textInputClass} pl-11`}
                                        />
                                    </div>
                                    {errors.location && <FieldError className="text-xs text-danger mt-1">{errors.location}</FieldError>}
                                </TextField>

                                <div className="flex items-center justify-between bg-[#fbfbfb] border border-gray-200 rounded-xl h-12 px-4 shadow-sm">
                                    <span className="text-sm font-medium text-gray-600">Mark as Featured Listing</span>
                                    <Switch
                                        isSelected={isFeatured}
                                        onValueChange={setIsFeatured}
                                        size="sm"
                                        color="success"
                                    />
                                </div>
                            </div>
                        </Fieldset>

                        {/* SECTION 3: Specifications */}
                        <Fieldset className="space-y-6 w-full">
                            <legend className="text-lg font-heading font-medium text-text border-b border-gray-100 w-full pb-2 mb-2 flex items-center gap-2">
                                <FolderPlus className="text-primary" size={18} /> Specifications
                            </legend>

                            <div className="grid grid-cols-3 gap-4">
                                <TextField name="bedrooms" isInvalid={!!errors.bedrooms} className="flex flex-col gap-1.5 w-full">
                                    <Label className="text-gray-600 font-medium text-sm">Bedrooms</Label>
                                    <Input type="number" placeholder="3" className={textInputClass} />
                                </TextField>
                                <TextField name="bathrooms" isInvalid={!!errors.bathrooms} className="flex flex-col gap-1.5 w-full">
                                    <Label className="text-gray-600 font-medium text-sm">Bathrooms</Label>
                                    <Input type="number" placeholder="2" className={textInputClass} />
                                </TextField>
                                <TextField name="size" isInvalid={!!errors.size} className="flex flex-col gap-1.5 w-full">
                                    <Label className="text-gray-600 font-medium text-sm">Size (Sq Ft)</Label>
                                    <Input type="number" placeholder="2400" className={textInputClass} />
                                </TextField>
                            </div>

                            <TextField name="amenities" isInvalid={!!errors.amenities} className="flex flex-col gap-1.5 w-full">
                                <Label className="text-gray-600 font-medium text-sm">Amenities (Comma separated)</Label>
                                <Input placeholder="e.g. Swimming Pool, Ocean View, Private Gym" className={textInputClass} />
                                {errors.amenities && <FieldError className="text-xs text-danger mt-1">{errors.amenities}</FieldError>}
                            </TextField>

                            <TextField name="extraFeatures" className="flex flex-col gap-1.5 w-full">
                                <Label className="text-gray-600 font-medium text-sm">Extra Features (Optional)</Label>
                                <Input placeholder="e.g. Smart Home Automation, Wine Cellar" className={textInputClass} />
                            </TextField>
                        </Fieldset>

                        {/* Form Actions */}
                        <div className="flex justify-end gap-3 pt-6 border-t border-gray-100 w-full">
                            <Button
                                type="button"
                                variant="bordered"
                                className="border-gray-200 text-gray-600 hover:bg-gray-50 rounded-xl px-6 font-medium h-12 transition-all"
                                onClick={() => router.back()}
                            >
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                className="bg-[#1eac70] text-white font-semibold hover:bg-[#1a9460] rounded-xl px-8 shadow-md shadow-primary/10 transition-all h-12"
                            >
                                Submit Listing
                            </Button>
                        </div>
                    </Form>
                )}
            </div>
        </div>
    );
}
