import React from "react";
import { Button } from "../ui/button";

const HeaderMain: React.FC = () => {
  return (
    <nav className="dark:bg-slate-700 sticky z-[100] h-14 inset-x-0 top-0 w-full border-b border-gray-200 bg-white/75 backdrop-blur-lg transition-all">
      <header className="bg-blue-600 text-white flex items-center justify-between px-6 py-3">
        {/* Logo with link to home page */}
        <a href="/" className="text-2xl font-bold hover:opacity-80 transition duration-200 ml-4"> {/* Добавлен отступ слева для логотипа */}
          BTD
        </a>

        <nav className="flex items-center space-x-8"> {/* Увеличено расстояние между элементами навигации */}
          <a
            href="#"
            className="text-white hover:text-gray-200 transition duration-200"
          >
            Чат
          </a>
          <a
            href="/profile"
            className="text-white hover:text-gray-200 transition duration-200"
          >
            Ваш профіль
          </a>
          <a href="/add-announcement">
            <Button variant="default" className="bg-orange-500 text-white px-6 py-2 rounded-md hover:bg-orange-600 transition duration-300 ml-4"> {/* Увеличен отступ между кнопкой и правым краем */}
              Додати оголошення
            </Button>
          </a>
        </nav>
      </header>
    </nav>
  );
};

export default HeaderMain;
