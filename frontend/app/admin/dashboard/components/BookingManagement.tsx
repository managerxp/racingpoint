"use client";

export default function BookingManagement() {
  return (
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
  );
}
