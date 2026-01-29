import { useRef, useEffect, MutableRefObject } from 'react';

const DECAY_FACTOR = 14 / 15;

type SwipeCallback = (
  isHorizontal: boolean,
  delta: number,
  isInertia: boolean,
  event?: TouchEvent
) => boolean | void;

export default function useSwipeGesture(
  enabled: boolean,
  elementRef: MutableRefObject<HTMLElement | null>,
  onSwipe: SwipeCallback
): void {
  const isSwiping = useRef<boolean>(false);
  const startX = useRef<number>(0);
  const startY = useRef<number>(0);
  const targetElement = useRef<HTMLElement | null>(null);
  const inertiaTimer = useRef<number | null>(null);

  const handleTouchMove = (event: TouchEvent): void => {
    if (!isSwiping.current) return;

    const currentX = Math.ceil(event.touches[0].pageX);
    const currentY = Math.ceil(event.touches[0].pageY);
    const deltaX = startX.current - currentX;
    const deltaY = startY.current - currentY;
    const isHorizontal = Math.abs(deltaX) > Math.abs(deltaY);

    if (isHorizontal) {
      startX.current = currentX;
    } else {
      startY.current = currentY;
    }

    const delta = isHorizontal ? deltaX : deltaY;
    const shouldPreventDefault = onSwipe(isHorizontal, delta, false, event);

    if (shouldPreventDefault) {
      event.preventDefault();
    }

    clearInterval(inertiaTimer.current ?? undefined);

    if (shouldPreventDefault) {
      let inertiaDelta = delta;
      inertiaTimer.current = window.setInterval(() => {
        inertiaDelta *= DECAY_FACTOR;
        const roundedDelta = Math.floor(inertiaDelta);
        const shouldContinue = onSwipe(isHorizontal, roundedDelta, true);

        if (!shouldContinue || Math.abs(roundedDelta) <= 0.1) {
          clearInterval(inertiaTimer.current ?? undefined);
        }
      }, 16);
    }
  };

  const handleTouchEnd = (): void => {
    isSwiping.current = false;
    removeListeners();
  };

  const handleTouchStart = (event: TouchEvent): void => {
    removeListeners();

    if (event.touches.length !== 1 || isSwiping.current) return;

    isSwiping.current = true;
    startX.current = Math.ceil(event.touches[0].pageX);
    startY.current = Math.ceil(event.touches[0].pageY);
    targetElement.current = event.target as HTMLElement;

    targetElement.current.addEventListener('touchmove', handleTouchMove, {
      passive: false
    });

    targetElement.current.addEventListener('touchend', handleTouchEnd, {
      passive: true
    });
  };

  const removeListeners = (): void => {
    if (targetElement.current) {
      targetElement.current.removeEventListener('touchmove', handleTouchMove);
      targetElement.current.removeEventListener('touchend', handleTouchEnd);
    }
  };

  useEffect(() => {
    if (enabled && elementRef.current) {
      elementRef.current.addEventListener('touchstart', handleTouchStart, {
        passive: true
      });
    }

    return () => {
      elementRef.current?.removeEventListener('touchstart', handleTouchStart);
      removeListeners();
      clearInterval(inertiaTimer.current ?? undefined);
    };
  }, [enabled]);
}