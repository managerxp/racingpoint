"use client";

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function Features() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const imagesRef = useRef<(HTMLDivElement | null)[]>([]);

  const features = [
    {
      id: 1,
      image: "assets/logo/test1.png", // Replace with your actual images
      title: "Hyper-Realistic Simulators",
      description: "Premium motion-feedback racing simulators powered by Assetto Corsa & Le Mans Ultimate."
    },
    {
      id: 2,
      image: "assets/logo/test2.png",
      title: "Racing-Inspired Café",
      description: "Curated food & beverages inside a motorsport-themed social space."
    },
    {
      id: 3,
      image: "assets/logo/test3.png",
      title: "Tournaments & Memberships",
      description: "Join leagues, leaderboards, and time-attack events. May the Fastest Win."
    },
    {
      id: 4,
      image: "assets/logo/test4.png",
      title: "Community for Enthusiasts",
      description: "A hub where gamers, racers, and motorsport fans connect over adrenaline-fueled experiences."
    }
  ];

  useEffect(() => {
    // Check if we're in the browser
    if (typeof window === 'undefined') return;
    
    // Dynamically import GSAP and register plugins
    const initGSAP = async () => {
      const { default: gsap } = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      
      gsap.registerPlugin(ScrollTrigger);

      if (!sectionRef.current) return;

      // Animate cards with staggered entrance
      gsap.fromTo(
        cardsRef.current.filter(Boolean),
        {
          opacity: 0,
          y: 80,
          scale: 0.9
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.2,
          ease: "power3.out",
          stagger: 0.2,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Parallax effect for images
      cardsRef.current.forEach((card, index) => {
        if (!card || !imagesRef.current[index]) return;

        gsap.to(imagesRef.current[index], {
          y: -30,
          ease: "none",
          scrollTrigger: {
            trigger: card,
            start: "top bottom",
            end: "bottom top",
            scrub: true
          }
        });

        // Hover animation for cards
        const handleMouseEnter = () => {
          gsap.to(card, {
            scale: 1.05,
            duration: 0.3,
            ease: "power2.out"
          });
          gsap.to(imagesRef.current[index], {
            scale: 1.1,
            duration: 0.3,
            ease: "power2.out"
          });
        };

        const handleMouseLeave = () => {
          gsap.to(card, {
            scale: 1,
            duration: 0.3,
            ease: "power2.out"
          });
          gsap.to(imagesRef.current[index], {
            scale: 1,
            duration: 0.3,
            ease: "power2.out"
          });
        };

        card.addEventListener('mouseenter', handleMouseEnter);
        card.addEventListener('mouseleave', handleMouseLeave);

        // Cleanup event listeners
        return () => {
          card.removeEventListener('mouseenter', handleMouseEnter);
          card.removeEventListener('mouseleave', handleMouseLeave);
        };
      });

      // Animate title
      const title = sectionRef.current.querySelector('h2');
      if (title) {
        gsap.fromTo(
          title,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            scrollTrigger: {
              trigger: title,
              start: "top 85%",
              toggleActions: "play none none reverse"
            }
          }
        );
      }

      return () => {
        ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      };
    };

    initGSAP();
  }, []);

  const addToCardsRef = (el: HTMLDivElement | null, index: number) => {
    cardsRef.current[index] = el;
  };

  const addToImagesRef = (el: HTMLDivElement | null, index: number) => {
    imagesRef.current[index] = el;
  };

  return (
    <section ref={sectionRef} className="py-32 px-4 md:px-10 bg-black overflow-hidden relative">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white text-center mb-20 tracking-tighter">
          Why Choose
          <span className="block text-red-600 mt-2">RacingPoint?</span>
        </h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {features.map((feature, index) => (
            <div
              key={feature.id}
              ref={el => addToCardsRef(el, index)}
              className="group relative bg-transparent border border-red-600/20 hover:border-red-600 rounded-2xl overflow-hidden transition-all duration-300 cursor-pointer h-[300px] md:h-[320px]"
              style={{
                background: 'linear-gradient(135deg, rgba(20,20,20,0.95) 0%, rgba(10,10,10,0.98) 100%)',
                backdropFilter: 'blur(10px)'
              }}
            >
              {/* Background image with overlay */}
              <div 
                ref={el => addToImagesRef(el, index)}
                className="absolute inset-0 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent z-10" />
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                  style={{
                    backgroundImage: `url(${feature.image})`,
                    opacity: 0.4,
                  }}
                />
                
                {/* Animated racing line effect */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-red-600 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="w-20 h-full bg-red-500 animate-shimmer"></div>
                </div>
              </div>

              {/* Content */}
              <div className="relative z-20 p-8 md:p-10 h-full flex flex-col justify-end">
                <div className="mb-4">
                  <span className="text-red-500 font-bold text-sm tracking-widest uppercase mb-2 inline-block">
                    Feature 0{feature.id}
                  </span>
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 leading-tight">
                    {feature.title}
                  </h3>
                </div>
                <p className="text-gray-300 leading-relaxed text-lg">
                  {feature.description}
                </p>
                
                {/* Hover indicator */}
                <div className="absolute right-6 bottom-6 w-12 h-12 rounded-full border-2 border-red-600/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-3 h-3 bg-red-600 rounded-full animate-pulse"></div>
                </div>
              </div>

              {/* Corner accents */}
              <div className="absolute top-0 left-0 w-8 h-8 border-t border-l border-red-600/50 rounded-tl-2xl"></div>
              <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-red-600/50 rounded-tr-2xl"></div>
              <div className="absolute bottom-0 left-0 w-8 h-8 border-b border-l border-red-600/50 rounded-bl-2xl"></div>
              <div className="absolute bottom-0 right-0 w-8 h-8 border-b border-r border-red-600/50 rounded-br-2xl"></div>
            </div>
          ))}
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute left-0 top-1/2 w-32 h-32 bg-red-600/10 rounded-full blur-3xl -translate-x-16"></div>
      <div className="absolute right-0 bottom-1/4 w-40 h-40 bg-red-600/5 rounded-full blur-3xl translate-x-20"></div>
    </section>
  );
}