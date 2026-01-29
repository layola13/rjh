export interface ColumnFixedConfig {
  fixed?: 'left' | 'right';
}

export interface FixedPositions {
  left: Record<number, number>;
  right: Record<number, number>;
  isSticky: boolean;
}

export interface CellFixedInfo {
  fixLeft: number | undefined;
  fixRight: number | undefined;
  lastFixLeft: boolean;
  firstFixRight: boolean;
  lastFixRight: boolean;
  firstFixLeft: boolean;
  isSticky: boolean;
}

export function getCellFixedInfo(
  startIndex: number,
  endIndex: number,
  columns: Record<number, ColumnFixedConfig>,
  fixedPositions: FixedPositions,
  direction: 'ltr' | 'rtl'
): CellFixedInfo {
  const startColumn = columns[startIndex] || {};
  const endColumn = columns[endIndex] || {};

  let fixLeft: number | undefined;
  let fixRight: number | undefined;

  if (startColumn.fixed === 'left') {
    fixLeft = fixedPositions.left[startIndex];
  } else if (endColumn.fixed === 'right') {
    fixRight = fixedPositions.right[endIndex];
  }

  let lastFixLeft = false;
  let firstFixRight = false;
  let lastFixRight = false;
  let firstFixLeft = false;

  const nextColumn = columns[endIndex + 1];
  const prevColumn = columns[startIndex - 1];

  if (direction === 'rtl') {
    if (fixLeft !== undefined) {
      firstFixLeft = !(prevColumn && prevColumn.fixed === 'left');
    } else if (fixRight !== undefined) {
      lastFixRight = !(nextColumn && nextColumn.fixed === 'right');
    }
  } else {
    if (fixLeft !== undefined) {
      lastFixLeft = !(nextColumn && nextColumn.fixed === 'left');
    } else if (fixRight !== undefined) {
      firstFixRight = !(prevColumn && prevColumn.fixed === 'right');
    }
  }

  return {
    fixLeft,
    fixRight,
    lastFixLeft,
    firstFixRight,
    lastFixRight,
    firstFixLeft,
    isSticky: fixedPositions.isSticky
  };
}