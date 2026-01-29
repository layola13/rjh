import baseGetTag from './baseGetTag';
import isObjectLike from './isObjectLike';

export default function isArguments(value: unknown): value is IArguments {
  return isObjectLike(value) && baseGetTag(value) === "[object Arguments]";
}