"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { CldImage } from "next-cloudinary"; // Import CldImage
import Link from "next/link"; // Import Link for navigation

interface Phone {
  id: number;
  name: string;
  brand: string;
  imageUrl: string | null; // Allow null values for missing images
  price: number;
  description: string;
}

const CatalogPage = () => {
  const [phones, setPhones] = useState<Phone[]>([]);

  useEffect(() => {
    const fetchPhones = async () => {
      try {
        const response = await fetch("/api/phoneshop");
        if (!response.ok) {
          throw new Error("Failed to fetch phones");
        }
        const data = await response.json();
        setPhones(data);
      } catch (error) {
        console.error("Error fetching phones:", error);
      }
    };

    fetchPhones();
  }, []);

  return (
    <div className="container mx-auto px-4 py-6 space-y-8 max-w-4xl">
      {/* Каталог брендів */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-left">Каталог брендів</h2>
        <div className="grid grid-cols-3 gap-4">
          {[ 
            { name: "Samsung",  color: "bg-blue-500",  imageUrl: "https://cdn.worldvectorlogo.com/logos/samsung-8.svg", link: "/catalog" },
            { name: "Apple", color: "bg-gray-200 text-white", imageUrl: "https://cdn.worldvectorlogo.com/logos/apple-11.svg", link: "/catalog" },
            { name: "Huawei", color: "bg-white border border-gray-300 text-red-600", imageUrl: "https://cdn.worldvectorlogo.com/logos/huawei-2.svg", link: "/catalog" },
            { name: "Vivo", color: "bg-gray-400", imageUrl: "https://cdn.worldvectorlogo.com/logos/vivo-logo-2019.svg", link: "/catalog" },
            { name: "Xiaomi", color: "bg-orange-500", imageUrl: "https://cdn.worldvectorlogo.com/logos/xiaomi-4.svg", link: "/catalog" },
            { name: "Oppo", color: "bg-green-100", imageUrl: "https://www.logo.wine/a/logo/Oppo/Oppo-Logo.wine.svg", link: "/catalog" }
          ].map((brand) => (
            <Link key={brand.name} href={brand.link} passHref>
              <div
                className={`flex items-center justify-center h-16 rounded-md shadow-md cursor-pointer hover:opacity-90 ${brand.color}`}
              >
                <img
                  src={brand.imageUrl}
                  alt={brand.name}
                  className="h-24 w-24 object-contain"
                  width="32"
                  height="32"
                />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Товари Тижня */}
      <section className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-left">Товари Тижня</h2>
          <Link className="text-2xl font-bold hover:text-gray-600" href="/catalog" passHref>
            Усі товари
          </Link>
        </div>
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
        >
          <CarouselContent className="-ml-4">
            {phones.map((phone) => (
              <CarouselItem key={phone.id} className="pl-4 basis-1/3">
                <div className="border rounded-lg shadow-md bg-white p-4 flex flex-col items-center space-y-4">
                  {/* Render image with CldImage or fallback */}
                  {phone.imageUrl ? (
                    <div className="h-32 w-full">
                      <CldImage
                        src={phone.imageUrl}
                        alt={phone.name}
                        className="h-full w-full object-cover rounded-md"
                        width="300"
                        height="300"
                        crop="fill"
                      />
                    </div>
                  ) : (
                    <div className="h-32 w-full bg-gray-200 rounded-md flex items-center justify-center">
                      <span className="text-sm text-gray-500">No Image Available</span>
                    </div>
                  )}
                  <h3 className="text-base font-semibold text-center">{phone.name}</h3>
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
          <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley">
          <Button variant="outline">Дізнатись детальніше</Button>
          </a>
        </div>
      </section>

      {/* Найчастіші питання */}
      <section className="space-y-6">
  <h2 className="text-2xl font-bold text-left">Найчастіші питання</h2>
  <div className="space-y-4">
    {[
      "Який сенс життя?",
      "Як досягти успіху?",
    ].map((question, index) => (
      <details
        key={index}
        className="border rounded-lg p-4 shadow-md cursor-pointer"
      >
        <summary className="text-base font-medium text-gray-800">
          {question}
        </summary>
        <p className="mt-2 text-sm text-gray-600">
          {index === 0 ? (
            <iframe
              width="560"
              height="315"
              src="https://www.youtube.com/embed/p-4jQOl7eO8?si=rYITUgcF_-buZMOb"
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            ></iframe>
          ) : (
            <iframe
              width="560"
              height="315"
              src="https://www.youtube.com/embed/msEccW-zt_k?si=PtLsMSxesCnPwa29"
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            ></iframe>
          )}
        </p>
      </details>
    ))}
  </div>
</section>
    </div>
  );
};

export default CatalogPage;
