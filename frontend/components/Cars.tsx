export default function Cars() {
  const simulatorCars = [
    {
      id: 1,
      name: "Ferrari F1-75",
      team: "Scuderia Ferrari",
      year: "2024",
      description: "High-speed racing machine with exceptional acceleration",
      specs: "V6 Hybrid, 1050 HP",
      emoji: "🔴",
      color: "from-red-900 to-red-800"
    },
    {
      id: 2,
      name: "Mercedes-AMG F1",
      team: "Mercedes-AMG Petronas",
      year: "2024",
      description: "Balanced performance with superior handling",
      specs: "V6 Hybrid, 1050 HP",
      emoji: "⚪",
      color: "from-gray-800 to-gray-700"
    },
    {
      id: 3,
      name: "Red Bull Racing RB20",
      team: "Red Bull Racing",
      year: "2024",
      description: "Lightweight design built for ultimate speed",
      specs: "V6 Hybrid, 1050 HP",
      emoji: "🔵",
      color: "from-blue-900 to-blue-800"
    },
    {
      id: 4,
      name: "McLaren F1",
      team: "McLaren F1 Team",
      year: "2024",
      description: "Advanced aerodynamics with excellent cornering grip",
      specs: "V6 Hybrid, 1050 HP",
      emoji: "🟠",
      color: "from-orange-900 to-orange-800"
    },
    {
      id: 5,
      name: "Aston Martin AMR24",
      team: "Aston Martin F1",
      year: "2024",
      description: "Premium engineering with distinctive performance",
      specs: "V6 Hybrid, 1050 HP",
      emoji: "💚",
      color: "from-green-900 to-green-800"
    },
    {
      id: 6,
      name: "Alpine F1",
      team: "BWT Alpine",
      year: "2024",
      description: "Proven reliability with competitive straight-line speed",
      specs: "V6 Hybrid, 1050 HP",
      emoji: "🟦",
      color: "from-indigo-900 to-indigo-800"
    },
    {
      id: 7,
      name: "Alfa Romeo C44",
      team: "Stake F1 Team",
      year: "2024",
      description: "Agile handling and responsive steering feedback",
      specs: "V6 Hybrid, 1050 HP",
      emoji: "🔴",
      color: "from-red-900 to-red-700"
    },
    {
      id: 8,
      name: "Haas F1",
      team: "Haas Formula 1",
      year: "2024",
      description: "American engineering with precision control",
      specs: "V6 Hybrid, 1050 HP",
      emoji: "⚪",
      color: "from-gray-700 to-gray-800"
    },
    {
      id: 9,
      name: "Williams Racing",
      team: "Williams Racing",
      year: "2024",
      description: "Heritage of excellence with modern innovation",
      specs: "V6 Hybrid, 1050 HP",
      emoji: "🔵",
      color: "from-blue-800 to-blue-700"
    },
  ];

  return (
    <section className="min-h-screen bg-black py-16 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-5xl md:text-5xl font-extrabold text-white mb-4">
            Available Simulator Cars
          </h2>
          <p className="text-gray-400 text-lg">
            Experience the thrill of driving F1 cars in our advanced simulator
          </p>
        </div>

        {/* Cars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {simulatorCars.map((car) => (
            <div
              key={car.id}
              className={`bg-gradient-to-br ${car.color} border border-red-600/40 rounded-xl overflow-hidden hover:border-red-600 transition group shadow-lg hover:shadow-xl hover:shadow-red-600/20`}
            >
              {/* Car Image Section */}
              <div className="w-full h-40 bg-black/50 flex items-center justify-center relative overflow-hidden border-b border-red-600/30">
                <div className="text-7xl group-hover:scale-125 transition-transform duration-300">
                  {car.emoji}
                </div>
                <div className="absolute top-3 right-3 bg-red-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
                  {car.year}
                </div>
              </div>

              {/* Car Details */}
              <div className="p-6">
                <h3 className="text-2xl font-bold text-white mb-1">{car.name}</h3>
                <p className="text-red-500 font-semibold text-sm mb-3">{car.team}</p>
                <p className="text-gray-300 text-sm mb-4">{car.description}</p>

                {/* Specs */}
                <div className="bg-black/40 rounded-lg p-3 mb-4">
                  <p className="text-gray-300 text-xs font-mono">{car.specs}</p>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <button className="flex-1 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition font-semibold">
                    Select Car
                  </button>
                  <button className="flex-1 border border-red-600 text-red-600 hover:bg-red-600 hover:text-white px-4 py-2 rounded-lg transition font-semibold">
                    Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Features Banner */}
        <div className="mt-16 bg-gradient-to-r from-red-900/30 to-black border border-red-600 rounded-xl p-8">
          <h3 className="text-2xl font-bold text-white mb-4">🏁 Simulator Features</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <p className="text-4xl mb-2">⚙️</p>
              <p className="text-white font-semibold">Realistic Physics</p>
              <p className="text-gray-400 text-sm mt-2">Authentic car dynamics and handling</p>
            </div>
            <div className="text-center">
              <p className="text-4xl mb-2">🏆</p>
              <p className="text-white font-semibold">Professional Training</p>
              <p className="text-gray-400 text-sm mt-2">Learn from expert instructors</p>
            </div>
            <div className="text-center">
              <p className="text-4xl mb-2">🎯</p>
              <p className="text-white font-semibold">Track Selection</p>
              <p className="text-gray-400 text-sm mt-2">Multiple famous F1 circuits</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
