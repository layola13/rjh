import { useMemo } from 'react';

interface ColumnOffsets {
  left: number[];
  right: number[];
}

type Direction = 'ltr' | 'rtl';

export default function useColumnOffsets(
  columnWidths: number[],
  columnCount: number,
  direction: Direction
): ColumnOffsets {
  return useMemo(() => {
    const leftOffsets: number[] = [];
    const rightOffsets: number[] = [];
    let leftAccumulator = 0;
    let rightAccumulator = 0;

    for (let index = 0; index < columnCount; index += 1) {
      if (direction === 'rtl') {
        rightOffsets[index] = rightAccumulator;
        rightAccumulator += columnWidths[index] || 0;

        const mirrorIndex = columnCount - index - 1;
        leftOffsets[mirrorIndex] = leftAccumulator;
        leftAccumulator += columnWidths[mirrorIndex] || 0;
      } else {
        leftOffsets[index] = leftAccumulator;
        leftAccumulator += columnWidths[index] || 0;

        const mirrorIndex = columnCount - index - 1;
        rightOffsets[mirrorIndex] = rightAccumulator;
        rightAccumulator += columnWidths[mirrorIndex] || 0;
      }
    }

    return {
      left: leftOffsets,
      right: rightOffsets
    };
  }, [columnWidths, columnCount, direction]);
}