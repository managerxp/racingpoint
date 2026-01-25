"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import DashboardOverview from "./components/DashboardOverview";
import UsersManagement from "./components/UsersManagement";
import BookingManagement from "./components/BookingManagement";
import CarManagement from "./components/CarManagement";
import TrackManagement from "./components/TrackManagement";
import GalleryManagement from "./components/GalleryManagement";

export default function AdminDashboard() {
  const { user, isAdmin, isLoading, logout } = useAuth();
  const router = useRouter();
  const [contentManagementOpen, setContentManagementOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("dashboard");

  useEffect(() => {
    if (!isLoading && (!user || !isAdmin)) {
      router.push("/login");
    }
  }, [user, isAdmin, isLoading, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  if (!user || !isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen bg-black text-white flex">
      {/* Sidebar */}
      <aside className="w-64 bg-gradient-to-b from-gray-900 to-black border-r border-red-600/30 fixed h-full overflow-y-auto">
        <div className="p-6">
          <h2 className="text-2xl font-bold text-red-600 mb-8">Admin Panel</h2>
          
          {/* Navigation Menu */}
          <nav className="space-y-1">
            {/* Dashboard */}
            <button
              onClick={() => setActiveSection("dashboard")}
              className={`w-full text-left px-4 py-3 rounded-lg transition font-medium ${
                activeSection === "dashboard"
                  ? "bg-red-600 text-white shadow-lg"
                  : "text-gray-300 hover:bg-gray-800 hover:text-white"
              }`}
            >
              Dashboard
            </button>

            {/* Users */}
            <button
              onClick={() => setActiveSection("users")}
              className={`w-full text-left px-4 py-3 rounded-lg transition font-medium ${
                activeSection === "users"
                  ? "bg-red-600 text-white shadow-lg"
                  : "text-gray-300 hover:bg-gray-800 hover:text-white"
              }`}
            >
              Users
            </button>

            {/* Booking Management */}
            <button
              onClick={() => setActiveSection("bookings")}
              className={`w-full text-left px-4 py-3 rounded-lg transition font-medium ${
                activeSection === "bookings"
                  ? "bg-red-600 text-white shadow-lg"
                  : "text-gray-300 hover:bg-gray-800 hover:text-white"
              }`}
            >
              Booking Management
            </button>

            {/* Content Management Dropdown */}
            <div>
              <button
                onClick={() => setContentManagementOpen(!contentManagementOpen)}
                className={`w-full text-left px-4 py-3 rounded-lg transition font-medium flex items-center justify-between ${
                  ["cars", "tracks", "gallery"].includes(activeSection)
                    ? "bg-red-600/20 text-white"
                    : "text-gray-300 hover:bg-gray-800 hover:text-white"
                }`}
              >
                <span>Content Management</span>
                <svg 
                  className={`w-4 h-4 transition-transform ${contentManagementOpen ? "rotate-180" : ""}`} 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Dropdown Items */}
              {contentManagementOpen && (
                <div className="mt-1 space-y-1 border-l-2 border-red-600/30 ml-4 pl-3">
                  <button
                    onClick={() => setActiveSection("cars")}
                    className={`w-full text-left px-4 py-2.5 rounded-lg transition text-sm ${
                      activeSection === "cars"
                        ? "bg-red-600 text-white shadow-lg"
                        : "text-gray-400 hover:bg-gray-800 hover:text-white"
                    }`}
                  >
                    Car Management
                  </button>

                  <button
                    onClick={() => setActiveSection("tracks")}
                    className={`w-full text-left px-4 py-2.5 rounded-lg transition text-sm ${
                      activeSection === "tracks"
                        ? "bg-red-600 text-white shadow-lg"
                        : "text-gray-400 hover:bg-gray-800 hover:text-white"
                    }`}
                  >
                    Track Management
                  </button>

                  <button
                    onClick={() => setActiveSection("gallery")}
                    className={`w-full text-left px-4 py-2.5 rounded-lg transition text-sm ${
                      activeSection === "gallery"
                        ? "bg-red-600 text-white shadow-lg"
                        : "text-gray-400 hover:bg-gray-800 hover:text-white"
                    }`}
                  >
                    Gallery
                  </button>
                </div>
              )}
            </div>
          </nav>
        </div>

        {/* Logout Button at Bottom */}
        <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-red-600/30 bg-gradient-to-b from-transparent to-black">
          <button
            onClick={logout}
            className="w-full bg-red-600 hover:bg-red-700 text-white px-4 py-3 rounded-lg transition font-medium shadow-lg"
          >
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 ml-64">
        {/* Header */}
        <header className="bg-gradient-to-r from-gray-900 to-black border-b border-red-600/30 sticky top-0 z-50">
          <div className="px-8 py-4 flex justify-between items-center">
            <h1 className="text-2xl font-bold text-red-600">
              {activeSection === "dashboard" && "Dashboard Overview"}
              {activeSection === "users" && "User Management"}
              {activeSection === "cars" && "Car Management"}
              {activeSection === "tracks" && "Track Management"}
              {activeSection === "gallery" && "Gallery Management"}
              {activeSection === "bookings" && "Booking Management"}
            </h1>
            <div className="flex items-center gap-4">
              <span className="text-gray-400">
                Welcome, {user.firstName} {user.lastName}
              </span>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="px-8 py-8">
          {activeSection === "dashboard" && <DashboardOverview />}
          {activeSection === "users" && <UsersManagement />}
          {activeSection === "bookings" && <BookingManagement />}
          {activeSection === "cars" && <CarManagement />}
          {activeSection === "tracks" && <TrackManagement />}
          {activeSection === "gallery" && <GalleryManagement />}
        </main>
      </div>
    </div>
  );
}
