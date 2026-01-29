import { useRef } from 'react';

interface ScrollBoundaries {
  top: boolean;
  bottom: boolean;
  left: boolean;
  right: boolean;
}

type ScrollChecker = (isHorizontal: boolean, delta: number, immediate?: boolean) => boolean;

export default function useScrollBoundaryDetector(
  top: boolean,
  bottom: boolean,
  left: boolean,
  right: boolean
): ScrollChecker {
  const isThrottled = useRef<boolean>(false);
  const throttleTimer = useRef<NodeJS.Timeout | null>(null);
  const boundaries = useRef<ScrollBoundaries>({
    top,
    bottom,
    left,
    right
  });

  boundaries.current.top = top;
  boundaries.current.bottom = bottom;
  boundaries.current.left = left;
  boundaries.current.right = right;

  return function checkScrollBoundary(
    isHorizontal: boolean,
    delta: number,
    immediate: boolean = false
  ): boolean {
    const hasReachedBoundary = isHorizontal
      ? (delta < 0 && boundaries.current.left) || (delta > 0 && boundaries.current.right)
      : (delta < 0 && boundaries.current.top) || (delta > 0 && boundaries.current.bottom);

    if (immediate && hasReachedBoundary) {
      if (throttleTimer.current !== null) {
        clearTimeout(throttleTimer.current);
      }
      isThrottled.current = false;
    } else if (hasReachedBoundary && !isThrottled.current) {
      // Boundary reached but not throttled - do nothing
    } else {
      if (throttleTimer.current !== null) {
        clearTimeout(throttleTimer.current);
      }
      isThrottled.current = true;
      throttleTimer.current = setTimeout(() => {
        isThrottled.current = false;
      }, 50);
    }

    return !isThrottled.current && hasReachedBoundary;
  };
}