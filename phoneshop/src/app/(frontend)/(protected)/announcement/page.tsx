import React from "react";

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-blue-100 flex flex-col items-center">
      {/* Header */}
      <header className="w-full bg-white py-4 shadow-md">
        <div className="container mx-auto px-4 flex justify-between items-center">
      <div className="container mx-auto px-4 flex justify-between items-center py-4">
      <h1 className="text-lg font-bold">Оголошення</h1>
        <nav className="flex space-x-8 text-gray-700 text-lg">
          <a href="/announcement" className="hover:underline border-b-2 border-blue-500">Оголошення</a>
          <a href="#" className="hover:underline">Чат</a>
          <a href="/profile" className="hover:underline ">Профіль</a>
          <a href="/settings" className="hover:underline">Налаштування</a>
        </nav>
    </div>
        </div>
      </header>

      {/* Main content */}
      <main className="container mx-auto px-4 flex flex-col items-center mt-8">
        <div className="w-full bg-white rounded shadow-lg">
          <div className="flex border-b">
            <button
              className="w-1/2 py-3 text-center text-blue-600 font-semibold border-b-2 border-blue-600"
            >
              Активні (3)
            </button>
            <button
              className="w-1/2 py-3 text-center text-gray-500 hover:text-blue-600"
            >
              Відхилені
            </button>
          </div>

          <div className="p-4">
            {/* Advertisement */}
            <div className="flex items-center bg-gray-100 rounded p-4 shadow">
              <div className="w-20 h-20 bg-gray-300 rounded mr-4"></div>
              <div className="flex-1">
                <h2 className="text-lg font-bold">Samsung Galaxy S24 Ultra 12/256gb</h2>
                <p className="text-gray-500">інфо (если надо)</p>
                <p className="text-xl font-semibold text-black mt-2">8 500 грн</p>
              </div>
            </div>
            <div className="flex items-center bg-gray-100 rounded p-4 shadow">
              <div className="w-20 h-20 bg-gray-300 rounded mr-4"></div>
              <div className="flex-1">
                <h2 className="text-lg font-bold">Samsung Galaxy S24 Ultra 12/256gb</h2>
                <p className="text-gray-500">інфо (если надо)</p>
                <p className="text-xl font-semibold text-black mt-2">8 500 грн</p>
              </div>
            </div>
            <div className="flex items-center bg-gray-100 rounded p-4 shadow">
              <div className="w-20 h-20 bg-gray-300 rounded mr-4"></div>
              <div className="flex-1">
                <h2 className="text-lg font-bold">Samsung Galaxy S24 Ultra 12/256gb</h2>
                <p className="text-gray-500">інфо (если надо)</p>
                <p className="text-xl font-semibold text-black mt-2">8 500 грн</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
