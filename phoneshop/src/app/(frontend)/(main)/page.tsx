"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface Phone {
  id: number;
  name: string;
  brand: string;
  imageUrl: string;
  price: number;
  description: string;
}

const CatalogPage = () => {
  const [phones, setPhones] = useState<Phone[]>([]);

  const router = useRouter();

  // Fetch phones from API when the component mounts
  useEffect(() => {
    const fetchPhones = async () => {
      const response = await fetch("/api/phoneshop");
      const data = await response.json();
      setPhones(data);
    };

    fetchPhones();
  }, []);

  const handleBuyButtonClick = (phoneId: number) => {
    router.push(`/product-details-${phoneId}`);
  };

  return (
    <div className="container mx-auto px-4 py-6 space-y-8 max-w-4xl">
      {/* Каталог брендів */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-left">Каталог брендів</h2>
        <div className="grid grid-cols-3 gap-4">
          {['Samsung', 'Apple', 'Huawei', 'Vivo', 'Xiaomi', 'Oppo'].map((brand) => (
            <div
              key={brand}
              className={`flex items-center justify-center h-16 rounded-md shadow-md cursor-pointer hover:opacity-90 ${brand === 'Samsung' ? 'bg-blue-500' : brand === 'Apple' ? 'bg-black text-white' : 'bg-gray-500'}`}
            >
              <span className="font-medium text-sm">{brand}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Товари Тижня */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-left">Товари Тижня</h2>
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
        >
          <CarouselContent className="-ml-4">
            {phones.map((phone, index) => (
              <CarouselItem key={index} className="pl-4 basis-1/3">
                <div className="border rounded-lg shadow-md bg-white p-4 flex flex-col items-center space-y-4">
                  <div className="h-32 w-full bg-gray-100 rounded-md" style={{ backgroundImage: `url(${phone.imageUrl})`, backgroundSize: 'cover' }} />
                  <h3 className="text-base font-semibold text-center">{phone.name}</h3>
                  <p className="text-gray-500 text-xs">{phone.description}</p>
                  <p className="text-xl font-bold">{phone.price} грн</p>
                  <Link href={`/product-details/${phone.id}`} passHref>
                    <Button variant="default">Купити</Button>
                  </Link>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </section>

      {/* Банер */}
      <section className="bg-blue-100 border rounded-lg p-6 text-left space-y-4">
        <h2 className="text-xl font-bold">Відкрийте бізнес разом з BTD</h2>
        <p className="text-gray-600 text-sm">Тут сюди з вашим першим мільйоном</p>
        <div>
          <Button variant="outline">Дізнатись детальніше</Button>
        </div>
      </section>

      {/* Найчастіші питання */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-left">Найчастіші питання</h2>
        <div className="space-y-4">
          {['Який сенс життя?', 'Як заробити мільйон?'].map((question, index) => (
            <details
              key={index}
              className="border rounded-lg p-4 shadow-md cursor-pointer"
            >
              <summary className="text-base font-medium text-gray-800">{question}</summary>
              <p className="mt-2 text-sm text-gray-600">Тут опис відповіді на це запитання.</p>
            </details>
          ))}
        </div>
      </section>
    </div>
  );
};

export default CatalogPage;
