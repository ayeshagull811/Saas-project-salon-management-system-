// src/app/layout.jsx
import "./globals.css";
import { Geist_Mono } from "next/font/google";

const geistMono = Geist_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

export const metadata = {
  title: "Salon Management System",
  description: "Manage your salon efficiently with our SaaS platform.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      {/* ✅ Tailwind works properly when we merge className like this */}
      <body className={`${geistMono.className} bg-white text-gray-900`}>
        {children}
      </body>
    </html>
  );
}
