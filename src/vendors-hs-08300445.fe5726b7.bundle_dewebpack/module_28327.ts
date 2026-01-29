import { useState, useEffect, useRef } from 'react';

interface Position {
  x: number;
  y: number;
}

type ScrollDirection = 'x' | 'y' | undefined;

type OnScrollCallback = (deltaX: number, deltaY: number) => boolean | void;

interface TouchHandlers {
  onTouchStart: (event: TouchEvent) => void;
  onTouchMove: (event: TouchEvent) => void;
  onTouchEnd: () => void;
  onWheel: (event: WheelEvent) => void;
}

const MIN_VELOCITY_THRESHOLD = 0.1;
const STOP_THRESHOLD = 0.01;
const INTERVAL_MS = 20;
const FRICTION_FACTOR = Math.pow(0.995, INTERVAL_MS);

export default function useGestureScroll(
  elementRef: React.RefObject<HTMLElement>,
  onScroll: OnScrollCallback
): void {
  const [startPosition, setStartPosition] = useState<Position | undefined>();
  const [lastMoveTime, setLastMoveTime] = useState<number>(0);
  const [timeDelta, setTimeDelta] = useState<number>(0);
  const [lastDelta, setLastDelta] = useState<Position | undefined>();
  
  const inertiaIntervalRef = useRef<number>();
  const wheelDirectionRef = useRef<ScrollDirection>();
  const handlersRef = useRef<TouchHandlers | null>(null);

  handlersRef.current = {
    onTouchStart: (event: TouchEvent) => {
      const touch = event.touches[0];
      const { screenX, screenY } = touch;
      
      setStartPosition({ x: screenX, y: screenY });
      window.clearInterval(inertiaIntervalRef.current);
    },

    onTouchMove: (event: TouchEvent) => {
      if (!startPosition) {
        return;
      }

      event.preventDefault();
      
      const touch = event.touches[0];
      const { screenX, screenY } = touch;
      
      setStartPosition({ x: screenX, y: screenY });
      
      const deltaX = screenX - startPosition.x;
      const deltaY = screenY - startPosition.y;
      
      onScroll(deltaX, deltaY);
      
      const currentTime = Date.now();
      setLastMoveTime(currentTime);
      setTimeDelta(currentTime - lastMoveTime);
      setLastDelta({ x: deltaX, y: deltaY });
    },

    onTouchEnd: () => {
      if (!startPosition) {
        return;
      }

      setStartPosition(undefined);
      setLastDelta(undefined);

      if (!lastDelta || timeDelta === 0) {
        return;
      }

      const velocityX = lastDelta.x / timeDelta;
      const velocityY = lastDelta.y / timeDelta;
      const absVelocityX = Math.abs(velocityX);
      const absVelocityY = Math.abs(velocityY);

      if (Math.max(absVelocityX, absVelocityY) < MIN_VELOCITY_THRESHOLD) {
        return;
      }

      let inertiaVelocityX = velocityX;
      let inertiaVelocityY = velocityY;

      inertiaIntervalRef.current = window.setInterval(() => {
        if (Math.abs(inertiaVelocityX) < STOP_THRESHOLD && Math.abs(inertiaVelocityY) < STOP_THRESHOLD) {
          window.clearInterval(inertiaIntervalRef.current);
          return;
        }

        inertiaVelocityX *= FRICTION_FACTOR;
        inertiaVelocityY *= FRICTION_FACTOR;
        
        onScroll(inertiaVelocityX * INTERVAL_MS, inertiaVelocityY * INTERVAL_MS);
      }, INTERVAL_MS);
    },

    onWheel: (event: WheelEvent) => {
      const { deltaX, deltaY } = event;
      let scrollDelta = 0;
      
      const absDeltaX = Math.abs(deltaX);
      const absDeltaY = Math.abs(deltaY);

      if (absDeltaX === absDeltaY) {
        scrollDelta = wheelDirectionRef.current === 'x' ? deltaX : deltaY;
      } else if (absDeltaX > absDeltaY) {
        scrollDelta = deltaX;
        wheelDirectionRef.current = 'x';
      } else {
        scrollDelta = deltaY;
        wheelDirectionRef.current = 'y';
      }

      if (onScroll(-scrollDelta, -scrollDelta)) {
        event.preventDefault();
      }
    }
  };

  useEffect(() => {
    const element = elementRef.current;
    if (!element) {
      return;
    }

    function handleTouchMove(event: TouchEvent): void {
      handlersRef.current?.onTouchMove(event);
    }

    function handleTouchEnd(event: TouchEvent): void {
      handlersRef.current?.onTouchEnd();
    }

    function handleTouchStart(event: TouchEvent): void {
      handlersRef.current?.onTouchStart(event);
    }

    function handleWheel(event: WheelEvent): void {
      handlersRef.current?.onWheel(event);
    }

    document.addEventListener('touchmove', handleTouchMove, { passive: false });
    document.addEventListener('touchend', handleTouchEnd, { passive: false });
    element.addEventListener('touchstart', handleTouchStart, { passive: false });
    element.addEventListener('wheel', handleWheel);

    return () => {
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, []);
}