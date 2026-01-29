import React, { useRef, useState, useEffect, useContext } from 'react';
import ResizeObserver from 'resize-observer-polyfill';
import classNames from 'classnames';
import raf from 'raf';

// Types
interface TabItem {
  key: string;
  closable?: boolean;
  [key: string]: any;
}

interface ExtraContent {
  left?: React.ReactNode;
  right?: React.ReactNode;
}

interface Locale {
  removeAriaLabel?: string;
}

interface Animated {
  inkBar?: boolean;
}

interface ScrollEvent {
  direction: 'left' | 'right' | 'top' | 'bottom';
}

interface TabPosition {
  width: number;
  height: number;
  left: number;
  right: number;
  top: number;
}

interface TabBarProps {
  className?: string;
  style?: React.CSSProperties;
  id?: string;
  animated?: Animated;
  activeKey?: string;
  rtl?: boolean;
  extra?: ExtraContent | React.ReactNode;
  editable?: boolean;
  locale?: Locale;
  tabPosition?: 'top' | 'bottom' | 'left' | 'right';
  tabBarGutter?: number;
  children?: (node: React.ReactElement) => React.ReactElement;
  onTabClick?: (key: string, event: React.MouseEvent) => void;
  onTabScroll?: (event: ScrollEvent) => void;
  position?: string;
  prefixCls?: string;
  tabs?: TabItem[];
}

interface TabBarContext {
  prefixCls: string;
  tabs: TabItem[];
}

// Extra content component
const ExtraContent: React.FC<{ position: string; prefixCls: string; extra?: ExtraContent | React.ReactNode }> = ({
  position,
  prefixCls,
  extra
}) => {
  if (!extra) return null;

  let content: React.ReactNode = null;
  const extraObj = extra as ExtraContent;

  if (position === 'right') {
    content = extraObj.right || (!extraObj.left && extra) || null;
  }

  if (position === 'left') {
    content = extraObj.left || null;
  }

  return content ? (
    <div className={`${prefixCls}-extra-content`}>
      {content}
    </div>
  ) : null;
};

// Custom hooks
function useRafState<T>(initialState: T): [T, React.Dispatch<React.SetStateAction<T>>] {
  const [state, setState] = useState<T>(initialState);
  const rafIdRef = useRef<number>();

  const setRafState = (value: React.SetStateAction<T>) => {
    if (rafIdRef.current) {
      raf.cancel(rafIdRef.current);
    }
    rafIdRef.current = raf(() => {
      setState(value);
    });
  };

  return [state, setRafState];
}

function useOffsetScroll(
  initialValue: number,
  onChange?: (current: number, previous: number) => void
): [number, React.Dispatch<React.SetStateAction<number>>] {
  const [offset, setOffset] = useState(initialValue);
  const previousRef = useRef(initialValue);

  const setOffsetWithCallback = (value: React.SetStateAction<number>) => {
    setOffset(prev => {
      const nextValue = typeof value === 'function' ? value(prev) : value;
      if (onChange && nextValue !== previousRef.current) {
        onChange(nextValue, previousRef.current);
      }
      previousRef.current = nextValue;
      return nextValue;
    });
  };

  return [offset, setOffsetWithCallback];
}

