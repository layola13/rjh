import React, { 
  forwardRef, 
  useState, 
  useRef, 
  useEffect, 
  useMemo, 
  useImperativeHandle,
  CSSProperties,
  MouseEvent,
  TouchEvent
} from 'react';
import classNames from 'classnames';
import raf from 'raf';

interface ScrollBarProps {
  prefixCls: string;
  rtl?: boolean;
  scrollOffset: number;
  scrollRange: number;
  onStartMove: () => void;
  onStopMove: () => void;
  onScroll: (offset: number, horizontal: boolean) => void;
  horizontal: boolean;
  spinSize: number;
  containerSize: number;
  style?: CSSProperties;
  thumbStyle?: CSSProperties;
  showScrollBar?: boolean | 'always' | 'hover';
}

interface ScrollBarRef {
  delayHidden: () => void;
}

interface DragState {
  top: number;
  dragging: boolean;
  pageY: number | null;
  startTop: number | null;
}

const AUTO_HIDE_DELAY = 3000;

function getPageXY(event: MouseEvent | TouchEvent, horizontal: boolean): number {
  const isTouchEvent = 'touches' in event;
  const pageX = isTouchEvent ? event.touches[0]?.pageX : event.pageX;
  const pageY = isTouchEvent ? event.touches[0]?.pageY : event.pageY;
  return horizontal ? pageX : pageY;
}

