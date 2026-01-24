export default function Tracks() {
  const f1Tracks = [
    {
      id: 1,
      name: "Bahrain International Circuit",
      location: "Sakhir, Bahrain",
      country: "🇧🇭",
      length: "5.412 km",
      laps: "57",
      fastestLap: "1:31.447",
      difficulty: "Medium",
      emoji: "🏜️"
    },
    {
      id: 2,
      name: "Jeddah Corniche Circuit",
      location: "Jeddah, Saudi Arabia",
      country: "🇸🇦",
      length: "6.174 km",
      laps: "50",
      fastestLap: "1:26.627",
      difficulty: "Hard",
      emoji: "🌃"
    },
    {
      id: 3,
      name: "Albert Park Circuit",
      location: "Melbourne, Australia",
      country: "🇦🇺",
      length: "5.278 km",
      laps: "58",
      fastestLap: "1:23.861",
      difficulty: "Medium",
      emoji: "🦘"
    },
    {
      id: 4,
      name: "Shanghai International Circuit",
      location: "Shanghai, China",
      country: "🇨🇳",
      length: "5.451 km",
      laps: "56",
      fastestLap: "1:30.860",
      difficulty: "Medium",
      emoji: "🏯"
    },
    {
      id: 5,
      name: "Suzuka International Racing Course",
      location: "Suzuka, Japan",
      country: "🇯🇵",
      length: "5.807 km",
      laps: "53",
      fastestLap: "1:25.892",
      difficulty: "Expert",
      emoji: "⛩️"
    },
    {
      id: 6,
      name: "Monaco Grand Prix Circuit",
      location: "Monte Carlo, Monaco",
      country: "🇲🇨",
      length: "3.337 km",
      laps: "78",
      fastestLap: "1:12.909",
      difficulty: "Expert",
      emoji: "🎰"
    },
    {
      id: 7,
      name: "Circuit de Spa-Francorchamps",
      location: "Spa, Belgium",
      country: "🇧🇪",
      length: "7.004 km",
      laps: "44",
      fastestLap: "1:46.286",
      difficulty: "Hard",
      emoji: "🌧️"
    },
    {
      id: 8,
      name: "Silverstone Circuit",
      location: "Silverstone, England",
      country: "🇬🇧",
      length: "5.891 km",
      laps: "52",
      fastestLap: "1:27.097",
      difficulty: "Medium",
      emoji: "🏎️"
    },
    {
      id: 9,
      name: "Circuit Gilles Villeneuve",
      location: "Montreal, Canada",
      country: "🇨🇦",
      length: "4.361 km",
      laps: "70",
      fastestLap: "1:13.622",
      difficulty: "Hard",
      emoji: "🍁"
    },
    {
      id: 10,
      name: "Autodromo Hermanos Rodríguez",
      location: "Mexico City, Mexico",
      country: "🇲🇽",
      length: "4.304 km",
      laps: "71",
      fastestLap: "1:17.774",
      difficulty: "Medium",
      emoji: "🌵"
    },
    {
      id: 11,
      name: "Circuit of the Americas",
      location: "Austin, USA",
      country: "🇺🇸",
      length: "5.515 km",
      laps: "56",
      fastestLap: "1:34.769",
      difficulty: "Hard",
      emoji: "⭐"
    },
    {
      id: 12,
      name: "Autódromo José María Vargas",
      location: "Austin, Brazil",
      country: "🇧🇷",
      length: "4.309 km",
      laps: "71",
      fastestLap: "1:17.052",
      difficulty: "Hard",
      emoji: "🌴"
    },
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch(difficulty) {
      case "Easy": return "bg-green-600";
      case "Medium": return "bg-yellow-600";
      case "Hard": return "bg-orange-600";
      case "Expert": return "bg-red-600";
      default: return "bg-gray-600";
    }
  };

  return (
    <section className="min-h-screen bg-black py-16 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-5xl md:text-5xl font-extrabold text-white mb-4">
            F1 Racing Tracks
          </h2>
          <p className="text-gray-400 text-lg">
            Experience the world's most iconic racing circuits
          </p>
        </div>

        {/* Tracks Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {f1Tracks.map((track) => (
            <div
              key={track.id}
              className="bg-gradient-to-br from-gray-900 to-black border border-red-600/30 rounded-xl overflow-hidden hover:border-red-600 transition group shadow-lg hover:shadow-xl hover:shadow-red-600/20"
            >
              {/* Track Image Section */}
              <div className="w-full h-40 bg-gradient-to-br from-red-900/20 to-black flex items-center justify-center relative overflow-hidden border-b border-red-600/30">
                <div className="text-7xl group-hover:scale-125 transition-transform duration-300">
                  {track.emoji}
                </div>
                <div className="absolute top-3 right-3 flex items-center gap-1">
                  <span className="text-2xl">{track.country}</span>
                </div>
              </div>

              {/* Track Details */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-1">{track.name}</h3>
                <p className="text-gray-400 text-sm mb-4">{track.location}</p>

                {/* Track Stats */}
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Circuit Length:</span>
                    <span className="text-red-500 font-semibold">{track.length}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Number of Laps:</span>
                    <span className="text-red-500 font-semibold">{track.laps}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Fastest Lap:</span>
                    <span className="text-red-500 font-semibold">{track.fastestLap}</span>
                  </div>
                </div>

                {/* Difficulty Badge */}
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-gray-400 text-sm">Difficulty:</span>
                  <span className={`${getDifficultyColor(track.difficulty)} text-white px-3 py-1 rounded-full text-xs font-semibold`}>
                    {track.difficulty}
                  </span>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <button className="flex-1 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition font-semibold text-sm">
                    Race Now
                  </button>
                  <button className="flex-1 border border-red-600 text-red-600 hover:bg-red-600 hover:text-white px-4 py-2 rounded-lg transition font-semibold text-sm">
                    Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Track Info Banner */}
        <div className="mt-16 bg-gradient-to-r from-red-900/30 to-black border border-red-600 rounded-xl p-8">
          <h3 className="text-2xl font-bold text-white mb-4">🏁 Track Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <p className="text-3xl mb-2">🌍</p>
              <p className="text-white font-semibold">Multiple Locations</p>
              <p className="text-gray-400 text-sm mt-2">Global circuits</p>
            </div>
            <div className="text-center">
              <p className="text-3xl mb-2">📊</p>
              <p className="text-white font-semibold">Varied Challenges</p>
              <p className="text-gray-400 text-sm mt-2">Easy to Expert</p>
            </div>
            <div className="text-center">
              <p className="text-3xl mb-2">⚡</p>
              <p className="text-white font-semibold">High Speed Action</p>
              <p className="text-gray-400 text-sm mt-2">Thrilling racing</p>
            </div>
            <div className="text-center">
              <p className="text-3xl mb-2">🏆</p>
              <p className="text-white font-semibold">Professional Grade</p>
              <p className="text-gray-400 text-sm mt-2">Realistic simulation</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
