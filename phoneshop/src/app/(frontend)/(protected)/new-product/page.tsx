"use client";

import React, { useState } from "react";
import { ImageUpload } from "@/components/frontend/ImageUpload";
import { FormInput } from "@/components/frontend/FormInput";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

const Index = () => {
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    brand: "",
    description: "",
    pib: "",
    email: "",
    phone: "",
  });

  const [imagePreviews, setImagePreviews] = useState<string[]>([]);

  const handleImageSelect = (files: FileList) => {
    const newPreviews = Array.from(files).map(file => URL.createObjectURL(file));
    setImagePreviews(prev => [...prev, ...newPreviews].slice(0, 4));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Оголошення створено успішно!");
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-semibold mb-8">Створити оголошення</h1>
        
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="bg-white p-6 rounded-lg shadow-sm space-y-6">
            <FormInput
              label="Вкажіть назву"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="Наприклад..."
            />

            <FormInput
              label="Ціна"
              name="price"
              type="number"
              value={formData.price}
              onChange={handleInputChange}
              placeholder="Вкажіть ціну товару"
              className="appearance-none"
            />

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Бренд
              </label>
              <Select
                value={formData.brand}
                onValueChange={(value) => setFormData(prev => ({ ...prev, brand: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Виберіть бренд" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="brand1">Бренд 1</SelectItem>
                  <SelectItem value="brand2">Бренд 2</SelectItem>
                  <SelectItem value="brand3">Бренд 3</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm space-y-4">
            <h2 className="text-lg font-medium">Фото</h2>
            <p className="text-sm text-gray-500">Додайте фото товару</p>
            <ImageUpload onImageSelect={handleImageSelect} previews={imagePreviews} />
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm space-y-4">
            <h2 className="text-lg font-medium">Опис</h2>
            <p className="text-sm text-gray-500">Введіть щонайменше 40 символів</p>
            <Textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Додайте опис"
              className="min-h-[150px]"
            />
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm space-y-6">
            <h2 className="text-lg font-medium">Ваші контактні дані</h2>
            <FormInput
              label="ПІБ"
              name="pib"
              value={formData.pib}
              onChange={handleInputChange}
              placeholder="Наприклад..."
            />
            <FormInput
              label="Email-адреса"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Email-адреса"
            />
            <FormInput
              label="Номер телефону"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              placeholder="Номер телефону"
            />
          </div>

          <div className="flex justify-end space-x-4">
            <Button variant="outline" type="button">
              Попередній перегляд
            </Button>
            <Button type="submit">
              Опублікувати
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Index;