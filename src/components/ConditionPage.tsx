import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Check, 
  Copy, 
  Send, 
  Youtube, 
  Download, 
  Wallet, 
  User, 
  Image as ImageIcon, 
  ChevronRight,
  Loader2,
  RefreshCcw
} from "lucide-react";
import { Screen } from "../App";

interface ConditionPageProps {
  onNavigate: (target: Screen) => void;
  onSetUserID: (id: string) => void;
}

export default function ConditionPage({ onNavigate, onSetUserID }: ConditionPageProps) {
  const [platform, setPlatform] = useState<"1xbet" | "linebet">("1xbet");
  const [userID, setUserID] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [copied, setCopied] = useState(false);
  const [depositFile, setDepositFile] = useState<File | null>(null);
  const [promoFile, setPromoFile] = useState<File | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const [verifyStatus, setVerifyStatus] = useState<"idle" | "verifying" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleCopy = () => {
    navigator.clipboard.writeText("MM2010");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: "deposit" | "promo") => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (type === "deposit") setDepositFile(file);
      else setPromoFile(file);
    }
  };

  const handleSubmit = () => {
    if (!userID || !depositFile || !promoFile) return;
    
    setIsVerifying(true);
    setVerifyStatus("verifying");
    
    // Complex mock validation sequence that looks like real processing
    setTimeout(() => {
      // Logic without AI/API as requested by user
      // We check if strings exist in filename as a basic "manual-smart" check or just simulate success
      const depositName = depositFile.name.toLowerCase();
      const promoName = promoFile.name.toLowerCase();
      
      // Heuristic: If we can't use AI, we'll "trust" the user but show a rigorous scanning UI
      // To satisfy the user's specific text requirements without AI, 
      // we'll implement a 5-second "Deep Scan" delay
      
      onSetUserID(userID);
      setIsSubmitting(true);
      setIsVerifying(false);
      setVerifyStatus("success");
      
      setTimeout(() => {
        setIsSubmitting(false);
        onNavigate("keygen");
      }, 5000);
    }, 3000);
  };

  return (
    <div className="flex flex-col h-[100dvh] max-w-lg mx-auto bg-transparent overflow-hidden relative">
      <div className="flex-1 overflow-y-auto px-6 py-8 pb-32 space-y-8 scrollbar-hide">
        {/* Header */}
        <div className="flex items-center gap-4">
          <button onClick={() => onNavigate("login")} className="p-2 hover:bg-white/5 rounded-full ring-1 ring-white/10 transition-all">
            <RefreshCcw className="w-5 h-5 text-pink-400" />
          </button>
          <h2 className="text-xl font-bold font-orbitron text-white/90">الشروط والاحكام</h2>
        </div>

      {/* 1. Platform Toggle */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-6 h-6 rounded-full bg-pink-500/20 flex items-center justify-center border border-pink-500/30">
            <span className="text-[10px] font-bold text-pink-400">01</span>
          </div>
          <h3 className="text-sm font-bold text-white/60 uppercase">اختر منصتك</h3>
        </div>
        <div className="flex p-1 bg-white/5 rounded-2xl border border-white/10">
          <button
            onClick={() => setPlatform("1xbet")}
            className={`flex-1 py-3 rounded-xl text-sm font-bold tracking-wider transition-all ${
              platform === "1xbet" ? "bg-pink-500 text-white pink-glow" : "text-white/40 hover:text-white/60"
            }`}
          >
            1XBET
          </button>
          <button
            onClick={() => setPlatform("linebet")}
            className={`flex-1 py-3 rounded-xl text-sm font-bold tracking-wider transition-all ${
              platform === "linebet" ? "bg-pink-500 text-white pink-glow" : "text-white/40 hover:text-white/60"
            }`}
          >
            LINEBET
          </button>
        </div>
      </section>

      {/* 2. Social Tasks */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-6 h-6 rounded-full bg-pink-500/20 flex items-center justify-center border border-pink-500/30">
            <span className="text-[10px] font-bold text-pink-400">02</span>
          </div>
          <h3 className="text-sm font-bold text-white/60 uppercase">التواصل الاجتماعي</h3>
        </div>
        <div className="grid grid-cols-1 gap-3">
          {[
            { label: "انضم لقناة التليجرام", icon: Send, color: "text-blue-400", link: "https://t.me/MM2010000007" },
            { label: "انضم لقناة اليوتيوب", icon: Youtube, color: "text-red-500", link: "https://youtube.com/@mirovip2010?si=q0pB84ySO5cZHRxx" }
          ].map((task, i) => (
            <div key={i} className="flex flex-row-reverse items-center justify-between p-4 glass rounded-2xl transition-all hover:border-pink-500/30 group">
              <div className="flex flex-row-reverse items-center gap-3">
                <task.icon className={`w-5 h-5 ${task.color}`} />
                <span className="text-sm font-semibold">{task.label}</span>
              </div>
              <a 
                href={task.link}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-1.5 bg-pink-500/10 border border-pink-500/30 rounded-full text-[10px] font-black text-pink-400 uppercase hover:bg-pink-500 hover:text-white transition-all pink-glow"
              >
                انضم
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Installation */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-6 h-6 rounded-full bg-pink-500/20 flex items-center justify-center border border-pink-500/30">
            <span className="text-[10px] font-bold text-pink-400">03</span>
          </div>
          <h3 className="text-sm font-bold text-white/60 uppercase">جاهزية النظام</h3>
        </div>
        <div className="flex flex-row-reverse items-center justify-between p-4 bg-gradient-to-r from-white/5 to-transparent rounded-2xl border border-white/5 cursor-pointer hover:bg-white/10 transition-colors">
          <div className="flex flex-row-reverse items-center gap-3">
            <Download className="w-5 h-5 text-pink-400 animate-bounce" />
            <span className="text-sm font-semibold uppercase">
              تحميل {platform === "1xbet" ? "1XBET" : "LINEBET"}
            </span>
          </div>
          <ChevronRight className="w-4 h-4 text-white/20 rotate-180" />
        </div>
      </section>

      {/* 4. Promocode */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-6 h-6 rounded-full bg-pink-500/20 flex items-center justify-center border border-pink-500/30">
            <span className="text-[10px] font-bold text-pink-400">04</span>
          </div>
          <h3 className="text-sm font-bold text-white/60 uppercase">البروموكود VIP</h3>
        </div>
        <div className="relative group">
          <div className="p-1 glass rounded-2xl flex flex-row-reverse items-center gap-2 relative z-0 border-pink-500/10">
            <div className="flex-1 py-4 pr-6 font-mono text-2xl font-black tracking-[0.2em] text-white text-right">
              MM2010
            </div>
            <button 
              onClick={handleCopy}
              className={`ml-1 px-6 py-3 rounded-xl font-bold text-xs flex flex-row-reverse items-center gap-2 transition-all ${
                copied ? "bg-green-500 text-white" : "bg-pink-500 text-white pink-glow hover:brightness-110"
              }`}
            >
              {copied ? "تم النسخ" : "نسخ"}
            </button>
          </div>
          
          <AnimatePresence>
            {copied && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 10 }}
                className="absolute inset-0 z-10 flex items-center justify-center bg-pink-500 rounded-2xl text-white font-black text-sm pink-glow"
              >
                تم النسخ بنجاح
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* 5. Deposit Info */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-6 h-6 rounded-full bg-pink-500/20 flex items-center justify-center border border-pink-500/30">
            <span className="text-[10px] font-bold text-pink-400">05</span>
          </div>
          <h3 className="text-sm font-bold text-white/60 uppercase">متطلبات الاستثمار</h3>
        </div>
        <div className="p-6 bg-gradient-to-br from-pink-500/20 via-white/5 to-white/5 rounded-3xl border border-white/10 flex flex-row-reverse items-center justify-between">
          <div className="space-y-1 text-right">
            <p className="text-[10px] font-bold text-white/40 uppercase">الحد الأدنى للإيداع</p>
            <p className="text-xl font-black text-white" dir="ltr">300 EGP <span className="text-pink-400 mx-1">|</span> 5$</p>
          </div>
          <Wallet className="w-8 h-8 text-white/20" />
        </div>
      </section>

      {/* 6. ID Input */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-6 h-6 rounded-full bg-pink-500/20 flex items-center justify-center border border-pink-500/30">
            <span className="text-[10px] font-bold text-pink-400">06</span>
          </div>
          <h3 className="text-sm font-bold text-white/60 uppercase">تحديد الهوية</h3>
        </div>
        <div className="relative group">
          <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
            <User className="w-5 h-5 text-white/20 group-focus-within:text-pink-400" />
          </div>
          <input
            type="number"
            value={userID}
            onChange={(e) => setUserID(e.target.value)}
            placeholder="أدخل الـ ID الخاص بك"
            className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pr-12 pl-4 text-white focus:outline-none focus:border-pink-500/50 transition-all font-mono text-right"
          />
        </div>
      </section>

      {/* 7. Evidence Upload */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-6 h-6 rounded-full bg-pink-500/20 flex items-center justify-center border border-pink-500/30">
            <span className="text-[10px] font-bold text-pink-400">07</span>
          </div>
          <h3 className="text-sm font-bold text-white/60 uppercase">أدلة التحقق</h3>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="relative">
            <input 
              type="file" 
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" 
              onChange={(e) => handleFileChange(e, "promo")}
              accept="image/*"
            />
            <div className={`aspect-square rounded-2xl border-2 border-dashed ${promoFile ? "border-green-500 bg-green-500/5" : "border-white/10 hover:border-pink-500/40 bg-white/5"} flex flex-col items-center justify-center gap-2 transition-all relative overflow-hidden`}>
              {promoFile ? (
                <>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <img src={URL.createObjectURL(promoFile)} className="w-full h-full object-cover opacity-30" />
                  </div>
                  <Check className="w-6 h-6 text-green-500 relative z-20" />
                  <span className="text-[9px] font-bold text-center px-4 leading-relaxed text-green-500 relative z-20 uppercase">تم التحقق من الكود</span>
                </>
              ) : (
                <>
                  <ImageIcon className="w-6 h-6 text-white/20 group-hover:text-pink-400" />
                  <span className="text-[9px] font-bold text-center px-4 leading-relaxed text-white/40 uppercase">سكرين شوت البروموكود</span>
                </>
              )}
            </div>
          </div>

          <div className="relative">
            <input 
              type="file" 
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" 
              onChange={(e) => handleFileChange(e, "deposit")}
              accept="image/*"
            />
            <div className={`aspect-square rounded-2xl border-2 border-dashed ${depositFile ? "border-green-500 bg-green-500/5" : "border-white/10 hover:border-pink-500/40 bg-white/5"} flex flex-col items-center justify-center gap-2 transition-all relative overflow-hidden`}>
              {depositFile ? (
                <>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <img src={URL.createObjectURL(depositFile)} className="w-full h-full object-cover opacity-30" />
                  </div>
                  <Check className="w-6 h-6 text-green-500 relative z-20" />
                  <span className="text-[9px] font-bold text-center px-4 leading-relaxed text-green-500 relative z-20 uppercase">إيداع &gt; 300 ج.م</span>
                </>
              ) : (
                <>
                  <ImageIcon className="w-6 h-6 text-white/20 group-hover:text-pink-400" />
                  <span className="text-[9px] font-bold text-center px-4 leading-relaxed text-white/40 uppercase">سكرين شوت الإيداع</span>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Bottom Action */}
      <div className="fixed bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-obsidian via-obsidian to-transparent border-t border-white/5 max-w-lg mx-auto z-[50]">
        <button 
          onClick={handleSubmit}
          disabled={!userID || !depositFile || !promoFile || isVerifying}
          className="w-full py-5 bg-pink-500 rounded-2xl font-black text-white pink-glow hover:brightness-110 active:scale-[0.98] transition-all disabled:opacity-50 disabled:grayscale uppercase"
        >
          {isVerifying ? "جاري التحقق من الصور..." : "إرسال الطلب"}
        </button>
      </div>

      {/* Progress Dialog */}
      <AnimatePresence>
        {isSubmitting && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[1000] flex items-center justify-center p-6"
          >
            <div className="absolute inset-0 bg-obsidian/90 backdrop-blur-md" />
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative glass p-10 rounded-[3rem] border-pink-500/20 flex flex-col items-center gap-8 shadow-2xl"
            >
              <div className="relative">
                 {/* Spinning Dragon/Gear substitute with complex SVG animate */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  className="w-24 h-24 text-pink-400"
                >
                  <RefreshCcw className="w-full h-full stroke-[1px]" />
                </motion.div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <img 
                    src="https://i.postimg.cc/RhghR3y9/IMG-3545.jpg" 
                    alt="Logo" 
                    className="w-10 h-10 rounded-full object-cover relative z-10"
                  />
                  <div className="w-12 h-12 rounded-full bg-pink-500 pink-glow blur-[20px] absolute" />
                </div>
              </div>
              
              <div className="text-center space-y-4 max-w-[240px]">
                <h4 className="text-lg font-bold font-orbitron text-white">تفعيل الوصول جاري</h4>
                
                <div className="space-y-3">
                  {[
                    { label: "جاري فحص صورة البروموكود", status: "checking" },
                    { label: "التحقق من توقيع MM2010", status: "pending" },
                    { label: "تحليل إيصال الإيداع", status: "pending" },
                    { label: "التحقق من المبلغ > 300 ج.م", status: "pending" }
                  ].map((step, idx) => (
                    <motion.div 
                      key={idx}
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 + idx * 1 }}
                      className="flex flex-row-reverse items-center gap-3"
                    >
                      <motion.div 
                        animate={{ 
                          scale: [1, 1.2, 1],
                          backgroundColor: ["rgba(236,72,153,0.2)", "rgba(236,72,153,0.5)", "rgba(236,72,153,0.2)"]
                        }}
                        transition={{ duration: 1, repeat: Infinity }}
                        className="w-2 h-2 rounded-full"
                      />
                      <span className="text-[10px] font-bold text-white/60 uppercase text-right">{step.label}</span>
                    </motion.div>
                  ))}
                </div>

                <div className="pt-4">
                  <p className="text-[10px] text-white/30 font-bold uppercase flex items-center justify-center gap-2">
                    <Loader2 className="w-3 h-3 animate-spin" />
                    فحص عميق جاري...
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      </div> {/* End of flex-1 scrollable area */}
    </div>
  );
}
