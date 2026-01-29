import { useMemo, useState, useCallback, forwardRef, CSSProperties, ReactNode, ComponentType } from 'react';
import classNames from 'classnames';
import ResizeObserver from 'resize-observer';
import { OverflowContext } from './OverflowContext';
import { useBatcher } from './hooks/useBatcher';
import { useLayoutEffect } from './hooks/useLayoutEffect';
import OverflowItem from './OverflowItem';

export const RESPONSIVE = 'responsive';
export const INVALIDATE = 'invalidate';

type RenderFunction<T> = (item: T) => ReactNode;
type ItemKeyType<T> = string | number | ((item: T) => string | number);

interface OverflowProps<T> {
  prefixCls?: string;
  data?: T[];
  renderItem?: RenderFunction<T>;
  renderRawItem?: (item: T, index: number) => ReactNode;
  itemKey?: ItemKeyType<T>;
  itemWidth?: number;
  ssr?: 'full' | boolean;
  style?: CSSProperties;
  className?: string;
  maxCount?: number | typeof RESPONSIVE | typeof INVALIDATE;
  renderRest?: (items: T[]) => ReactNode;
  renderRawRest?: (items: T[]) => ReactNode;
  prefix?: ReactNode;
  suffix?: ReactNode;
  component?: ComponentType<any> | string;
  itemComponent?: ComponentType<any>;
  onVisibleChange?: (visibleCount: number) => void;
}

const DEFAULT_PREFIX_CLS = 'rc-overflow';
const DEFAULT_ITEM_WIDTH = 10;
const DEFAULT_COMPONENT = 'div';

function defaultRenderRest<T>(items: T[]): string {
  return `+ ${items.length} ...`;
}

