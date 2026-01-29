import isObjectLike from './isObjectLike';
import isArrayLikeObject from './isArrayLikeObject';

export default function(value: unknown): boolean {
  return isArrayLikeObject(value) && isObjectLike(value);
}