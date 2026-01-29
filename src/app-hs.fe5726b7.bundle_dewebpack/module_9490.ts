import isArrayLike from './isArrayLike';
import isObjectLike from './isObjectLike';

export default function(value: unknown): boolean {
  return isObjectLike(value) && isArrayLike(value);
}