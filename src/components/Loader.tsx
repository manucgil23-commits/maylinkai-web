import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import logo from "@/assets/maylink-logo.webp";

interface LoaderProps {
  onLoadingComplete: () => void;
}

const Loader = ({ onLoadingComplete }: LoaderProps) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const duration = 800;
    const interval = 25;
    const increment = 100 / (duration / interval);

    const timer = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + increment;
        if (newProgress >= 100) {
          clearInterval(timer);
          setTimeout(onLoadingComplete, 500);
          return 100;
        }
        return newProgress;
      });
    }, interval);

    return () => clearInterval(timer);
  }, [onLoadingComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="relative"
      >
        <img
          src={logo}
          alt="MayLink AI Logo"
          className="w-32 h-32 md:w-40 md:h-40"
        />
        <motion.div
          className="absolute inset-0 rounded-full"
          animate={{
            boxShadow: [
              "0 0 20px hsl(277 100% 62% / 0.3)",
              "0 0 40px hsl(277 100% 62% / 0.6)",
              "0 0 20px hsl(277 100% 62% / 0.3)",
            ],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </motion.div>

      <motion.div
        className="mt-8 text-center"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <div className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-brand-purple to-brand-purple-light bg-clip-text text-transparent mb-4">
          {Math.round(progress)}%
        </div>
        <div className="w-64 h-2 bg-secondary rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-brand-purple to-brand-purple-light"
            initial={{ width: "0%" }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.1 }}
          />
        </div>
      </motion.div>

      {progress >= 100 && (
        <motion.div
          className="absolute inset-0 bg-brand-purple"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 3, opacity: [0, 0.3, 0] }}
          transition={{ duration: 0.8 }}
        />
      )}
    </motion.div>
  );
};

export default Loader;
