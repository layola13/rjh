interface PromiseCapability<T> {
  promise: Promise<T>;
  resolve: (value: T | PromiseLike<T>) => void;
  reject: (reason?: unknown) => void;
}

class PromiseCapabilityRecord<T> implements PromiseCapability<T> {
  promise: Promise<T>;
  resolve: (value: T | PromiseLike<T>) => void;
  reject: (reason?: unknown) => void;

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

    if (typeof resolveFunc !== 'function') {
      throw new TypeError("Promise resolver is not a function");
    }
    if (typeof rejectFunc !== 'function') {
      throw new TypeError("Promise rejecter is not a function");
    }

    this.resolve = resolveFunc;
    this.reject = rejectFunc;
  }
}

export function createPromiseCapability<T>(
  promiseConstructor: PromiseConstructor
): PromiseCapability<T> {
  return new PromiseCapabilityRecord<T>(promiseConstructor);
}