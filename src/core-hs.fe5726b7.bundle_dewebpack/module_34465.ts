import { exportToGlobal } from './utils/export';
import { getBuiltIn } from './utils/get-builtin';
import { isNativePromise } from './utils/is-native';
import { PromiseConstructor } from './constructors/promise';
import { PROMISE_CONSTRUCTOR_PATCHED } from './constants/flags';
import { promiseResolve } from './promise/resolve';

const NativePromise = getBuiltIn('Promise');
const shouldUseNativeResolve = isNativePromise && !PROMISE_CONSTRUCTOR_PATCHED;

exportToGlobal({
  target: 'Promise',
  stat: true,
  forced: isNativePromise || PROMISE_CONSTRUCTOR_PATCHED
}, {
  resolve: function <T>(value: T | PromiseLike<T>): Promise<T> {
    return promiseResolve(
      shouldUseNativeResolve && this === NativePromise 
        ? PromiseConstructor 
        : this,
      value
    );
  }
});