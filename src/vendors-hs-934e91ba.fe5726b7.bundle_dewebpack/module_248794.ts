import forEach from './79922';
import castFunction from './71373';

export default function forEachRight<T>(
  collection: T[] | Record<string, T> | null | undefined,
  iteratee: (value: T, index: number | string, collection: T[] | Record<string, T>) => void | boolean
): T[] | Record<string, T> | null | undefined {
  return collection && forEach(collection, castFunction(iteratee));
}