/**
 * React hook utility module for mapping values to their corresponding data objects
 * @module DataMapper
 */

import { useRef, useMemo } from 'react';

/**
 * Represents a data item with a nested value property
 * @template T - The type of the value
 */
export interface DataItem<T = unknown> {
  data: {
    value: T;
  };
  [key: string]: unknown;
}

/**
 * Creates a memoized mapper function that retrieves data items by their values
 * 
 * @template T - The type of values used as keys
 * @template D - The type of data items (must extend DataItem<T>)
 * 
 * @param items - Array of data items, each containing a data.value property
 * @returns A mapper function that takes an array of values and returns corresponding data items
 * 
 * @example
 * const dataItems = [
 *   { data: { value: 'key1' }, label: 'Item 1' },
 *   { data: { value: 'key2' }, label: 'Item 2' }
 * ];
 * const mapper = useDataMapper(dataItems);
 * const results = mapper(['key1', 'key2']); // Returns matching data items
 */
export default function useDataMapper<T = string, D extends DataItem<T> = DataItem<T>>(
  items: D[]
): (values: T[]) => D[];

/**
 * Creates a memoized mapper function that retrieves data items by their values
 * 
 * This hook maintains a Map of value-to-item relationships and returns a stable
 * mapper function that can efficiently look up items by their data.value property.
 * The Map is only recreated when the input items array changes.
 * 
 * @param items - Array of data items to map
 * @returns Function that maps an array of values to their corresponding data items,
 *          filtering out any values that don't have a matching item
 */
export default function useDataMapper<T = string, D extends DataItem<T> = DataItem<T>>(
  items: D[]
): (values: T[]) => D[] {
  const mapRef = useRef<Map<T, D> | null>(null);

  const valueToItemMap = useMemo(() => {
    const map = new Map<T, D>();
    
    items.forEach((item) => {
      const value = item.data.value;
      map.set(value, item);
    });
    
    return map;
  }, [items]);

  mapRef.current = valueToItemMap;

  return (values: T[]): D[] => {
    return values
      .map((value) => mapRef.current?.get(value))
      .filter((item): item is D => Boolean(item));
  };
}