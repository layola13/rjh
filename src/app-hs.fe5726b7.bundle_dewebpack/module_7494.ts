type IterateeFunction<T> = (value: T, index: number, array: T[]) => boolean | void;

type BaseIteratorFunction = <T>(
  collection: T[] | Record<string, T>,
  iteratee: IterateeFunction<T>
) => T[] | Record<string, T>;

type IsArrayLikeFunction = (value: unknown) => boolean;

export default function createBaseFor(
  baseIterator: BaseIteratorFunction,
  isArrayLike: IsArrayLikeFunction,
  fromRight: boolean
): <T>(collection: T[] | Record<string, T> | null | undefined, iteratee: IterateeFunction<T>) => T[] | Record<string, T> | null | undefined {
  return function<T>(
    collection: T[] | Record<string, T> | null | undefined,
    iteratee: IterateeFunction<T>
  ): T[] | Record<string, T> | null | undefined {
    if (collection == null) {
      return collection;
    }

    if (!isArrayLike(collection)) {
      return baseIterator(collection, iteratee);
    }

    const length = (collection as T[]).length;
    let index = fromRight ? length : -1;
    const object = Object(collection) as Record<number, T>;

    while ((fromRight ? index-- : ++index < length) && iteratee(object[index], index, object as any) !== false) {
      // Continue iteration
    }

    return collection;
  };
}