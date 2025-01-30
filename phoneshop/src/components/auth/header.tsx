import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";

const font = Poppins({
  subsets: ["latin"],
  weight: ["600"],
});

interface HeaderProps {
  label: string;
}

export const Header = ({ label }: HeaderProps) => {
  return (
    <div className="w-full flex flex-col gap-y-4 items-center justify-center px-4 sm:px-8 md:px-16">
      <h1
        className={cn(
          "text-3xl sm:text-4xl md:text-5xl font-semibold text-center"
        )}
      >
        Аунтифікація
      </h1>
      <p className="text-muted-foreground text-sm sm:text-base md:text-lg text-center">
        {label}
      </p>
    </div>
  );
};
