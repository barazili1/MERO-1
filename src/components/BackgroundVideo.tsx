import { motion } from "motion/react";
import { useEffect, useRef } from "react";

export default function BackgroundVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.muted = true;
      video.playsInline = true;
      
      const playVideo = () => {
        const promise = video.play();
        if (promise !== undefined) {
          promise.catch(() => {
            const handleFirstInteraction = () => {
              video.play();
              document.removeEventListener('touchstart', handleFirstInteraction);
              document.removeEventListener('click', handleFirstInteraction);
            };
            document.addEventListener('touchstart', handleFirstInteraction);
            document.addEventListener('click', handleFirstInteraction);
          });
        }
      };

      if (video.readyState >= 2) {
        playVideo();
      } else {
        video.addEventListener('canplay', playVideo);
      }
      
      return () => {
        video.removeEventListener('canplay', playVideo);
      };
    }
  }, []);

  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none select-none">
      {/* The Video */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        controls={false}
        disablePictureInPicture
        preload="auto"
        className="absolute w-full h-full object-cover opacity-90 pointer-events-none"
        style={{ 
          pointerEvents: 'none',
          WebkitBackfaceVisibility: 'hidden',
          WebkitTransform: 'translateZ(0)'
        }}
        onContextMenu={(e) => e.preventDefault()}
      >
        <source 
          src="https://www.image2url.com/r2/default/videos/1778255710540-70f17a78-c0f0-4843-8892-b6c787e6056f.mp4" 
          type="video/mp4" 
        />
      </video>

      {/* Extreme light overlays for maximum video visibility */}
      <div className="absolute inset-0 bg-gradient-to-b from-obsidian/40 via-transparent to-obsidian/40" />
      <div className="absolute inset-0 bg-obsidian/10 backdrop-blur-[0.5px]" />
      
      {/* Subtle radial glow - Updated to Pink for femininity */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(236,72,153,0.15)_0%,transparent_70%)]" />
    </div>
  );
}
