import { exportToGlobal } from './utils/export';
import { callFunction } from './utils/function-helpers';
import { isCallable } from './utils/type-checks';
import { getPromiseCapability } from './promise/capability';
import { tryCall } from './utils/try-catch';
import { iterate } from './utils/iteration';

interface PromiseCapability<T> {
  promise: Promise<T>;
  resolve: (value: T) => void;
  reject: (reason: unknown) => void;
}

interface TryCallResult<T> {
  error: boolean;
  value: T;
}

exportToGlobal({
  target: 'Promise',
  stat: true,
  forced: shouldForcePolyfill()
}, {
  all: function <T>(iterable: Iterable<T | PromiseLike<T>>): Promise<T[]> {
    const promiseConstructor = this as PromiseConstructor;
    const capability: PromiseCapability<T[]> = getPromiseCapability(promiseConstructor);
    const { resolve: resolveAll, reject: rejectAll } = capability;
    
    const result: TryCallResult<void> = tryCall(() => {
      const resolveMethod = isCallable(promiseConstructor.resolve);
      const results: T[] = [];
      let completedCount = 0;
      let pendingCount = 1;
      
      iterate(iterable, (item: T | PromiseLike<T>) => {
        const currentIndex = completedCount++;
        let alreadyResolved = false;
        
        pendingCount++;
        callFunction(resolveMethod, promiseConstructor, item).then(
          (value: T) => {
            if (alreadyResolved) return;
            alreadyResolved = true;
            results[currentIndex] = value;
            pendingCount--;
            if (pendingCount === 0) {
              resolveAll(results);
            }
          },
          rejectAll
        );
      });
      
      pendingCount--;
      if (pendingCount === 0) {
        resolveAll(results);
      }
    });
    
    if (result.error) {
      rejectAll(result.value);
    }
    
    return capability.promise;
  }
});

function shouldForcePolyfill(): boolean {
  // Implementation would check if native Promise.all needs to be polyfilled
  return true;
}