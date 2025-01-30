import React from 'react';

const NavigationBar: React.FC = () => {
  return (
    <div className="bg-white shadow-md">
      <div className="container mx-auto px-4 flex justify-between items-center py-4">
        <h1 className="text-2xl font-bold text-black">Профіль</h1>
        <nav className="flex space-x-8 text-gray-700 text-lg">
          <a href="/my-announcements" className="hover:underline">Мої оголошення</a>
          <a href="#" className="hover:underline">Чат</a>
          <a href="/profile" className="hover:underline border-b-2 border-blue-500">Профіль</a>
          <a href="/settings" className="hover:underline">Налаштування</a>
        </nav>
      </div>
    </div>
  );
};

export default NavigationBar;
