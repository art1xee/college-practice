"use client";

import useSWR from "swr";
import { useParams } from "next/navigation";
import { Breadcrumb } from "@/components/frontend/Breadcrumb";
import { ImageGallery } from "@/components/frontend/ImageGallery";
import { SellerInfo } from "@/components/frontend/SellerInfo";
import { Button } from "@/components/ui/button";
import { Flag, Heart } from "lucide-react";
import LoadingSpinner from "@/components/frontend/loading";
import { ContactSeller } from "@/components/frontend/contact-info";
import { useState } from "react";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const ProductDetailsPage = () => {
  const { id } = useParams();

  const { data: phone, error, isLoading } = useSWR(id ? `/api/phoneshop/${id}` : null, fetcher, {
    refreshInterval: 5000, 
  });

  const [showContact, setShowContact] = useState(false);

  if (isLoading) return <LoadingSpinner />;
  if (error) return <p className="text-red-500">Не вдалося завантажити дані</p>;
  if (!phone) return <p className="text-gray-500">Телефон не знайдено</p>;

  const handleContactClick = () => {
    setShowContact((prev) => !prev);
  };

  const breadcrumbItems = [
    { label: "Головна", href: "/" },
    { label: "Каталог", href: "/catalog" },
    { label: phone.name, href: "#" },
  ];

  const productImages = phone.imageUrl ? [phone.imageUrl] : ["/default-image.png"];

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("uk-UA", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Breadcrumb items={breadcrumbItems} />

        <div className="mt-8 grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-2">
          <ImageGallery images={productImages} />

          <div className="space-y-8">
            <div>
              <h1 className="text-3xl font-bold">{phone.name}</h1>
              <p className="mt-4 text-3xl font-bold text-blue-600">
                {phone.price ? `${phone.price} грн` : "Ціна не вказана"}
              </p>
            </div>

            <Button
              className="w-full bg-orange-500 hover:bg-orange-600 text-lg py-6"
              onClick={handleContactClick}
            >
              {showContact ? "Закрити контакти" : "Зв'язатися з продавцем"}
            </Button>

            {showContact && (
              <ContactSeller
                name={phone.user.name || "Невідомий продавець"}
                email={phone.user.email || "Немає email"}
                number={phone.user.number || "Немає номера"}
              />
            )}

            <SellerInfo
              name={phone.user.name || "Невідомий продавець"}
              joinDate={formatDate(phone.user.emailVerified || "")}
              avatar={
                phone.user.image ||
                "https://api.dicebear.com/7.x/avataaars/svg?seed=Default"
              }
            />

            <div>
              <h2 className="text-xl font-semibold mb-4">Опис/характеристики</h2>
              <p className="text-gray-700 break-words">{phone.description || "Опис не доступний"}</p>
            </div>

            <div className="flex items-center justify-between border-t pt-6">
              <p className="text-sm text-gray-500">Опубліковано {formatDate(phone.createdAt || "")}</p>
              <div className="flex space-x-4">
                <Button variant="outline" size="sm">
                  <Flag className="h-4 w-4 mr-2" />
                  Поскаржитися
                </Button>
                <Button variant="outline" size="sm">
                  <Heart className="h-4 w-4 mr-2" />
                  Додати у вибране
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;
