import React from 'react';
import NavigationBar from '@/components/frontend//NavigationBar';
import { Button } from "@/components/ui/button";

const ProfilePage: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-blue-100" >
      {/* Navigation Bar */}
      <NavigationBar />

      {/* Main Content */}
      <main className="flex-1 bg-blue-200 pt-4"> 
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-20 h-20 bg-orange-500 text-white flex items-center justify-center rounded-full text-2xl font-bold">
              <span>А</span>
            </div>
            <div>
              <h2 className="text-xl font-medium text-gray-900">Редагування профілю</h2>
              <button className="text-blue-600 text-sm hover:underline">
                + додати фото
              </button>
            </div>
          </div>

          {/* Profile Information */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-6">ОСНОВНА ІНФОРМАЦІЯ</h3>
            
            <form className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Ім'я
                </label>
                <input
                  type="text"
                  placeholder="Вкажіть ім'я та прізвище"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Місцезнаходження
                </label>
                <input
                  type="text"
                  placeholder="Вкажіть ваше місцезнаходження"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Номер телефону
                </label>
                <input
                  type="tel"
                  placeholder="Вкажіть ваш номер телефону"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div className='flex justify-end'>
              <a href="/profile">
                <Button variant="default" className="bg-orange-500 text-white">
                    Зберегти зміни
                </Button>
            </a>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProfilePage;
