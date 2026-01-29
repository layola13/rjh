interface PromiseResolution<T> {
  resolve: (value: T[] | PromiseLike<T[]>) => void;
  reject: (reason?: unknown) => void;
  promise: Promise<T[]>;
}

function promiseAll<T>(iterable: Iterable<T | PromiseLike<T>>): Promise<T[]> {
  const executor = getPromiseExecutor<T[]>(this);
  const resolve = executor.resolve;
  const reject = executor.reject;

  const result = tryCatch(() => {
    const resolveFunction = getFunction(this.resolve);
    const results: T[] = [];
    let currentIndex = 0;
    let pendingCount = 1;

    iterate(iterable, (item: T | PromiseLike<T>) => {
      const itemIndex = currentIndex++;
      let isResolved = false;

      results.push(undefined as T);
      pendingCount++;

      resolveFunction.call(this, item).then(
        (value: T) => {
          if (!isResolved) {
            isResolved = true;
            results[itemIndex] = value;
            pendingCount--;
            if (pendingCount === 0) {
              resolve(results);
            }
          }
        },
        reject
      );
    });

    pendingCount--;
    if (pendingCount === 0) {
      resolve(results);
    }
  });

  if (result.error) {
    reject(result.value);
  }

  return executor.promise;
}

function getPromiseExecutor<T>(context: unknown): PromiseResolution<T> {
  // Implementation depends on the actual Y function
  throw new Error('Not implemented');
}

function getFunction(fn: unknown): Function {
  // Implementation depends on the actual g function
  throw new Error('Not implemented');
}

function tryCatch<T>(fn: () => T): { error: boolean; value?: unknown } {
  // Implementation depends on the actual T function
  throw new Error('Not implemented');
}

function iterate<T>(iterable: Iterable<T>, callback: (item: T) => void): void {
  // Implementation depends on the actual _ function
  throw new Error('Not implemented');
}