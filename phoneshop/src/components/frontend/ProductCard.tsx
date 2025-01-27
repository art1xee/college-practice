import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import Link from "next/link";
import { toast } from "sonner";

interface ProductCardProps {
  id: string;
  title: string;
  price: number;
  image: string;
  info?: string;
}

export const ProductCard = ({ id, title, price, image, info }: ProductCardProps) => {
  const handleBuy = () => {
    toast.success("Product added to cart!");
  };

  return (
    <Card className="overflow-hidden">
      <div className="aspect-square overflow-hidden">
        <img
          src={image}
          alt={title}
          className="h-full w-full object-cover transition-transform hover:scale-105"
        /> // 
      </div>
      <CardContent className="p-4">
        <h3 className="font-semibold text-lg mb-1">{title}</h3>
        {info && <p className="text-sm text-muted-foreground mb-2">{info}</p>}
        <p className="text-xl font-bold">{price.toLocaleString()} грн</p>
      </CardContent>
      <CardFooter className="p-4 pt-0">
      <Link href={`/product-details/${id}`} passHref>
          <Button variant="default" className="w-full bg-primary hover:bg-primary/90">Купити</Button>
        </Link>
      </CardFooter>
    </Card>
  );
};