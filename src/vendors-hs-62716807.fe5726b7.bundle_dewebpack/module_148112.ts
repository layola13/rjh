interface PromiseConstructor {
  all<T>(values: Iterable<T | PromiseLike<T>>): Promise<Awaited<T>[]>;
}

interface PromiseCapability<T> {
  promise: Promise<T>;
  resolve: (value: T | PromiseLike<T>) => void;
  reject: (reason?: unknown) => void;
}

interface DeferredResult<T> {
  error: boolean;
  value?: T;
}

function asFunctionCheck(value: unknown): Function {
  if (typeof value !== 'function') {
    throw new TypeError('Value is not a function');
  }
  return value as Function;
}

function callFunction<T, A extends unknown[]>(
  fn: (...args: A) => T,
  thisArg: unknown,
  ...args: A
): T {
  return fn.apply(thisArg, args);
}

function createPromiseCapability<T>(constructor: PromiseConstructor): PromiseCapability<T> {
  let resolve!: (value: T | PromiseLike<T>) => void;
  let reject!: (reason?: unknown) => void;

  const promise = new Promise<T>((res, rej) => {
    resolve = res;
    reject = rej;
  });

  return { promise, resolve, reject };
}

function performDeferred<T>(executor: () => T): DeferredResult<T> {
  try {
    return { error: false, value: executor() };
  } catch (error) {
    return { error: true, value: error as T };
  }
}

function iterate<T>(
  iterable: Iterable<T>,
  callback: (item: T) => void
): void {
  for (const item of iterable) {
    callback(item);
  }
}

Promise.all = function all<T>(
  this: PromiseConstructor,
  values: Iterable<T | PromiseLike<T>>
): Promise<Awaited<T>[]> {
  const promiseConstructor = this;
  const capability = createPromiseCapability<Awaited<T>[]>(promiseConstructor);
  const { resolve, reject } = capability;

  const deferredResult = performDeferred(() => {
    const resolveFunction = asFunctionCheck(promiseConstructor.resolve);
    const results: Awaited<T>[] = [];
    let index = 0;
    let remaining = 1;

    iterate(values, (value) => {
      const currentIndex = index++;
      let alreadyResolved = false;

      remaining++;
      callFunction(resolveFunction, promiseConstructor, value).then(
        (result: Awaited<T>) => {
          if (alreadyResolved) return;
          alreadyResolved = true;
          results[currentIndex] = result;
          remaining--;
          if (remaining === 0) {
            resolve(results);
          }
        },
        reject
      );
    });

    remaining--;
    if (remaining === 0) {
      resolve(results);
    }
  });

  if (deferredResult.error) {
    reject(deferredResult.value);
  }

  return capability.promise;
};