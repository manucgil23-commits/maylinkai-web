import { useEffect, useRef, useCallback } from "react";

interface UseTouchGesturesProps {
  onSwipeLeft: () => void;
  onSwipeRight: () => void;
  isEnabled?: boolean;
  minSwipeDistance?: number;
}

export const useTouchGestures = ({
  onSwipeLeft,
  onSwipeRight,
  isEnabled = true,
  minSwipeDistance = 50,
}: UseTouchGesturesProps) => {
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const handleTouchStart = useCallback((e: TouchEvent) => {
    if (!isEnabled) return;
    touchStartX.current = e.touches[0].clientX;
  }, [isEnabled]);

  const handleTouchEnd = useCallback((e: TouchEvent) => {
    if (!isEnabled) return;
    touchEndX.current = e.changedTouches[0].clientX;
    
    const distance = touchStartX.current - touchEndX.current;
    const absDistance = Math.abs(distance);
    
    if (absDistance > minSwipeDistance) {
      if (distance > 0) {
        onSwipeLeft();
      } else {
        onSwipeRight();
      }
    }
  }, [isEnabled, minSwipeDistance, onSwipeLeft, onSwipeRight]);

  useEffect(() => {
    document.addEventListener("touchstart", handleTouchStart);
    document.addEventListener("touchend", handleTouchEnd);
    
    return () => {
      document.removeEventListener("touchstart", handleTouchStart);
      document.removeEventListener("touchend", handleTouchEnd);
    };
  }, [handleTouchStart, handleTouchEnd]);
};
