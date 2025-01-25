"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Filters } from "@/components/frontend/Filters";
import { ProductCard } from "@/components/frontend/ProductCard";
import { Search } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  info?: string;
  brand: string;
  condition: "new" | "used";
}

const SAMPLE_PRODUCTS: Product[] = [
  {
    id: 1,
    title: "Samsung Galaxy S24 Ultra 12/256gb",
    price: 8500,
    image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=500&h=500&fit=crop",
    info: "інфо (если надо)",
    brand: "samsung",
    condition: "new"
  },
  {
    id: 2,
    title: "iPhone 15 Pro Max 256GB",
    price: 12500,
    image: "https://images.unsplash.com/photo-1610945264803-c22b62d2a7b3?w=500&h=500&fit=crop",
    info: "інфо (если надо)",
    brand: "apple",
    condition: "new"
  },
  {
    id: 3,
    title: "Xiaomi 14 Pro 512GB",
    price: 6500,
    image: "https://images.unsplash.com/photo-1605236453806-6ff36851218e?w=500&h=500&fit=crop",
    info: "інфо (если надо)",
    brand: "xiaomi",
    condition: "used"
  },
  {
    id: 4,
    title: "Samsung Galaxy S23 Ultra",
    price: 7500,
    image: "https://images.unsplash.com/photo-1567581935884-3349723552ca?w=500&h=500&fit=crop",
    info: "інфо (если надо)",
    brand: "samsung",
    condition: "used"
  },
];

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBrand, setSelectedBrand] = useState<string>("all");
  const [priceRange, setPriceRange] = useState({ min: "", max: "" });
  const [selectedCondition, setSelectedCondition] = useState<string>("all");
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(SAMPLE_PRODUCTS);

  const handleSearch = () => {
    let filtered = [...SAMPLE_PRODUCTS];

    // Apply search query filter
    if (searchQuery) {
      filtered = filtered.filter(product =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply brand filter
    if (selectedBrand && selectedBrand !== "all") {
      filtered = filtered.filter(product => product.brand === selectedBrand);
    }

    // Apply price range filter
    if (priceRange.min || priceRange.max) {
      filtered = filtered.filter(product => {
        const minPrice = priceRange.min ? Number(priceRange.min) : 0;
        const maxPrice = priceRange.max ? Number(priceRange.max) : Infinity;
        return product.price >= minPrice && product.price <= maxPrice;
      });
    }

    // Apply condition filter
    if (selectedCondition && selectedCondition !== "all") {
      filtered = filtered.filter(product => product.condition === selectedCondition);
    }

    setFilteredProducts(filtered);
    toast.success(`Знайдено ${filtered.length} товарів`);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header with search */}
      <header className="bg-white shadow-sm mb-6">
        <div className="container mx-auto px-4 py-4">
          <div className="flex gap-2">
            <Input 
              placeholder="Що шукаєте?" 
              className="max-w-xl"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            />
            <Button onClick={handleSearch}>
              <Search className="h-4 w-4 mr-2" />
              Пошук
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 pb-8">
        <h1 className="text-2xl font-bold mb-6">Оголошення</h1>
        
        <div className="flex flex-col md:flex-row gap-6">
          {/* Filters sidebar */}
          <aside className="md:w-64 flex-shrink-0">
            <Filters 
              onApplyFilters={handleSearch}
              selectedBrand={selectedBrand}
              onBrandChange={setSelectedBrand}
              priceRange={priceRange}
              onPriceRangeChange={setPriceRange}
              selectedCondition={selectedCondition}
              onConditionChange={setSelectedCondition}
            />
          </aside>

          {/* Products grid */}
          <div className="flex-1">
            <h2 className="text-xl font-semibold mb-4">
              {filteredProducts.length > 0 
                ? `Знайдено ${filteredProducts.length} оголошень` 
                : "Немає оголошень за вашим запитом"}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  title={product.title}
                  price={product.price}
                  image={product.image}
                  info={product.info}
                />
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;