"use client";

export default function DashboardOverview() {
  return (
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
  );
}
