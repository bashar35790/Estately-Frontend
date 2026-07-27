"use client";
import { useState, useCallback } from "react";
import { toast } from "react-toastify";
import { uploadImage } from "@/actions/upload";

export function useImageUpload() {
  const [images, setImages] = useState<string[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [uploadError, setUploadError] = useState<string>("");

  const handleImageUpload = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];

    if (file.size > 10 * 1024 * 1024) {
      toast.error("Image size should be less than 10MB");
      return;
    }

    if (!file.type.startsWith('image/')) {
      toast.error("Please upload a valid image file");
      return;
    }

    const previewUrl = URL.createObjectURL(file);
    setImagePreviews(prev => [...prev, previewUrl]);
    setIsUploading(true);
    setUploadError("");

    const formData = new FormData();
    formData.append("image", file);

    try {
      const result = await uploadImage(formData);

      if (result.success && result.url) {
        setImages(prev => [...prev, result.url!]);
        toast.success("Image uploaded successfully!");
      } else {
        setImagePreviews(prev => prev.slice(0, -1));
        setUploadError("Failed to upload image. Please try again.");
        toast.error("Failed to upload image");
      }
    } catch {
      setImagePreviews(prev => prev.slice(0, -1));
      setUploadError("Network error during upload.");
      toast.error("Network error during upload");
    } finally {
      setIsUploading(false);
      e.target.value = '';
    }
  }, []);

  const removeImage = useCallback((index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
    setImagePreviews(prev => prev.filter((_, i) => i !== index));
    setUploadError("");
  }, []);

  const resetImages = useCallback(() => {
    setImages([]);
    setImagePreviews([]);
    setUploadError("");
  }, []);

  return {
    images,
    imagePreviews,
    isUploading,
    uploadError,
    handleImageUpload,
    removeImage,
    resetImages,
    setImages,
    setImagePreviews,
  };
}
