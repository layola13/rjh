import isConstructor from './isConstructor';
import isObject from './isObject';
import newPromiseCapability from './newPromiseCapability';

export default function promiseResolve<T>(
  constructor: PromiseConstructor,
  value: T | PromiseLike<T>
): Promise<T> {
  if (!isConstructor(constructor)) {
    throw new TypeError('Constructor must be a valid constructor');
  }

  if (isObject(value) && value.constructor === constructor) {
    return value as Promise<T>;
  }

  const promiseCapability = newPromiseCapability.f(constructor);
  promiseCapability.resolve(value);
  
  return promiseCapability.promise;
}