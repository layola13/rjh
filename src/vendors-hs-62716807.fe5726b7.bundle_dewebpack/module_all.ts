interface PromiseCapability<T> {
  promise: Promise<T>;
  resolve: (value: T) => void;
  reject: (reason?: unknown) => void;
}

interface TryResult<T> {
  error: boolean;
  value?: T;
}

declare function getPromiseCapability<T>(constructor: PromiseConstructor): PromiseCapability<T>;
declare function iterateOver<T>(iterable: Iterable<T>, callback: (item: T) => void): void;
declare function callPromiseThen<T, U>(
  promiseThen: (value: T) => Promise<U>,
  context: unknown,
  value: T
): Promise<U>;
declare function tryCatch<T>(fn: () => T): TryResult<T>;
declare function checkCallable(value: unknown): (value: unknown) => Promise<unknown>;

function promiseAll<T>(this: PromiseConstructor, iterable: Iterable<T | PromiseLike<T>>): Promise<T[]> {
  const constructor = this;
  const capability = getPromiseCapability<T[]>(constructor);
  const { resolve, reject } = capability;

  const executionResult = tryCatch(() => {
    const resolveFunction = checkCallable(constructor.resolve);
    const results: T[] = [];
    let currentIndex = 0;
    let remainingElements = 1;

    iterateOver(iterable, (element) => {
      const elementIndex = currentIndex++;
      let alreadyResolved = false;

      remainingElements++;
      callPromiseThen(resolveFunction, constructor, element).then(
        (value) => {
          if (alreadyResolved) return;
          alreadyResolved = true;
          results[elementIndex] = value;
          remainingElements--;
          if (remainingElements === 0) {
            resolve(results);
          }
        },
        reject
      );
    });

    remainingElements--;
    if (remainingElements === 0) {
      resolve(results);
    }
  });

  if (executionResult.error) {
    reject(executionResult.value);
  }

  return capability.promise;
}