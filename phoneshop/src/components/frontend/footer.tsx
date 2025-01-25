import React from "react";
import MaxWidthWrapper from "../MaxWidthWrapper";

const Footer: React.FC = () => {
  return (
    <footer className="bg-blue-600 text-white px-6 py-10">
        <MaxWidthWrapper className="text-sm">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <div className="text-2xl font-bold mb-4">BTD</div>
          <ul className="space-y-2">
            <li><a href="/catalog" className="hover:underline">Каталог</a></li>
            <li><a href="/profile" className="hover:underline">Профіль</a></li>
            <li><a href="/my-announcements" className="hover:underline">Мої оголошення</a></li>
            <li><a href="/chat" className="hover:underline">Чат</a></li>
            <li><a href="/settings" className="hover:underline">Налаштування</a></li>
          </ul>
        </div>
        <div>
          <ul className="space-y-2">
            <li><a href="/delivery" className="hover:underline">Доставка та оплата</a></li>
            <li><a href="/faq" className="hover:underline">Найчастіші питання</a></li>
            <li><a href="/privacy-policy" className="hover:underline">Політика конфіденційності</a></li>
          </ul>
        </div>
        <div className="flex flex-col items-center md:items-end">
          <a href="https://play.google.com/store" target="_blank" rel="noopener noreferrer" className="mb-4">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Google_Play_Store_badge_EN.svg/512px-Google_Play_Store_badge_EN.svg.png"
              alt="Get it on Google Play"
              className="h-12"
            />
          </a>
          <a href="https://www.apple.com/app-store/" target="_blank" rel="noopener noreferrer">
            <img
              src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
              alt="Download on the App Store"
              className="h-12"
            />
          </a>
        </div>
      </div>
      </MaxWidthWrapper>
    </footer>
  );
};

export default Footer;