import { useState, useEffect, useRef } from 'react';

interface HeightMap extends Map<React.Key, number> {}
interface ElementMap extends Map<React.Key, HTMLElement | null> {}

type GetKeyFunction = (item: unknown) => React.Key;
type OnAppearCallback = (item: unknown) => void;
type OnDisappearCallback = (item: unknown) => void;

type UseHeightTrackerReturn = [
  (item: unknown, element: HTMLElement | null) => void,
  (immediate?: boolean) => void,
  HeightMap,
  number
];

function parseMargin(marginValue: string): number {
  const parsed = parseFloat(marginValue);
  return isNaN(parsed) ? 0 : parsed;
}

export default function useHeightTracker(
  getKey: GetKeyFunction,
  onAppear?: OnAppearCallback | null,
  onDisappear?: OnDisappearCallback | null
): UseHeightTrackerReturn {
  const [updateCounter, setUpdateCounter] = useState<number>(0);
  const elementMapRef = useRef<ElementMap>(new Map());
  const heightMapRef = useRef<HeightMap>(new Map());
  const batchVersionRef = useRef<number>(0);

  function incrementBatchVersion(): void {
    batchVersionRef.current += 1;
  }

  function recalculateHeights(immediate = false): void {
    incrementBatchVersion();

    const performRecalculation = (): void => {
      let hasChanges = false;

      elementMapRef.current.forEach((element, key) => {
        if (element && element.offsetParent) {
          const offsetHeight = element.offsetHeight;
          const computedStyle = getComputedStyle(element);
          const marginTop = computedStyle.marginTop;
          const marginBottom = computedStyle.marginBottom;
          const totalHeight = offsetHeight + parseMargin(marginTop) + parseMargin(marginBottom);

          if (heightMapRef.current.get(key) !== totalHeight) {
            heightMapRef.current.set(key, totalHeight);
            hasChanges = true;
          }
        }
      });

      if (hasChanges) {
        setUpdateCounter(prev => prev + 1);
      }
    };

    if (immediate) {
      performRecalculation();
    } else {
      batchVersionRef.current += 1;
      const currentVersion = batchVersionRef.current;

      Promise.resolve().then(() => {
        if (currentVersion === batchVersionRef.current) {
          performRecalculation();
        }
      });
    }
  }

  useEffect(() => {
    return incrementBatchVersion;
  }, []);

  const registerElement = (item: unknown, element: HTMLElement | null): void => {
    const key = getKey(item);
    const previousElement = elementMapRef.current.get(key);

    if (element) {
      elementMapRef.current.set(key, element);
      recalculateHeights();
    } else {
      elementMapRef.current.delete(key);
    }

    const hadElement = Boolean(previousElement);
    const hasElement = Boolean(element);

    if (hadElement !== hasElement) {
      if (hasElement) {
        onAppear?.(item);
      } else {
        onDisappear?.(item);
      }
    }
  };

  return [registerElement, recalculateHeights, heightMapRef.current, updateCounter];
}