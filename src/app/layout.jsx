import "./globals.css";
import { Geist_Mono } from "next/font/google";

const geistMono = Geist_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

export const metadata = {
  title: "Salon Management",
  description: "SaaS Salon App",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={geistMono.className}>{children}</body>
    </html>
  );
}
