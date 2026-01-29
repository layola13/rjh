import isNullish from './isNullish';
import castFunction from './castFunction';

export default function getMethod<T extends object, K extends keyof T>(
  object: T,
  key: K
): ((...args: any[]) => any) | undefined {
  const method = object[key];
  return isNullish(method) ? undefined : castFunction(method);
}