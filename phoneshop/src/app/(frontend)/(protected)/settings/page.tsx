import React from "react";
import { auth, signOut } from "@/auth";

const SettingsPage: React.FC = async () => {
    const session = await auth();

    return (
        <div className="min-h-screen bg-blue-100 flex flex-col items-center">
            {/* Header */}
            <header className="w-full bg-white py-4 shadow-md">
                <div className="container mx-auto px-4 flex justify-between items-center">
                    <h1 className="text-lg font-bold">Налаштування</h1>
                    <nav className="flex space-x-8 text-gray-700 text-lg">
                        <a href="/announcement" className="hover:underline ">Оголошення</a>
                        <a href="#" className="hover:underline">Чат</a>
                        <a href="/profile" className="hover:underline ">Профіль</a>
                        <a href="/settings" className="hover:underline border-b-2 border-blue-500">Налаштування</a>
                     </nav>
                </div>
            </header>

            {/* Main content */}
            <main className="container mx-auto px-4 mt-8">
                <div className="grid grid-cols-3 gap-4">
                    {[
                        { label: "Мова інтерфейсу", options: ["Українська", "Англійська", "Російська"] },
                        { label: "Тема сайту", options: ["Світла", "Темна", "Системна"] },
                        { label: "Сповіщення", options: ["Увімкнено", "Вимкнено"] },
                        { label: "Показ контактів", options: ["Усім", "Лише друзям", "Нікому"] },
                        { label: "Приватність профілю", options: ["Відкрита", "Закрита"] },
                        { label: "Часовий пояс", options: ["GMT+2", "GMT+3", "GMT+1"] }
                    ].map((setting, index) => (
                        <div key={index} className="bg-white shadow rounded p-4">
                            <label htmlFor={`setting-${index}`} className="block text-sm font-medium text-gray-700 mb-2">
                                {setting.label}
                            </label>
                            <select
                                id={`setting-${index}`}
                                className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            >
                                {setting.options.map((option, idx) => (
                                    <option key={idx} value={option}>{option}</option>
                                ))}
                            </select>
                        </div>
                    ))}
                </div>
                <form
                    action={async () => {
                        "use server";
                        await signOut();
                    }}
                    className="mt-8"
                >
                    <button
                        type="submit"
                        className="px-4 py-2 bg-orange-500 text-white"
                    >
                        Sign Out
                    </button>
                </form>
            </main>
        </div>
    );
};

export default SettingsPage;
