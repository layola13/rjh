import { exportToGlobal } from './polyfill-exporter';
import { call } from './function-call-helper';
import { createPromiseCapability } from './promise-capability';
import { PROMISE_CONSTRUCTOR_CONFIG } from './promise-constructor-config';

interface PromiseCapability<T> {
  promise: Promise<T>;
  resolve: (value: T | PromiseLike<T>) => void;
  reject: (reason?: unknown) => void;
}

interface PromiseConstructor {
  reject<T = never>(reason?: unknown): Promise<T>;
}

exportToGlobal({
  target: "Promise",
  stat: true,
  forced: PROMISE_CONSTRUCTOR_CONFIG.CONSTRUCTOR
}, {
  reject: function <T = never>(this: PromiseConstructor, reason?: unknown): Promise<T> {
    const capability: PromiseCapability<T> = createPromiseCapability.f(this);
    call(capability.reject, undefined, reason);
    return capability.promise;
  }
});