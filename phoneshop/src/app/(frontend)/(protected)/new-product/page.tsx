"use client";

import React, { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { FormInput } from "@/components/frontend/FormInput";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useSWRConfig } from "swr";

const AdSchema = z.object({
  name: z.string().min(1, "Назва є обов'язковою"),
  brand: z.string().min(1, "Бренд є обов'язковим"),
  price: z.string().min(1, "Ціна є обов'язковою"),
  description: z.string().optional(),
  imageUrl: z.string().optional(),
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
      throw new Error("Помилка завантаження зображення");
    }

    const data = await response.json();
    return data.secure_url;
  } catch (error) {
    console.error("Помилка завантаження зображення:", error);
    return null;
  }
};

const CreateAdPage = () => {
  const [isPending, startTransition] = useTransition();
  const [image, setImage] = useState<File | null>(null);
  const { mutate } = useSWRConfig();

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
          toast.error("Не вдалося завантажити зображення. Спробуйте ще раз.");
          return;
        }
        data.imageUrl = imageUrl;
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
            throw new Error(errorData.error || "Не вдалося створити оголошення");
          }
          return res.json();
        })
        .then(() => {
          toast.success("Оголошення успішно створено!");
          form.reset();
          mutate("/api/catalog"); 
        })
        .catch((error) => {
          console.error("Помилка:", error);
          toast.error(error.message || "Не вдалося створити оголошення.");
        });
    });
  };
  

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-semibold mb-8">Створити оголошення</h1>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="bg-white p-6 rounded-lg shadow-sm space-y-6">
            <FormInput label="Назва товару" {...form.register("name")} placeholder="Введіть назву товару" />
            <FormInput label="Ціна" {...form.register("price")} type="number" placeholder="Введіть ціну товару" />
            <div>
              <label className="block text-sm font-medium text-gray-700">Бренд</label>
              <Select onValueChange={(value) => form.setValue("brand", value)} value={form.watch("brand")}>
                <SelectTrigger>
                  <SelectValue placeholder="Оберіть бренд" />
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
            <h2 className="text-lg font-medium">Опис</h2>
            <Textarea {...form.register("description")} placeholder="Введіть опис товару" className="min-h-[150px]" />
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm space-y-4">
            <label className="block text-sm font-medium text-gray-700">Зображення товару</label>
            <input type="file" accept="image/*" onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                setImage(e.target.files[0]);
              }
            }} />
          </div>

          <div className="flex justify-end space-x-4">
            <Button variant="outline" type="button">Попередній перегляд</Button>
            <Button type="submit" disabled={isPending}>Опублікувати</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateAdPage;