// Main TabBar component
const TabBar = React.forwardRef<HTMLDivElement, TabBarProps>((props, ref) => {
  const {
    className,
    style,
    id,
    animated = { inkBar: true },
    activeKey,
    rtl = false,
    extra,
    editable,
    locale,
    tabPosition = 'top',
    tabBarGutter,
    children,
    onTabClick,
    onTabScroll
  } = props;

  const context = useContext<TabBarContext>(React.createContext({ prefixCls: 'rc-tabs', tabs: [] }));
  const { prefixCls, tabs } = context;

  // Refs
  const wrapperRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const operationsRef = useRef<HTMLDivElement>(null);
  const addButtonRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<Map<string, React.RefObject<HTMLDivElement>>>(new Map());
  const rafTimeoutRef = useRef<number>();

  // State
  const [transformLeft, setTransformLeft] = useOffsetScroll(0, (current, previous) => {
    if (isHorizontal && onTabScroll) {
      onTabScroll({ direction: current > previous ? 'left' : 'right' });
    }
  });

  const [transformTop, setTransformTop] = useOffsetScroll(0, (current, previous) => {
    if (!isHorizontal && onTabScroll) {
      onTabScroll({ direction: current > previous ? 'top' : 'bottom' });
    }
  });

  const [tabsWidth, setTabsWidth] = useState(0);
  const [tabsHeight, setTabsHeight] = useState(0);
  const [contentWidth, setContentWidth] = useState(0);
  const [contentHeight, setContentHeight] = useState(0);
  const [wrapperWidth, setWrapperWidth] = useState<number | null>(null);
  const [wrapperHeight, setWrapperHeight] = useState<number | null>(null);
  const [addButtonWidth, setAddButtonWidth] = useState(0);
  const [addButtonHeight, setAddButtonHeight] = useState(0);
  const [tabPositions, setTabPositions] = useRafState<Map<string, TabPosition>>(new Map());
  const [updateTimestamp, setUpdateTimestamp] = useState<number>();
  const [inkBarStyle, setInkBarStyle] = useState<React.CSSProperties>();

  const isHorizontal = tabPosition === 'top' || tabPosition === 'bottom';

  // Calculate visible range
  let minOffset = 0;
  let maxOffset = 0;

  if (isHorizontal) {
    if (rtl) {
      minOffset = 0;
      maxOffset = Math.max(0, tabsWidth - (wrapperWidth ?? 0));
    } else {
      minOffset = Math.min(0, (wrapperWidth ?? 0) - tabsWidth);
      maxOffset = 0;
    }
  } else {
    minOffset = Math.min(0, (wrapperHeight ?? 0) - tabsHeight);
    maxOffset = 0;
  }

  const clampOffset = (value: number): number => {
    return value < minOffset ? minOffset : value > maxOffset ? maxOffset : value;
  };

  // Trigger update
  const triggerUpdate = () => {
    setUpdateTimestamp(Date.now());
  };

  const clearRafTimeout = () => {
    if (rafTimeoutRef.current) {
      window.clearTimeout(rafTimeoutRef.current);
    }
  };

  // Scroll to tab
  const scrollToTab = (key: string = activeKey ?? '') => {
    const tabPosition = tabPositions.get(key) || {
      width: 0,
      height: 0,
      left: 0,
      right: 0,
      top: 0
    };

    if (isHorizontal) {
      let newOffset = transformLeft;

      if (rtl) {
        if (tabPosition.right < transformLeft) {
          newOffset = tabPosition.right;
        } else if (tabPosition.right + tabPosition.width > transformLeft + (wrapperWidth ?? 0)) {
          newOffset = tabPosition.right + tabPosition.width - (wrapperWidth ?? 0);
        }
      } else {
        if (tabPosition.left < -transformLeft) {
          newOffset = -tabPosition.left;
        } else if (tabPosition.left + tabPosition.width > -transformLeft + (wrapperWidth ?? 0)) {
          newOffset = -(tabPosition.left + tabPosition.width - (wrapperWidth ?? 0));
        }
      }

      setTransformTop(0);
      setTransformLeft(clampOffset(newOffset));
    } else {
      let newOffset = transformTop;

      if (tabPosition.top < -transformTop) {
        newOffset = -tabPosition.top;
      } else if (tabPosition.top + tabPosition.height > -transformTop + (wrapperHeight ?? 0)) {
        newOffset = -(tabPosition.top + tabPosition.height - (wrapperHeight ?? 0));
      }

      setTransformLeft(0);
      setTransformTop(clampOffset(newOffset));
    }
  };

  // Measure tabs
  const measureTabs = () => {
    const wrapperWidth = wrapperRef.current?.offsetWidth ?? 0;
    const wrapperHeight = wrapperRef.current?.offsetHeight ?? 0;
    const addButtonWidth = addButtonRef.current?.offsetWidth ?? 0;
    const addButtonHeight = addButtonRef.current?.offsetHeight ?? 0;
    const operationsWidth = operationsRef.current?.offsetWidth ?? 0;
    const operationsHeight = operationsRef.current?.offsetHeight ?? 0;

    setWrapperWidth(wrapperWidth);
    setWrapperHeight(wrapperHeight);
    setAddButtonWidth(addButtonWidth);
    setAddButtonHeight(addButtonHeight);

    const listWidth = (listRef.current?.offsetWidth ?? 0) - addButtonWidth;
    const listHeight = (listRef.current?.offsetHeight ?? 0) - addButtonHeight;

    setTabsWidth(listWidth);
    setTabsHeight(listHeight);

    const hasHiddenOperations = operationsRef.current?.className.includes(`${prefixCls}-nav-operations-hidden`);
    setContentWidth(listWidth - (hasHiddenOperations ? 0 : operationsWidth));
    setContentHeight(listHeight - (hasHiddenOperations ? 0 : operationsHeight));

    setTabPositions(() => {
      const positions = new Map<string, TabPosition>();
      tabs.forEach(tab => {
        const tabRef = tabRefs.current.get(tab.key)?.current;
        if (tabRef) {
          positions.set(tab.key, {
            width: tabRef.offsetWidth,
            height: tabRef.offsetHeight,
            left: tabRef.offsetLeft,
            right: tabRef.offsetLeft + tabRef.offsetWidth,
            top: tabRef.offsetTop
          });
        }
      });
      return positions;
    });
  };

  // Effects
  useEffect(() => {
    clearRafTimeout();
    if (updateTimestamp) {
      rafTimeoutRef.current = window.setTimeout(() => {
        setUpdateTimestamp(0);
      }, 100);
    }
    return clearRafTimeout;
  }, [updateTimestamp]);

  useEffect(() => {
    scrollToTab();
  }, [activeKey, tabPositions, isHorizontal]);

  useEffect(() => {
    measureTabs();
  }, [rtl, tabBarGutter, activeKey, tabs.map(t => t.key).join('_')]);

  useEffect(() => {
    const currentTabPosition = tabPositions.get(activeKey ?? '');
    if (!currentTabPosition) return;

    const newStyle: React.CSSProperties = {};

    if (isHorizontal) {
      if (rtl) {
        newStyle.right = currentTabPosition.right;
      } else {
        newStyle.left = currentTabPosition.left;
      }
      newStyle.width = currentTabPosition.width;
    } else {
      newStyle.top = currentTabPosition.top;
      newStyle.height = currentTabPosition.height;
    }

    clearRafTimeout();
    rafTimeoutRef.current = raf(() => {
      setInkBarStyle(newStyle);
    });

    return clearRafTimeout;
  }, [tabPositions.get(activeKey ?? ''), isHorizontal, rtl]);

  // Render tabs
  const tabNodes = tabs.map(tab => {
    const tabRef = React.createRef<HTMLDivElement>();
    tabRefs.current.set(tab.key, tabRef);

    const tabElement = (
      <div
        key={tab.key}
        ref={tabRef}
        className={classNames(`${prefixCls}-tab`, {
          [`${prefixCls}-tab-active`]: tab.key === activeKey
        })}
        onClick={(e) => onTabClick?.(tab.key, e)}
        onFocus={() => {
          scrollToTab(tab.key);
          triggerUpdate();
          if (!rtl && wrapperRef.current) {
            wrapperRef.current.scrollLeft = 0;
          }
          if (wrapperRef.current) {
            wrapperRef.current.scrollTop = 0;
          }
        }}
      >
        {tab.key}
      </div>
    );

    return children ? children(tabElement) : tabElement;
  });

  // Calculate overflow state
  const hasOverflow = isHorizontal
    ? (rtl ? transformLeft > 0 || transformLeft + (wrapperWidth ?? 0) < tabsWidth : transformLeft < 0 || -transformLeft + (wrapperWidth ?? 0) < tabsWidth)
    : transformTop < 0 || -transformTop + (wrapperHeight ?? 0) < tabsHeight;

  const showLeftArrow = isHorizontal && (rtl ? transformLeft > 0 : transformLeft < 0);
  const showRightArrow = isHorizontal && (rtl ? transformLeft + (wrapperWidth ?? 0) < tabsWidth : -transformLeft + (wrapperWidth ?? 0) < tabsWidth);
  const showTopArrow = !isHorizontal && transformTop < 0;
  const showBottomArrow = !isHorizontal && -transformTop + (wrapperHeight ?? 0) < tabsHeight;

  const wrapperClassName = `${prefixCls}-nav-wrap`;

  return (
    <div
      ref={ref}
      role="tablist"
      className={classNames(`${prefixCls}-nav`, className)}
      style={style}
      onKeyDown={triggerUpdate}
    >
      <ExtraContent position="left" extra={extra} prefixCls={prefixCls} />

      <ResizeObserver onResize={measureTabs}>
        <div
          className={classNames(wrapperClassName, {
            [`${wrapperClassName}-ping-left`]: showLeftArrow,
            [`${wrapperClassName}-ping-right`]: showRightArrow,
            [`${wrapperClassName}-ping-top`]: showTopArrow,
            [`${wrapperClassName}-ping-bottom`]: showBottomArrow
          })}
          ref={wrapperRef}
        >
          <ResizeObserver onResize={measureTabs}>
            <div
              ref={listRef}
              className={`${prefixCls}-nav-list`}
              style={{
                transform: `translate(${transformLeft}px, ${transformTop}px)`,
                transition: updateTimestamp ? 'none' : undefined
              }}
            >
              {tabNodes}
              <div
                ref={addButtonRef}
                className={`${prefixCls}-nav-add`}
                style={{ visibility: hasOverflow ? 'hidden' : undefined }}
              />
              <div
                className={classNames(`${prefixCls}-ink-bar`, {
                  [`${prefixCls}-ink-bar-animated`]: animated?.inkBar
                })}
                style={inkBarStyle}
              />
            </div>
          </ResizeObserver>
        </div>
      </ResizeObserver>

      <div ref={operationsRef} className={`${prefixCls}-nav-operations`} />

      <ExtraContent position="right" extra={extra} prefixCls={prefixCls} />
    </div>
  );
});

export default TabBar;