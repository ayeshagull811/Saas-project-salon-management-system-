import Image from "next/image";
import Link from "next/link";
import React from "react";
import face from "@/assets/logoo.png";
export default function Header() {
  return (
    <div className="bg-white/90 backdrop-blur-sm shadow-sm sticky top-0 z-50">
      <div className="max-w-6xl mx-auto flex justify-between items-center px-4 md:px-6 py-3 md:py-4">
        <div className="flex items-center -ml-10">
          <div className="relative">
            <Image 
              src={face} 
              alt="logo" 
              className="w-25 h-10 md:w-30 md:h-12 lg:w-28 lg:h-16 object-contain" 
            />
          </div>
          <h1 className="space-grotesk text-lg md:text-xl lg:text-2xl text-[#a36739] font-bold -ml-10">
            <span className="hidden sm:inline">BeautySalon</span>
            <span className="sm:hidden">Beauty</span>
          </h1>
        </div>

        <button
          className="relative overflow-hidden px-3 md:px-4 lg:px-6 py-2 md:py-2.5 lg:py-3 rounded-lg md:rounded-xl border-2 border-amber-700/60 bg-amber-700/20 hover:bg-amber-700/40 hover:text-white text-amber-800 transition-all duration-300 group text-sm md:text-base font-medium shadow-sm hover:shadow-md"
        >
          <span className="relative z-10 flex items-center gap-1">
            <Link href="signup" className="flex items-center gap-1">
              <span className="hidden sm:inline">Try Now</span>
              <span className="sm:hidden">Try</span>
            </Link>
          </span>
          <span className="absolute left-0 top-0 h-full w-0 bg-[#CA9871] transition-all duration-300 group-hover:w-full"></span>
        </button>
      </div>
    </div>
  );
}
