"use client"

import React, { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { FormInput } from "@/components/frontend/FormInput";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const AdSchema = z.object({
  name: z.string().min(1, "Name is required"),
  brand: z.string().min(1, "Brand is required"),
  price: z.string().min(1, "Price is required"),
  description: z.string().optional(),
  imageUrl: z.string().optional(), // Optional for the form
});

type AdForm = z.infer<typeof AdSchema>;

const uploadImage = async (file: File): Promise<string | null> => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || "testing");
  formData.append("cloud_name", process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || "dckenmeqo");

  try {
    const response = await fetch(`https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Image upload failed");
    }

    const data = await response.json();
    return data.secure_url; // Return the Cloudinary image URL
  } catch (error) {
    console.error("Image upload error:", error);
    return null;
  }
};

const CreateAdPage = () => {
  const [isPending, startTransition] = useTransition();
  const [image, setImage] = useState<File | null>(null);

  const form = useForm<AdForm>({
    resolver: zodResolver(AdSchema),
    defaultValues: {
      name: "",
      brand: "",
      price: "",
      description: "",
    },
  });

  const onSubmit = (data: AdForm) => {
    startTransition(async () => {
      if (image) {
        const imageUrl = await uploadImage(image);
        if (!imageUrl) {
          toast.error("Image upload failed. Please try again.");
          return;
        }

        data.imageUrl = imageUrl; // Attach the uploaded image URL to the form data
      }

      fetch("/api/new-product", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then(async (res) => {
          if (!res.ok) {
            const errorData = await res.json();
            throw new Error(errorData.error || "Failed to create product");
          }
          return res.json();
        })
        .then(() => {
          toast.success("Product created successfully!");
          form.reset();
        })
        .catch((error) => {
          console.error("Error:", error);
          toast.error(error.message || "Failed to create product.");
        });
    });
  };

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-semibold mb-8">Create a Product</h1>
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
                  <SelectItem value="Brand 1">Brand 1</SelectItem>
                  <SelectItem value="Brand 2">Brand 2</SelectItem>
                  <SelectItem value="Brand 3">Brand 3</SelectItem>
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
              Preview
            </Button>
            <Button type="submit" disabled={isPending}>
              Publish
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateAdPage;
