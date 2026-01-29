import { useMemo } from 'react';

interface DataItem<T = unknown> {
  key: string;
  data: {
    value: T;
  };
}

type MemoizedMaps<T = unknown> = [Map<string, DataItem<T>>, Map<T, DataItem<T>>];

export default function useDataMaps<T = unknown>(items: DataItem<T>[]): MemoizedMaps<T> {
  return useMemo(() => {
    const keyMap = new Map<string, DataItem<T>>();
    const valueMap = new Map<T, DataItem<T>>();

    items.forEach((item) => {
      keyMap.set(item.key, item);
      valueMap.set(item.data.value, item);
    });

    return [keyMap, valueMap];
  }, [items]);
}