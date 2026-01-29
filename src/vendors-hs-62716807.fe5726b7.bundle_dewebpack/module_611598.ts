import isKey from './isKey';
import baseGet from './baseGet';

export default function get<T = any>(object: any, path: PropertyKey | PropertyKey[], defaultValue?: T): T {
  return object && !isKey(path) ? baseGet(object, path) : defaultValue as T;
}