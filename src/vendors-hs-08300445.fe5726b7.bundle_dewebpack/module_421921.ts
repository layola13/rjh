import { useMemo } from 'react';

interface Position {
  width: number;
  height: number;
  left: number;
  top: number;
  right?: number;
}

interface Item {
  key: string;
}

const DEFAULT_POSITION: Position = {
  width: 0,
  height: 0,
  left: 0,
  top: 0
};

export default function calculatePositions(
  items: Item[],
  positionMap: Map<string, Position>,
  _dependency?: unknown
): Map<string, Position> {
  return useMemo(() => {
    const resultMap = new Map<string, Position>();
    const firstItemKey = items[0]?.key;
    const firstPosition = positionMap.get(firstItemKey) ?? DEFAULT_POSITION;
    const rightBoundary = firstPosition.left + firstPosition.width;

    for (let index = 0; index < items.length; index += 1) {
      const currentKey = items[index].key;
      let currentPosition = positionMap.get(currentKey);

      if (!currentPosition) {
        const previousItemKey = items[index - 1]?.key;
        currentPosition = positionMap.get(previousItemKey) ?? DEFAULT_POSITION;
      }

      const positionWithRight = resultMap.get(currentKey) ?? { ...currentPosition };
      positionWithRight.right = rightBoundary - positionWithRight.left - positionWithRight.width;
      resultMap.set(currentKey, positionWithRight);
    }

    return resultMap;
  }, [items.map((item) => item.key).join('_'), positionMap, _dependency]);
}