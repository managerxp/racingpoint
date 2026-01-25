"use client";

export default function TrackManagement() {
  return (
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
  );
}
