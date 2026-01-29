import { exportToGlobal } from './export-util';
import { isNativeImplementation } from './native-check';
import { PROMISE_CONSTRUCTOR_PATCHED } from './promise-flags';
import { NativePromise } from './native-promise';
import { getBuiltin } from './get-builtin';
import { isCallable } from './is-callable';
import { redefineProperty } from './redefine-property';

interface PromiseConstructor {
  prototype: Promise<any>;
}

const nativePromisePrototype = NativePromise?.prototype;

exportToGlobal(
  {
    target: 'Promise',
    proto: true,
    forced: PROMISE_CONSTRUCTOR_PATCHED,
    real: true,
  },
  {
    catch<T>(onRejected?: ((reason: any) => T | PromiseLike<T>) | null): Promise<T> {
      return this.then(void 0, onRejected);
    },
  }
);

if (!isNativeImplementation && isCallable(NativePromise)) {
  const builtinPromiseCatch = getBuiltin('Promise').prototype.catch;
  
  if (nativePromisePrototype.catch !== builtinPromiseCatch) {
    redefineProperty(nativePromisePrototype, 'catch', builtinPromiseCatch, {
      unsafe: true,
    });
  }
}