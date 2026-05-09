import { motion } from "motion/react";

export default function SplashScreen() {
  return (
    <div className="flex flex-col items-center justify-between h-[100dvh] py-24 bg-transparent relative overflow-hidden">
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
      
      <div /> {/* Spacer */}
      
      <div className="flex flex-col items-center gap-6">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative"
        >
          <div className="absolute inset-0 bg-pink-500/30 blur-[40px] opacity-60 rounded-full" />
          <img 
            src="https://i.postimg.cc/RhghR3y9/IMG-3545.jpg" 
            alt="Mero VIP Logo" 
            className="w-24 h-24 rounded-3xl object-cover relative z-10 drop-shadow-[0_0_20px_rgba(236,72,153,0.8)] border-2 border-pink-500/30"
          />
        </motion.div>

        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ 
            duration: 1.2, 
            ease: [0.34, 1.56, 0.64, 1] 
          }}
          className="relative group"
        >
          {/* feminine glow */}
          <div className="absolute -inset-8 bg-pink-500/20 blur-[60px] rounded-full group-hover:opacity-40 transition-opacity" />
          
          <h1 className="text-5xl md:text-7xl font-black font-orbitron tracking-tighter drop-shadow-[0_0_25px_rgba(236,72,153,0.5)] text-center">
            <span className="text-transparent bg-clip-text bg-gradient-to-br from-hot-pink via-pink-300 to-rose-400">MERO </span>
            <span className="text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.4)]">VIP</span>
          </h1>
        </motion.div>
      </div>

      <div className="flex flex-col items-center gap-4 w-full relative z-10">
        <p className="text-[10px] font-black tracking-[0.5em] text-pink-300/60 uppercase font-orbitron drop-shadow-[0_0_5px_rgba(244,114,182,0.4)]">Preparing Magic Experience</p>
        <div className="w-64 h-1 bg-white/5 rounded-full overflow-hidden relative border border-white/5">
          <motion.div
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 3, ease: "easeInOut" }}
            className="h-full bg-gradient-to-r from-pink-500 via-rose-400 to-pink-300 relative"
          >
            {/* Animated glow pulse */}
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
    </div>
  );
}
