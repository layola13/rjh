import getTag from './getTag';
import getLength from './getLength';
import isArrayLike from './isArrayLike';

export default function toArray<T>(value: T): T extends ArrayLike<infer U> ? U[] : any[] {
  return isArrayLike(value) ? getTag(value) : getLength(value);
}