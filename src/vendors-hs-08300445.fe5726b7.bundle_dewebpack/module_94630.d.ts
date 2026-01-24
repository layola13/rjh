import { MutableRefObject, useRef, useState } from 'react';
import { useLayoutEffect } from 'react';
import scrollTo from 'scroll-to'; // Assuming this is a scroll utility library

/**
 * Maximum number of scroll alignment attempts before giving up
 */
const MAX_ALIGNMENT_ATTEMPTS = 10;

/**
 * Scroll target can be a number (pixel position), an object with alignment options,
 * or null to cancel scrolling
 */
export type ScrollTarget =
  | number
  | {
      /** Index of the item to scroll to */
      index?: number;
      /** Key of the item to scroll to */
      key?: string | number;
      /** Vertical alignment: 'top' or 'bottom' */
      align?: 'top' | 'bottom';
      /** Offset in pixels from the alignment edge */
      offset?: number;
    }
  | null;

/**
 * Alignment state tracked during scroll operations
 */
interface AlignmentState {
  /** Number of alignment attempts made */
  times: number;
  /** Index of the target item */
  index: number;
  /** Offset in pixels */
  offset: number;
  /** Original requested alignment */
  originAlign?: 'top' | 'bottom';
  /** Current target alignment (may change based on available space) */
  targetAlign?: 'top' | 'bottom';
  /** Last calculated scroll top position */
  lastTop?: number | null;
}

/**
 * Custom hook for virtualized list scrolling with alignment support.
 * Handles scrolling to specific items with top/bottom alignment, dynamically
 * calculating positions based on item heights.
 *
 * @template T - Type of list items
 * @param containerRef - Reference to the scrollable container element
 * @param items - Array of items in the list
 * @param heightCache - Map storing cached heights for each item
 * @param estimatedItemHeight - Estimated height for items not yet measured
 * @param getItemKey - Function to extract unique key from an item
 * @param collectHeight - Callback to trigger height collection/measurement
 * @param setScrollTop - Function to update the scroll position
 * @param cancelScroll - Function to cancel any ongoing scroll operation
 * @returns Function to initiate scrolling to a target
 */
export default function useScrollTo<T>(
  containerRef: MutableRefObject<HTMLElement | null>,
  items: T[],
  heightCache: Map<string | number, number>,
  estimatedItemHeight: number,
  getItemKey: (item: T) => string | number,
  collectHeight: () => void,
  setScrollTop: (scrollTop: number) => void,
  cancelScroll: () => void
): (target: ScrollTarget) => void {
  const scrollRequestRef = useRef<ReturnType<typeof scrollTo>>();
  const [alignmentState, setAlignmentState] = useState<AlignmentState | null>(null);

  // Effect to handle alignment calculations and scroll execution
  useLayoutEffect(() => {
    if (!alignmentState || alignmentState.times >= MAX_ALIGNMENT_ATTEMPTS) {
      return;
    }

    // If container is not mounted, retry alignment
    if (!containerRef.current) {
      setAlignmentState((prevState) => ({ ...prevState! }));
      return;
    }

    // Trigger height collection for unmeasured items
    collectHeight();

    const {
      targetAlign,
      originAlign,
      index,
      offset,
    } = alignmentState;

    const containerHeight = containerRef.current.clientHeight;
    let needsRetry = false;
    let currentAlign = targetAlign;
    let calculatedScrollTop: number | null = null;

    if (containerHeight) {
      const alignMode = targetAlign || originAlign;
      let topEdge = 0;
      let currentItemTop = 0;
      let bottomEdge = 0;

      // Calculate position of the target item
      const maxIndex = Math.min(items.length - 1, index);
      for (let i = 0; i <= maxIndex; i++) {
        const itemKey = getItemKey(items[i]);
        currentItemTop = topEdge;
        const itemHeight = heightCache.get(itemKey) ?? estimatedItemHeight;
        topEdge = bottomEdge = currentItemTop + itemHeight;
      }

      // Find the maximum scrollable position where offset is valid
      const alignmentPoint = alignMode === 'top' ? offset : containerHeight - offset;
      for (let i = maxIndex; i >= 0; i--) {
        const itemKey = getItemKey(items[i]);
        const itemHeight = heightCache.get(itemKey);

        // If height is not measured, we need to retry
        if (itemHeight === undefined) {
          needsRetry = true;
          break;
        }

        alignmentPoint -= itemHeight;
        if (alignmentPoint <= 0) break;
      }

      // Calculate scroll position based on alignment mode
      switch (alignMode) {
        case 'top':
          calculatedScrollTop = currentItemTop - offset;
          break;
        case 'bottom':
          calculatedScrollTop = bottomEdge - containerHeight + offset;
          break;
        default:
          // Auto-align: choose top or bottom based on current scroll position
          const currentScrollTop = containerRef.current.scrollTop;
          if (currentItemTop < currentScrollTop) {
            currentAlign = 'top';
          } else if (bottomEdge > currentScrollTop + containerHeight) {
            currentAlign = 'bottom';
          }
      }

      // Apply scroll if we calculated a new position
      if (calculatedScrollTop !== null) {
        setScrollTop(calculatedScrollTop);
      }

      // Retry if position changed or heights are missing
      if (calculatedScrollTop !== alignmentState.lastTop) {
        needsRetry = true;
      }
    }

    // Update state for retry if needed
    if (needsRetry) {
      setAlignmentState({
        ...alignmentState,
        times: alignmentState.times + 1,
        targetAlign: currentAlign,
        lastTop: calculatedScrollTop,
      });
    }
  }, [alignmentState, containerRef.current]);

  /**
   * Initiates scrolling to the specified target
   */
  return (target: ScrollTarget): void => {
    if (target == null) {
      cancelScroll();
      return;
    }

    // Cancel any ongoing scroll animation
    if (scrollRequestRef.current) {
      scrollTo.cancel(scrollRequestRef.current);
    }

    if (typeof target === 'number') {
      // Direct scroll to pixel position
      setScrollTop(target);
    } else if (typeof target === 'object') {
      const { align, offset = 0 } = target;

      // Determine target index
      let targetIndex: number;
      if ('index' in target && target.index !== undefined) {
        targetIndex = target.index;
      } else {
        targetIndex = items.findIndex((item) => getItemKey(item) === target.key);
      }

      // Initialize alignment state
      setAlignmentState({
        times: 0,
        index: targetIndex,
        offset,
        originAlign: align,
      });
    }
  };
}