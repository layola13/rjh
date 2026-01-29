import { useRef } from 'react';

type GetRowKey<T> = (record: T, index: number) => string | number;

interface CacheRef<T> {
  data: readonly T[];
  childrenColumnName: string;
  kvMap: Map<string | number, T>;
  getRowKey: GetRowKey<T>;
}

export default function useRecordMap<T extends Record<string, any>>(
  data: readonly T[],
  childrenColumnName: string,
  getRowKey: GetRowKey<T>
): [(key: string | number) => T | undefined] {
  const cacheRef = useRef<Partial<CacheRef<T>>>({});

  const getRecordByKey = (key: string | number): T | undefined => {
    if (
      !cacheRef.current ||
      cacheRef.current.data !== data ||
      cacheRef.current.childrenColumnName !== childrenColumnName ||
      cacheRef.current.getRowKey !== getRowKey
    ) {
      const kvMap = new Map<string | number, T>();

      const buildMap = (records: readonly T[]): void => {
        records.forEach((record, index) => {
          const recordKey = getRowKey(record, index);
          kvMap.set(recordKey, record);

          if (
            record &&
            typeof record === 'object' &&
            childrenColumnName in record
          ) {
            const children = record[childrenColumnName] || [];
            buildMap(children);
          }
        });
      };

      buildMap(data);

      cacheRef.current = {
        data,
        childrenColumnName,
        kvMap,
        getRowKey,
      };
    }

    return cacheRef.current.kvMap!.get(key);
  };

  return [getRecordByKey];
}