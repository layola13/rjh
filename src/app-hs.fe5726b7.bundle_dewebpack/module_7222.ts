import getTag from './getTag';
import isArray from './isArray';
import isObjectLike from './isObjectLike';

export default function isString(value: unknown): value is string {
  return typeof value === 'string' || (!isArray(value) && isObjectLike(value) && getTag(value) === '[object String]');
}