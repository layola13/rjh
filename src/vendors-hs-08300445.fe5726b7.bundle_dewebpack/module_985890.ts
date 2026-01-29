import { useState, useEffect } from 'react';
import { findListDiffIndex } from './findListDiffIndex';

export default function usePreviousDiffItem<T>(
  currentList: T[] | null | undefined,
  compareFunction: (prevItem: T, currentItem: T) => boolean,
  onDiffFound?: (index: number) => void
): [T | null] {
  const [previousList, setPreviousList] = useState<T[] | null | undefined>(currentList);
  const [diffItem, setDiffItem] = useState<T | null>(null);

  useEffect(() => {
    const diffResult = findListDiffIndex(
      previousList ?? [],
      currentList ?? [],
      compareFunction
    );

    if (diffResult?.index !== undefined) {
      onDiffFound?.(diffResult.index);
      setDiffItem(currentList![diffResult.index]);
    }

    setPreviousList(currentList);
  }, [currentList]);

  return [diffItem];
}