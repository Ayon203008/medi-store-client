// components/MedicineSearch.tsx
"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, X } from "lucide-react";

export default function MedicineSearch() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // * URL এ name param থাকলে সেটা initial value হিসেবে দেখাবে
  const [name, setName] = useState(searchParams.get("name") || "");
  const [minPrice, setMinPrice] = useState(searchParams.get("minPrice") || "");
  const [maxPrice, setMaxPrice] = useState(searchParams.get("maxPrice") || "");
  const [manufacturer, setManufacturer] = useState(searchParams.get("manufacturer") || "");

  const handleSearch = () => {
 
    const params = new URLSearchParams();
    if (name) params.set("name", name);
    if (manufacturer) params.set("manufacturer", manufacturer);
    if (minPrice) params.set("minPrice", minPrice);
    if (maxPrice) params.set("maxPrice", maxPrice);


    router.push(`/medicines?${params.toString()}`);
  };

  const handleReset = () => {
    setName("");
    setManufacturer("");
    setMinPrice("");
    setMaxPrice("");
    router.push("/medicines");
  };

  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSearch();
  };

  return (
    <div className="flex flex-col sm:flex-row flex-wrap gap-3 mb-8">
      
      {/* Name Search */}
      <div className="relative flex-1 min-w-[200px]">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Search by name..."
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyDown={handleKeyDown}
          className="pl-9"
        />
      </div>

      {/* Manufacturer */}
      <Input
        placeholder="Manufacturer..."
        value={manufacturer}
        onChange={(e) => setManufacturer(e.target.value)}
        onKeyDown={handleKeyDown}
        className="flex-1 min-w-[160px]"
      />

      <Input
        type="number"
        placeholder="Min price"
        value={minPrice}
        onChange={(e) => setMinPrice(e.target.value)}
        className="w-28"
      />
      <Input
        type="number"
        placeholder="Max price"
        value={maxPrice}
        onChange={(e) => setMaxPrice(e.target.value)}
        className="w-28"
      />

      <Button onClick={handleSearch}>Search</Button>

      {(name || manufacturer || minPrice || maxPrice) && (
        <Button variant="outline" onClick={handleReset}>
          <X className="w-4 h-4 mr-1" /> Reset
        </Button>
      )}
    </div>
  );
}