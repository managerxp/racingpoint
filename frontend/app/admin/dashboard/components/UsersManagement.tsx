"use client";

export default function UsersManagement() {
  return (
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
  );
}
