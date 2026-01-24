"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function Hero() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(true);

  const textScenes = [
    "Ultimate Racing\nSimulator Experience",
    "Feel the Speed\nMaster the Track",
    "Push Your Limits\nRace Like a Pro"
  ];

  useEffect(() => {
    gsap.from(titleRef.current, {
      y: 80,
      opacity: 0,
      duration: 1.5,
      ease: "power4.out",
    });

    // Ensure video plays smoothly
    if (videoRef.current) {
      videoRef.current.play().catch((error) => {
        console.log("Video autoplay failed:", error);
      });
    }
  }, []);

  useEffect(() => {
    const currentText = textScenes[currentTextIndex];
    let currentIndex = 0;

    if (isTyping) {
      const typingInterval = setInterval(() => {
        if (currentIndex <= currentText.length) {
          setDisplayedText(currentText.substring(0, currentIndex));
          currentIndex++;
        } else {
          setIsTyping(false);
          setTimeout(() => {
            setIsTyping(true);
            setCurrentTextIndex((prev) => (prev + 1) % textScenes.length);
          }, 2000); // Wait 2 seconds before moving to next text
          clearInterval(typingInterval);
        }
      }, 100); // Typing speed

      return () => clearInterval(typingInterval);
    }
  }, [currentTextIndex, isTyping]);

  return (
    <section className="relative w-full h-screen flex items-center justify-center">
      {/* Background Video - Full Screen */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        className="fixed top-0 left-0 w-full h-full object-cover -z-10 scale-120"
      >
        <source src="assets\logo\Edit Porsche.mp4" type="video/mp4" />
      </video>

      {/* Overlay for better text visibility */}
      <div className="fixed top-0 left-0 w-full h-full bg-black/40 -z-10"></div>

      {/* Content */}
      <h1
        ref={titleRef}
        className="relative z-20 text-6xl font-extrabold text-center bg-gradient-to-r from-gray-300 via-gray-100 to-gray-400 bg-clip-text text-transparent drop-shadow-2xl px-4 whitespace-pre-line"
      >
        {displayedText}
        <span className="animate-pulse">|</span>
      </h1>

      
    </section>
  );
}
