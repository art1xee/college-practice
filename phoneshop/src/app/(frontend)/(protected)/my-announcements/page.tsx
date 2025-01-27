"use client";

import React, { useEffect, useState } from "react";
import { CldImage } from "next-cloudinary";
import LoadingSpinner from "@/components/frontend/loading";

const App: React.FC = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/api/my-products");
        if (res.ok) {
          const data = await res.json();
          setProducts(data);
        } else {
          console.error("Failed to fetch products:", await res.json());
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      const res = await fetch(`/api/my-products/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setProducts((prevProducts) => prevProducts.filter((product) => product.id !== id));
      } else {
        console.error("Failed to delete product:", await res.json());
      }
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen bg-blue-100 flex flex-col items-center">
      {/* Header */}
      <header className="w-full bg-white shadow-md">
        <div className="container mx-auto px-4 flex justify-between items-center py-4">
          <h1 className="text-lg font-bold">Оголошення</h1>
          <nav className="flex space-x-8 text-gray-700 text-lg">
            <a href="/announcement" className="hover:underline border-b-2 border-blue-500">
              Оголошення
            </a>
            <a href="#" className="hover:underline">
              Чат
            </a>
            <a href="/profile" className="hover:underline">
              Профіль
            </a>
            <a href="/settings" className="hover:underline">
              Налаштування
            </a>
          </nav>
        </div>
      </header>

      {/* Main content */}
      <main className="container mx-auto px-4 flex flex-col items-center mt-8">
        <div className="w-full bg-white rounded shadow-lg">
          <div className="flex border-b">
            <button className="w-1/2 py-3 text-center text-blue-600 font-semibold border-b-2 border-blue-600">
              Активні ({products.length})
            </button>
            <button className="w-1/2 py-3 text-center text-gray-500 hover:text-blue-600">
              Відхилені
            </button>
          </div>

          <div className="p-4">
            {products.length === 0 ? (
              <p className="text-gray-500">Немає оголошень</p>
            ) : (
              products.map((phone) => (
                <div key={phone.id} className="flex items-center bg-gray-100 rounded p-4 shadow mb-4">
                  <div className="w-20 h-20 bg-gray-300 rounded mr-4">
                    {phone.imageUrl && (
                      <CldImage
                        src={phone.imageUrl}
                        alt={phone.name}
                        className="h-full w-full object-cover rounded-md"
                        width="300"
                        height="300"
                        crop="fill"
                      />
                    )}
                  </div>
                  <div className="flex-1">
                    <h2 className="text-lg font-bold">{phone.name}</h2>
                    <p
                      className="text-gray-500 truncate w-full overflow-hidden"
                      title={phone.description || "No description available"} // Tooltip for full description
                    >
                      {phone.description || "No description available"}
                    </p>
                    <p className="text-xl font-semibold text-black mt-2">{phone.price?.toLocaleString()} грн</p>
                  </div>
                  <button
                    onClick={() => handleDelete(phone.id)}
                    className="text-red-500 hover:underline ml-4"
                  >
                    Видалити
                  </button>
                  <button
                    onClick={() => (window.location.href = `/my-announcements/edit/${phone.id}`)}
                    className="text-blue-500 hover:underline ml-4"
                  >
                    Редагувати
                </button>
                </div>
              ))
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
