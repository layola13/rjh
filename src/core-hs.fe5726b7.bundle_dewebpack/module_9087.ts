import isNullish from './isNullish';
import aFunction from './aFunction';

export default function getMethod<T extends object, K extends keyof T>(
  object: T,
  key: K
): T[K] extends Function ? T[K] : undefined {
  const method = object[key];
  return isNullish(method) ? undefined : aFunction(method);
}