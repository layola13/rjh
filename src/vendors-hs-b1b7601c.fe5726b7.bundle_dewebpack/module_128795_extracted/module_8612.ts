import isFunction from './isFunction';
import isLength from './isLength';

export default function isArrayLike(value: unknown): value is ArrayLike<unknown> {
  return value != null && isLength((value as any).length) && !isFunction(value);
}