import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";

interface TypewriterTextProps {
  text: string;
  delay?: number;
  className?: string;
}

const TypewriterText = ({ text, delay = 0, className = "" }: TypewriterTextProps) => {
  const [displayedText, setDisplayedText] = useState("");
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const hasStarted = useRef(false);
  const prevText = useRef(text);

  // Reset when text changes
  useEffect(() => {
    if (prevText.current !== text) {
      setCurrentCharIndex(0);
      setDisplayedText("");
      setIsComplete(false);
      hasStarted.current = false;
      prevText.current = text;
    }
  }, [text]);

  useEffect(() => {
    // Wait for initial delay before starting
    if (!hasStarted.current && currentCharIndex === 0) {
      const initialTimeout = setTimeout(() => {
        hasStarted.current = true;
        setCurrentCharIndex(1);
      }, delay);
      return () => clearTimeout(initialTimeout);
    }

    // Typewriter effect - character by character
    if (hasStarted.current && currentCharIndex <= text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(text.substring(0, currentCharIndex));
        setCurrentCharIndex((prev) => prev + 1);
        
        if (currentCharIndex === text.length) {
          setIsComplete(true);
        }
      }, 80); // 80ms between characters for smooth gradual appearance

      return () => clearTimeout(timeout);
    }
  }, [currentCharIndex, hasStarted.current, delay, text]);

  return (
    <span className={className}>
      {displayedText}
      {!isComplete && hasStarted.current && (
        <motion.span
          className="inline-block w-0.5 bg-brand-purple ml-1 align-middle"
          style={{ height: "1em" }}
          animate={{ opacity: [1, 0, 1] }}
          transition={{ duration: 0.8, repeat: Infinity }}
        />
      )}
    </span>
  );
};

export default TypewriterText;
