import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import "tailwindcss/tailwind.css";
import { Button } from "@/components/ui/button";

const CatalogPage = () => {
  return (
    <div className="container mx-auto px-4 py-6 space-y-8 max-w-4xl">
      {/* Каталог брендів */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-left">Каталог брендів</h2>
        <div className="grid grid-cols-3 gap-4">
          {[
            { name: "Samsung", color: "bg-blue-500" },
            { name: "Apple", color: "bg-black text-white" },
            { name: "Huawei", color: "bg-red-500" },
            { name: "Vivo", color: "bg-blue-300" },
            { name: "Xiaomi", color: "bg-orange-500" },
            { name: "Oppo", color: "bg-green-500" },
          ].map((brand) => (
            <div
              key={brand.name}
              className={`flex items-center justify-center h-16 rounded-md shadow-md cursor-pointer hover:opacity-90 ${brand.color}`}
            >
              <span className="font-medium text-sm">{brand.name}</span>
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
            {[...Array(9)].map((_, index) => (
              <CarouselItem key={index} className="pl-4 basis-1/3">
                <div className="border rounded-lg shadow-md bg-white p-4 flex flex-col items-center space-y-4">
                  <div className="h-32 w-full bg-gray-100 rounded-md" />
                  <h3 className="text-base font-semibold text-center">
                    Samsung Galaxy S24 Ultra 12/256GB
                  </h3>
                  <p className="text-gray-500 text-xs">в наявності (якщо треба)</p>
                  <p className="text-xl font-bold">8 500 грн</p>
                  <Button variant="default">Купити</Button>
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
          {[
            "Який сенс життя?",
            "Як заробити мільйон?",
          ].map((question, index) => (
            <details
              key={index}
              className="border rounded-lg p-4 shadow-md cursor-pointer"
            >
              <summary className="text-base font-medium text-gray-800">
                {question}
              </summary>
              <p className="mt-2 text-sm text-gray-600">
                Тут опис відповіді на це запитання.
              </p>
            </details>
          ))}
        </div>
      </section>
    </div>
  );
};

export default CatalogPage;
