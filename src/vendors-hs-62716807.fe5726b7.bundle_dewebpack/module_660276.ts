import { exportToGlobal } from './export-utils';
import { isNativePromise } from './promise-detection';
import { PROMISE_CONSTRUCTOR_PATCHED } from './promise-constants';
import { NativePromise } from './native-promise';
import { getBuiltIn } from './get-built-in';
import { isCallable } from './is-callable';
import { redefineProperty } from './redefine-property';

const nativePromisePrototype = NativePromise?.prototype;

exportToGlobal(
  {
    target: 'Promise',
    proto: true,
    forced: PROMISE_CONSTRUCTOR_PATCHED,
    real: true
  },
  {
    catch: function <T, TResult = never>(
      this: Promise<T>,
      onRejected?: ((reason: unknown) => TResult | PromiseLike<TResult>) | undefined | null
    ): Promise<T | TResult> {
      return this.then(undefined, onRejected);
    }
  }
);

if (!isNativePromise && isCallable(NativePromise)) {
  const builtInPromiseCatch = getBuiltIn('Promise').prototype.catch;
  
  if (nativePromisePrototype.catch !== builtInPromiseCatch) {
    redefineProperty(nativePromisePrototype, 'catch', builtInPromiseCatch, {
      unsafe: true
    });
  }
}