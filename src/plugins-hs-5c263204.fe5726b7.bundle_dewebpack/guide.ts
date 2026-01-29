import React, { useMemo, useEffect, useState } from 'react';
import { Common } from './Common';
import { Popup } from './Popup';

interface TargetDiff {
  left: number;
  top: number;
  right: number;
  bottom: number;
}

interface Rect {
  left: number;
  top: number;
  width: number;
  height: number;
}

interface PopupInfo {
  mediaType: string;
  src: string;
  title: string;
  desc: string;
  moreUrl: string;
}

interface Tip {
  target: string | HTMLElement;
  targetDiff?: TargetDiff;
  listenTargetChange?: boolean;
  type?: 'popup' | string;
  popupInfo?: PopupInfo;
  popupPlacement?: string;
}

interface GuideProps {
  tip: Tip;
  stepNumber: number;
  stepTotal: number;
  onSkipAll: () => void;
  onNext: () => void;
  onFinish: () => void;
  onLearnMore: () => void;
}

function throttle<T extends (...args: any[]) => void>(
  func: T,
  delay: number = 2000
): (...args: Parameters<T>) => void {
  let timeoutId: NodeJS.Timeout | undefined;
  let lastCallTime: number | undefined;

  return function (this: any, ...args: Parameters<T>): void {
    const now = Date.now();

    if (lastCallTime === undefined) {
      func.apply(this, args);
      lastCallTime = now;
    } else {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }

      const timeSinceLastCall = now - lastCallTime;
      const remainingDelay = Math.max(delay - timeSinceLastCall, 0);

      timeoutId = setTimeout(() => {
        if (Date.now() - lastCallTime! >= delay) {
          func.apply(this, args);
          lastCallTime = Date.now();
        }
      }, remainingDelay);
    }
  };
}

function observeResize(
  element: HTMLElement,
  callback: (rect: DOMRectReadOnly) => void
): () => void {
  const observer = new ResizeObserver((entries) => {
    for (const entry of entries) {
      if (entry.contentRect) {
        callback(entry.contentRect);
      }
    }
  });

  observer.observe(element);

  return () => {
    observer.unobserve(element);
  };
}

export function Guide(props: GuideProps): React.ReactElement {
  const {
    tip,
    stepNumber,
    stepTotal,
    onSkipAll,
    onNext,
    onFinish,
    onLearnMore,
  } = props;

  const targetElement = useMemo(() => {
    if (typeof tip.target === 'string') {
      return document.querySelector<HTMLElement>(tip.target);
    }
    if (tip.target instanceof HTMLElement) {
      return tip.target;
    }
    return null;
  }, [tip.target]);

  function getTargetRect(): Rect {
    if (targetElement) {
      const domRect = targetElement.getBoundingClientRect();
      return {
        left: domRect.left,
        top: domRect.top,
        width: domRect.width,
        height: domRect.height,
      };
    }
    return tip.target as unknown as Rect;
  }

  const [rect, setRect] = useState<Rect>(getTargetRect);

  useEffect(() => {
    if (tip.listenTargetChange && targetElement) {
      const cleanup = observeResize(targetElement, () => {
        setRect(getTargetRect());
      });
      return cleanup;
    }
  }, [targetElement, tip.listenTargetChange]);

  useEffect(() => {
    const handleResize = throttle(() => {
      setRect(getTargetRect());
    }, 500);

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [targetElement, tip.target]);

  useEffect(() => {
    setRect(getTargetRect());
  }, [targetElement, tip.target]);

  const adjustedRect = useMemo(() => {
    if (tip.targetDiff) {
      return {
        left: rect.left + tip.targetDiff.left,
        top: rect.top + tip.targetDiff.top,
        width: rect.width - tip.targetDiff.left + tip.targetDiff.right,
        height: rect.height - tip.targetDiff.top + tip.targetDiff.bottom,
      };
    }
    return rect;
  }, [tip.targetDiff, rect]);

  const popupElement = useMemo(() => {
    if ((tip.type || 'popup') !== 'popup') {
      return null;
    }

    const popupInfo = tip.popupInfo!;

    return React.createElement(Popup, {
      mediaType: popupInfo.mediaType,
      src: popupInfo.src,
      title: popupInfo.title,
      desc: popupInfo.desc,
      moreUrl: popupInfo.moreUrl,
      stepNumber,
      stepTotal,
      onSkipAll,
      onNext,
      onFinish,
      onLearnMore,
    });
  }, [tip.type, tip.popupInfo, stepNumber, stepTotal, onSkipAll, onNext, onFinish, onLearnMore]);

  return React.createElement(Common, {
    tip,
    rect: adjustedRect,
    popupPlacement: tip.popupPlacement,
    popup: popupElement,
  });
}