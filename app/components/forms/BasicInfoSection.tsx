"use client";
import React from "react";
import {
  Fieldset,
  TextField,
  Label,
  Input,
  TextArea,
  FieldError,
  Select,
  ListBox,
  Switch,
} from "@heroui/react";
import { House, Thunderbolt, Globe } from "@gravity-ui/icons";

interface BasicInfoSectionProps {
  errors: Record<string, string | undefined>;
  textInputClass: string;
  textAreaClass: string;
  triggerClass: string;
  isFeatured: boolean;
  onFeaturedChange: (checked: boolean) => void;
}

export default function BasicInfoSection({
  errors,
  textInputClass,
  textAreaClass,
  triggerClass,
  isFeatured,
  onFeaturedChange,
}: BasicInfoSectionProps) {
  return (
    <>
      <Fieldset className="space-y-6 w-full">
        <legend className="text-lg font-heading font-medium text-text border-b border-gray-100 w-full pb-2 mb-2 flex items-center gap-2">
          <House className="text-primary w-4 h-4" /> Basic Information
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

      <Fieldset className="space-y-6 w-full">
        <legend className="text-lg font-heading font-medium text-text border-b border-gray-100 w-full pb-2 mb-2 flex items-center gap-2">
          <Thunderbolt className="text-secondary w-4 h-4" /> Pricing & Type
        </legend>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col gap-1.5 w-full">
            <Select name="propertyType" placeholder="Select Type" className="w-full">
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
              <Select name="rentType" placeholder="Select Cycle" className="w-full">
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
              <Globe className="absolute left-4 text-gray-400 pointer-events-none z-10 w-4 h-4" />
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
              onChange={(e: any) => onFeaturedChange(e.target ? e.target.checked : Boolean(e))}
            />
          </div>
        </div>
      </Fieldset>
    </>
  );
}
