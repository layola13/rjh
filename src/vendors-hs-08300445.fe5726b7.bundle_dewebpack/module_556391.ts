import React, { useContext, useRef, useState, useEffect, useImperativeHandle, forwardRef, RefObject, CSSProperties, MouseEvent as ReactMouseEvent } from 'react';
import classNames from 'classnames';
import { getOffset } from './utils/dom';
import { useLayoutState } from './hooks/useLayoutState';
import TableContext from './context/TableContext';

interface ScrollState {
  scrollLeft: number;
  isHiddenScrollBar: boolean;
}

interface MouseDelta {
  delta: number;
  x: number;
}

interface StickyScrollProps {
  scrollBodyRef: RefObject<HTMLDivElement>;
  onScroll: (params: { scrollLeft: number }) => void;
  offsetScroll: number;
  container: Window | HTMLElement;
}

export interface StickyScrollHandle {
  setScrollLeft: (scrollLeft: number) => void;
}

function getScrollBarHeight(): number {
  const outer = document.createElement('div');
  outer.style.visibility = 'hidden';
  outer.style.overflow = 'scroll';
  document.body.appendChild(outer);

  const inner = document.createElement('div');
  outer.appendChild(inner);

  const scrollbarHeight = outer.offsetHeight - inner.offsetHeight;
  document.body.removeChild(outer);

  return scrollbarHeight;
}

function addEventListener(
  target: EventTarget,
  eventType: string,
  callback: EventListener,
  options?: boolean | AddEventListenerOptions
): { remove: () => void } {
  target.addEventListener(eventType, callback, options);
  return {
    remove: () => target.removeEventListener(eventType, callback, options)
  };
}

const StickyScroll = forwardRef<StickyScrollHandle, StickyScrollProps>((props, ref) => {
  const { scrollBodyRef, onScroll, offsetScroll, container } = props;
  const { prefixCls } = useContext(TableContext);

  const scrollWidth = scrollBodyRef.current?.scrollWidth ?? 0;
  const clientWidth = scrollBodyRef.current?.clientWidth ?? 0;
  const barWidth = scrollWidth && clientWidth * (clientWidth / scrollWidth);

  const barRef = useRef<HTMLDivElement>(null);

  const [scrollState, setScrollState] = useLayoutState<ScrollState>({
    scrollLeft: 0,
    isHiddenScrollBar: false
  });

  const mouseDeltaRef = useRef<MouseDelta>({
    delta: 0,
    x: 0
  });

  const [isDragging, setIsDragging] = useState(false);

  const handleMouseUp = (): void => {
    setIsDragging(false);
  };

  const handleMouseMove = (event: MouseEvent): void => {
    const buttons = event.buttons ?? (window.event as MouseEvent)?.buttons;

    if (isDragging && buttons !== 0) {
      let newScrollLeft = mouseDeltaRef.current.x + event.pageX - mouseDeltaRef.current.x - mouseDeltaRef.current.delta;

      if (newScrollLeft <= 0) {
        newScrollLeft = 0;
      }

      if (newScrollLeft + barWidth >= clientWidth) {
        newScrollLeft = clientWidth - barWidth;
      }

      onScroll({
        scrollLeft: (newScrollLeft / clientWidth) * (scrollWidth + 2)
      });

      mouseDeltaRef.current.x = event.pageX;
    } else if (isDragging) {
      setIsDragging(false);
    }
  };

  const checkScrollBarVisibility = (): void => {
    const scrollBodyElement = scrollBodyRef.current;
    if (!scrollBodyElement) return;

    const offsetTop = getOffset(scrollBodyElement).top;
    const offsetBottom = offsetTop + scrollBodyElement.offsetHeight;

    const containerBottom = container === window
      ? document.documentElement.scrollTop + window.innerHeight
      : getOffset(container as HTMLElement).top + (container as HTMLElement).clientHeight;

    const scrollBarHeight = getScrollBarHeight();

    if (offsetBottom - scrollBarHeight <= containerBottom || offsetTop >= containerBottom - offsetScroll) {
      setScrollState(prev => ({
        ...prev,
        isHiddenScrollBar: true
      }));
    } else {
      setScrollState(prev => ({
        ...prev,
        isHiddenScrollBar: false
      }));
    }
  };

  const setScrollLeft = (scrollLeft: number): void => {
    setScrollState(prev => ({
      ...prev,
      scrollLeft: (scrollLeft / scrollWidth) * clientWidth || 0
    }));
  };

  useImperativeHandle(ref, () => ({
    setScrollLeft
  }));

  useEffect(() => {
    const mouseUpListener = addEventListener(document.body, 'mouseup', handleMouseUp, false);
    const mouseMoveListener = addEventListener(document.body, 'mousemove', handleMouseMove as EventListener, false);

    checkScrollBarVisibility();

    return () => {
      mouseUpListener.remove();
      mouseMoveListener.remove();
    };
  }, [barWidth, isDragging]);

  useEffect(() => {
    const scrollListener = addEventListener(container as EventTarget, 'scroll', checkScrollBarVisibility, false);
    const resizeListener = addEventListener(window, 'resize', checkScrollBarVisibility, false);

    return () => {
      scrollListener.remove();
      resizeListener.remove();
    };
  }, [container]);

  useEffect(() => {
    if (!scrollState.isHiddenScrollBar) {
      setScrollState(prev => ({
        ...prev,
        scrollLeft: (scrollBodyRef.current!.scrollLeft / scrollBodyRef.current!.scrollWidth) * scrollBodyRef.current!.clientWidth
      }));
    }
  }, [scrollState.isHiddenScrollBar]);

  if (scrollWidth <= clientWidth || !barWidth || scrollState.isHiddenScrollBar) {
    return null;
  }

  const handleMouseDown = (event: ReactMouseEvent<HTMLDivElement>): void => {
    event.persist();
    mouseDeltaRef.current.delta = event.pageX - scrollState.scrollLeft;
    mouseDeltaRef.current.x = 0;
    setIsDragging(true);
    event.preventDefault();
  };

  const wrapperStyle: CSSProperties = {
    height: getScrollBarHeight(),
    width: clientWidth,
    bottom: offsetScroll
  };

  const barStyle: CSSProperties = {
    width: `${barWidth}px`,
    transform: `translate3d(${scrollState.scrollLeft}px, 0, 0)`
  };

  return (
    <div style={wrapperStyle} className={`${prefixCls}-sticky-scroll`}>
      <div
        onMouseDown={handleMouseDown}
        ref={barRef}
        className={classNames(
          `${prefixCls}-sticky-scroll-bar`,
          {
            [`${prefixCls}-sticky-scroll-bar-active`]: isDragging
          }
        )}
        style={barStyle}
      />
    </div>
  );
});

export default StickyScroll;