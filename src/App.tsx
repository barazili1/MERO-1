/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
import SplashScreen from "./components/SplashScreen";
import LoginPage from "./components/LoginPage";
import ConditionPage from "./components/ConditionPage";
import KeyGenPage from "./components/KeyGenPage";
import MainPredictionPage from "./components/MainPredictionPage";
import BackgroundVideo from "./components/BackgroundVideo";

export type Screen = "splash" | "login" | "condition" | "keygen" | "main";

export default function App() {
  const [screen, setScreen] = useState<Screen>("splash");
  const [userID, setUserID] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [generatedKey, setGeneratedKey] = useState<string>("");
  const [sessionTimeLeft, setSessionTimeLeft] = useState(900);

  useEffect(() => {
    // Initial splash timeout
    if (screen === "splash") {
      const timer = setTimeout(() => {
        setScreen("login");
      }, 3500); // Allow time for progress bar animation
      return () => clearTimeout(timer);
    }
  }, [screen]);

  useEffect(() => {
    // Session timer logic
    if (screen === "keygen" || screen === "main") {
      const timer = setInterval(() => {
        setSessionTimeLeft(prev => (prev > 0 ? prev - 1 : 0));
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [screen]);

  useEffect(() => {
    // Session expiration logic
    if (sessionTimeLeft === 0 && (screen === "keygen" || screen === "main")) {
      setScreen("login");
    }
  }, [sessionTimeLeft, screen]);

  const handleNavigate = (target: Screen) => {
    if (target === "condition") {
      setSessionTimeLeft(900); // Reset session on new attempt
    }
    setScreen(target);
  };

  return (
    <div className="min-h-screen bg-obsidian text-white overflow-hidden selection:bg-crimson selection:text-white relative">
      <BackgroundVideo />
      
      <div className="relative z-10 w-full h-full">
        <AnimatePresence mode="wait">
          {screen === "splash" && (
            <motion.div
              key="splash"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="fixed inset-0 z-50 bg-transparent"
            >
              <SplashScreen />
            </motion.div>
          )}

          {screen === "login" && (
            <motion.div
              key="login"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              <LoginPage 
                onNavigate={handleNavigate} 
                onSetUserID={setUserID}
                passwordValue={password}
                onPasswordChange={setPassword}
                correctKey={generatedKey}
              />
            </motion.div>
          )}

          {screen === "condition" && (
            <motion.div
              key="condition"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ type: "spring", damping: 20, stiffness: 100 }}
            >
              <ConditionPage onNavigate={handleNavigate} onSetUserID={setUserID} />
            </motion.div>
          )}

          {screen === "keygen" && (
            <motion.div
              key="keygen"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ type: "spring", damping: 15, stiffness: 100 }}
            >
              <KeyGenPage 
                onNavigate={handleNavigate} 
                onCopyKey={(key) => {
                   setPassword(key);
                   setGeneratedKey(key);
                }} 
                timeLeft={sessionTimeLeft}
              />
            </motion.div>
          )}

          {screen === "main" && (
            <motion.div
              key="main"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
            >
              <MainPredictionPage userID={userID} sessionTimeLeft={sessionTimeLeft} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

