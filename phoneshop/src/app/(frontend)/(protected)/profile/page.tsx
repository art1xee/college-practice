import React from 'react';
import NavigationBar from '@/components/frontend//NavigationBar';

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
          <div className="bg-white p-8 rounded-lg shadow-md"> 
            <h3 className="text-xl font-bold text-gray-700 mb-4">ОСНОВНА ІНФОРМАЦІЯ</h3>
            <div className="space-y-6 text-gray-600">
              <div>
                <label className="block text-gray-800 font-medium">Ім’я</label>
                <p>Вкажіть ім’я та прізвище</p>
              </div>
              <div>
                <label className="block text-gray-800 font-medium">Місцезнаходження</label>
                <p>Вкажіть ваше місцезнаходження</p>
              </div>
              <div>
                <label className="block text-gray-800 font-medium">Номер телефону</label>
                <p>Вкажіть ваш номер телефону</p>
              </div>
            </div>
            <button className="mt-0 bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600">
              Редагувати
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProfilePage;
