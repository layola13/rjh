import React, { useRef, useCallback, useContext, createContext, ReactNode } from 'react';

interface CollectionItem {
  size: number;
  element: HTMLElement;
  data: unknown;
}

type CollectionCallback = (size: number, element: HTMLElement, data: unknown) => void;

const CollectionContext = createContext<CollectionCallback | null>(null);

interface CollectionProps {
  children: ReactNode;
  onBatchResize?: (items: CollectionItem[]) => void;
}

function Collection({ children, onBatchResize }: CollectionProps): JSX.Element {
  const batchIdRef = useRef<number>(0);
  const itemsRef = useRef<CollectionItem[]>([]);
  const parentCallback = useContext(CollectionContext);

  const handleResize = useCallback(
    (size: number, element: HTMLElement, data: unknown): void => {
      batchIdRef.current += 1;
      const currentBatchId = batchIdRef.current;

      itemsRef.current.push({
        size,
        element,
        data
      });

      Promise.resolve().then(() => {
        if (currentBatchId === batchIdRef.current) {
          onBatchResize?.(itemsRef.current);
          itemsRef.current = [];
        }
      });

      parentCallback?.(size, element, data);
    },
    [onBatchResize, parentCallback]
  );

  return (
    <CollectionContext.Provider value={handleResize}>
      {children}
    </CollectionContext.Provider>
  );
}

export { Collection, CollectionContext };
export type { CollectionProps, CollectionItem, CollectionCallback };