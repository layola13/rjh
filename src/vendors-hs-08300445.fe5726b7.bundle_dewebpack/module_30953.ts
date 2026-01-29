import { useEffect, RefObject } from 'react';
import raf from 'raf';

interface MouseEventWithVirtualHandled extends MouseEvent {
  _virtualHandled?: boolean;
}

interface TouchOrMouseEvent extends MouseEvent {
  touches?: Touch[];
}

const SCROLL_ACCELERATION_BASE = 0.5;

function calculateScrollSpeed(distance: number): number {
  return Math.floor(Math.pow(distance, SCROLL_ACCELERATION_BASE));
}

export function getPageXY(event: TouchOrMouseEvent, isHorizontal: boolean): number {
  const touchOrMouse = 'touches' in event ? event.touches[0] : event;
  const pageCoordinate = touchOrMouse[isHorizontal ? 'pageX' : 'pageY'];
  const scrollOffset = window[isHorizontal ? 'scrollX' : 'scrollY'];
  return pageCoordinate - scrollOffset;
}

export default function useAutoScroll(
  enabled: boolean,
  containerRef: RefObject<HTMLElement>,
  onScroll: (speed: number) => void
): void {
  useEffect(() => {
    const container = containerRef.current;
    
    if (!enabled || !container) {
      return;
    }

    let rafId: number;
    let scrollSpeed: number;
    let isDragging = false;

    const cancelAnimation = (): void => {
      raf.cancel(rafId);
    };

    const startScrollAnimation = function animate(): void {
      cancelAnimation();
      rafId = raf(() => {
        onScroll(scrollSpeed);
        animate();
      });
    };

    const handleMouseUp = (): void => {
      isDragging = false;
      cancelAnimation();
    };

    const handleMouseDown = (event: MouseEvent): void => {
      if (!event.target || (event.target as HTMLElement).draggable || event.button !== 0) {
        return;
      }

      const mouseEvent = event as MouseEventWithVirtualHandled;
      if (mouseEvent._virtualHandled) {
        return;
      }

      mouseEvent._virtualHandled = true;
      isDragging = true;
    };

    const handleMouseMove = (event: MouseEvent): void => {
      if (!isDragging) {
        return;
      }

      const currentY = getPageXY(event, false);
      const rect = container.getBoundingClientRect();
      const topBoundary = rect.top;
      const bottomBoundary = rect.bottom;

      if (currentY <= topBoundary) {
        scrollSpeed = -calculateScrollSpeed(topBoundary - currentY);
        startScrollAnimation();
      } else if (currentY >= bottomBoundary) {
        scrollSpeed = calculateScrollSpeed(currentY - bottomBoundary);
        startScrollAnimation();
      } else {
        cancelAnimation();
      }
    };

    container.addEventListener('mousedown', handleMouseDown);
    container.ownerDocument.addEventListener('mouseup', handleMouseUp);
    container.ownerDocument.addEventListener('mousemove', handleMouseMove);
    container.ownerDocument.addEventListener('dragend', handleMouseUp);

    return () => {
      container.removeEventListener('mousedown', handleMouseDown);
      container.ownerDocument.removeEventListener('mouseup', handleMouseUp);
      container.ownerDocument.removeEventListener('mousemove', handleMouseMove);
      container.ownerDocument.removeEventListener('dragend', handleMouseUp);
      cancelAnimation();
    };
  }, [enabled, containerRef, onScroll]);
}