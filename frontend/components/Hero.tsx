"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Hero() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

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

  return (
    <section className="relative w-full h-screen flex items-center justify-center">
      {/* Background Video - Full Screen */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        className="fixed top-0 left-0 w-full h-full object-cover -z-10 scale-110"
      >
        <source src="/assets/video/Porsche edit.mp4" type="video/mp4" />
      </video>

      {/* Overlay for better text visibility */}
      <div className="fixed top-0 left-0 w-full h-full bg-black/40 -z-10"></div>

      {/* Content */}
      <h1
        ref={titleRef}
        className="relative z-20 text-6xl font-extrabold text-center text-white drop-shadow-2xl px-4"
      >
        Ultimate Racing<br />Simulator Experience
      </h1>

      
    </section>
  );
}
