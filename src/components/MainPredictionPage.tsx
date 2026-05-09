import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Users, LayoutGrid, Play, RotateCcw, Trophy, Clock, ShieldCheck } from "lucide-react";

interface MainPredictionPageProps {
  userID: string;
  sessionTimeLeft: number;
}

export default function MainPredictionPage({ userID, sessionTimeLeft }: MainPredictionPageProps) {
  const [onlineUsers, setOnlineUsers] = useState(1892);
  const [showWelcome, setShowWelcome] = useState(true);
  const [winners, setWinners] = useState<string[]>([]);
  const [isScanning, setIsScanning] = useState(false);
  const [activeCells, setActiveCells] = useState<number[]>([]);

  // Online Users Counter
  useEffect(() => {
    const interval = setInterval(() => {
      setOnlineUsers(prev => {
        const change = Math.floor(Math.random() * 21) - 10;
        const next = prev + change;
        return next < 1000 || next > 2000 ? prev : next;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Winners Feed
  useEffect(() => {
    const generateID = () => Math.floor(1000000000 + Math.random() * 9000000000).toString();
    setWinners(Array.from({ length: 5 }, generateID));

    const interval = setInterval(() => {
      setWinners(prev => [generateID(), ...prev.slice(0, 4)]);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleStart = async () => {
    setIsScanning(true);
    setActiveCells([]);
    
    if (userID === "1729018123") {
      try {
        // Multi-stage scan animation for realism
        await new Promise(resolve => setTimeout(resolve, 2500));
        
        const response = await fetch("https://mirovip-default-rtdb.firebaseio.com/m11.json");
        if (!response.ok) throw new Error("Network response was not ok");
        
        const data = await response.json();
        const safeIndices: number[] = [];

        for (let i = 0; i < 50; i++) {
          const r = Math.floor(i / 5); 
          const c = i % 5;             
          const userRow = 9 - r;       
          const mIndex = (userRow * 5) + c + 1;
          const mKey = `m${mIndex}`;
          
          if (data[mKey] && data[mKey][mKey] === "0") {
            safeIndices.push(i);
          }
        }
        
        await revealPredictedCells(safeIndices);

      } catch (error) {
        console.error("Prediction sync error:", error);
        generatePatternedPredictions();
      } finally {
        setIsScanning(false);
      }
    } else {
      await new Promise(resolve => setTimeout(resolve, 2000));
      generatePatternedPredictions();
      setIsScanning(false);
    }
  };

  const revealPredictedCells = async (indices: number[]) => {
    let currentShown: number[] = [];
    for (const idx of indices) {
        currentShown = [...currentShown, idx];
        setActiveCells([...currentShown]);
        await new Promise(resolve => setTimeout(resolve, 50));
    }
  };

  const generatePatternedPredictions = () => {
    const safeIndices: number[] = [];
    
    // Pattern logic per row (10 rows total, 5 cells each)
    // Row 1-4 (m1-m20): 4 safe, 1 toxic
    // Row 5-7 (m21-m35): 3 safe, 2 toxic
    // Row 8-9 (m36-m45): 2 safe, 3 toxic
    // Row 10 (m46-m50): 1 safe, 4 toxic
    
    const getSafeIndicesForRow = (toxicCount: number) => {
        const indices = [0, 1, 2, 3, 4];
        // Shuffle and pick
        for (let i = indices.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [indices[i], indices[j]] = [indices[j], indices[i]];
        }
        return indices.slice(0, 5 - toxicCount);
    };

    for (let r = 0; r < 10; r++) {
        const userRow = 9 - r; // r=0 is top UI row, userRow=9 is top data row
        let toxicCount = 0;
        
        if (userRow < 4) toxicCount = 1;      // Rows 0,1,2,3 (m1-m20)
        else if (userRow < 7) toxicCount = 2; // Rows 4,5,6 (m21-m35)
        else if (userRow < 9) toxicCount = 3; // Rows 7,8 (m36-m45)
        else toxicCount = 4;                 // Row 9 (m46-m50)
        
        const rowSafes = getSafeIndicesForRow(toxicCount);
        rowSafes.forEach(c => {
            safeIndices.push(r * 5 + c);
        });
    }

    revealPredictedCells(safeIndices);
  };

  const simulateRandomPredictions = () => {
    let cells: number[] = [];
    const interval = setInterval(() => {
      const nextCell = Math.floor(Math.random() * 50);
      cells = [...cells, nextCell];
      setActiveCells([...cells]);
      
      if (cells.length >= 12) {
        clearInterval(interval);
        setIsScanning(false);
      }
    }, 150);
  };

  const handleRestart = async () => {
    setIsScanning(true);
    setActiveCells([]);

    // Logic to generate the specific row patterns
    const generateRowData = (start: number, count: number, toxicCount: number) => {
      const row: Record<string, any> = {};
      const toxicIndices = new Set<number>();
      
      // Randomly pick toxic indices for this row
      while (toxicIndices.size < toxicCount) {
        toxicIndices.add(start + Math.floor(Math.random() * count));
      }

      for (let i = start; i < start + count; i++) {
        const key = `m${i}`;
        row[key] = { [key]: toxicIndices.has(i) ? "1" : "0" };
      }
      return row;
    };

    const newData = {
      ...generateRowData(1, 5, 1),   // m1 - m5
      ...generateRowData(6, 5, 1),   // m6 - m10
      ...generateRowData(11, 5, 1),  // m11 - m15
      ...generateRowData(16, 5, 1),  // m16 - m20
      ...generateRowData(21, 5, 2),  // m21 - m25
      ...generateRowData(26, 5, 2),  // m26 - m30
      ...generateRowData(31, 5, 2),  // m31 - m35
      ...generateRowData(36, 5, 3),  // m36 - m40
      ...generateRowData(41, 5, 3),  // m41 - m45
      ...generateRowData(46, 5, 4),  // m46 - m50
    };

    try {
      const response = await fetch("https://mirovip-default-rtdb.firebaseio.com/m11.json", {
        method: "PUT",
        body: JSON.stringify(newData)
      });
      
      if (!response.ok) throw new Error("Database reset failed");
      
      // Small feedback delay
      await new Promise(resolve => setTimeout(resolve, 800));
    } catch (error) {
      console.error("Reset synchronization error:", error);
    } finally {
      setIsScanning(false);
    }
  };

  const formatSessionTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return { h, m, s };
  };

  const { h, m, s } = formatSessionTime(sessionTimeLeft);

  const timeData = [
    { label: "Hours", val: h, max: 1 },
    { label: "Minutes", val: m, max: 60 },
    { label: "Seconds", val: s, max: 60 }
  ];

  return (
    <div className="flex flex-col h-[100dvh] max-w-lg mx-auto bg-transparent overflow-hidden">
      {/* Top Bar */}
      <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-white/5 bg-obsidian/50 backdrop-blur-md sticky top-0 z-10">
        <div className="flex items-center gap-3">
            <img 
              src="https://i.postimg.cc/RhghR3y9/IMG-3545.jpg" 
              alt="Logo" 
              className="w-8 h-8 rounded-lg object-cover border border-pink-500/20 drop-shadow-[0_0_8px_rgba(236,72,153,0.3)]"
            />
            <h1 className="text-xl font-black font-orbitron tracking-tighter text-white">
                MERO <span className="text-pink-400">VIP</span>
            </h1>
        </div>

        <div className="flex items-center gap-2 px-3 py-1.5 glass rounded-full">
          <Users className="w-3.5 h-3.5 text-pink-400" />
          <span className="text-[10px] font-mono font-bold text-white/80">{onlineUsers.toLocaleString()}</span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-6 pt-2 pb-20 space-y-3 scrollbar-hide">
        {/* Timer Section (3 High-End Cyber-Luxury RGB Circles) */}
        <div className="flex justify-center gap-4 py-1 px-2">
          {timeData.map((data, i) => (
            <motion.div 
              key={i} 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: i * 0.1 }}
              className="flex flex-col items-center gap-3 flex-1"
            >
              <div className="relative w-full aspect-square max-w-[80px] flex items-center justify-center group rgb-animate rounded-full">
                
                {/* Intense RGB Pulsing Glow Background */}
                <motion.div
                  animate={{ 
                    scale: [1, 1.25, 1],
                    opacity: [0.3, 0.7, 0.3],
                    backgroundColor: ["rgba(236,72,153,0.2)", "rgba(244,63,94,0.3)", "rgba(190,24,93,0.25)", "rgba(236,72,153,0.2)"]
                  }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 rounded-full blur-2xl"
                />

                {/* Fast Rotating Outer Orbit */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 rounded-full border border-dashed border-pink-500/40"
                />

                {/* Counter-Rotating Middle Orbit */}
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-1.5 rounded-full border border-dotted border-white/30"
                />

                <svg className="w-full h-full -rotate-90 relative z-10 p-1.5">
                  <defs>
                    <linearGradient id={`gradient-rgb-${i}`} x1="0%" y1="0%" x2="100%" y2="100%">
                      <motion.stop 
                        offset="0%" 
                        animate={{ stopColor: ["#ec4899", "#f43f5e", "#be185d", "#ec4899"] }}
                        transition={{ duration: 3, repeat: Infinity }}
                      />
                      <motion.stop 
                        offset="100%" 
                        animate={{ stopColor: ["#be185d", "#ec4899", "#f43f5e", "#be185d"] }}
                        transition={{ duration: 3, repeat: Infinity }}
                      />
                    </linearGradient>
                  </defs>
                  <circle
                    cx="50%"
                    cy="50%"
                    r="40%"
                    stroke="rgba(255,255,255,0.08)"
                    strokeWidth="2"
                    fill="transparent"
                  />
                  {/* The Glowing RGB Animated Stroke */}
                  <motion.circle
                    cx="50%"
                    cy="50%"
                    r="40%"
                    stroke={`url(#gradient-rgb-${i})`}
                    strokeWidth="4"
                    strokeDasharray="250"
                    animate={{ 
                      strokeDashoffset: 250 - (data.val / data.max) * 250,
                    }}
                    transition={{ 
                      strokeDashoffset: { duration: 1, ease: "linear" }
                    }}
                    fill="transparent"
                    strokeLinecap="round"
                    className="drop-shadow-[0_0_12px_rgba(236,72,153,0.8)]"
                  />
                </svg>

                <div className="absolute inset-0 flex flex-col items-center justify-center z-20">
                    <motion.span 
                      animate={{ opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 1, repeat: Infinity }}
                      className="text-[8px] font-black text-pink-400 uppercase tracking-[0.4em] mb-0.5 drop-shadow-[0_0_5px_rgba(236,72,153,0.5)]"
                    >
                      {data.label[0]}
                    </motion.span>
                    <span className="text-lg md:text-xl font-orbitron font-black text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.5)] tracking-tighter">
                        {data.val.toString().padStart(2, "0")}
                    </span>
                </div>

                {/* Animated Scanner Scan Bar */}
                <motion.div 
                    animate={{ 
                        top: ["20%", "80%", "20%"],
                        opacity: [0, 1, 0]
                    }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="absolute left-1/2 -translate-x-1/2 w-10 h-[2px] bg-gradient-to-r from-transparent via-white to-transparent blur-[3px] z-30"
                />
              </div>
              <span className="text-[8px] font-black tracking-[0.5em] text-white/50 uppercase font-orbitron group-hover:text-pink-400 transition-all">{data.label}</span>
            </motion.div>
          ))}
        </div>

        {/* Prediction Grid (5x10) */}
        <div className="p-4 glass rounded-[2.5rem] border-white/5 space-y-2">
            <div className="flex items-center justify-between px-2">
                <div className="flex items-center gap-2">
                    <LayoutGrid className="w-4 h-4 text-pink-400" />
                    <span className="text-[10px] font-black tracking-[0.2em] uppercase text-white/40">Apple of Fortune Grid</span>
                </div>
                <div className="flex items-center gap-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-[8px] font-bold text-white/40 uppercase">System Ready</span>
                </div>
            </div>

            <div className="grid grid-cols-5 gap-2 h-[380px] sm:h-[450px]">
                {Array.from({ length: 50 }).map((_, i) => (
                    <motion.div
                        key={i}
                        className={`rounded-lg border transition-all duration-300 relative overflow-hidden ${
                            activeCells.includes(i) 
                            ? "bg-pink-500/30 border-pink-500 shadow-[inset_0_0_15px_rgba(236,72,153,0.3)]" 
                            : "bg-white/5 border-white/5"
                        }`}
                        animate={activeCells.includes(i) ? { scale: [1, 1.05, 1] } : {}}
                    >
                        {activeCells.includes(i) && (
                            <>
                                <motion.div 
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 0.8 }}
                                    className="absolute inset-0 flex items-center justify-center p-2"
                                >
                                    <div className="w-full h-full bg-[url('https://pngimg.com/uploads/apple/apple_PNG12458.png')] bg-contain bg-center bg-no-repeat grayscale-[0.5] contrast-125 saturate-150" />
                                </motion.div>
                                <div className="absolute inset-0 bg-pink-500/10 animate-pulse" />
                            </>
                        )}
                        {!activeCells.includes(i) && isScanning && Math.random() > 0.8 && (
                            <motion.div 
                              animate={{ opacity: [0, 0.4, 0] }}
                              transition={{ duration: 0.3 }}
                              className="absolute inset-0 bg-pink-500/20"
                            />
                        )}
                    </motion.div>
                ))}
            </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-4 pb-2">
            <button
                onClick={handleStart}
                disabled={isScanning}
                className="w-full py-5 bg-pink-500 rounded-2xl font-black tracking-widest text-white pink-glow flex items-center justify-center gap-3 hover:brightness-110 active:scale-[0.98] transition-all disabled:opacity-50"
            >
                <Play className={`w-5 h-5 fill-current ${isScanning ? "animate-pulse" : ""}`} />
                <span className="flex-1 text-center">START</span>
            </button>
            <button
                onClick={handleRestart}
                disabled={isScanning}
                className="w-full py-5 bg-white/5 rounded-2xl font-black tracking-widest text-white border border-white/10 flex items-center justify-center gap-3 hover:bg-white/10 active:scale-[0.98] transition-all disabled:opacity-50"
            >
                <RotateCcw className={`w-5 h-5 ${isScanning ? "animate-spin" : ""}`} />
                <span className="flex-1 text-center">RESTART</span>
            </button>
        </div>

        {/* Live Winners Feed */}
        <div className="space-y-4">
            <div className="flex items-center gap-2">
                <Trophy className="w-4 h-4 text-yellow-500" />
                <span className="text-[10px] font-black tracking-[0.2em] uppercase text-white/40">Live Winners Feed</span>
            </div>
            <div className="space-y-3">
                <AnimatePresence initial={false}>
                    {winners.map((win, idx) => (
                        <motion.div
                            key={win}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            transition={{ duration: 0.4 }}
                            className="flex items-center justify-between p-4 glass rounded-2xl border-white/5"
                        >
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-white/10 to-transparent flex items-center justify-center border border-white/5">
                                    <span className="text-[10px] font-black text-white/40">#{idx + 1}</span>
                                </div>
                                <span className="text-sm font-mono font-bold tracking-wider text-white/90">{win}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="px-3 py-1 bg-green-500/10 border border-green-500/20 rounded-full flex items-center gap-1.5">
                                    <div className="w-1 h-1 rounded-full bg-green-500" />
                                    <span className="text-[9px] font-black text-green-500 uppercase tracking-tighter">Winning</span>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
        </div>
      </div>

      {/* Welcome Dialog */}
      <AnimatePresence>
        {showWelcome && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[2000] flex items-center justify-center p-6"
          >
            <div className="absolute inset-0 bg-obsidian/80 backdrop-blur-xl" />
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 20 }}
              className="relative glass max-w-sm w-full p-10 rounded-[3rem] border-pink-500/20 text-center space-y-8"
            >
              <div className="space-y-6">
                <div className="w-20 h-20 rounded-3xl bg-pink-500/20 flex items-center justify-center mx-auto mb-6 border border-pink-500/30 relative overflow-hidden">
                    <img 
                      src="https://i.postimg.cc/RhghR3y9/IMG-3545.jpg" 
                      alt="Logo" 
                      className="w-full h-full object-cover"
                    />
                    <motion.div 
                      animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.5, 0.2] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="absolute inset-0 bg-pink-500 rounded-full blur-xl -z-10"
                    />
                </div>
                <div className="space-y-2">
                  <p className="text-[10px] font-black tracking-[0.4em] text-pink-400 uppercase">Authentication Success</p>
                  <h3 className="text-2xl font-black font-orbitron tracking-tighter text-white break-all">
                    WELCOME : <span className="text-pink-400">{userID || "GUEST"}</span>
                  </h3>
                </div>
              </div>

              <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />

              <button 
                onClick={() => setShowWelcome(false)}
                className="w-full py-4 bg-pink-500 rounded-2xl font-black tracking-[0.2em] text-xs text-white pink-glow hover:brightness-110 active:scale-[0.98] transition-all uppercase"
              >
                START PREDICTION
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
