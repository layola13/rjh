import { useRef, MutableRefObject } from 'react';
import cancelAnimationFrame from './cancelAnimationFrame';
import useScrollLock from './useScrollLock';
import isFirefox from './isFirefox';

interface WheelEvent {
  deltaX: number;
  deltaY: number;
  shiftKey: boolean;
  detail?: number;
  _virtualHandled?: boolean;
  preventDefault(): void;
}

type ScrollDirection = 'x' | 'y' | 'sx' | null;

type WheelHandler = (event: WheelEvent) => void;
type DetailHandler = (event: { detail?: number }) => void;

export default function useVirtualScroll(
  enabled: boolean,
  scrollX: unknown,
  scrollY: unknown,
  scrollContainer: unknown,
  scrollTarget: unknown,
  horizontal: boolean,
  onScroll: (offset: number, isHorizontal: boolean) => void
): [WheelHandler, DetailHandler] {
  const accumulatedOffset: MutableRefObject<number> = useRef(0);
  const animationFrameId: MutableRefObject<number | null> = useRef(null);
  const lastDelta: MutableRefObject<number | null> = useRef(null);
  const isDetailMatch: MutableRefObject<boolean> = useRef(false);

  const shouldLockScroll = useScrollLock(scrollX, scrollY, scrollContainer, scrollTarget);

  const currentDirection: MutableRefObject<ScrollDirection> = useRef(null);
  const directionResetTimer: MutableRefObject<number | null> = useRef(null);

  const handleWheel: WheelHandler = (event: WheelEvent): void => {
    if (!enabled) {
      return;
    }

    cancelAnimationFrame.cancel(directionResetTimer.current);
    directionResetTimer.current = cancelAnimationFrame(() => {
      currentDirection.current = null;
    }, 2);

    const { deltaX, deltaY, shiftKey } = event;
    let horizontalDelta = deltaX;
    let verticalDelta = deltaY;

    if (currentDirection.current === 'sx' || (!currentDirection.current && shiftKey && deltaY && !deltaX)) {
      horizontalDelta = deltaY;
      verticalDelta = 0;
      currentDirection.current = 'sx';
    }

    const absDeltaX = Math.abs(horizontalDelta);
    const absDeltaY = Math.abs(verticalDelta);

    if (currentDirection.current === null) {
      currentDirection.current = horizontal && absDeltaX > absDeltaY ? 'x' : 'y';
    }

    if (currentDirection.current === 'y') {
      handleVerticalScroll(event, verticalDelta);
    } else {
      handleHorizontalScroll(event, horizontalDelta);
    }
  };

  const handleVerticalScroll = (event: WheelEvent, delta: number): void => {
    cancelAnimationFrame.cancel(animationFrameId.current);

    if (shouldLockScroll(false, delta)) {
      return;
    }

    const wheelEvent = event;
    if (wheelEvent._virtualHandled) {
      return;
    }

    wheelEvent._virtualHandled = true;
    accumulatedOffset.current += delta;
    lastDelta.current = delta;

    if (!isFirefox) {
      wheelEvent.preventDefault();
    }

    animationFrameId.current = cancelAnimationFrame(() => {
      const multiplier = isDetailMatch.current ? 10 : 1;
      onScroll(accumulatedOffset.current * multiplier, false);
      accumulatedOffset.current = 0;
    });
  };

  const handleHorizontalScroll = (event: WheelEvent, delta: number): void => {
    onScroll(delta, true);

    if (!isFirefox) {
      event.preventDefault();
    }
  };

  const handleDetail: DetailHandler = (event: { detail?: number }): void => {
    if (enabled) {
      isDetailMatch.current = event.detail === lastDelta.current;
    }
  };

  return [handleWheel, handleDetail];
}