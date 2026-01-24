"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import Link from "next/link";

export default function AdminDashboard() {
  const { user, isAdmin, isLoading, logout } = useAuth();
  const router = useRouter();

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
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="bg-gradient-to-r from-gray-900 to-black border-b border-red-600/30 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-red-600">Admin Dashboard</h1>
          <div className="flex items-center gap-4">
            <span className="text-gray-400">
              Welcome, {user.firstName} {user.lastName}
            </span>
            <button
              onClick={logout}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">Dashboard Overview</h2>
          <p className="text-gray-400">Manage your racing point platform</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gradient-to-br from-gray-900 to-black border border-red-600/30 rounded-xl p-6">
            <h3 className="text-gray-400 text-sm mb-2">Total Users</h3>
            <p className="text-3xl font-bold text-white">150</p>
            <p className="text-green-500 text-sm mt-2">+12% from last month</p>
          </div>

          <div className="bg-gradient-to-br from-gray-900 to-black border border-red-600/30 rounded-xl p-6">
            <h3 className="text-gray-400 text-sm mb-2">Total Bookings</h3>
            <p className="text-3xl font-bold text-white">487</p>
            <p className="text-green-500 text-sm mt-2">+8% from last month</p>
          </div>

          <div className="bg-gradient-to-br from-gray-900 to-black border border-red-600/30 rounded-xl p-6">
            <h3 className="text-gray-400 text-sm mb-2">Revenue</h3>
            <p className="text-3xl font-bold text-white">$12,450</p>
            <p className="text-green-500 text-sm mt-2">+15% from last month</p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h3 className="text-2xl font-bold mb-4">Quick Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link
              href="/admin/users"
              className="bg-gradient-to-br from-gray-900 to-black border border-red-600/30 rounded-xl p-6 hover:border-red-600 transition text-center"
            >
              <div className="text-red-600 text-3xl mb-2">👥</div>
              <h4 className="font-semibold">Manage Users</h4>
            </Link>

            <Link
              href="/admin/bookings"
              className="bg-gradient-to-br from-gray-900 to-black border border-red-600/30 rounded-xl p-6 hover:border-red-600 transition text-center"
            >
              <div className="text-red-600 text-3xl mb-2">📅</div>
              <h4 className="font-semibold">View Bookings</h4>
            </Link>

            <Link
              href="/admin/cars"
              className="bg-gradient-to-br from-gray-900 to-black border border-red-600/30 rounded-xl p-6 hover:border-red-600 transition text-center"
            >
              <div className="text-red-600 text-3xl mb-2">🏎️</div>
              <h4 className="font-semibold">Manage Cars</h4>
            </Link>

            <Link
              href="/admin/tracks"
              className="bg-gradient-to-br from-gray-900 to-black border border-red-600/30 rounded-xl p-6 hover:border-red-600 transition text-center"
            >
              <div className="text-red-600 text-3xl mb-2">🏁</div>
              <h4 className="font-semibold">Manage Tracks</h4>
            </Link>
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
      </main>
    </div>
  );
}
