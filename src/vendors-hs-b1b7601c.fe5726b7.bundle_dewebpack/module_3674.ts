import baseKeys from './baseKeys';
import getTag from './getTag';
import isArrayLike from './isArrayLike';

function keys(value: unknown): string[] {
  return isArrayLike(value) ? baseKeys(value) : getTag(value);
}

export default keys;