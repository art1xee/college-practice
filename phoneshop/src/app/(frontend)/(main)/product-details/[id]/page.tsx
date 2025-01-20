// app/product-details/[id].tsx
"use client"; // Add this directive to mark the component as a client component

import { useEffect, useState } from "react";
import { useParams } from "next/navigation"; // Use useParams to get the dynamic route parameter
import { Button } from "@/components/ui/button";
import { Flag, Heart } from "lucide-react";

const ProductDetailsPage = () => {
  const [phone, setPhone] = useState<any>(null);
  const { id } = useParams(); // Get dynamic route parameter (id)

  useEffect(() => {
    if (id) {
      const fetchPhoneDetails = async () => {
        const response = await fetch(`/api/phoneshop/${id}`);
        const data = await response.json();
        setPhone(data);
      };

      fetchPhoneDetails();
    }
  }, [id]);

  if (!phone) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Product Details here */}
        <h1>{phone.name}</h1>
        <p>{phone.description}</p>
        <Button>Buy Now</Button>
      </div>
    </div>
  );
};

export default ProductDetailsPage;
