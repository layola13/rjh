import baseGetTag from './baseGetTag';
import isObjectLike from './isObjectLike';

export default function isSet(value: unknown): value is Set<unknown> {
  return isObjectLike(value) && baseGetTag(value) === "[object Set]";
}