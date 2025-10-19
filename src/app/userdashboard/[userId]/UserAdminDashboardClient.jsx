"use client";
import ProtectedRoute from "@/protectiveRoute/protectedRoute";
import Sidebar from "./commponents/sidebar";
import NavBar from "./commponents/navBar";
import { useState } from "react";

export default function UserAdminDashboardClient({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <ProtectedRoute>
      <div className="flex h-screen bg-gray-100">
        {/* Sidebar - hidden on mobile, overlay on mobile when open */}
        <div className={`fixed inset-y-0 left-0 z-50 lg:relative lg:translate-x-0 transition-transform duration-300 ease-in-out ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}>
          <Sidebar onClose={() => setSidebarOpen(false)} />
        </div>

        {/* Overlay for mobile */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        <div className="flex flex-col flex-1 lg:ml-0">
          <NavBar onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
          <main className="p-4 md:p-6 flex-1 overflow-auto">{children}</main>
        </div>
      </div>
    </ProtectedRoute>
  );
}
