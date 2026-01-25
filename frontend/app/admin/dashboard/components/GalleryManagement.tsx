"use client";

export default function GalleryManagement() {
  return (
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
  );
}
