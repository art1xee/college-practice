"use client"

import React, { useEffect, useState } from "react";
import NavigationBar from "@/components/frontend/NavigationBar";
import { Button } from "@/components/ui/button";
import { logout } from "../../../../../actions/logout";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  number: string;
  image: string;
}

const ProfilePage: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch("/api/user");
        if (!response.ok) {
          throw new Error("Failed to fetch user data.");
        }

        const data: User = await response.json();
        setUser(data);
      } catch (err) {
        setError((err as Error).message || "Something went wrong.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, []);

   const handleLogout = async () => {
      await logout();
    };

  if (isLoading) {
    return <p className="text-center mt-4">Loading...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500 mt-4">{error}</p>;
  }

  return (
    <div className="flex flex-col min-h-screen bg-blue-100">
      {/* Navigation Bar */}
      <NavigationBar />

      {/* Main Content */}
      <main className="flex-1 bg-blue-200 pt-4">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-4 mb-8">
            {/* Display user's initials */}
            <div className="w-20 h-20 rounded-full overflow-hidden flex items-center justify-center bg-orange-500">
            {(user?.image ?? "") ? (
              <img
                src={user?.image as string} 
                alt="User Avatar"
                className="w-full h-full object-cover"
              />
              ) : (
                 <span className="text-white text-2xl font-bold">
                 {user?.name?.[0]?.toUpperCase() || "U"} {/* Если нет изображения, выводим первую букву имени */}
                 </span>
              )}
            </div>
            <div>
              <h2 className="text-xl font-medium text-gray-900">
                Редагування профілю
              </h2>
              <button className="text-blue-600 text-sm hover:underline">
                + додати фото
              </button>
            </div>
          </div>

          {/* Profile Information */}
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h3 className="text-xl font-bold text-gray-700 mb-4">
              ОСНОВНА ІНФОРМАЦІЯ
            </h3>
            <div className="space-y-6 text-gray-600">
              <div>
                <label className="block text-gray-800 font-medium">Ім’я</label>
                <p>{user?.name || "Ім’я не вказано"}</p>
              </div>
              {user?.email && (
                <div>
                  <label className="block text-gray-800 font-medium">Email</label>
                  <p>{user.email}</p>
                </div>
              )}
              {user?.role && (
                <div>
                  <label className="block text-gray-800 font-medium">Роль</label>
                  <p>{user.role}</p>
                </div>
              )}
              {user?.number && (
                <div>
                  <label className="block text-gray-800 font-medium">Номер телефону</label>
                  <p>{user.number}</p>
                </div>
              )}
            </div>
              <div className="py-3 flex justify-end space-x-4">
                <a href="/profile-edit">
                  <Button variant="default" className="bg-orange-500 text-white">
                    Редагувати
                  </Button>
                </a>
                <Button
                  variant="default"
                  className="bg-orange-500 text-white"
                  onClick={handleLogout}
                >
                  Вийти
                </Button>
              </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProfilePage;
