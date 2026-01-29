import isArray from './isArray';
import isKey from './isKey';
import stringToPath from './stringToPath';
import toString from './toString';

function castPath(value: unknown, object: unknown): string[] | unknown[] {
  if (isArray(value)) {
    return value;
  }
  return isKey(value, object) ? [value] : stringToPath(toString(value));
}

export default castPath;