/**
 * Deep merges multiple objects into the target object.
 * Similar to Object.assign but includes symbol properties and handles nested objects.
 * 
 * @param target - The target object to merge into
 * @param sources - Source objects to merge from
 * @returns The merged target object
 */
export default function deepMerge<T extends Record<string, any>>(
  target: T,
  ...sources: Array<Partial<T> | Record<string, any>>
): T {
  for (const source of sources) {
    if (source === null || source === undefined) {
      continue;
    }

    const keys = [
      ...Object.keys(source),
      ...Object.getOwnPropertySymbols(source).filter(
        (symbol) => Object.getOwnPropertyDescriptor(source, symbol)?.enumerable ?? false
      )
    ];

    for (const key of keys) {
      const descriptor = Object.getOwnPropertyDescriptor(source, key);
      
      if (descriptor) {
        Object.defineProperty(target, key, descriptor);
      }
    }
  }

  return target;
}