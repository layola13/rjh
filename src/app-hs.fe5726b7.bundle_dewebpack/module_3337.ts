type CacheFunction<T, R> = {
  (input: T): R;
  cache: Map<T, R>;
};

function createMemoizedFunction<T, R>(
  func: (input: T) => R
): CacheFunction<T, R> {
  const memoize = require('./memoize'); // Replace with actual memoize import path
  
  const memoized = memoize(func, (input: T) => {
    if (memoized.cache.size === 500) {
      memoized.cache.clear();
    }
    return input;
  });
  
  return memoized;
}

export default createMemoizedFunction;