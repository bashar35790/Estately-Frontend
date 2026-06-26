"use client";

import type { Selection, SortDescriptor } from "@heroui/react";
import { useMemo, useState } from 'react';
import { Table, Chip, Button, Checkbox } from "@heroui/react";
import { Eye, Layers, Pencil, TrashBin } from "@gravity-ui/icons";

interface Property {
  _id: string;
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
  status: "Active" | "Pending" | "Rented" | string;
  ownerId: string;
  ownerName: string;
  ownerEmail: string;
}

// Fixed status colors to strictly map with your project requirements
const statusColorMap: Record<string, "success" | "warning" | "danger" | "default"> = {
  active: "success",
  pending: "warning",
  rented: "danger",
};

interface OwnerPropertiesPageProps {
  initialProperties: Property[];
}

export default function OwnerPropertiesPage({ initialProperties = [] }: OwnerPropertiesPageProps) {
  const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set());
  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
    column: "title",
    direction: "ascending",
  });

  // Client-side sorting array implementation precisely following your reference model
  const sortedProperties = useMemo(() => {
    return [...initialProperties].sort((a, b) => {
      const col = sortDescriptor.column as keyof Property;
      const first = String(a[col] ?? "");
      const second = String(b[col] ?? "");
      let cmp = first.localeCompare(second, undefined, { numeric: true });

      if (sortDescriptor.direction === "descending") {
        cmp *= -1;
      }

      return cmp;
    });
  }, [initialProperties, sortDescriptor]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(price);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-4">
      {/* Luxury Brand Consistency Headers */}
      <div className="flex flex-col gap-1">
        <h2 className="text-2xl font-bold tracking-tight font-heading text-default-900">Manage All Properties</h2>
        <p className="text-sm font-body text-default-500">View, update, and manage your current premium property listings.</p>
      </div>

      <Table>
        <Table.ScrollContainer>
          <Table.Content
            aria-label="Real estate portfolio tracking table"
            className="min-w-[800px]"
            selectedKeys={selectedKeys}
            selectionMode="multiple"
            sortDescriptor={sortDescriptor}
            onSelectionChange={setSelectedKeys}
            onSortChange={setSortDescriptor}
          >
            <Table.Header>
              <Table.Column className="pr-0">
                <Checkbox aria-label="Select all properties" slot="selection">
                  <Checkbox.Content>
                    <Checkbox.Control>
                      <Checkbox.Indicator />
                    </Checkbox.Control>
                  </Checkbox.Content>
                </Checkbox>
              </Table.Column>

              <Table.Column allowsSorting isRowHeader id="title">
                {({ sortDirection }) => (
                  <Table.SortableColumnHeader sortDirection={sortDirection}>
                    Property Details
                  </Table.SortableColumnHeader>
                )}
              </Table.Column>

              <Table.Column allowsSorting id="propertyType">
                {({ sortDirection }) => (
                  <Table.SortableColumnHeader sortDirection={sortDirection}>
                    Configurations
                  </Table.SortableColumnHeader>
                )}
              </Table.Column>

              <Table.Column allowsSorting id="price">
                {({ sortDirection }) => (
                  <Table.SortableColumnHeader sortDirection={sortDirection}>
                    Valuation
                  </Table.SortableColumnHeader>
                )}
              </Table.Column>

              <Table.Column allowsSorting id="status">
                {({ sortDirection }) => (
                  <Table.SortableColumnHeader sortDirection={sortDirection}>
                    Listing Status
                  </Table.SortableColumnHeader>
                )}
              </Table.Column>

              <Table.Column className="text-end">Actions</Table.Column>
            </Table.Header>

            <Table.Body>
              {sortedProperties.map((property) => (
                <Table.Row key={property._id} id={property._id}>
                  <Table.Cell className="pr-0">
                    <Checkbox aria-label={`Select ${property.title}`} slot="selection" variant="secondary">
                      <Checkbox.Content>
                        <Checkbox.Control>
                          <Checkbox.Indicator />
                        </Checkbox.Control>
                      </Checkbox.Content>
                    </Checkbox>
                  </Table.Cell>

                  {/* 1. Details Column with Premium Luxury Tints */}
                  <Table.Cell>
                    <div className="flex flex-col gap-0.5">
                      <div className="flex items-center gap-2">
                        <span className="font-heading font-semibold text-default-800 text-base">
                          {property.title}
                        </span>
                        {property.isFeatured && (
                          <Chip
                            size="sm"
                            variant="primary"
                            className="bg-primary/10 text-primary border border-primary/20 text-[10px] font-bold tracking-widest uppercase px-1 h-5"
                          >
                            Premium
                          </Chip>
                        )}
                      </div>
                      <span className="text-xs text-default-400 font-body max-w-[240px] line-clamp-1">
                        {property.location}
                      </span>
                    </div>
                  </Table.Cell>

                  {/* 2. Specs Layout */}
                  <Table.Cell className="min-w-52">
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-1.5 capitalize text-xs font-semibold text-secondary">
                        <Layers className="size-3.5" />
                        <span className="font-body">{property.propertyType}</span>
                      </div>
                      <div className="flex items-center gap-3 text-xs text-default-400 mt-0.5 font-body">
                        <span className="flex items-center gap-1">
                          <Layers className="size-3.5" /> {property.bedrooms} Bed
                        </span>
                        <span className="flex items-center gap-1">
                          <Layers className="size-3.5" /> {property.bathrooms} Bath
                        </span>
                        <span className="flex items-center gap-1">
                          <Layers className="size-3.5" /> {property.size} m²
                        </span>
                      </div>
                    </div>
                  </Table.Cell>

                  {/* 3. Valuation Metric */}
                  <Table.Cell>
                    <div className="flex flex-col gap-0.5 font-body">
                      <span className="font-semibold text-default-800 text-sm">
                        {formatPrice(property.price)}
                      </span>
                      <span className="text-[11px] text-default-400 capitalize italic tracking-wide">
                        billed {property.rentType}
                      </span>
                    </div>
                  </Table.Cell>

                  {/* 4. Status Alignment */}
                  <Table.Cell className="min-w-25">
                    <Chip
                      color={statusColorMap[property.status.toLowerCase()] || "default"}
                      size="sm"
                      variant="soft"
                      className="capitalize font-body font-semibold text-[11px]"
                    >
                      {property.status}
                    </Chip>
                  </Table.Cell>

                  {/* 5. Pure HeroUI v3 Actions Panel with Inspect, Edit, and Delete buttons */}
                  <Table.Cell>
                    <div className="flex items-center justify-end gap-1">
                      <Button size="sm" variant="tertiary" aria-label="Inspect public property listing">
                        <Eye className="size-4" />
                      </Button>
                      <Button size="sm" variant="tertiary" aria-label="Modify listing details">
                        <Pencil className="size-4 text-default-500 hover:text-primary transition-colors" />
                      </Button>
                      <Button size="sm" variant="danger-soft" aria-label="Delist asset from registry">
                        <TrashBin className="size-4" />
                      </Button>
                    </div>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table.Content>
        </Table.ScrollContainer>
      </Table>
    </div>
  );
}
