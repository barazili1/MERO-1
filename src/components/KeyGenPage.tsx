import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Lock, Copy, LogIn, Clock } from "lucide-react";
import { Screen } from "../App";

interface KeyGenPageProps {
  onNavigate: (target: Screen) => void;
  onCopyKey: (key: string) => void;
  timeLeft: number;
}

export default function KeyGenPage({ onNavigate, onCopyKey, timeLeft }: KeyGenPageProps) {
  const [key, setKey] = useState("");

  useEffect(() => {
    // Generate a 16-character key: XXXX-XXXX-XXXX-XXXX
    const chars = "ABCDEF0123456789";
    const genPart = () => Array.from({ length: 4 }, () => chars[Math.floor(Math.random() * chars.length)]).join("");
    setKey(`${genPart()}-${genPart()}-${genPart()}-${genPart()}`);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const circumference = 2 * Math.PI * 35;
  const strokeDashoffset = circumference - (timeLeft / 900) * circumference;

  const handleLogin = () => {
    onCopyKey(key);
    onNavigate("login");
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center p-6 z-[100]">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-obsidian/60 backdrop-blur-sm" />

      {/* Dialog Container */}
      <motion.div 
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        className="relative w-full max-w-sm glass p-8 rounded-[2.5rem] border-pink-500/20 shadow-2xl space-y-8 text-center"
      >
        <div className="space-y-2">
          <div className="w-12 h-12 rounded-full bg-pink-500/20 flex items-center justify-center mx-auto mb-4 border border-pink-500/30">
            <Lock className="w-6 h-6 text-pink-400" />
          </div>
          <h2 className="text-xl font-black font-orbitron tracking-tight">KEY GENERATED</h2>
          <p className="text-[10px] text-white/40 font-semibold tracking-wider uppercase">Access to VIP System Granted</p>
        </div>

        {/* The Key Box */}
        <div className="relative group">
          <div className="absolute -inset-1 bg-pink-500 rounded-2xl blur-[10px] opacity-10 group-hover:opacity-20 transition-opacity" />
          <div className="relative bg-white/5 p-6 rounded-2xl border border-white/10 text-center space-y-2">
            <span className="text-[8px] font-black text-pink-400 tracking-[0.3em] uppercase">Private Access Key</span>
            <div className="flex items-center justify-center gap-2">
              <h3 className="text-xl font-mono font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-100 to-pink-300 tracking-widest break-all">
                  {key}
              </h3>
            </div>
          </div>
        </div>

        <p className="text-[9px] text-white/30 font-bold tracking-[0.1em] uppercase px-4 leading-relaxed">
          The key has been generated successfully. Your session will remain active for 15 minutes.
        </p>

        {/* Action */}
        <button 
          onClick={handleLogin}
          className="w-full py-4 bg-gradient-to-r from-pink-500 to-rose-400 rounded-xl font-black tracking-[0.2em] text-[12px] text-white pink-glow hover:brightness-110 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
        >
          <LogIn className="w-4 h-4" />
          CONTINUE TO SYSTEM
        </button>
      </motion.div>
    </div>
  );
}
