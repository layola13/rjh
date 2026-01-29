import { useMemo } from 'react';

interface GetSizeResult {
  top: number;
  bottom: number;
}

type GetSizeFunction = (startIndex: number, endIndex?: number) => GetSizeResult;

export function useGetSize<T>(
  items: T[],
  getKey: (item: T) => string | number,
  sizeMap: Map<string | number, number>,
  defaultSize: number
): GetSizeFunction {
  const [indexMap, cumulativeSizes] = useMemo<[Map<string | number, number>, number[]]>(
    () => [new Map(), []],
    [items, sizeMap.id, defaultSize]
  );

  return function getSize(startIndex: number, endIndex: number = startIndex): GetSizeResult {
    let startPosition = indexMap.get(startIndex);
    let endPosition = indexMap.get(endIndex);

    if (startPosition === undefined || endPosition === undefined) {
      const totalItems = items.length;
      const currentLength = cumulativeSizes.length;

      for (let i = currentLength; i < totalItems; i += 1) {
        const item = items[i];
        const key = getKey(item);
        
        indexMap.set(key, i);
        
        const itemSize = sizeMap.get(key) ?? defaultSize;
        const previousSize = cumulativeSizes[i - 1] || 0;
        cumulativeSizes[i] = previousSize + itemSize;

        if (key === startIndex) {
          startPosition = i;
        }
        if (key === endIndex) {
          endPosition = i;
        }

        if (startPosition !== undefined && endPosition !== undefined) {
          break;
        }
      }
    }

    return {
      top: cumulativeSizes[(startPosition as number) - 1] || 0,
      bottom: cumulativeSizes[endPosition as number]
    };
  };
}