const NOT_FOUND = "NOT_FOUND" as const;

type EqualityCheck<T = any> = (a: T, b: T) => boolean;

interface MemoizeOptions<T = any> {
  equalityCheck?: EqualityCheck<T>;
  maxSize?: number;
  resultEqualityCheck?: EqualityCheck<T>;
}

interface CacheEntry<K, V> {
  key: K;
  value: V;
}

interface Cache<K, V> {
  get(key: K): V | typeof NOT_FOUND;
  put(key: K, value: V): void;
  getEntries(): CacheEntry<K, V>[];
  clear(): void;
}

export const defaultEqualityCheck: EqualityCheck = (a, b) => {
  return a === b;
};

export function createCacheKeyComparator<T>(equalityCheck: EqualityCheck<T>): (a: ArrayLike<T>, b: ArrayLike<T>) => boolean {
  return (currentArgs, nextArgs) => {
    if (currentArgs === null || nextArgs === null || currentArgs.length !== nextArgs.length) {
      return false;
    }
    
    const length = currentArgs.length;
    for (let index = 0; index < length; index++) {
      if (!equalityCheck(currentArgs[index], nextArgs[index])) {
        return false;
      }
    }
    
    return true;
  };
}

function createSingleEntryCache<K, V>(comparator: (a: K, b: K) => boolean): Cache<K, V> {
  let entry: CacheEntry<K, V> | undefined;
  
  return {
    get(key: K): V | typeof NOT_FOUND {
      return entry && comparator(entry.key, key) ? entry.value : NOT_FOUND;
    },
    put(key: K, value: V): void {
      entry = { key, value };
    },
    getEntries(): CacheEntry<K, V>[] {
      return entry ? [entry] : [];
    },
    clear(): void {
      entry = undefined;
    }
  };
}

function createMultiEntryCache<K, V>(maxSize: number, comparator: (a: K, b: K) => boolean): Cache<K, V> {
  const entries: CacheEntry<K, V>[] = [];
  
  function get(key: K): V | typeof NOT_FOUND {
    const index = entries.findIndex(entry => comparator(key, entry.key));
    
    if (index > -1) {
      const entry = entries[index];
      if (index > 0) {
        entries.splice(index, 1);
        entries.unshift(entry);
      }
      return entry.value;
    }
    
    return NOT_FOUND;
  }
  
  function put(key: K, value: V): void {
    if (get(key) === NOT_FOUND) {
      entries.unshift({ key, value });
      if (entries.length > maxSize) {
        entries.pop();
      }
    }
  }
  
  function getEntries(): CacheEntry<K, V>[] {
    return entries;
  }
  
  function clear(): void {
    entries.length = 0;
  }
  
  return { get, put, getEntries, clear };
}

export function defaultMemoize<F extends (...args: any[]) => any>(
  func: F,
  options?: EqualityCheck | MemoizeOptions
): F & { clearCache: () => void } {
  const config: MemoizeOptions = typeof options === "object" ? options : { equalityCheck: options };
  
  const equalityCheck = config.equalityCheck ?? defaultEqualityCheck;
  const maxSize = config.maxSize ?? 1;
  const resultEqualityCheck = config.resultEqualityCheck;
  
  const argsComparator = createCacheKeyComparator(equalityCheck);
  
  const cache: Cache<IArguments, ReturnType<F>> = maxSize === 1
    ? createSingleEntryCache(argsComparator)
    : createMultiEntryCache(maxSize, argsComparator);
  
  function memoized(this: any): ReturnType<F> {
    let result = cache.get(arguments);
    
    if (result === NOT_FOUND) {
      result = func.apply(this, arguments as any);
      
      if (resultEqualityCheck) {
        const existingEntry = cache.getEntries().find(entry => 
          resultEqualityCheck(entry.value, result)
        );
        if (existingEntry) {
          result = existingEntry.value;
        }
      }
      
      cache.put(arguments, result);
    }
    
    return result;
  }
  
  memoized.clearCache = () => cache.clear();
  
  return memoized as F & { clearCache: () => void };
}