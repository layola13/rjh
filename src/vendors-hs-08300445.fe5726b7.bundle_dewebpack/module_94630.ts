import { useRef, useState, useCallback, MutableRefObject } from 'react';
import raf from 'raf';
import useLayoutEffect from './useLayoutEffect';

const MAX_TIMES = 10;

interface ScrollConfig {
  times: number;
  index: number;
  offset: number;
  originAlign?: 'top' | 'bottom';
  targetAlign?: 'top' | 'bottom';
  lastTop?: number | null;
}

interface ScrollToOptions {
  key?: string | number;
  index?: number;
  align?: 'top' | 'bottom';
  offset?: number;
}

type ScrollToValue = number | ScrollToOptions | null | undefined;

type GetKey<T> = (item: T) => string | number;

export default function useScrollTo<T>(
  containerRef: MutableRefObject<HTMLElement | null>,
  data: T[],
  heights: Map<string | number, number>,
  itemHeight: number,
  getKey: GetKey<T>,
  collectHeight: () => void,
  syncScrollTop: (scrollTop: number) => void,
  resetScrollState: () => void
): (value: ScrollToValue) => void {
  const rafRef = useRef<number>();
  const [scrollConfig, setScrollConfig] = useState<ScrollConfig | null>(null);

  useLayoutEffect(() => {
    if (scrollConfig && scrollConfig.times < MAX_TIMES) {
      if (!containerRef.current) {
        setScrollConfig((prev) => ({ ...prev! }));
        return;
      }

      collectHeight();

      const { targetAlign, originAlign, index, offset } = scrollConfig;
      const containerHeight = containerRef.current.clientHeight;
      let needRecheck = false;
      let currentAlign = targetAlign;
      let targetScrollTop: number | null = null;

      if (containerHeight) {
        const initialAlign = targetAlign || originAlign;
        let startTop = 0;
        let endTop = 0;
        let accumulatedHeight = 0;
        const maxIndex = Math.min(data.length - 1, index);

        for (let i = 0; i <= maxIndex; i += 1) {
          const key = getKey(data[i]);
          startTop = accumulatedHeight;
          const height = heights.get(key);
          accumulatedHeight = endTop = startTop + (height ?? itemHeight);
        }

        const threshold = initialAlign === 'top' ? offset : containerHeight - offset;

        for (let i = maxIndex; i >= 0; i -= 1) {
          const key = getKey(data[i]);
          const height = heights.get(key);

          if (height === undefined) {
            needRecheck = true;
            break;
          }

          if ((threshold -= height) <= 0) break;
        }

        switch (initialAlign) {
          case 'top':
            targetScrollTop = startTop - offset;
            break;
          case 'bottom':
            targetScrollTop = endTop - containerHeight + offset;
            break;
          default:
            const currentScrollTop = containerRef.current.scrollTop;
            if (startTop < currentScrollTop) {
              currentAlign = 'top';
            } else if (endTop > currentScrollTop + containerHeight) {
              currentAlign = 'bottom';
            }
        }

        if (targetScrollTop !== null) {
          syncScrollTop(targetScrollTop);
        }

        if (targetScrollTop !== scrollConfig.lastTop) {
          needRecheck = true;
        }
      }

      if (needRecheck) {
        setScrollConfig({
          ...scrollConfig,
          times: scrollConfig.times + 1,
          targetAlign: currentAlign,
          lastTop: targetScrollTop
        });
      }
    }
  }, [scrollConfig, containerRef.current]);

  const scrollTo = useCallback((value: ScrollToValue): void => {
    if (value != null) {
      raf.cancel(rafRef.current!);

      if (typeof value === 'number') {
        syncScrollTop(value);
      } else if (value && typeof value === 'object') {
        let targetIndex: number;
        const align = value.align;

        if ('index' in value) {
          targetIndex = value.index!;
        } else {
          targetIndex = data.findIndex((item) => getKey(item) === value.key);
        }

        const scrollOffset = value.offset ?? 0;

        setScrollConfig({
          times: 0,
          index: targetIndex,
          offset: scrollOffset,
          originAlign: align
        });
      }
    } else {
      resetScrollState();
    }
  }, [data, getKey, syncScrollTop, resetScrollState]);

  return scrollTo;
}