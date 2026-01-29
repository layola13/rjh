import { useState, useCallback } from 'react';

type Cleanup = () => void;

/**
 * Custom hook for managing a list of items with add/remove functionality
 * @returns A tuple containing the current list and an add function that returns a cleanup function
 */
export default function useListManager<T>(): [T[], (item: T) => Cleanup] {
  const [list, setList] = useState<T[]>([]);

  const addItem = useCallback((item: T): Cleanup => {
    setList((currentList) => [...currentList, item]);

    return () => {
      setList((currentList) => 
        currentList.filter((existingItem) => existingItem !== item)
      );
    };
  }, []);

  return [list, addItem];
}