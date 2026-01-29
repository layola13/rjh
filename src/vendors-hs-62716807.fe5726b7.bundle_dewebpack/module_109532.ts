interface PromiseCapability<T> {
  promise: Promise<T>;
  resolve: (value: T | PromiseLike<T>) => void;
  reject: (reason?: unknown) => void;
}

class PromiseCapabilityRecord<T> implements PromiseCapability<T> {
  public promise: Promise<T>;
  public resolve!: (value: T | PromiseLike<T>) => void;
  public reject!: (reason?: unknown) => void;

  constructor(promiseConstructor: PromiseConstructor) {
    let resolveFunc: ((value: T | PromiseLike<T>) => void) | undefined;
    let rejectFunc: ((reason?: unknown) => void) | undefined;

    this.promise = new promiseConstructor<T>((resolve, reject) => {
      if (resolveFunc !== undefined || rejectFunc !== undefined) {
        throw new TypeError("Bad Promise constructor");
      }
      resolveFunc = resolve;
      rejectFunc = reject;
    });

    this.resolve = aCallable(resolveFunc);
    this.reject = aCallable(rejectFunc);
  }
}

function aCallable<T extends Function>(value: T | undefined): T {
  if (typeof value !== 'function') {
    throw new TypeError('Value is not callable');
  }
  return value;
}

export function createPromiseCapability<T>(promiseConstructor: PromiseConstructor): PromiseCapability<T> {
  return new PromiseCapabilityRecord<T>(promiseConstructor);
}