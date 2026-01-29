import { exportToTarget } from './polyfill-export';
import { getBuiltin } from './get-builtin';
import { isNativePromiseSupported } from './feature-detection';
import { PromiseConstructor } from './promise-constructor';
import { PROMISE_CONSTRUCTOR_PATCHED } from './promise-constants';
import { createResolvedPromise } from './promise-resolve';

const NativePromise = getBuiltin('Promise');
const shouldUseNativeResolve = isNativePromiseSupported && !PROMISE_CONSTRUCTOR_PATCHED;

exportToTarget({
  target: 'Promise',
  stat: true,
  forced: isNativePromiseSupported || PROMISE_CONSTRUCTOR_PATCHED
}, {
  resolve: function<T>(value: T | PromiseLike<T>): Promise<T> {
    return createResolvedPromise(
      shouldUseNativeResolve && this === NativePromise ? PromiseConstructor : this,
      value
    );
  }
});