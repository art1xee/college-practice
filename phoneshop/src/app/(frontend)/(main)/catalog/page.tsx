"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/frontend/ProductCard";
import { Filters } from "@/components/frontend/Filters";
import { toast } from "sonner";
import { Select, SelectTrigger, SelectContent, SelectItem } from "@/components/ui/select";

interface Product {
  id: string;
  name: string;
  brand: string;
  imageUrl: string;
  price: number;
  description?: string;
  createdAt: string;
}

const Index = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [sortBy, setSortBy] = useState<"date" | "price">("date");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [selectedBrand, setSelectedBrand] = useState<string>("all");
  const [priceRange, setPriceRange] = useState({ min: "", max: "" });

  const fetchProducts = async () => {
    try {
      const queryParams = new URLSearchParams();

      queryParams.append("sort", sortBy);
      queryParams.append("order", sortOrder);

      if (selectedBrand && selectedBrand !== "all") {
        queryParams.append("brand", selectedBrand);
      }

      if (priceRange.min) {
        queryParams.append("minPrice", priceRange.min);
      }
      if (priceRange.max) {
        queryParams.append("maxPrice", priceRange.max);
      }

      const res = await fetch(`/api/catalog?${queryParams.toString()}`);
      if (!res.ok) throw new Error("Failed to fetch products");
      const data = await res.json();
      setProducts(data);
    } catch (error) {
      console.error(error);
      toast.error("Не вдалося отримати продукти");
    }
  };

  const toggleSort = () => {
    setSortBy((prevSortBy) => (prevSortBy === "date" ? "price" : "date"));
  };

  const toggleOrder = () => {
    setSortOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));
  };

  const handleFilterChange = () => {
    fetchProducts();
  };

  useEffect(() => {
    fetchProducts();
  }, [sortBy, sortOrder, selectedBrand, priceRange]);

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-white shadow-sm mb-6">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">Оголошення</h1>
            <div className="flex items-center gap-2">
            <Select value={sortBy} onValueChange={(value: "date" | "price") => setSortBy(value)}>
                <SelectTrigger className="w-full">
                  <span>Сортувати за: {sortBy === "date" ? "Дата" : "Ціна"}</span>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="date">Дата</SelectItem>
                  <SelectItem value="price">Ціна</SelectItem>
                </SelectContent>
              </Select>

            <Select value={sortOrder} onValueChange={(value: "asc" | "desc") => setSortOrder(value)}>
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
              onApplyFilters={handleFilterChange}
            />
          </aside>

          {/* Products Grid */}
          <div className="flex-1">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.length > 0 ? (
                products.map((product) => (
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

export default Index;
