import { asFunctionCall } from './14709';
import { callFunction } from './948496';
import { ensureCallable } from './61177';
import { createPromiseCapability } from './109532';
import { tryCatch } from './514498';
import { iterate } from './132481';

interface SettledResult<T> {
  status: 'fulfilled' | 'rejected';
  value?: T;
  reason?: unknown;
}

interface PromiseCapability<T> {
  promise: Promise<T>;
  resolve: (value: T) => void;
  reject: (reason: unknown) => void;
}

interface TryCatchResult<T> {
  error: boolean;
  value: T;
}

asFunctionCall({
  target: 'Promise',
  stat: true,
  forced: require('./971964')
}, {
  allSettled: function<T>(iterable: Iterable<T | PromiseLike<T>>): Promise<SettledResult<T>[]> {
    const promiseConstructor = this as PromiseConstructor;
    const capability: PromiseCapability<SettledResult<T>[]> = createPromiseCapability.f(promiseConstructor);
    const resolve = capability.resolve;
    const reject = capability.reject;
    
    const result: TryCatchResult<void> = tryCatch(() => {
      const resolveMethod = ensureCallable(promiseConstructor.resolve);
      const results: SettledResult<T>[] = [];
      let index = 0;
      let remainingCount = 1;
      
      iterate(iterable, (element: T | PromiseLike<T>) => {
        const currentIndex = index++;
        let alreadySettled = false;
        
        remainingCount++;
        
        callFunction(resolveMethod, promiseConstructor, element).then(
          (value: T) => {
            if (alreadySettled) return;
            alreadySettled = true;
            results[currentIndex] = {
              status: 'fulfilled',
              value: value
            };
            remainingCount--;
            if (remainingCount === 0) {
              resolve(results);
            }
          },
          (reason: unknown) => {
            if (alreadySettled) return;
            alreadySettled = true;
            results[currentIndex] = {
              status: 'rejected',
              reason: reason
            };
            remainingCount--;
            if (remainingCount === 0) {
              resolve(results);
            }
          }
        );
      });
      
      remainingCount--;
      if (remainingCount === 0) {
        resolve(results);
      }
    });
    
    if (result.error) {
      reject(result.value);
    }
    
    return capability.promise;
  }
});