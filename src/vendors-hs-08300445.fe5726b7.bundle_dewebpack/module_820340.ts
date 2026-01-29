import { useState, useMemo, CSSProperties } from 'react';

type SizeProperty = 'width' | 'height' | 'minWidth' | 'minHeight';

interface Size {
  width: number;
  height: number;
}

type UseSizeResult = [
  CSSProperties,
  (element: HTMLElement) => void
];

export default function useSize(properties?: string): UseSizeResult {
  const [size, setSize] = useState<Size>({
    width: 0,
    height: 0
  });

  const style = useMemo<CSSProperties>(() => {
    const result: CSSProperties = {};

    if (properties) {
      const { width, height } = size;

      if (properties.includes('height') && height) {
        result.height = height;
      } else if (properties.includes('minHeight') && height) {
        result.minHeight = height;
      }

      if (properties.includes('width') && width) {
        result.width = width;
      } else if (properties.includes('minWidth') && width) {
        result.minWidth = width;
      }
    }

    return result;
  }, [properties, size]);

  const measureElement = (element: HTMLElement): void => {
    setSize({
      width: element.offsetWidth,
      height: element.offsetHeight
    });
  };

  return [style, measureElement];
}