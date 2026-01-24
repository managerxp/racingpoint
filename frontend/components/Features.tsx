export default function Features() {
  const features = [
    {
      id: 1,
      icon: "🏁",
      title: "Hyper-Realistic Simulators",
      description: "Premium motion-feedback racing simulators powered by Assetto Corsa & Le Mans Ultimate."
    },
    {
      id: 2,
      icon: "☕",
      title: "Racing-Inspired Café",
      description: "Curated food & beverages inside a motorsport-themed social space."
    },
    {
      id: 3,
      icon: "🏆",
      title: "Tournaments & Memberships",
      description: "Join leagues, leaderboards, and time-attack events. May the Fastest Win."
    },
    {
      id: 4,
      icon: "👥",
      title: "Community for Enthusiasts",
      description: "A hub where gamers, racers, and motorsport fans connect over adrenaline-fueled experiences."
    }
  ];

  return (
    <section className="py-20 px-4 md:px-10 bg-black">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-extrabold text-white text-center mb-16">
          Why Choose RacingPoint?
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {features.map((feature) => (
            <div
              key={feature.id}
              className="bg-gradient-to-br from-gray-900 to-black border border-red-600/30 hover:border-red-600 rounded-xl p-8 transition transform hover:scale-105"
            >
              <div className="text-5xl mb-4">{feature.icon}</div>
              <h3 className="text-2xl font-bold text-white mb-3">{feature.title}</h3>
              <p className="text-gray-300 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
