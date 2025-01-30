"use client"

import useSWR from "swr";
import { toast } from "sonner";
import { ProductCard } from "@/components/frontend/ProductCard";
import { Filters } from "@/components/frontend/Filters";
import { Select, SelectTrigger, SelectContent, SelectItem } from "@/components/ui/select";
import { useState } from "react";

interface Product {
  id: string;
  name: string;
  brand: string;
  imageUrl: string;
  price: number;
  description?: string;
  createdAt: string;
}

const fetcher = async (url: string) => {
  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch products");
  return res.json();
};

const Catalog = () => {
  const [sortBy, setSortBy] = useState<"date" | "price">("date");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [selectedBrand, setSelectedBrand] = useState<string>("all");
  const [priceRange, setPriceRange] = useState({ min: "", max: "" });

  const queryParams = new URLSearchParams();
  queryParams.append("sort", sortBy);
  queryParams.append("order", sortOrder);

  if (selectedBrand !== "all") queryParams.append("brand", selectedBrand);
  if (priceRange.min) queryParams.append("minPrice", priceRange.min);
  if (priceRange.max) queryParams.append("maxPrice", priceRange.max);

  const { data: products, error, mutate } = useSWR(`/api/catalog?${queryParams.toString()}`, fetcher, {
    refreshInterval: 5000, // Auto-revalidate every 5 seconds
  });

  if (error) {
    toast.error("Не вдалося отримати продукти");
    return <p>Error loading products</p>;
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-white shadow-sm mb-6">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">Оголошення</h1>
            <div className="flex items-center gap-2">
              <Select value={sortBy} onValueChange={(value) => setSortBy(value)}>
                <SelectTrigger className="w-full">
                  <span>Сортувати за: {sortBy === "date" ? "Дата" : "Ціна"}</span>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="date">Дата</SelectItem>
                  <SelectItem value="price">Ціна</SelectItem>
                </SelectContent>
              </Select>

              <Select value={sortOrder} onValueChange={(value) => setSortOrder(value)}>
                <SelectTrigger className="w-full">
                  <span>Порядок: {sortOrder === "asc" ? "За зростанням" : "За спаданням"}</span>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="asc">За зростанням</SelectItem>
                  <SelectItem value="desc">За спаданням</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 pb-8">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Filters Panel */}
          <aside className="md:w-64 flex-shrink-0">
            <Filters
              selectedBrand={selectedBrand}
              onBrandChange={setSelectedBrand}
              priceRange={priceRange}
              onPriceRangeChange={setPriceRange}
              onApplyFilters={() => mutate()} // Re-fetch on filter change
            />
          </aside>

          {/* Products Grid */}
          <div className="flex-1">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products?.length > 0 ? (
                products.map((product: Product) => (
                  <ProductCard
                    key={product.id}
                    id={product.id}
                    title={product.name}
                    price={product.price}
                    image={product.imageUrl}
                    info={product.description}
                  />
                ))
              ) : (
                <p className="text-gray-500">Немає продуктів для відображення.</p>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Catalog;
