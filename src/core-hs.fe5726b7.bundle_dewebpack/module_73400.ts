import { checkCallable } from './check-callable';
import { call } from './call';
import { getPromiseCapability } from './promise-capability';
import { iterate } from './iterate';

interface PromiseCapability<T> {
  promise: Promise<T>;
  resolve: (value: T | PromiseLike<T>) => void;
  reject: (reason?: unknown) => void;
}

interface ErrorResult {
  error: true;
  value: unknown;
}

interface SuccessResult<T> {
  error: false;
  value: T;
}

type TryResult<T> = ErrorResult | SuccessResult<T>;

function performRace<T>(executor: () => void): TryResult<void> {
  try {
    executor();
    return { error: false, value: undefined };
  } catch (error) {
    return { error: true, value: error };
  }
}

export function race<T>(this: PromiseConstructor, iterable: Iterable<T | PromiseLike<T>>): Promise<T> {
  const promiseConstructor = this;
  const capability: PromiseCapability<T> = getPromiseCapability(promiseConstructor);
  const reject = capability.reject;
  
  const result = performRace(() => {
    const resolveFunction = checkCallable(promiseConstructor.resolve);
    
    iterate(iterable, (item: T | PromiseLike<T>) => {
      call(resolveFunction, promiseConstructor, item).then(capability.resolve, reject);
    });
  });
  
  if (result.error) {
    reject(result.value);
  }
  
  return capability.promise;
}