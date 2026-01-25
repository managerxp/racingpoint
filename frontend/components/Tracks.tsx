"use client";

import { useState, useEffect } from "react";

export default function Tracks() {
  const [tracks, setTracks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCountry, setSelectedCountry] = useState("all");
  const [selectedDifficulty, setSelectedDifficulty] = useState("all");
  const [availableCountries, setAvailableCountries] = useState<string[]>([]);
  const [availableDifficulties, setAvailableDifficulties] = useState<string[]>([]);

  useEffect(() => {
    fetchTracks();
  }, []);

  const fetchTracks = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/tracks");
      const data = await response.json();
      if (data.tracks) {
        setTracks(data.tracks);
        
        // Extract unique countries and difficulties
        const countries = [...new Set(data.tracks.map((track: any) => track.country).filter(Boolean))];
        const difficulties = [...new Set(data.tracks.map((track: any) => track.difficulty_level).filter(Boolean))];
        
        setAvailableCountries(countries as string[]);
        setAvailableDifficulties(difficulties as string[]);
      }
    } catch (error) {
      console.error("Error fetching tracks:", error);
    } finally {
      setLoading(false);
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch(difficulty) {
      case "Easy": return "bg-green-600";
      case "Medium": return "bg-yellow-600";
      case "Hard": return "bg-orange-600";
      case "Expert": return "bg-red-600";
      case "Professional": return "bg-purple-600";
      default: return "bg-gray-600";
    }
  };

  // Filter tracks based on selected country and difficulty
  const filteredTracks = tracks.filter((track: any) => {
    const matchesCountry = selectedCountry === "all" || track.country === selectedCountry;
    const matchesDifficulty = selectedDifficulty === "all" || track.difficulty_level === selectedDifficulty;
    return matchesCountry && matchesDifficulty;
  });

  if (loading) {
    return (
      <section className="min-h-screen bg-black py-16 px-4 md:px-8 flex items-center justify-center">
        <div className="text-white text-xl">Loading tracks...</div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-black py-16 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-5xl md:text-5xl font-extrabold text-white mb-4">
            Racing Tracks
          </h2>
          <p className="text-gray-400 text-lg">
            Experience the world's most iconic racing circuits
          </p>
        </div>

        {/* Filters - Top Left */}
        <div className="mb-8 flex flex-col sm:flex-row gap-4 items-start">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-400 mb-2">Filter by Country</label>
            <select
              value={selectedCountry}
              onChange={(e) => setSelectedCountry(e.target.value)}
              className="w-full sm:w-64 bg-gray-900 border border-gray-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-red-600 transition"
            >
              <option value="all">All Countries</option>
              {availableCountries.map((country: string) => (
                <option key={country} value={country}>
                  {country}
                </option>
              ))}
            </select>
          </div>

          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-400 mb-2">Filter by Difficulty</label>
            <select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              className="w-full sm:w-64 bg-gray-900 border border-gray-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-red-600 transition"
            >
              <option value="all">All Difficulties</option>
              {availableDifficulties.map((difficulty: string) => (
                <option key={difficulty} value={difficulty}>
                  {difficulty}
                </option>
              ))}
            </select>
          </div>

          {(selectedCountry !== "all" || selectedDifficulty !== "all") && (
            <div className="flex items-end">
              <button
                onClick={() => {
                  setSelectedCountry("all");
                  setSelectedDifficulty("all");
                }}
                className="bg-gray-800 hover:bg-gray-700 text-gray-300 px-4 py-2.5 rounded-lg transition font-medium text-sm"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-400 text-sm">
            Showing {filteredTracks.length} of {tracks.length} tracks
          </p>
        </div>

        {/* Tracks Grid */}
        {filteredTracks.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTracks.map((track: any) => (
              <div
                key={track.id}
                className="group cursor-pointer"
              >
                {/* Track Image Section */}
                <div className="w-full h-64 flex items-center justify-center relative overflow-hidden rounded-xl">
                  {track.image_url ? (
                    <img
                      src={`http://localhost:5000${track.image_url}`}
                      alt={track.name}
                      className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300 rounded-xl mix-blend-lighten"
                      onError={(e) => {
                        const target = e.currentTarget as HTMLImageElement;
                        target.style.display = 'none';
                      }}
                    />
                  ) : (
                    <div className="text-7xl group-hover:scale-125 transition-transform duration-300">
                      🏁
                    </div>
                  )}
                  {track.difficulty_level && (
                    <div className={`absolute top-3 right-3 ${getDifficultyColor(track.difficulty_level)} text-white px-3 py-1 rounded-full text-xs font-semibold`}>
                      {track.difficulty_level}
                    </div>
                  )}
                </div>

                {/* Track Details */}
                <div className="mt-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold text-white">{track.name}</h3>
                    {track.country && (
                      <span className="text-gray-400 text-sm font-medium bg-gray-800 px-3 py-1 rounded-full">
                        {track.country}
                      </span>
                    )}
                  </div>
                  <p className="text-red-500 font-semibold text-sm">
                    {track.length_km} km
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">
              {selectedCountry !== "all" || selectedDifficulty !== "all"
                ? "No tracks match the selected filters."
                : "No tracks available at the moment."}
            </p>
          </div>
        )}

        {/* Track Info Banner */}
        {/* <div className="mt-16 bg-gradient-to-r from-red-900/30 to-black border border-red-600 rounded-xl p-8">
          <h3 className="text-2xl font-bold text-white mb-4">Track Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <p className="text-white font-semibold">Multiple Locations</p>
              <p className="text-gray-400 text-sm mt-2">Global circuits</p>
            </div>
            <div className="text-center">
              <p className="text-white font-semibold">Varied Challenges</p>
              <p className="text-gray-400 text-sm mt-2">Easy to Expert</p>
            </div>
            <div className="text-center">
              <p className="text-white font-semibold">High Speed Action</p>
              <p className="text-gray-400 text-sm mt-2">Thrilling racing</p>
            </div>
            <div className="text-center">
              <p className="text-white font-semibold">Professional Grade</p>
              <p className="text-gray-400 text-sm mt-2">Realistic simulation</p>
            </div>
          </div>
        </div> */}
      </div>
    </section>
  );
}
