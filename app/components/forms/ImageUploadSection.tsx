"use client";
import React from "react";
import Image from "next/image";
import { Fieldset } from "@heroui/react";
import { Picture } from "@gravity-ui/icons";
import { Ban } from "lucide-react";

interface ImageUploadSectionProps {
  images: string[];
  imagePreviews: string[];
  isUploading: boolean;
  uploadError: string;
  errors: Record<string, string | undefined>;
  onUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRemove: (index: number) => void;
}

export default function ImageUploadSection({
  images,
  imagePreviews,
  isUploading,
  uploadError,
  errors,
  onUpload,
  onRemove,
}: ImageUploadSectionProps) {
  return (
    <Fieldset className="space-y-4 w-full">
      <legend className="text-lg font-heading font-medium text-text border-b border-gray-100 w-full pb-2 mb-2 flex items-center gap-2">
        <Picture className="text-primary w-4 h-4" /> Property Images
      </legend>

      <div>
        <label
          className={`
            flex flex-col items-center justify-center w-full
            border-2 border-dashed rounded-xl p-6
            transition-all duration-200 cursor-pointer
            ${images.length > 0
              ? 'border-primary/30 bg-primary/5'
              : 'border-gray-300 bg-gray-50 hover:border-primary/40 hover:bg-gray-100'
            }
            ${errors.images ? 'border-danger bg-danger/5' : ''}
          `}
        >
          <div className="flex flex-col items-center justify-center gap-2">
            <div className="p-3 rounded-full bg-primary/10">
              <Picture className="text-primary w-4 h-4" />
            </div>
            <p className="text-sm font-medium text-gray-700">
              {isUploading ? 'Uploading...' : 'Click to upload property images'}
            </p>
            <p className="text-xs text-gray-500">
              PNG, JPG, JPEG up to 10MB
            </p>
          </div>
          <input
            type="file"
            accept="image/*"
            onChange={onUpload}
            disabled={isUploading}
            className="hidden"
          />
        </label>
        {errors.images && (
          <p className="text-xs text-danger mt-2">{errors.images}</p>
        )}
        {uploadError && (
          <p className="text-xs text-danger mt-2">{uploadError}</p>
        )}
      </div>

      {imagePreviews.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mt-3">
          {imagePreviews.map((preview, index) => (
            <div key={index} className="relative group aspect-square">
              <Image
                src={preview}
                alt={`Property image ${index + 1}`}
                fill
                className="object-cover rounded-lg"
              />
              <button
                type="button"
                onClick={() => onRemove(index)}
                className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-red-600"
              >
                <Ban className="w-4 h-4" />
              </button>
              {isUploading && index === imagePreviews.length - 1 && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-lg">
                  <Ban className="animate-spin text-white w-4 h-4" />
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {images.length > 0 && (
        <p className="text-xs text-gray-500 mt-2">
          {images.length} image{images.length > 1 ? 's' : ''} uploaded
        </p>
      )}
    </Fieldset>
  );
}
