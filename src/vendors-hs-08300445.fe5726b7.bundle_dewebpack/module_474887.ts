import { useRef, useMemo } from 'react';

interface DataItem<T = unknown> {
  data: {
    value: T;
  };
}

export default function useValueMapper<T>(items: DataItem<T>[]) {
  const mapRef = useRef<Map<T, DataItem<T>> | null>(null);

  const valueMap = useMemo(() => {
    const map = new Map<T, DataItem<T>>();
    items.forEach((item) => {
      const value = item.data.value;
      map.set(value, item);
    });
    return map;
  }, [items]);

  mapRef.current = valueMap;

  return function getItemsByValues(values: T[]): DataItem<T>[] {
    return values
      .map((value) => mapRef.current?.get(value))
      .filter(Boolean) as DataItem<T>[];
  };
}