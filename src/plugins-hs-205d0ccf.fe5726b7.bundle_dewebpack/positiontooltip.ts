import React, { useState, useRef, useMemo, useEffect } from 'react';

interface TargetRect {
  x: number;
  y: number;
  width: number;
  height: number;
}

interface TooltipPosition {
  left: number;
  top: number;
  arrowLeft: number;
}

interface TooltipStyles {
  wrapperStyle: {
    left: number;
    top: number;
    transformOrigin: string;
    opacity: number;
    transitionDuration: string;
  };
  arrowStyle: {
    left: number;
    width: number;
    height: number;
  };
}

interface PositionTooltipProps {
  targetRect?: TargetRect;
  children: React.ReactNode;
  className?: string;
  arrowClassName?: string;
  hideArrow?: boolean;
  visible: boolean;
  onClosed?: () => void;
  arrowWidth?: number;
  transitionDuration?: number;
}

export const PositionTooltip: React.FC<PositionTooltipProps> = ({
  targetRect,
  children,
  className = '',
  arrowClassName = '',
  hideArrow = false,
  visible,
  onClosed,
  arrowWidth = 22,
  transitionDuration = 400,
}) => {
  const [position, setPosition] = useState<TooltipPosition>({
    left: 0,
    top: 0,
    arrowLeft: 0,
  });

  const [isVisible, setIsVisible] = useState(false);
  const tooltipRef = useRef<HTMLDivElement>(null);

  const styles = useMemo((): Partial<TooltipStyles> => {
    if (!tooltipRef.current) {
      return {};
    }

    return {
      wrapperStyle: {
        left: position.left,
        top: isVisible
          ? position.top
          : (targetRect?.y ?? 0) + (targetRect?.height ?? 0) / 2,
        transformOrigin: `${position.arrowLeft + arrowWidth / 2}px 0%`,
        opacity: isVisible ? 1 : 0,
        transitionDuration: `${transitionDuration}ms`,
      },
      arrowStyle: {
        left: position.arrowLeft,
        width: arrowWidth / Math.sqrt(2),
        height: arrowWidth / Math.sqrt(2),
      },
    };
  }, [position, isVisible, targetRect, arrowWidth, transitionDuration]);

  useEffect(() => {
    const calculatePosition = (): void => {
      if (!tooltipRef.current) {
        return;
      }

      const tooltipWidth = tooltipRef.current.clientWidth;
      const bodyWidth = document.body.clientWidth;

      if (!targetRect) {
        setPosition({
          left: bodyWidth - tooltipWidth - 10,
          top: 48,
          arrowLeft: 0,
        });
        return;
      }

      let left = targetRect.x + targetRect.width / 2 - tooltipWidth / 2;

      if (left < 0) {
        left = 0;
      }

      if (left + tooltipWidth > bodyWidth - 10) {
        left = bodyWidth - 10 - tooltipWidth;
      }

      const top = targetRect.y + targetRect.height + 6;
      const arrowLeft = targetRect.x + targetRect.width / 2 - left - arrowWidth / 2 + 2;

      setPosition({
        left,
        top,
        arrowLeft,
      });
    };

    calculatePosition();

    setTimeout(() => {
      setIsVisible(visible);
    }, 10);
  }, [targetRect, visible, arrowWidth]);

  useEffect(() => {
    if (!visible) {
      const handleTransitionEnd = (): void => {
        tooltipRef.current?.removeEventListener('transitionend', handleTransitionEnd);
        onClosed?.();
      };

      setIsVisible(false);

      setTimeout(() => {
        handleTransitionEnd();
      }, transitionDuration + 100);
    }
  }, [visible, transitionDuration, onClosed]);

  return (
    <div
      className={`position-tooltip-wrapper ${className} ${isVisible ? 'show' : ''}`}
      ref={tooltipRef}
      style={styles.wrapperStyle}
    >
      {!hideArrow && (
        <div
          className={`position-tooltip-arrow ${arrowClassName}`}
          style={styles.arrowStyle}
        />
      )}
      {children}
    </div>
  );
};