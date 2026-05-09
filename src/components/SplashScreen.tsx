import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";
import { Sparkles } from "lucide-react";

export default function SplashScreen({ onComplete }: { onComplete: () => void }) {
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    if (hasStarted) {
      const timer = setTimeout(() => {
        onComplete();
      }, 3500); // Allow time for progress bar animation
      return () => clearTimeout(timer);
    }
  }, [hasStarted, onComplete]);

  const handleStart = () => {
    setHasStarted(true);
    // Force a global interaction event to help BackgroundVideo.tsx or other browsers
    const interactionEvent = new CustomEvent("userInteraction");
    window.dispatchEvent(interactionEvent);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[100dvh] bg-transparent relative overflow-hidden">
      {/* Floating Sparkles */}
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: "100vh", x: Math.random() * 100 + "vw" }}
          animate={{ 
            opacity: [0, 1, 0],
            y: "-10vh",
            x: (Math.random() * 100 - 50) + "vw"
          }}
          transition={{ 
            duration: Math.random() * 5 + 5,
            repeat: Infinity,
            delay: Math.random() * 5,
            ease: "linear"
          }}
          className="absolute w-1 h-1 bg-pink-100 rounded-full blur-[1px] z-0"
        />
      ))}
      
      <AnimatePresence mode="wait">
        {!hasStarted ? (
          <motion.div 
            key="welcome"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 1.1, y: -20 }}
            className="flex flex-col items-center gap-8 relative z-50 p-8 glass rounded-[3rem] border-white/10 max-w-[320px] text-center"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-pink-500/30 blur-[30px] rounded-full animate-pulse" />
              <img 
                src="https://i.postimg.cc/RhghR3y9/IMG-3545.jpg" 
                alt="Logo" 
                className="w-20 h-20 rounded-2xl object-cover relative z-10 border-2 border-pink-500/30"
              />
            </div>
            
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-white drop-shadow-lg">
                أهلاً بك في السكريبت الأقوى على الإطلاق
              </h2>
              <p className="text-xs text-white/50 leading-relaxed">
                استمتع بتجربة توقع دقيقة بنسبة %100 مع نظام MIRO VIP الذكي
              </p>
            </div>

            <button
              onClick={handleStart}
              className="w-full py-4 bg-pink-500 rounded-2xl font-black text-white pink-glow flex items-center justify-center gap-3 hover:brightness-110 active:scale-[0.98] transition-all group"
            >
              <span className="text-lg">مرحباً</span>
              <Sparkles className="w-5 h-5 group-hover:rotate-12 transition-transform" />
            </button>
          </motion.div>
        ) : (
          <motion.div 
            key="progress"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-between h-[100dvh] py-24 w-full"
          >
            <div /> {/* Spacer */}
            
            <div className="flex flex-col items-center gap-6">
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8 }}
                className="relative"
              >
                <div className="absolute inset-0 bg-pink-500/30 blur-[40px] opacity-60 rounded-full" />
                <img 
                  src="https://i.postimg.cc/RhghR3y9/IMG-3545.jpg" 
                  alt="Miro VIP Logo" 
                  className="w-24 h-24 rounded-3xl object-cover relative z-10 drop-shadow-[0_0_20px_rgba(236,72,153,0.8)] border-2 border-pink-500/30"
                />
              </motion.div>

              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8 }}
                className="relative group"
              >
                <div className="absolute -inset-8 bg-pink-500/20 blur-[60px] rounded-full" />
                <h1 className="text-5xl md:text-7xl font-black font-orbitron text-center">
                  <span className="text-transparent bg-clip-text bg-gradient-to-br from-hot-pink via-pink-300 to-rose-400">MIRO </span>
                  <span className="text-white">VIP</span>
                </h1>
              </motion.div>
            </div>

            <div className="flex flex-col items-center gap-4 w-full relative z-10">
              <p className="text-[12px] font-bold text-pink-300/60 uppercase font-sans drop-shadow-[0_0_5px_rgba(244,114,182,0.4)]">جاري تحضير تجربة سحرية</p>
              <div className="w-64 h-1 bg-white/5 rounded-full overflow-hidden relative border border-white/5">
                <motion.div
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 3, ease: "easeInOut" }}
                  className="h-full bg-gradient-to-r from-pink-500 via-rose-400 to-pink-300 relative"
                >
                  <motion.div
                    animate={{ 
                      opacity: [0.5, 1, 0.5],
                      left: ["-100%", "100%"]
                    }}
                    transition={{ 
                      duration: 1.5, 
                      repeat: Infinity, 
                      ease: "linear" 
                    }}
                    className="absolute top-0 bottom-0 w-1/2 bg-white/30 skew-x-12"
                  />
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
