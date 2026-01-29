async function race<T>(iterable: Iterable<T | PromiseLike<T>>): Promise<T> {
  const deferredPromise = createDeferredPromise<T>();
  const { reject, resolve } = deferredPromise;

  try {
    const resolveFunction = getResolveFunction(this);
    
    iterateOver(iterable, (item: T | PromiseLike<T>) => {
      resolveFunction.call(this, item).then(resolve, reject);
    });
  } catch (error) {
    reject(error);
  }

  return deferredPromise.promise;
}

interface DeferredPromise<T> {
  promise: Promise<T>;
  resolve: (value: T | PromiseLike<T>) => void;
  reject: (reason?: unknown) => void;
}

function createDeferredPromise<T>(): DeferredPromise<T> {
  let resolve!: (value: T | PromiseLike<T>) => void;
  let reject!: (reason?: unknown) => void;
  
  const promise = new Promise<T>((res, rej) => {
    resolve = res;
    reject = rej;
  });
  
  return { promise, resolve, reject };
}

function getResolveFunction(context: unknown): Function {
  return (context as any).resolve;
}

function iterateOver<T>(
  iterable: Iterable<T>,
  callback: (item: T) => void
): void {
  for (const item of iterable) {
    callback(item);
  }
}