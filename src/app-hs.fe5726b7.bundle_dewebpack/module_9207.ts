class Cache<K, V> extends Map<K, V> {}

interface MemoizedFunction<T extends (...args: any[]) => any> {
  (...args: Parameters<T>): ReturnType<T>;
  cache: Map<any, ReturnType<T>>;
}

function memoize<T extends (...args: any[]) => any>(
  func: T,
  resolver?: (...args: Parameters<T>) => any
): MemoizedFunction<T> {
  if (typeof func !== "function" || (resolver != null && typeof resolver !== "function")) {
    throw new TypeError("Expected a function");
  }

  const memoized = function (this: any, ...args: Parameters<T>): ReturnType<T> {
    const key = resolver ? resolver.apply(this, args) : args[0];
    const cache = memoized.cache;

    if (cache.has(key)) {
      return cache.get(key)!;
    }

    const result = func.apply(this, args);
    memoized.cache = cache.set(key, result) || cache;
    return result;
  } as MemoizedFunction<T>;

  memoized.cache = new (memoize.Cache || Cache)();
  return memoized;
}

memoize.Cache = Cache;

export default memoize;