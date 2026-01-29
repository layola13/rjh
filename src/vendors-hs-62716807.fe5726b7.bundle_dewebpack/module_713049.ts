import getOwnPropertyNames from './module_842139';
import excludedKeys from './module_668050';

export default Object.keys || function keys(obj: any): string[] {
  return getOwnPropertyNames(obj, excludedKeys);
};