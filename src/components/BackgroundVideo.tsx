import { motion } from "motion/react";

export default function BackgroundVideo() {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      {/* The Video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute w-full h-full object-cover opacity-90"
      >
        <source 
          src="https://www.image2url.com/r2/default/videos/1778255710540-70f17a78-c0f0-4843-8892-b6c787e6056f.mp4" 
          type="video/mp4" 
        />
      </video>

      {/* Extreme light overlays for maximum video visibility */}
      <div className="absolute inset-0 bg-gradient-to-b from-obsidian/40 via-transparent to-obsidian/40" />
      <div className="absolute inset-0 bg-obsidian/10 backdrop-blur-[0.5px]" />
      
      {/* Subtle radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(220,38,38,0.1)_0%,transparent_70%)]" />
    </div>
  );
}
