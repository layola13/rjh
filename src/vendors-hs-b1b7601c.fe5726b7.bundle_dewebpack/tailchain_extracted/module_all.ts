interface PromiseResolver<T> {
  resolve: (value: T) => void;
  reject: (reason?: unknown) => void;
  promise: Promise<T>;
}

function promiseAll<T>(iterable: Iterable<T | PromiseLike<T>>): Promise<T[]> {
  const executor = getPromiseExecutor<T[]>(this);
  const { resolve, reject, promise } = executor;

  const executionResult = tryCatch(() => {
    const resolveFunction = getCallable(this.resolve);
    const results: T[] = [];
    let currentIndex = 0;
    let pendingCount = 1;

    iterateOver(iterable, (item: T | PromiseLike<T>) => {
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

  if (executionResult.error) {
    reject(executionResult.value);
  }

  return promise;
}

function getPromiseExecutor<T>(context: unknown): PromiseResolver<T> {
  // Implementation depends on Y function
  throw new Error('Not implemented');
}

function tryCatch<T>(fn: () => T): { error: boolean; value?: unknown } {
  try {
    fn();
    return { error: false };
  } catch (err) {
    return { error: true, value: err };
  }
}

function getCallable(fn: unknown): Function {
  // Implementation depends on g function
  if (typeof fn !== 'function') {
    throw new TypeError('Expected a function');
  }
  return fn;
}

function iterateOver<T>(iterable: Iterable<T>, callback: (item: T) => void): void {
  for (const item of iterable) {
    callback(item);
  }
}