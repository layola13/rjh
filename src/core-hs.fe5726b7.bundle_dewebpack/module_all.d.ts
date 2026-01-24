/**
 * Promise.all polyfill/implementation
 * Waits for all promises in an iterable to resolve, or rejects if any promise rejects.
 * 
 * @template T - The type of values the promises resolve to
 * @param iterable - An iterable of promises or values
 * @returns A promise that resolves to an array of resolved values
 */
function promiseAll<T>(iterable: Iterable<T | PromiseLike<T>>): Promise<T[]> {
  const executor = this;
  const deferredPromise = createDeferred<T[]>(executor);
  const { resolve: resolveAll, reject: rejectAll } = deferredPromise;

  const executionResult = tryCatch(() => {
    const resolveFunction = ensureFunction(executor.resolve);
    const results: T[] = [];
    let currentIndex = 0;
    let remainingPromises = 1;

    iterate(iterable, (value: T | PromiseLike<T>) => {
      const resultIndex = currentIndex++;
      let hasSettled = false;

      remainingPromises++;
      
      call(resolveFunction, executor, value).then(
        (resolvedValue: T) => {
          if (hasSettled) return;
          
          hasSettled = true;
          results[resultIndex] = resolvedValue;
          remainingPromises--;
          
          if (remainingPromises === 0) {
            resolveAll(results);
          }
        },
        rejectAll
      );
    });

    remainingPromises--;
    
    if (remainingPromises === 0) {
      resolveAll(results);
    }
  });

  if (executionResult.error) {
    rejectAll(executionResult.value);
  }

  return deferredPromise.promise;
}

interface Deferred<T> {
  promise: Promise<T>;
  resolve: (value: T) => void;
  reject: (reason?: unknown) => void;
}

interface TryCatchResult<T> {
  error: boolean;
  value?: T;
}