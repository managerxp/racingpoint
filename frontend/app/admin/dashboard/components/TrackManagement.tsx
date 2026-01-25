"use client";

import { useState, useEffect } from "react";

// Comprehensive list of countries
const COUNTRIES = [
  "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda", "Argentina", "Armenia", 
  "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", 
  "Belize", "Benin", "Bhutan", "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria", 
  "Burkina Faso", "Burundi", "Cabo Verde", "Cambodia", "Cameroon", "Canada", "Central African Republic", "Chad", 
  "Chile", "China", "Colombia", "Comoros", "Congo", "Costa Rica", "Croatia", "Cuba", "Cyprus", "Czech Republic", 
  "Denmark", "Djibouti", "Dominica", "Dominican Republic", "East Timor", "Ecuador", "Egypt", "El Salvador", 
  "Equatorial Guinea", "Eritrea", "Estonia", "Eswatini", "Ethiopia", "Fiji", "Finland", "France", "Gabon", 
  "Gambia", "Georgia", "Germany", "Ghana", "Greece", "Grenada", "Guatemala", "Guinea", "Guinea-Bissau", "Guyana", 
  "Haiti", "Honduras", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Israel", "Italy", 
  "Ivory Coast", "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Kosovo", "Kuwait", "Kyrgyzstan", 
  "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", 
  "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Mauritania", "Mauritius", 
  "Mexico", "Micronesia", "Moldova", "Monaco", "Mongolia", "Montenegro", "Morocco", "Mozambique", "Myanmar", 
  "Namibia", "Nauru", "Nepal", "Netherlands", "New Zealand", "Nicaragua", "Niger", "Nigeria", "North Korea", 
  "North Macedonia", "Norway", "Oman", "Pakistan", "Palau", "Palestine", "Panama", "Papua New Guinea", "Paraguay", 
  "Peru", "Philippines", "Poland", "Portugal", "Qatar", "Romania", "Russia", "Rwanda", "Saint Kitts and Nevis", 
  "Saint Lucia", "Saint Vincent and the Grenadines", "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia", 
  "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands", 
  "Somalia", "South Africa", "South Korea", "South Sudan", "Spain", "Sri Lanka", "Sudan", "Suriname", "Sweden", 
  "Switzerland", "Syria", "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Togo", "Tonga", "Trinidad and Tobago", 
  "Tunisia", "Turkey", "Turkmenistan", "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", 
  "United States", "Uruguay", "Uzbekistan", "Vanuatu", "Vatican City", "Venezuela", "Vietnam", "Yemen", "Zambia", "Zimbabwe"
];

const DIFFICULTY_LEVELS = ["Easy", "Medium", "Hard", "Expert", "Professional"];

