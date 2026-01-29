export interface ListDiffResult {
  index: number;
  multiple: boolean;
}

export function findListDiffIndex<T>(
  firstList: T[],
  secondList: T[],
  getKey: (item: T) => string | number
): ListDiffResult | null {
  const firstLength = firstList.length;
  const secondLength = secondList.length;

  if (firstLength === 0 && secondLength === 0) {
    return null;
  }

  let shorterList: T[];
  let longerList: T[];

  if (firstLength < secondLength) {
    shorterList = firstList;
    longerList = secondList;
  } else {
    shorterList = secondList;
    longerList = firstList;
  }

  const EMPTY_ITEM_MARKER = { __EMPTY_ITEM__: true };

  function getItemKey(item: T | undefined): string | number | typeof EMPTY_ITEM_MARKER {
    return item !== undefined ? getKey(item) : EMPTY_ITEM_MARKER;
  }

  let diffIndex: number | null = null;
  const hasMultipleDifferences = Math.abs(firstLength - secondLength) !== 1;
  let isMultiple = hasMultipleDifferences;

  for (let index = 0; index < longerList.length; index += 1) {
    const shorterKey = getItemKey(shorterList[index]);

    if (shorterKey !== getItemKey(longerList[index])) {
      diffIndex = index;
      isMultiple = isMultiple || shorterKey !== getItemKey(longerList[index + 1]);
      break;
    }
  }

  if (diffIndex === null) {
    return null;
  }

  return {
    index: diffIndex,
    multiple: isMultiple
  };
}

export function getIndexByStartLoc(
  start: number,
  end: number,
  mid: number,
  offset: number
): number {
  const leftDistance = mid - start;
  const rightDistance = end - mid;
  const minDistance = 2 * Math.min(leftDistance, rightDistance);

  if (offset <= minDistance) {
    const halfOffset = Math.floor(offset / 2);
    return offset % 2 ? mid + halfOffset + 1 : mid - halfOffset;
  }

  if (leftDistance > rightDistance) {
    return mid - (offset - rightDistance);
  }

  return mid + (offset - leftDistance);
}