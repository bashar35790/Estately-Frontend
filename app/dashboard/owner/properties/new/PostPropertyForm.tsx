"use client";
import React from "react";
import { Form, Button } from "@heroui/react";
import { Person } from "@gravity-ui/icons";
import { useRouter } from "next/navigation";
import { useImageUpload } from "@/hooks/useImageUpload";
import { usePropertyForm } from "@/hooks/usePropertyForm";
import BasicInfoSection from "@/components/forms/BasicInfoSection";
import PropertyDetailsSection from "@/components/forms/PropertyDetailsSection";
import ImageUploadSection from "@/components/forms/ImageUploadSection";

const textInputClass = "w-full text-text bg-white border border-gray-200 hover:border-primary/40 focus:border-primary rounded-xl h-12 px-4 text-sm outline-none transition-all shadow-[0_2px_4px_rgba(0,0,0,0.01)]";
const textAreaClass = "w-full text-text bg-white border border-gray-200 hover:border-primary/40 focus:border-primary rounded-xl p-4 text-sm outline-none transition-all shadow-[0_2px_4px_rgba(0,0,0,0.01)]";
const triggerClass = "flex w-full items-center justify-between text-text bg-white border border-gray-200 hover:border-primary/40 data-[focus=true]:border-primary rounded-xl h-12 px-4 text-sm outline-none transition-all shadow-[0_2px_4px_rgba(0,0,0,0.01)] cursor-pointer";

export default function AddPropertyForm({ owner }: any) {
  const router = useRouter();
  const {
    images, imagePreviews, isUploading, uploadError,
    handleImageUpload, removeImage,
  } = useImageUpload();
  const {
    isFeatured, errors, setIsFeatured, handleSubmit,
  } = usePropertyForm(owner);

  return (
    <div className="min-h-screen bg-[#f0f0f0] font-body text-text py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white border border-white rounded-[32px] p-8 md:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.03)]">

        <div className="border-b border-gray-100 pb-6 mb-8">
          <span className="text-xs font-bold uppercase tracking-widest text-primary/80">Luxury Portfolio</span>
          <h1 className="text-3xl font-heading font-semibold tracking-tight mt-1">Add New Property</h1>
          <p className="text-gray-500 text-sm mt-1">
            List your luxury estate into our system for verification and premium matchmaking.
          </p>

          <div className="mt-5 inline-flex items-center gap-2 bg-[#fbfbfb] border border-gray-100 rounded-xl px-4 py-2 text-xs text-gray-600 shadow-sm">
            <Person className="text-primary w-4 h-4" />
            Listed by: <span className="font-semibold text-text">{owner.name}</span>
            <span className="text-primary font-semibold bg-[#1eac70]/10 px-2 py-0.5 rounded-md border border-primary/20">{owner.status} Account</span>
          </div>
        </div>

        <Form onSubmit={(e) => handleSubmit(e, images)} className="space-y-8" validationBehavior="aria">
          <BasicInfoSection
            errors={errors}
            textInputClass={textInputClass}
            textAreaClass={textAreaClass}
            triggerClass={triggerClass}
            isFeatured={isFeatured}
            onFeaturedChange={setIsFeatured}
          />

          <PropertyDetailsSection
            errors={errors}
            textInputClass={textInputClass}
          />

          <ImageUploadSection
            images={images}
            imagePreviews={imagePreviews}
            isUploading={isUploading}
            uploadError={uploadError}
            errors={errors}
            onUpload={handleImageUpload}
            onRemove={removeImage}
          />

          <div className="flex justify-end gap-3 pt-6 border-t border-gray-100 w-full">
            <Button
              type="button"
              variant="outline"
              className="border-gray-200 text-gray-600 hover:bg-gray-50 rounded-xl px-6 font-medium h-12 transition-all"
              onClick={() => router.back()}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              isDisabled={isUploading}
              className="bg-[#1eac70] text-white font-semibold hover:bg-[#1a9460] rounded-xl px-8 shadow-md shadow-primary/10 transition-all h-12 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isUploading ? 'Uploading Images...' : 'Submit Listing'}
            </Button>
          </div>
        </Form>

      </div>
    </div>
  );
}