export default function TrackManagement() {
  const [tracks, setTracks] = useState([]);
  const [showTrackModal, setShowTrackModal] = useState(false);
  const [trackFormData, setTrackFormData] = useState({
    name: "",
    length_km: "",
    country: "",
    difficulty_level: "",
    image: null as File | null
  });
  const [editingTrack, setEditingTrack] = useState<any>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  // Fetch tracks
  const fetchTracks = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/tracks");
      const data = await response.json();
      console.log("Tracks API response:", data);
      
      if (data.tracks) {
        setTracks(data.tracks);
      }
    } catch (error) {
      console.error("Error fetching tracks:", error);
    }
  };

  useEffect(() => {
    fetchTracks();
  }, []);

  // Helper function to get correct image URL
  const getImageUrl = (imageUrl: string) => {
    if (!imageUrl) return null;
    
    if (imageUrl.startsWith('http')) {
      return imageUrl;
    }
    
    if (imageUrl.startsWith('/')) {
      return `http://localhost:5000${imageUrl}`;
    }
    
    return `http://localhost:5000/${imageUrl}`;
  };

  // Track handlers
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setTrackFormData({ ...trackFormData, image: file });
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleAddTrack = async () => {
    try {
      const token = localStorage.getItem("token");
      const formData = new FormData();
      formData.append("name", trackFormData.name);
      formData.append("length_km", trackFormData.length_km);
      formData.append("country", trackFormData.country);
      formData.append("difficulty_level", trackFormData.difficulty_level);
      if (trackFormData.image) {
        formData.append("image", trackFormData.image);
      }

      const response = await fetch("http://localhost:5000/api/tracks", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`
        },
        body: formData
      });

      if (response.ok) {
        setTrackFormData({ name: "", length_km: "", country: "", difficulty_level: "", image: null });
        setImagePreview(null);
        setShowTrackModal(false);
        fetchTracks();
      } else {
        const error = await response.json();
        alert(error.error || "Failed to add track");
      }
    } catch (error) {
      console.error("Error adding track:", error);
      alert("Failed to add track");
    }
  };

  const handleUpdateTrack = async () => {
    try {
      const token = localStorage.getItem("token");
      const formData = new FormData();
      formData.append("name", trackFormData.name);
      formData.append("length_km", trackFormData.length_km);
      formData.append("country", trackFormData.country);
      formData.append("difficulty_level", trackFormData.difficulty_level);
      if (trackFormData.image) {
        formData.append("image", trackFormData.image);
      }

      const response = await fetch(`http://localhost:5000/api/tracks/${editingTrack.id}`, {
        method: "PUT",
        headers: {
          "Authorization": `Bearer ${token}`
        },
        body: formData
      });

      if (response.ok) {
        setTrackFormData({ name: "", length_km: "", country: "", difficulty_level: "", image: null });
        setImagePreview(null);
        setEditingTrack(null);
        setShowTrackModal(false);
        fetchTracks();
      } else {
        const error = await response.json();
        alert(error.error || "Failed to update track");
      }
    } catch (error) {
      console.error("Error updating track:", error);
      alert("Failed to update track");
    }
  };

  const handleDeleteTrack = async (id: number) => {
    if (!confirm("Are you sure you want to delete this track?")) return;
    
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`http://localhost:5000/api/tracks/${id}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });

      if (response.ok) {
        fetchTracks();
      } else {
        const error = await response.json();
        alert(error.error || "Failed to delete track");
      }
    } catch (error) {
      console.error("Error deleting track:", error);
      alert("Failed to delete track");
    }
  };

  const openTrackModal = (track: any = null) => {
    if (track) {
      setEditingTrack(track);
      setTrackFormData({
        name: track.name,
        length_km: track.length_km.toString(),
        country: track.country || "",
        difficulty_level: track.difficulty_level || "",
        image: null
      });
      if (track.image_url) {
        setImagePreview(getImageUrl(track.image_url));
      } else {
        setImagePreview(null);
      }
    } else {
      setEditingTrack(null);
      setTrackFormData({ name: "", length_km: "", country: "", difficulty_level: "", image: null });
      setImagePreview(null);
    }
    setShowTrackModal(true);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-2xl font-semibold">Racing Tracks</h3>
        <button 
          onClick={() => openTrackModal()}
          className="bg-red-600 hover:bg-red-700 text-white px-6 py-2.5 rounded-lg transition font-medium shadow-lg"
        >
          + Add Track
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tracks.length > 0 ? (
          tracks.map((track: any) => (
            <div 
              key={track.id}
              className="bg-gradient-to-br from-gray-900 to-black border border-red-600/30 rounded-xl overflow-hidden hover:border-red-600/60 transition"
            >
              <div className="h-48 bg-gray-800 overflow-hidden relative">
                {track.image_url ? (
                  <img 
                    src={getImageUrl(track.image_url)} 
                    alt={track.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.currentTarget as HTMLImageElement;
                      target.style.display = 'none';
                      const parent = target.parentElement;
                      if (parent) {
                        parent.innerHTML = `
                          <div class="flex flex-col items-center justify-center h-full text-gray-500 p-4">
                            <svg class="w-16 h-16 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                            </svg>
                            <p class="text-sm">Failed to load image</p>
                          </div>
                        `;
                      }
                    }}
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center h-full text-gray-500 p-4">
                    <svg className="w-16 h-16 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                    </svg>
                    <p className="text-sm">No image available</p>
                  </div>
                )}
              </div>
              <div className="p-4">
                <div className="mb-3">
                  <div className="flex items-center gap-2 mb-2">
                    {track.country && (
                      <span className="inline-block bg-blue-600/20 text-blue-400 px-3 py-1 rounded-full text-xs font-medium">
                        {track.country}
                      </span>
                    )}
                    {track.difficulty_level && (
                      <span className="inline-block bg-red-600/20 text-red-400 px-3 py-1 rounded-full text-xs font-medium">
                        {track.difficulty_level}
                      </span>
                    )}
                  </div>
                  <h4 className="text-xl font-semibold">{track.name}</h4>
                  <p className="text-gray-400 text-sm mt-1">
                    <span className="text-red-500 font-medium">{track.length_km} km</span> length
                  </p>
                </div>
                <div className="flex gap-2">
                  <button 
                    onClick={() => openTrackModal(track)}
                    className="flex-1 bg-blue-600/20 hover:bg-blue-600/40 text-blue-400 px-4 py-2 rounded-lg text-sm transition font-medium"
                  >
                    Edit
                  </button>
                  <button 
                    onClick={() => handleDeleteTrack(track.id)}
                    className="flex-1 bg-red-600/20 hover:bg-red-600/40 text-red-400 px-4 py-2 rounded-lg text-sm transition font-medium"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-12 text-gray-500">
            <svg className="w-16 h-16 mx-auto mb-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
            </svg>
            <p className="text-lg mb-2">No tracks available</p>
            <p className="text-sm">Add your first racing track to get started</p>
          </div>
        )}
      </div>

      {/* Track Modal */}
      {showTrackModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 overflow-y-auto p-4" onClick={() => setShowTrackModal(false)}>
          <div className="bg-gradient-to-br from-gray-900 to-black border border-red-600/30 rounded-xl p-6 w-full max-w-2xl" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-2xl font-semibold mb-6">
              {editingTrack ? "Edit Track" : "Add New Track"}
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Track Name *</label>
                <input
                  type="text"
                  value={trackFormData.name}
                  onChange={(e) => setTrackFormData({ ...trackFormData, name: e.target.value })}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-red-600 transition"
                  placeholder="e.g., Monaco Grand Prix Circuit"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Length (km) *</label>
                  <input
                    type="number"
                    step="0.01"
                    value={trackFormData.length_km}
                    onChange={(e) => setTrackFormData({ ...trackFormData, length_km: e.target.value })}
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-red-600 transition"
                    placeholder="e.g., 5.8"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Difficulty Level</label>
                  <select
                    value={trackFormData.difficulty_level}
                    onChange={(e) => setTrackFormData({ ...trackFormData, difficulty_level: e.target.value })}
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-red-600 transition"
                  >
                    <option value="">Select difficulty</option>
                    {DIFFICULTY_LEVELS.map((level) => (
                      <option key={level} value={level}>
                        {level}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Country</label>
                <select
                  value={trackFormData.country}
                  onChange={(e) => setTrackFormData({ ...trackFormData, country: e.target.value })}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-red-600 transition"
                >
                  <option value="">Select a country</option>
                  {COUNTRIES.map((country) => (
                    <option key={country} value={country}>
                      {country}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Track Image</label>
                <div className="border-2 border-dashed border-gray-700 rounded-lg p-4 hover:border-red-600/50 transition">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                    id="trackImageInput"
                  />
                  <label 
                    htmlFor="trackImageInput"
                    className="cursor-pointer flex flex-col items-center"
                  >
                    {imagePreview ? (
                      <div className="relative w-full">
                        <img 
                          src={imagePreview} 
                          alt="Preview" 
                          className="w-full h-48 object-cover rounded-lg"
                        />
                        <div className="absolute inset-0 bg-black/50 opacity-0 hover:opacity-100 transition flex items-center justify-center rounded-lg">
                          <span className="text-white font-medium">Click to change image</span>
                        </div>
                      </div>
                    ) : (
                      <>
                        <svg className="w-12 h-12 text-gray-600 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <p className="text-gray-400 text-sm">Click to upload track image</p>
                        <p className="text-gray-600 text-xs mt-1">PNG, JPG, GIF up to 5MB</p>
                      </>
                    )}
                  </label>
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => setShowTrackModal(false)}
                  className="flex-1 bg-gray-800 hover:bg-gray-700 text-white px-4 py-2.5 rounded-lg transition font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={editingTrack ? handleUpdateTrack : handleAddTrack}
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white px-4 py-2.5 rounded-lg transition font-medium shadow-lg"
                  disabled={!trackFormData.name || !trackFormData.length_km}
                >
                  {editingTrack ? "Update Track" : "Add Track"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
