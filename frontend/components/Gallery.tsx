"use client";

import { useEffect, useRef, useState } from 'react';
import { Play, Pause, Maximize2, Volume2, VolumeX } from 'lucide-react';
import gsap from 'gsap';

export default function Gallery() {
  const galleryRef = useRef<HTMLDivElement>(null);
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);
  const [muted, setMuted] = useState(true);
  const [fullscreen, setFullscreen] = useState<number | null>(null);

  const galleryItems = [
    { id: 1, type: 'video', src: '/videos/racing-sim-1.mp4', thumbnail: '/images/gallery/thumb1.jpg', title: 'Hyper Realistic Simulation', category: 'Simulation' },
    { id: 2, type: 'image', src: '/images/gallery/racing-cafe.jpg', thumbnail: '/images/gallery/thumb2.jpg', title: 'Racing Inspired Café', category: 'Venue' },
    { id: 3, type: 'video', src: '/videos/tournament.mp4', thumbnail: '/images/gallery/thumb3.jpg', title: 'Professional Tournaments', category: 'Events' },
    { id: 4, type: 'image', src: '/images/gallery/community.jpg', thumbnail: '/images/gallery/thumb4.jpg', title: 'Community Events', category: 'Community' },
    { id: 5, type: 'video', src: '/videos/motion-simulator.mp4', thumbnail: '/images/gallery/thumb5.jpg', title: 'Motion Feedback System', category: 'Technology' },
    { id: 6, type: 'image', src: '/images/gallery/interior-1.jpg', thumbnail: '/images/gallery/thumb6.jpg', title: 'Premium Interior', category: 'Venue' },
    { id: 7, type: 'video', src: '/videos/leaderboard.mp4', thumbnail: '/images/gallery/thumb7.jpg', title: 'Live Leaderboards', category: 'Competition' },
    { id: 8, type: 'image', src: '/images/gallery/gear.jpg', thumbnail: '/images/gallery/thumb8.jpg', title: 'Professional Gear', category: 'Equipment' },
    { id: 9, type: 'video', src: '/videos/drift-comp.mp4', thumbnail: '/images/gallery/thumb9.jpg', title: 'Drift Competitions', category: 'Events' },
    { id: 10, type: 'image', src: '/images/gallery/lounge.jpg', thumbnail: '/images/gallery/thumb10.jpg', title: 'VIP Lounge', category: 'Venue' },
  ];

  // Initialize animations
  useEffect(() => {
    if (!galleryRef.current) return;

    const items = galleryRef.current.querySelectorAll('.gallery-item');
    
    gsap.fromTo(items,
      {
        opacity: 0,
        y: 50,
        scale: 0.9
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: galleryRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      }
    );
  }, []);

  const toggleFullscreen = (index: number) => {
    setFullscreen(fullscreen === index ? null : index);
  };

  const toggleMute = () => {
    setMuted(!muted);
  };

  return (
    <>
      <section ref={galleryRef} className="relative py-24 px-4 md:px-8 lg:px-16 bg-gradient-to-b from-black to-gray-900 overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-red-600/5 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-600/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
          
          {/* Grid pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="h-full w-full" style={{
              backgroundImage: `linear-gradient(to right, #888 1px, transparent 1px),
                                linear-gradient(to bottom, #888 1px, transparent 1px)`,
              backgroundSize: '50px 50px',
            }}></div>
          </div>
        </div>

        <div className="relative max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center space-x-3 mb-6">
              <div className="w-12 h-px bg-gradient-to-r from-transparent to-red-600"></div>
              <span className="text-red-600 font-bold tracking-widest text-sm uppercase">Experience Gallery</span>
              <div className="w-12 h-px bg-gradient-to-l from-transparent to-red-600"></div>
            </div>
            
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white mb-6 tracking-tight">
              <span className="block">Behind The</span>
              <span className="block text-red-600">Wheel</span>
            </h2>
            
            <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
              Immerse yourself in our world of cutting-edge racing simulation. 
              Explore moments of adrenaline, precision, and pure racing passion.
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {['All', 'Simulation', 'Events', 'Venue', 'Community', 'Technology'].map((category) => (
              <button
                key={category}
                className="px-6 py-2 rounded-full bg-gray-900/50 backdrop-blur-sm border border-gray-700 text-gray-300 hover:text-white hover:border-red-600 hover:bg-red-600/10 transition-all duration-300 text-sm font-medium"
              >
                {category}
              </button>
            ))}
          </div>

          {/* Gallery Grid - Google Photos Style */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 auto-rows-[250px] mb-12">
            {galleryItems.map((item, index) => (
              <div
                key={item.id}
                className={`gallery-item relative rounded-2xl overflow-hidden cursor-pointer group ${
                  index === 0 ? 'sm:col-span-2 sm:row-span-2' :
                  index === 4 ? 'lg:col-span-2' :
                  index === 7 ? 'xl:col-span-2' : ''
                }`}
                onMouseEnter={() => setHoveredItem(item.id)}
                onMouseLeave={() => setHoveredItem(null)}
                onClick={() => toggleFullscreen(index)}
              >
                {/* Background with fallback image */}
                <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-black">
                  {item.type === 'image' ? (
                    <img
                      src={item.thumbnail || item.src}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      loading="lazy"
                    />
                  ) : (
                    <video
                      src={item.src}
                      poster={item.thumbnail}
                      muted={muted}
                      loop
                      playsInline
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      autoPlay={hoveredItem === item.id}
                    />
                  )}
                  
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  {/* Glass Effect Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent backdrop-blur-[1px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>

                {/* Content Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-500 bg-gradient-to-t from-black/90 via-black/60 to-transparent">
                  <div className="flex items-center justify-between mb-3">
                    <span className="px-3 py-1 bg-red-600/80 backdrop-blur-sm rounded-full text-xs font-bold text-white">
                      {item.category}
                    </span>
                    {item.type === 'video' && (
                      <div className="flex items-center space-x-2">
                        {hoveredItem === item.id ? (
                          <div className="w-10 h-10 rounded-full bg-black/60 backdrop-blur-sm flex items-center justify-center">
                            <Play className="w-5 h-5 text-white" />
                          </div>
                        ) : (
                          <div className="w-8 h-8 rounded-full bg-black/40 flex items-center justify-center">
                            <Play className="w-4 h-4 text-white" fill="white" />
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-gray-300 text-sm">Click to view full screen</p>
                </div>

                {/* Play Indicator for Videos */}
                {item.type === 'video' && hoveredItem === item.id && (
                  <div className="absolute top-4 right-4">
                    <div className="relative">
                      <div className="w-12 h-12 bg-red-600/90 rounded-full flex items-center justify-center animate-ping"></div>
                      <div className="absolute inset-0 w-12 h-12 bg-red-600 rounded-full flex items-center justify-center">
                        <Play className="w-5 h-5 text-white" fill="white" />
                      </div>
                    </div>
                  </div>
                )}

                {/* Hover Effect Border */}
                <div className="absolute inset-0 border-2 border-transparent group-hover:border-red-500/50 rounded-2xl transition-all duration-500"></div>
              </div>
            ))}
          </div>

          {/* Controls Bar */}
          <div className="flex items-center justify-center space-x-6">
            <button
              onClick={toggleMute}
              className="px-6 py-3 rounded-full bg-gray-900/50 backdrop-blur-sm border border-gray-700 hover:border-red-600 hover:bg-red-600/10 transition-all duration-300 flex items-center space-x-3"
            >
              {muted ? (
                <VolumeX className="w-5 h-5 text-gray-400" />
              ) : (
                <Volume2 className="w-5 h-5 text-red-600" />
              )}
              <span className="text-gray-300 font-medium">
                {muted ? 'Unmute Videos' : 'Mute Videos'}
              </span>
            </button>
            
            <button className="px-8 py-3 bg-gradient-to-r from-red-600 to-red-700 rounded-full hover:from-red-700 hover:to-red-800 transition-all duration-300 flex items-center space-x-3 group">
              <span className="text-white font-bold">View All Media</span>
              <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center group-hover:bg-white/30 transition-colors">
                <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </button>
          </div>
        </div>
      </section>

      {/* Fullscreen Modal */}
      {fullscreen !== null && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4">
          <div className="relative w-full max-w-6xl max-h-[90vh]">
            {/* Close button */}
            <button
              onClick={() => setFullscreen(null)}
              className="absolute -top-12 right-0 text-white hover:text-red-500 transition-colors z-10"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Fullscreen content */}
            <div className="rounded-2xl overflow-hidden bg-gray-900">
              {galleryItems[fullscreen].type === 'image' ? (
                <img
                  src={galleryItems[fullscreen].src}
                  alt={galleryItems[fullscreen].title}
                  className="w-full h-full object-contain max-h-[70vh]"
                />
              ) : (
                <div className="relative">
                  <video
                    src={galleryItems[fullscreen].src}
                    className="w-full max-h-[70vh]"
                    autoPlay
                    controls
                    muted={muted}
                    loop
                  />
                  <div className="absolute bottom-4 left-4 flex items-center space-x-4">
                    <button
                      onClick={toggleMute}
                      className="p-2 rounded-full bg-black/60 backdrop-blur-sm hover:bg-black/80 transition-colors"
                    >
                      {muted ? (
                        <VolumeX className="w-5 h-5 text-white" />
                      ) : (
                        <Volume2 className="w-5 h-5 text-white" />
                      )}
                    </button>
                  </div>
                </div>
              )}
              
              {/* Caption */}
              <div className="p-6 bg-gradient-to-t from-black to-gray-900">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-2xl font-bold text-white">{galleryItems[fullscreen].title}</h3>
                  <span className="px-3 py-1 bg-red-600 rounded-full text-sm font-bold text-white">
                    {galleryItems[fullscreen].category}
                  </span>
                </div>
                <p className="text-gray-300">
                  Experience the thrill of {galleryItems[fullscreen].title.toLowerCase()} at RacingPoint.
                </p>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-center space-x-8 mt-8">
              <button
                onClick={() => setFullscreen(fullscreen > 0 ? fullscreen - 1 : galleryItems.length - 1)}
                className="px-6 py-3 rounded-full bg-gray-800/80 hover:bg-gray-700 transition-colors text-white font-medium"
              >
                Previous
              </button>
              <button
                onClick={() => setFullscreen(fullscreen < galleryItems.length - 1 ? fullscreen + 1 : 0)}
                className="px-6 py-3 rounded-full bg-red-600 hover:bg-red-700 transition-colors text-white font-medium"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .gallery-item {
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .gallery-item:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 40px rgba(220, 38, 38, 0.3);
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        
        .animate-pulse {
          animation: float 6s ease-in-out infinite;
        }
        
        .auto-rows-\[250px\] {
          grid-auto-rows: 250px;
        }
      `}</style>
    </>
  );
}