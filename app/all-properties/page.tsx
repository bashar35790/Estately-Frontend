"use client";

import React, { useState } from "react";
import PropertyCard from "@/components/properties/PropertiesCard";

const dummyProperties = [
  {
    _id: { $oid: "6a3bed6f00ddf5578517b1c6" },
    title: "Modern Premium Villa",
    description: "A stunning architectural marvel featuring expansive glass walls, a private infinity pool, and panoramic view configurations perfect for premium living setups.",
    location: "Beverly Hills, California",
    propertyType: "villa",
    price: 4500,
    rentType: "monthly",
    bedrooms: 5,
    bathrooms: 6,
    size: 450,
    amenities: ["Infinity Pool", "Home Automation", "Private Gym", "Wine Cellar"],
    extraFeatures: ["Solar Grid Panels", "Sub-Zero Appliances"],
    isFeatured: true,
    status: "active",
    ownerId: "1",
    ownerName: "John Doe",
    ownerEmail: "john@premiumholdings.com",
    images: ["https://i.ibb.co/5hS8FPqb/134237090459086544.jpg"]
  },
  {
    _id: "6a3bed6f00ddf5578517b1c7",
    title: "Luxury High-Rise Penthouse",
    description: "Experience sky-high living in this fully furnished downtown asset. Panoramic city vistas with direct rooftop helipad runway access.",
    location: "Manhattan, New York",
    propertyType: "apartment",
    price: 8200,
    rentType: "monthly",
    bedrooms: 3,
    bathrooms: 3.5,
    size: 280,
    amenities: ["24/7 Concierge", "Rooftop Terrace", "Spa Access"],
    extraFeatures: ["Smart Glass Windows", "Private Elevator Structural Access"],
    isFeatured: false,
    status: "active",
    ownerId: "2",
    ownerName: "Sarah Jenkins",
    ownerEmail: "sarah@nycapartments.com",
    images: [
      "https://i.ibb.co/WNKz69CM/134244406658011656.jpg",
      "https://i.ibb.co/Ck812Vd/134249137747514014.jpg"
    ]
  },
  {
    _id: { $oid: "6a3bed6f00ddf5578517b1c8" },
    title: "Quia ea reiciendis i",
    description: "Reiciendis iure qui Commodi sapiente fac. Beautiful suburban layout with massive backyard development space.",
    location: "Commodi sapiente fac",
    propertyType: "villa",
    price: 270,
    rentType: "monthly",
    bedrooms: 89,
    bathrooms: 5,
    size: 83,
    amenities: ["In duis iure quaerat"],
    extraFeatures: ["Possimus est aut m"],
    isFeatured: false,
    status: "pending",
    ownerId: "1",
    ownerName: "John Doe",
    ownerEmail: "john.doe@example.com",
    images: [
      "https://i.ibb.co/Ck812Vd/134249137747514014.jpg",
      "https://i.ibb.co/5hS8FPqb/134237090459086544.jpg"
    ]
  },
  {
    _id: { $oid: "6a3bed6f00ddf5578517b1c9" },
    title: "Minimalist Waterfront Studio",
    description: "A gorgeous, compact coastal setup optimizing small-footprint premium architecture right along the main beach boardwalk.",
    location: "Miami, Florida",
    propertyType: "studio",
    price: 1950,
    rentType: "monthly",
    bedrooms: 1,
    bathrooms: 1,
    size: 65,
    amenities: ["Beach Access", "High-speed Fiber", "Valet Parking"],
    extraFeatures: ["Storm Shutters", "Custom Built-ins"],
    isFeatured: true,
    status: "active",
    ownerId: "3",
    ownerName: "Alex Mercer",
    ownerEmail: "alex@miamiluxe.com",
    images: ["https://i.ibb.co/5hS8FPqb/134237090459086544.jpg"]
  }
];

export default function AllPropertiesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");

  const filteredProperties = dummyProperties.filter((property) => {
    const matchesSearch = 
      property.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      property.location.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesType = typeFilter === "all" || property.propertyType.toLowerCase() === typeFilter.toLowerCase();

    return matchesSearch && matchesType;
  });

  return (
    <div className="min-h-screen bg-black text-zinc-300 p-6 sm:p-12 font-sans selection:bg-amber-500 selection:text-black">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Luxury Brand Header Block */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-white/10 pb-10">
          <div className="space-y-4">
            <h1 className="text-4xl md:text-6xl font-light tracking-wide text-white">
              Exclusive <span className="text-amber-500 font-normal">Estates</span>
            </h1>
            <p className="text-sm md:text-base text-zinc-400 max-w-xl font-light leading-relaxed tracking-wide">
              Discover our curated collection of premium architectural masterpieces. 
              Extraordinary residences for those who seek the exceptional.
            </p>
          </div>
          
          {/* Real-time Filters */}
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:max-w-md">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search estates or locations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-12 pl-4 pr-10 bg-zinc-900 border border-white/10 text-white placeholder-zinc-500 rounded-sm focus:outline-none focus:border-amber-500/50 transition-colors text-sm font-light tracking-wide"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-0 bottom-0 my-auto text-zinc-500 hover:text-amber-500 text-xs transition-colors"
                >
                  ✕
                </button>
              )}
            </div>

            <div className="relative w-full sm:max-w-[160px]">
              <select
                aria-label="Filter by property type"
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="w-full h-12 px-4 bg-zinc-900 border border-white/10 text-zinc-300 rounded-sm focus:outline-none focus:border-amber-500/50 transition-colors appearance-none text-sm font-light tracking-wide cursor-pointer"
              >
                <option value="all">All Properties</option>
                <option value="villa">Villas</option>
                <option value="apartment">Apartments</option>
                <option value="studio">Studios</option>
              </select>
              <div className="absolute right-4 top-0 bottom-0 my-auto h-1.5 w-1.5 border-r border-b border-amber-500 rotate-45 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Dynamic Card Layout Grid */}
        {filteredProperties.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 justify-items-center">
            {filteredProperties.map((property) => {
              const idString = typeof property._id === "object" ? property._id.$oid : property._id;
              return (
                <PropertyCard 
                  key={idString} 
                  property={property} 
                />
              );
            })}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center text-center py-32 border border-dashed border-white/10 rounded-sm bg-zinc-900/50">
            <p className="text-amber-500 font-light tracking-widest uppercase text-lg mb-2">No Properties Found</p>
            <p className="text-zinc-500 text-sm font-light max-w-sm">
              We couldn't find any estates matching your refined criteria. Please adjust your filters.
            </p>
          </div>
        )}

      </div>
    </div>
  );
}