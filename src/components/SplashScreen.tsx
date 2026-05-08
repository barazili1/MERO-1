import { motion } from "motion/react";
import { Crown } from "lucide-react";

export default function SplashScreen() {
  return (
    <div className="flex flex-col items-center justify-between h-[100dvh] py-24 bg-transparent">
      <div /> {/* Spacer */}
      
      <div className="flex flex-col items-center gap-6">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative"
        >
          <div className="absolute inset-0 bg-crimson blur-[30px] opacity-40 rounded-full" />
          <Crown className="w-20 h-20 text-crimson relative z-10 drop-shadow-[0_0_15px_rgba(220,38,38,0.8)]" />
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
          {/* Glow effect */}
          <div className="absolute -inset-8 bg-crimson opacity-20 blur-[50px] rounded-full group-hover:opacity-30 transition-opacity" />
          
          <h1 className="text-5xl md:text-7xl font-black font-orbitron tracking-tighter drop-shadow-[0_0_25px_rgba(220,38,38,0.4)] text-center">
            <span className="text-transparent bg-clip-text bg-gradient-to-br from-crimson via-crimson-light to-crimson-dark">MERO </span>
            <span className="text-white">VIP</span>
          </h1>
        </motion.div>
      </div>

      <div className="flex flex-col items-center gap-4 w-full">
        <p className="text-[10px] font-black tracking-[0.4em] text-white/20 uppercase">Initializing Secure Module</p>
        <div className="w-64 h-1 bg-white/5 rounded-full overflow-hidden relative border border-white/5">
          <motion.div
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 3, ease: "easeInOut" }}
            className="h-full bg-gradient-to-r from-crimson to-crimson-light relative"
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
