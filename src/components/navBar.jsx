import React from "react";
import face from "../assets/logoo.png";
import Image from "next/image";
import Link from "next/link";

export default function NavBarPage() {
  return (
    <div className="bg-pink-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-6xl mx-auto flex justify-between items-center relative z-10 px-4 md:px-6 py-3 md:py-4">
        <div className="flex items-center gap-2 md:gap-3">
          <div className="relative">
            <Image 
              src={face} 
              alt="face" 
              className="w-16 h-12 md:w-20 md:h-16 lg:w-24 lg:h-20 object-contain" 
            />
          </div>
          <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-pink-800">
            <span className="hidden sm:inline">BeautySalon</span>
            <span className="sm:hidden">Beauty</span>
          </h1>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex gap-3 justify-between items-center">
          <ul className="flex space-x-4 xl:space-x-6 font-medium text-pink-700">
            <li className="hover:underline cursor-pointer text-sm xl:text-base">Features</li>
            <li className="hover:underline cursor-pointer text-sm xl:text-base">Pricing</li>
            <li className="hover:underline cursor-pointer text-sm xl:text-base">About Us</li>
            <li className="hover:underline cursor-pointer text-sm xl:text-base">Contact Us</li>
            <li className="hover:underline cursor-pointer text-sm xl:text-base">Register</li>
          </ul>
          <div className="relative inline-block group">
            <div className="px-3 xl:px-4 py-2 rounded cursor-pointer text-sm xl:text-base text-pink-700 hover:bg-pink-300/50 transition-colors">
              Categories
            </div>

            <div className="absolute left-0 mt-1 hidden group-hover:block bg-white border rounded shadow-lg z-50 min-w-[200px]">
              <a href="#" className="block px-4 py-2 hover:bg-gray-100 text-sm">
                Haircut
              </a>
              <a href="#" className="block px-4 py-2 hover:bg-gray-100 text-sm">
                Spa
              </a>
              <a href="#" className="block px-4 py-2 hover:bg-gray-100 text-sm">
                Makeup
              </a>
              <a href="#" className="block px-4 py-2 hover:bg-gray-100 text-sm">
                Manicure
              </a>
              <a href="#" className="block px-4 py-2 hover:bg-gray-100 text-sm">
                Pedicure
              </a>
              <a href="#" className="block px-4 py-2 hover:bg-gray-100 text-sm">
                Hair Coloring
              </a>
              <a href="#" className="block px-4 py-2 hover:bg-gray-100 text-sm">
                Hair Styling
              </a>
              <a href="#" className="block px-4 py-2 hover:bg-gray-100 text-sm">
                Facial
              </a>
              <a href="#" className="block px-4 py-2 hover:bg-gray-100 text-sm">
                Waxing
              </a>
              <a href="#" className="block px-4 py-2 hover:bg-gray-100 text-sm">
                Bridal Services
              </a>
              <a href="#" className="block px-4 py-2 hover:bg-gray-100 text-sm">
                Massage
              </a>
            </div>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <div className="lg:hidden">
          <button className="p-2 text-pink-700 hover:bg-pink-300/50 rounded-lg transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        <button
          className="relative overflow-hidden px-3 md:px-4 lg:px-6 py-2 md:py-2.5 lg:py-3 rounded-lg border-2 border-pink-600 bg-pink-200/50 text-pink-700 hover:bg-pink-600 hover:text-white transition-all duration-300 group text-sm md:text-base font-medium shadow-sm hover:shadow-md"
        >
          <span className="relative z-10">
            <Link href="staffLogin">
              <span className="hidden sm:inline">Login</span>
              <span className="sm:hidden">Login</span>
            </Link>
          </span>
          <span className="absolute left-0 top-0 h-full w-0 bg-pink-600 transition-all duration-300 group-hover:w-full"></span>
        </button>
      </div>
    </div>
  );
}