function OverflowComponent<T = any>(props: OverflowProps<T>, ref: React.Ref<HTMLElement>) {
  const {
    prefixCls = DEFAULT_PREFIX_CLS,
    data = [],
    renderItem,
    renderRawItem,
    itemKey,
    itemWidth = DEFAULT_ITEM_WIDTH,
    ssr,
    style,
    className,
    maxCount,
    renderRest,
    renderRawRest,
    prefix,
    suffix,
    component: Component = DEFAULT_COMPONENT,
    itemComponent,
    onVisibleChange,
    ...restProps
  } = props;

  const isFullSSR = ssr === 'full';
  const batcher = useBatcher();
  
  const [containerWidth, setContainerWidth] = useBatcher<number | null>(batcher, null);
  const currentContainerWidth = containerWidth || 0;
  
  const [itemSizeMap, setItemSizeMap] = useBatcher<Map<string | number, number>>(batcher, new Map());
  const [restWidth, setRestWidth] = useBatcher<number>(batcher, 0);
  const [previousRestWidth, setPreviousRestWidth] = useBatcher<number>(batcher, 0);
  const [prefixWidth, setPrefixWidth] = useBatcher<number>(batcher, 0);
  const [suffixWidth, setSuffixWidth] = useBatcher<number>(batcher, 0);
  
  const [suffixFixedPosition, setSuffixFixedPosition] = useState<number | null>(null);
  const [lastVisibleIndex, setLastVisibleIndex] = useState<number | null>(null);
  const [shouldShowRest, setShouldShowRest] = useState<boolean>(false);

  const displayCount = useMemo(() => {
    if (lastVisibleIndex === null && isFullSSR) {
      return Number.MAX_SAFE_INTEGER;
    }
    return lastVisibleIndex || 0;
  }, [lastVisibleIndex, containerWidth]);

  const itemClassName = `${prefixCls}-item`;
  const maxRestWidth = Math.max(restWidth, previousRestWidth);
  const isResponsiveMode = maxCount === RESPONSIVE;
  const isResponsive = data.length && isResponsiveMode;
  const isInvalidateMode = maxCount === INVALIDATE;
  const shouldRenderRest = isResponsive || (typeof maxCount === 'number' && data.length > maxCount);

  const visibleItems = useMemo(() => {
    let items = data;
    
    if (isResponsive) {
      items = containerWidth === null && isFullSSR 
        ? data 
        : data.slice(0, Math.min(data.length, currentContainerWidth / itemWidth));
    } else if (typeof maxCount === 'number') {
      items = data.slice(0, maxCount);
    }
    
    return items;
  }, [data, itemWidth, containerWidth, maxCount, isResponsive]);

  const restItems = useMemo(() => {
    if (isResponsive) {
      return data.slice(displayCount + 1);
    }
    return data.slice(visibleItems.length);
  }, [data, visibleItems, isResponsive, displayCount]);

  const getItemKey = useCallback((item: T, index: number): string | number => {
    if (typeof itemKey === 'function') {
      return itemKey(item);
    }
    if (itemKey && item && typeof item === 'object' && itemKey in item) {
      return (item as any)[itemKey] ?? index;
    }
    return index;
  }, [itemKey]);

  const renderItemContent = useCallback<RenderFunction<T>>(
    renderItem || ((item: T) => item as any),
    [renderItem]
  );

  function updateVisibleState(newVisibleIndex: number, newPosition?: number | null, silent?: boolean): void {
    if (lastVisibleIndex !== newVisibleIndex || (newPosition !== undefined && newPosition !== suffixFixedPosition)) {
      setLastVisibleIndex(newVisibleIndex);
      
      if (!silent) {
        setShouldShowRest(newVisibleIndex < data.length - 1);
        onVisibleChange?.(newVisibleIndex);
      }
      
      if (newPosition !== undefined) {
        setSuffixFixedPosition(newPosition);
      }
    }
  }

  function registerItemSize(key: string | number, size: number | null): void {
    setItemSizeMap((prevMap) => {
      const newMap = new Map(prevMap);
      if (size === null) {
        newMap.delete(key);
      } else {
        newMap.set(key, size);
      }
      return newMap;
    });
  }

  function getItemSize(index: number): number | undefined {
    const key = getItemKey(visibleItems[index], index);
    return itemSizeMap.get(key);
  }

  useLayoutEffect(() => {
    if (currentContainerWidth && typeof maxRestWidth === 'number' && visibleItems) {
      const totalFixedWidth = prefixWidth + suffixWidth;
      const itemCount = visibleItems.length;
      const lastIndex = itemCount - 1;

      if (!itemCount) {
        updateVisibleState(0, null);
        return;
      }

      for (let i = 0; i < itemCount; i++) {
        let currentItemWidth = getItemSize(i);
        
        if (isFullSSR) {
          currentItemWidth = currentItemWidth || 0;
        }
        
        if (currentItemWidth === undefined) {
          updateVisibleState(i - 1, undefined, true);
          break;
        }

        const accumulatedWidth = totalFixedWidth + currentItemWidth;

        if (lastIndex === 0 && accumulatedWidth <= currentContainerWidth) {
          updateVisibleState(lastIndex, null);
          break;
        }

        if (i === lastIndex - 1 && accumulatedWidth + (getItemSize(lastIndex) || 0) <= currentContainerWidth) {
          updateVisibleState(lastIndex, null);
          break;
        }

        if (accumulatedWidth + maxRestWidth > currentContainerWidth) {
          updateVisibleState(i - 1, accumulatedWidth - currentItemWidth - suffixWidth + previousRestWidth);
          break;
        }
      }

      if (suffix && (getItemSize(0) || 0) + suffixWidth > currentContainerWidth) {
        setSuffixFixedPosition(null);
      }
    }
  }, [currentContainerWidth, itemSizeMap, previousRestWidth, prefixWidth, suffixWidth, getItemKey, visibleItems]);

  const shouldDisplayRest = shouldShowRest && restItems.length > 0;
  
  const suffixStyle: CSSProperties = {};
  if (suffixFixedPosition !== null && isResponsive) {
    suffixStyle.position = 'absolute';
    suffixStyle.left = suffixFixedPosition;
    suffixStyle.top = 0;
  }

  const contextValue = {
    prefixCls: itemClassName,
    responsive: isResponsive,
    component: itemComponent,
    invalidate: isInvalidateMode,
  };

  const renderSingleItem = renderRawItem
    ? (item: T, index: number) => {
        const key = getItemKey(item, index);
        return (
          <OverflowContext.Provider
            key={key}
            value={{
              ...contextValue,
              order: index,
              item,
              itemKey: key,
              registerSize: registerItemSize,
              display: index <= displayCount,
            }}
          >
            {renderRawItem(item, index)}
          </OverflowContext.Provider>
        );
      }
    : (item: T, index: number) => {
        const key = getItemKey(item, index);
        return (
          <OverflowItem
            {...contextValue}
            order={index}
            key={key}
            item={item}
            renderItem={renderItemContent}
            itemKey={key}
            registerSize={registerItemSize}
            display={index <= displayCount}
          />
        );
      };

  const restComponentProps = {
    order: shouldDisplayRest ? displayCount : Number.MAX_SAFE_INTEGER,
    className: `${itemClassName}-rest`,
    registerSize: (key: string | number, size: number) => {
      setPreviousRestWidth(size);
      setRestWidth(previousRestWidth);
    },
    display: shouldDisplayRest,
  };

  const restRenderer = renderRest || defaultRenderRest;
  
  const restNode = renderRawRest ? (
    <OverflowContext.Provider value={{ ...contextValue, ...restComponentProps }}>
      {renderRawRest(restItems)}
    </OverflowContext.Provider>
  ) : (
    <OverflowItem {...contextValue} {...restComponentProps}>
      {typeof restRenderer === 'function' ? restRenderer(restItems) : restRenderer}
    </OverflowItem>
  );

  const content = (
    <Component className={classNames(!isInvalidateMode && prefixCls, className)} style={style} ref={ref} {...restProps}>
      {prefix && (
        <OverflowItem
          {...contextValue}
          responsive={isResponsiveMode}
          responsiveDisabled={!isResponsive}
          order={-1}
          className={`${itemClassName}-prefix`}
          registerSize={(key: string | number, size: number) => {
            setPrefixWidth(size);
          }}
          display={true}
        >
          {prefix}
        </OverflowItem>
      )}
      
      {visibleItems.map(renderSingleItem)}
      
      {shouldRenderRest ? restNode : null}
      
      {suffix && (
        <OverflowItem
          {...contextValue}
          responsive={isResponsiveMode}
          responsiveDisabled={!isResponsive}
          order={displayCount}
          className={`${itemClassName}-suffix`}
          registerSize={(key: string | number, size: number) => {
            setSuffixWidth(size);
          }}
          display={true}
          style={suffixStyle}
        >
          {suffix}
        </OverflowItem>
      )}
    </Component>
  );

  if (isResponsiveMode) {
    return (
      <ResizeObserver
        onResize={(entry: any, target: HTMLElement) => {
          setContainerWidth(target.clientWidth);
        }}
        disabled={!isResponsive}
      >
        {content}
      </ResizeObserver>
    );
  }

  return content;
}

const Overflow = forwardRef(OverflowComponent) as <T = any>(
  props: OverflowProps<T> & { ref?: React.Ref<HTMLElement> }
) => ReactNode;

Overflow.displayName = 'Overflow';
(Overflow as any).Item = OverflowItem;
(Overflow as any).RESPONSIVE = RESPONSIVE;
(Overflow as any).INVALIDATE = INVALIDATE;

export default Overflow;
export { OverflowContext };