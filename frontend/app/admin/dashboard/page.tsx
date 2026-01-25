"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import Link from "next/link";

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
          {/* Dashboard Section */}
          {activeSection === "dashboard" && (
            <div>
              <div className="mb-8">
                <p className="text-gray-400">Manage your racing point platform</p>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-gradient-to-br from-gray-900 to-black border border-red-600/30 rounded-xl p-6 hover:border-red-600/60 transition">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-gray-400 text-sm font-medium uppercase tracking-wide">Total Users</h3>
                    <div className="w-10 h-10 bg-red-600/20 rounded-lg flex items-center justify-center">
                      <svg className="w-5 h-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    </div>
                  </div>
                  <p className="text-4xl font-bold text-white mb-2">150</p>
                  <p className="text-green-500 text-sm font-medium">↑ 12% from last month</p>
                </div>

                <div className="bg-gradient-to-br from-gray-900 to-black border border-red-600/30 rounded-xl p-6 hover:border-red-600/60 transition">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-gray-400 text-sm font-medium uppercase tracking-wide">Total Bookings</h3>
                    <div className="w-10 h-10 bg-red-600/20 rounded-lg flex items-center justify-center">
                      <svg className="w-5 h-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                  </div>
                  <p className="text-4xl font-bold text-white mb-2">487</p>
                  <p className="text-green-500 text-sm font-medium">↑ 8% from last month</p>
                </div>

                <div className="bg-gradient-to-br from-gray-900 to-black border border-red-600/30 rounded-xl p-6 hover:border-red-600/60 transition">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-gray-400 text-sm font-medium uppercase tracking-wide">Revenue</h3>
                    <div className="w-10 h-10 bg-red-600/20 rounded-lg flex items-center justify-center">
                      <svg className="w-5 h-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                  </div>
                  <p className="text-4xl font-bold text-white mb-2">$12,450</p>
                  <p className="text-green-500 text-sm font-medium">↑ 15% from last month</p>
                </div>
              </div>

              {/* Recent Activity */}
              <div>
                <h3 className="text-2xl font-bold mb-4">Recent Activity</h3>
                <div className="bg-gradient-to-br from-gray-900 to-black border border-red-600/30 rounded-xl overflow-hidden">
                  <table className="w-full">
                    <thead className="bg-black/50">
                      <tr>
                        <th className="text-left px-6 py-4 text-gray-400 font-medium">User</th>
                        <th className="text-left px-6 py-4 text-gray-400 font-medium">Action</th>
                        <th className="text-left px-6 py-4 text-gray-400 font-medium">Date</th>
                        <th className="text-left px-6 py-4 text-gray-400 font-medium">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-800">
                      <tr className="hover:bg-black/30 transition">
                        <td className="px-6 py-4">John Doe</td>
                        <td className="px-6 py-4">New Booking</td>
                        <td className="px-6 py-4">2026-01-24</td>
                        <td className="px-6 py-4">
                          <span className="bg-green-600/20 text-green-400 px-3 py-1 rounded-full text-sm">
                            Confirmed
                          </span>
                        </td>
                      </tr>
                      <tr className="hover:bg-black/30 transition">
                        <td className="px-6 py-4">Jane Smith</td>
                        <td className="px-6 py-4">Registered</td>
                        <td className="px-6 py-4">2026-01-23</td>
                        <td className="px-6 py-4">
                          <span className="bg-blue-600/20 text-blue-400 px-3 py-1 rounded-full text-sm">
                            Active
                          </span>
                        </td>
                      </tr>
                      <tr className="hover:bg-black/30 transition">
                        <td className="px-6 py-4">Mike Johnson</td>
                        <td className="px-6 py-4">Completed Session</td>
                        <td className="px-6 py-4">2026-01-23</td>
                        <td className="px-6 py-4">
                          <span className="bg-gray-600/20 text-gray-400 px-3 py-1 rounded-full text-sm">
                            Completed
                          </span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Users Section */}
          {activeSection === "users" && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <p className="text-gray-400">View and manage all registered users (excluding admin accounts)</p>
                <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-2.5 rounded-lg transition font-medium shadow-lg">
                  + Add User
                </button>
              </div>
              <div className="bg-gradient-to-br from-gray-900 to-black border border-red-600/30 rounded-xl overflow-hidden">
                <div className="p-6 border-b border-gray-800">
                  <h3 className="text-xl font-semibold">All Users</h3>
                </div>
                <div className="p-6">
                  <div className="text-gray-400 text-center py-12">
                    <svg className="w-16 h-16 mx-auto mb-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    <p className="text-lg mb-2">No users available</p>
                    <p className="text-sm">User management interface coming soon</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Car Management Section */}
          {activeSection === "cars" && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <p className="text-gray-400">Manage car categories and individual cars</p>
                <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-2.5 rounded-lg transition font-medium shadow-lg">
                  + Add Car
                </button>
              </div>
              <div className="bg-gradient-to-br from-gray-900 to-black border border-red-600/30 rounded-xl overflow-hidden">
                <div className="p-6 border-b border-gray-800">
                  <h3 className="text-xl font-semibold">Car Management</h3>
                </div>
                <div className="p-6">
                  <div className="text-gray-400 text-center py-12">
                    <svg className="w-16 h-16 mx-auto mb-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                    <p className="text-lg mb-2">No cars available</p>
                    <p className="text-sm">Add, edit, and delete cars and categories</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Track Management Section */}
          {activeSection === "tracks" && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <p className="text-gray-400">Manage racing tracks and configurations</p>
                <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-2.5 rounded-lg transition font-medium shadow-lg">
                  + Add Track
                </button>
              </div>
              <div className="bg-gradient-to-br from-gray-900 to-black border border-red-600/30 rounded-xl overflow-hidden">
                <div className="p-6 border-b border-gray-800">
                  <h3 className="text-xl font-semibold">Track Management</h3>
                </div>
                <div className="p-6">
                  <div className="text-gray-400 text-center py-12">
                    <svg className="w-16 h-16 mx-auto mb-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                    </svg>
                    <p className="text-lg mb-2">No tracks available</p>
                    <p className="text-sm">Add, edit, and delete racing tracks</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Gallery Management Section */}
          {activeSection === "gallery" && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <p className="text-gray-400">Manage gallery images and videos</p>
                <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-2.5 rounded-lg transition font-medium shadow-lg">
                  + Upload Media
                </button>
              </div>
              <div className="bg-gradient-to-br from-gray-900 to-black border border-red-600/30 rounded-xl overflow-hidden">
                <div className="p-6 border-b border-gray-800">
                  <h3 className="text-xl font-semibold">Gallery Management</h3>
                </div>
                <div className="p-6">
                  <div className="text-gray-400 text-center py-12">
                    <svg className="w-16 h-16 mx-auto mb-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <p className="text-lg mb-2">No media available</p>
                    <p className="text-sm">Upload and organize gallery content</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Booking Management Section */}
          {activeSection === "bookings" && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <p className="text-gray-400">View and manage all bookings</p>
                <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-2.5 rounded-lg transition font-medium shadow-lg">
                  + New Booking
                </button>
              </div>
              <div className="bg-gradient-to-br from-gray-900 to-black border border-red-600/30 rounded-xl overflow-hidden">
                <div className="p-6 border-b border-gray-800">
                  <h3 className="text-xl font-semibold">Booking Management</h3>
                </div>
                <div className="p-6">
                  <div className="text-gray-400 text-center py-12">
                    <svg className="w-16 h-16 mx-auto mb-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <p className="text-lg mb-2">No bookings available</p>
                    <p className="text-sm">View, confirm, cancel, and manage bookings</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
