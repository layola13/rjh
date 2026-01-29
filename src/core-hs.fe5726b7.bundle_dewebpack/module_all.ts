interface PromiseCapability<T> {
  resolve: (value: T) => void;
  reject: (reason?: unknown) => void;
  promise: Promise<T>;
}

interface TryResult<T> {
  error: boolean;
  value: T;
}

async function promiseAll<T>(
  iterable: Iterable<T | PromiseLike<T>>
): Promise<T[]> {
  const capability = createPromiseCapability<T[]>();
  const { resolve, reject } = capability;

  const tryResult = executeSafely(() => {
    const resolveFunction = getPromiseResolve(this);
    const results: T[] = [];
    let index = 0;
    let remainingCount = 1;

    forEach(iterable, (element: T | PromiseLike<T>) => {
      const currentIndex = index++;
      let alreadyResolved = false;

      remainingCount++;
      callPromiseResolve(resolveFunction, this, element).then(
        (value: T) => {
          if (alreadyResolved) return;
          alreadyResolved = true;
          results[currentIndex] = value;
          remainingCount--;
          if (remainingCount === 0) {
            resolve(results);
          }
        },
        reject
      );
    });

    remainingCount--;
    if (remainingCount === 0) {
      resolve(results);
    }
  });

  if (tryResult.error) {
    reject(tryResult.value);
  }

  return capability.promise;
}

function createPromiseCapability<T>(): PromiseCapability<T> {
  throw new Error('Implementation required');
}

function getPromiseResolve(constructor: unknown): Function {
  throw new Error('Implementation required');
}

function executeSafely<T>(fn: () => void): TryResult<T> {
  throw new Error('Implementation required');
}

function forEach<T>(
  iterable: Iterable<T>,
  callback: (item: T) => void
): void {
  throw new Error('Implementation required');
}

function callPromiseResolve<T>(
  resolveFunction: Function,
  constructor: unknown,
  value: T | PromiseLike<T>
): Promise<T> {
  throw new Error('Implementation required');
}