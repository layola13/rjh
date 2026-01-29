import getOwnPropertyNames from './module_34701';
import excludedKeys from './module_22352';

function objectKeys(obj: object): string[] {
  return getOwnPropertyNames(obj, excludedKeys);
}

export default Object.keys || objectKeys;