import baseGetTag from './baseGetTag';
import isObjectLike from './isObjectLike';

export default function isMap(value: unknown): value is Map<unknown, unknown> {
  return isObjectLike(value) && baseGetTag(value) === "[object Map]";
}