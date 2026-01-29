interface PromiseCapability<T> {
  promise: Promise<T>;
  resolve: (value: T | PromiseLike<T>) => void;
  reject: (reason?: unknown) => void;
}

interface PromiseConstructorLike {
  resolve<T>(value: T | PromiseLike<T>): Promise<T>;
}

function promiseRace<T>(
  this: PromiseConstructorLike,
  iterable: Iterable<T | PromiseLike<T>>
): Promise<T> {
  const constructor = this;
  const capability = createPromiseCapability<T>(constructor);
  const reject = capability.reject;

  const executionResult = executeWithErrorCapture(() => {
    const resolveFunction = getMethod(constructor.resolve);
    
    iterateOver(iterable, (item: T | PromiseLike<T>) => {
      callFunction(resolveFunction, constructor, item).then(
        capability.resolve,
        reject
      );
    });
  });

  if (executionResult.error) {
    reject(executionResult.value);
  }

  return capability.promise;
}

function createPromiseCapability<T>(
  constructor: PromiseConstructorLike
): PromiseCapability<T> {
  // Implementation would create and return a promise capability object
  throw new Error('Implementation required');
}

function getMethod(fn: unknown): Function {
  // Implementation would retrieve and validate the method
  throw new Error('Implementation required');
}

function callFunction(
  fn: Function,
  context: unknown,
  ...args: unknown[]
): Promise<unknown> {
  // Implementation would call the function with context
  throw new Error('Implementation required');
}

function iterateOver<T>(
  iterable: Iterable<T>,
  callback: (item: T) => void
): void {
  // Implementation would iterate over the iterable
  throw new Error('Implementation required');
}

function executeWithErrorCapture<T>(
  fn: () => T
): { error: boolean; value?: unknown } {
  try {
    fn();
    return { error: false };
  } catch (error) {
    return { error: true, value: error };
  }
}

export { promiseRace };