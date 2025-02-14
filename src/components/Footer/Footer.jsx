import React from "react";
import logoImage from "/assets/logo-image.png";

export default function Footer() {
  return (
    <footer className="bg-white rounded-lg shadow-sm  z-[55] relative">
      <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          <a
            href="#"
            className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse"
          >
            <img src={logoImage} className="h-8" alt={logoImage} />
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              Recipe
            </span>
          </a>
          <span className="text-blue-700 font-bold text-2xl">Route</span>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">
          © 2025{" "}
          <a href="https://www.facebook.com/EINagy" className="hover:underline">
            Nagy Osama™
          </a>
          . All Rights Reserved.
        </span>
      </div>
    </footer>
  );
}
