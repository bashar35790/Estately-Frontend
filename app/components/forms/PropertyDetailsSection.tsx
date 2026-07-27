"use client";
import React from "react";
import {
  Fieldset,
  TextField,
  Label,
  Input,
  FieldError,
} from "@heroui/react";
import { FolderPlus } from "@gravity-ui/icons";

interface PropertyDetailsSectionProps {
  errors: Record<string, string | undefined>;
  textInputClass: string;
}

export default function PropertyDetailsSection({ errors, textInputClass }: PropertyDetailsSectionProps) {
  return (
    <Fieldset className="space-y-6 w-full">
      <legend className="text-lg font-heading font-medium text-text border-b border-gray-100 w-full pb-2 mb-2 flex items-center gap-2">
        <FolderPlus className="text-primary w-4 h-4" /> Specifications
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
  );
}
