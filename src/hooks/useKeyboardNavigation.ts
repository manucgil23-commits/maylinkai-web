import { useEffect, useCallback } from "react";

interface UseKeyboardNavigationProps {
  onNext: () => void;
  onPrev: () => void;
  isEnabled?: boolean;
}

export const useKeyboardNavigation = ({
  onNext,
  onPrev,
  isEnabled = true,
}: UseKeyboardNavigationProps) => {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!isEnabled) return;
      
      if (e.key === "ArrowRight") {
        e.preventDefault();
        onNext();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        onPrev();
      }
    },
    [onNext, onPrev, isEnabled]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);
};