const ScrollBar = forwardRef<ScrollBarRef, ScrollBarProps>((props, ref) => {
  const {
    prefixCls,
    rtl = false,
    scrollOffset,
    scrollRange,
    onStartMove,
    onStopMove,
    onScroll,
    horizontal,
    spinSize,
    containerSize,
    style,
    thumbStyle,
    showScrollBar,
  } = props;

  const [dragging, setDragging] = useState(false);
  const [pageY, setPageY] = useState<number | null>(null);
  const [startTop, setStartTop] = useState<number | null>(null);
  const [visible, setVisible] = useState(showScrollBar);

  const isLtr = !rtl;
  const scrollBarRef = useRef<HTMLDivElement>(null);
  const thumbRef = useRef<HTMLDivElement>(null);
  const hideTimerRef = useRef<number>();
  const rafIdRef = useRef<number>();
  const scrollRangeRef = useRef<number>();
  const availableScrollRef = useRef<number>();

  const scrollableRange = scrollRange - containerSize || 0;
  const availableScroll = containerSize - spinSize || 0;

  const thumbTop = useMemo(() => {
    if (scrollOffset === 0 || scrollableRange === 0) {
      return 0;
    }
    return (scrollOffset / scrollableRange) * availableScroll;
  }, [scrollOffset, scrollableRange, availableScroll]);

  const dragStateRef = useRef<DragState>({
    top: thumbTop,
    dragging,
    pageY,
    startTop,
  });

  dragStateRef.current = {
    top: thumbTop,
    dragging,
    pageY,
    startTop,
  };

  scrollRangeRef.current = scrollableRange;
  availableScrollRef.current = availableScroll;

  const delayHidden = (): void => {
    if (showScrollBar === true || showScrollBar === false) {
      return;
    }

    clearTimeout(hideTimerRef.current);
    setVisible(true);
    hideTimerRef.current = window.setTimeout(() => {
      setVisible(false);
    }, AUTO_HIDE_DELAY);
  };

  const handleThumbMouseDown = (event: MouseEvent | TouchEvent): void => {
    setDragging(true);
    setPageY(getPageXY(event, horizontal));
    setStartTop(dragStateRef.current.top);
    onStartMove();
    event.stopPropagation();
    event.preventDefault();
  };

  useEffect(() => {
    const preventDefaultTouch = (event: Event): void => {
      event.preventDefault();
    };

    const scrollBar = scrollBarRef.current;
    const thumb = thumbRef.current;

    if (scrollBar && thumb) {
      scrollBar.addEventListener('touchstart', preventDefaultTouch, { passive: false });
      thumb.addEventListener('touchstart', handleThumbMouseDown as EventListener, { passive: false });

      return () => {
        scrollBar.removeEventListener('touchstart', preventDefaultTouch);
        thumb.removeEventListener('touchstart', handleThumbMouseDown as EventListener);
      };
    }
  }, []);

  useEffect(() => {
    if (!dragging) {
      return;
    }

    const handleMouseMove = (event: MouseEvent | TouchEvent): void => {
      const { dragging: isDragging, pageY: startPageY, startTop: initialTop } = dragStateRef.current;

      raf.cancel(rafIdRef.current!);

      const scrollBarRect = scrollBarRef.current!.getBoundingClientRect();
      const scrollBarSize = horizontal ? scrollBarRect.width : scrollBarRect.height;
      const scale = containerSize / scrollBarSize;

      if (isDragging && startPageY !== null && initialTop !== null) {
        const currentPageY = getPageXY(event, horizontal);
        const delta = (currentPageY - startPageY) * scale;
        let newTop = initialTop;

        if (!isLtr && horizontal) {
          newTop -= delta;
        } else {
          newTop += delta;
        }

        const maxScrollRange = scrollRangeRef.current!;
        const maxAvailableScroll = availableScrollRef.current!;
        const ratio = maxAvailableScroll ? newTop / maxAvailableScroll : 0;
        let newScrollOffset = Math.ceil(ratio * maxScrollRange);

        newScrollOffset = Math.max(newScrollOffset, 0);
        newScrollOffset = Math.min(newScrollOffset, maxScrollRange);

        rafIdRef.current = raf(() => {
          onScroll(newScrollOffset, horizontal);
        });
      }
    };

    const handleMouseUp = (): void => {
      setDragging(false);
      onStopMove();
    };

    window.addEventListener('mousemove', handleMouseMove as EventListener, { passive: true });
    window.addEventListener('touchmove', handleMouseMove as EventListener, { passive: true });
    window.addEventListener('mouseup', handleMouseUp, { passive: true });
    window.addEventListener('touchend', handleMouseUp, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove as EventListener);
      window.removeEventListener('touchmove', handleMouseMove as EventListener);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchend', handleMouseUp);
      raf.cancel(rafIdRef.current!);
    };
  }, [dragging, horizontal, isLtr, containerSize, onScroll, onStopMove]);

  useEffect(() => {
    delayHidden();
    return () => {
      clearTimeout(hideTimerRef.current);
    };
  }, [scrollOffset]);

  useImperativeHandle(ref, () => ({
    delayHidden,
  }));

  const scrollBarClassName = `${prefixCls}-scrollbar`;

  const scrollBarStyle: CSSProperties = {
    position: 'absolute',
    visibility: visible ? undefined : 'hidden',
  };

  const thumbBaseStyle: CSSProperties = {
    position: 'absolute',
    borderRadius: 99,
    background: 'var(--rc-virtual-list-scrollbar-bg, rgba(0, 0, 0, 0.5))',
    cursor: 'pointer',
    userSelect: 'none',
  };

  if (horizontal) {
    Object.assign(scrollBarStyle, {
      height: 8,
      left: 0,
      right: 0,
      bottom: 0,
    });
    Object.assign(thumbBaseStyle, {
      height: '100%',
      width: spinSize,
      [isLtr ? 'left' : 'right']: thumbTop,
    });
  } else {
    Object.assign(scrollBarStyle, {
      width: 8,
      top: 0,
      bottom: 0,
      [isLtr ? 'right' : 'left']: 0,
    });
    Object.assign(thumbBaseStyle, {
      width: '100%',
      height: spinSize,
      top: thumbTop,
    });
  }

  const handleScrollBarMouseDown = (event: MouseEvent): void => {
    event.stopPropagation();
    event.preventDefault();
  };

  return (
    <div
      ref={scrollBarRef}
      className={classNames(scrollBarClassName, {
        [`${scrollBarClassName}-horizontal`]: horizontal,
        [`${scrollBarClassName}-vertical`]: !horizontal,
        [`${scrollBarClassName}-visible`]: visible,
      })}
      style={{ ...scrollBarStyle, ...style }}
      onMouseDown={handleScrollBarMouseDown}
      onMouseMove={delayHidden}
    >
      <div
        ref={thumbRef}
        className={classNames(`${scrollBarClassName}-thumb`, {
          [`${scrollBarClassName}-thumb-moving`]: dragging,
        })}
        style={{ ...thumbBaseStyle, ...thumbStyle }}
        onMouseDown={handleThumbMouseDown}
      />
    </div>
  );
});

export default ScrollBar;