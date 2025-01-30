import React from "react";
import { Button } from "../ui/button";

const HeaderMain: React.FC = () => {
  return (
    <nav className="dark:bg-slate-700 sticky z-[100] h-14 inset-x-0 top-0 w-full border-b border-gray-200 bg-white/75 backdrop-blur-lg transition-all">
      <header className="bg-blue-600 text-white flex items-center justify-between px-4 py-2 sm:px-6 sm:py-3">
        {/* Logo with link to home page */}
        <a href="/" className="text-xl sm:text-2xl font-bold hover:opacity-80 transition duration-200 ml-4">
          BTD
        </a>

        {/* Navigation menu */}
        <nav className="flex items-center space-x-3 sm:space-x-6">
          <a
            href="#"
            className="text-white hover:text-gray-200 text-sm sm:text-base transition duration-200"
          >
            Чат
          </a>
          <a
            href="/profile"
            className="text-white hover:text-gray-200 text-sm sm:text-base transition duration-200"
          >
            Ваш профіль
          </a>
          <a href="/new-product">
            <Button variant="default" className="bg-orange-500 text-white text-sm sm:text-base px-4 py-2 sm:px-6 sm:py-3 rounded-md hover:bg-orange-600 transition duration-300 ml-2 sm:ml-4">
              Додати оголошення
            </Button>
          </a>
        </nav>
      </header>
    </nav>
  );
};

export default HeaderMain;
