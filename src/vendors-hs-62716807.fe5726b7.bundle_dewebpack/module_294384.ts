import { defineGlobal } from './14709';
import { callFunction } from './948496';
import { createPromiseCapability } from './109532';
import { getPromiseIssues } from './128205';

interface PromiseCapability<T> {
  promise: Promise<T>;
  resolve: (value: T | PromiseLike<T>) => void;
  reject: (reason?: unknown) => void;
}

defineGlobal({
  target: "Promise",
  stat: true,
  forced: getPromiseIssues().CONSTRUCTOR
}, {
  reject: function<T = never>(reason?: unknown): Promise<T> {
    const capability: PromiseCapability<T> = createPromiseCapability.f(this);
    callFunction(capability.reject, undefined, reason);
    return capability.promise;
  }
});