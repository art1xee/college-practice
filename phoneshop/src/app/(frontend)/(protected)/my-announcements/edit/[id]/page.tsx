"use client";

import React, { useEffect, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { FormInput } from "@/components/frontend/FormInput";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useParams, useRouter } from "next/navigation";
import LoadingSpinner from "@/components/frontend/loading";
import { useSWRConfig } from "swr";

const EditSchema = z.object({
  name: z.string().min(1, "Name is required"),
  brand: z.string().min(1, "Brand is required"),
  price: z.string().min(1, "Price is required"),
  description: z.string().optional(),
  imageUrl: z.string().optional(),
});

type EditForm = z.infer<typeof EditSchema>;

const uploadImage = async (file: File): Promise<string | null> => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || "testing");
  formData.append("cloud_name", process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || "dckenmeqo");

  try {
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
      {
        method: "POST",
        body: formData,
      }
    );

    if (!response.ok) {
      throw new Error("Image upload failed");
    }

    const data = await response.json();
    return data.secure_url;
  } catch (error) {
    console.error("Image upload error:", error);
    return null;
  }
};

const EditProductPage = () => {
  const [isPending, startTransition] = useTransition();
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams(); // Extract product ID from URL params
  const router = useRouter();
  const { mutate } = useSWRConfig();

  const form = useForm<EditForm>({
    resolver: zodResolver(EditSchema),
    defaultValues: {
      name: "",
      brand: "",
      price: "",
      description: "",
      imageUrl: "",
    },
  });

  // Fetch product details on load
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`/api/my-products/edit/${id}`);
        if (!res.ok) {
          throw new Error("Failed to fetch product");
        }
        const { phone } = await res.json(); // Extract 'phone' from response
        form.reset({
          name: phone.name,
          brand: phone.brand,
          price: phone.price?.toString(), // Convert price to string
          description: phone.description || "",
          imageUrl: phone.imageUrl || "",
        });
        setLoading(false);
      } catch (error) {
        console.error("Error fetching product:", error);
        toast.error("Failed to load product.");
      }
    };
  
    fetchProduct();
  }, [id, form]);
  

  const onSubmit = (data: EditForm) => {
    startTransition(async () => {
      if (image) {
        const imageUrl = await uploadImage(image);
        if (!imageUrl) {
          toast.error("Image upload failed. Please try again.");
          return;
        }
  
        data.imageUrl = imageUrl; // Attach the uploaded image URL
      }
  
      try {
        const res = await fetch(`/api/my-products/edit/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
  
        if (!res.ok) {
          // Attempt to parse the error response, fallback to default message
          let errorMessage = "Failed to update product.";
          try {
            const errorData = await res.json();
            errorMessage = errorData.error || errorMessage;
          } catch {
            // Do nothing if JSON parsing fails
          }
  
          throw new Error(errorMessage);
        }
  
        // If the response has no content, don't parse JSON
        if (res.status === 204) {
          toast.success("Product updated successfully!");
          router.push("/my-announcements");
          mutate("/api/catalog"); 
          return;
        }
  
        const responseData = await res.json(); // Safely parse response JSON
        toast.success(responseData.message || "Product updated successfully!");
        router.push("/my-announcements");
      } catch (error: any) {
        console.error("Error:", error);
        toast.error(error.message || "Failed to update product.");
      }
    });
  };

  if (loading) {
    return <div>
    <LoadingSpinner />
    </div>;
  }

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-semibold mb-8">Edit Product</h1>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="bg-white p-6 rounded-lg shadow-sm space-y-6">
            <FormInput
              label="Product Name"
              {...form.register("name")}
              placeholder="Enter product name"
            />
            <FormInput
              label="Price"
              {...form.register("price")}
              type="number"
              placeholder="Enter product price"
            />
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Brand
              </label>
              <Select
                onValueChange={(value) => form.setValue("brand", value)}
                value={form.watch("brand")}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a brand" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Samsung">Samsung</SelectItem>
                  <SelectItem value="Apple">Apple</SelectItem>
                  <SelectItem value="Huawei">Huawei</SelectItem>
                  <SelectItem value="Vivo">Vivo</SelectItem>
                  <SelectItem value="Xiaomi">Xiaomi</SelectItem>
                  <SelectItem value="Oppo">Oppo</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm space-y-4">
            <h2 className="text-lg font-medium">Description</h2>
            <Textarea
              {...form.register("description")}
              placeholder="Enter product description"
              className="min-h-[150px]"
            />
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm space-y-4">
            <label className="block text-sm font-medium text-gray-700">
              Product Image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  setImage(e.target.files[0]);
                }
              }}
            />
          </div>

          <div className="flex justify-end space-x-4">
            <Button variant="outline" type="button">
              Cancel
            </Button>
            <Button type="submit" disabled={isPending}>
              Update
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProductPage;
