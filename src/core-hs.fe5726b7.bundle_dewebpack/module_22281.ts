import isConstructor from './isConstructor';
import isObject from './isObject';
import createPromiseCapability from './createPromiseCapability';

export default function promiseResolve<T>(
  constructor: PromiseConstructor,
  value: T | PromiseLike<T>
): Promise<T> {
  if (!isConstructor(constructor)) {
    throw new TypeError('Constructor is not a valid constructor');
  }

  if (isObject(value) && value.constructor === constructor) {
    return value as Promise<T>;
  }

  const promiseCapability = createPromiseCapability<T>(constructor);
  promiseCapability.resolve(value);
  return promiseCapability.promise;
}