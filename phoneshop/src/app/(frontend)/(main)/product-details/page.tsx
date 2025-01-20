import { Breadcrumb } from "@/components/frontend/Breadcrumb";
import { ImageGallery } from "@/components/frontend/ImageGallery";
import { SellerInfo } from "@/components/frontend/SellerInfo";
import { Button } from "@/components/ui/button";
import { Flag, Heart } from "lucide-react";

const breadcrumbItems = [
  { label: "Головна", href: "/shop" },
  { label: "Каталог", href: "/catalog" },
  { label: "Samsung Galaxy S24 Ultra 12/256gb", href: "#" },
];

const productImages = [
  "/lovable-uploads/6368f37c-a6d3-4d3b-8bc7-5780a89bda54.png",
  "/lovable-uploads/6368f37c-a6d3-4d3b-8bc7-5780a89bda54.png",
  "/lovable-uploads/6368f37c-a6d3-4d3b-8bc7-5780a89bda54.png",
  "/lovable-uploads/6368f37c-a6d3-4d3b-8bc7-5780a89bda54.png",
  "/lovable-uploads/6368f37c-a6d3-4d3b-8bc7-5780a89bda54.png",
];

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Breadcrumb items={breadcrumbItems} />
        
        <div className="mt-8 grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-2">
          <ImageGallery images={productImages} />
          
          <div className="space-y-8">
            <div>
              <h1 className="text-3xl font-bold">
                Samsung Galaxy S24 Ultra 12/256gb
              </h1>
              <p className="mt-4 text-3xl font-bold text-blue-600">
                2 300 грн
              </p>
            </div>

            <Button className="w-full bg-orange-500 hover:bg-orange-600 text-lg py-6">
              Зв'язатися з продавцем
            </Button>

            <SellerInfo
              name="Ім'я Прізвище"
              joinDate="2023"
              avatar="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"
            />

            <div>
              <h2 className="text-xl font-semibold mb-4">
                Опис/характеристики
              </h2>
              <p className="text-gray-700">
                Продаю телефон Samsung Galaxy S24 Ultra 12/256gb у класному
                титановому корпусі, комплект як фотографії помині, у відмінному стані,
                корпус з ідеальному стані, тиждень поносив з плівками, плівки, наклейки
                на всі екрані залітанні!
              </p>
            </div>

            <div className="flex items-center justify-between border-t pt-6">
              <p className="text-sm text-gray-500">
                Опубліковано 17.01.2024
              </p>
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

export default Index;