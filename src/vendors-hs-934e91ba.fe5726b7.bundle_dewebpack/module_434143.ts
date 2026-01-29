import getTag from './getTag';
import isObjectLike from './isObjectLike';

export default function isSet(value: unknown): value is Set<unknown> {
  return isObjectLike(value) && getTag(value) === "[object Set]";
}