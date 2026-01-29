import baseGetTag from './baseGetTag';
import isObjectLike from './isObjectLike';

function isArguments(value: unknown): value is IArguments {
  return isObjectLike(value) && baseGetTag(value) === '[object Arguments]';
}

export default isArguments;