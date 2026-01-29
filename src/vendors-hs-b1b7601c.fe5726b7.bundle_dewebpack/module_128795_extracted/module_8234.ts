import baseGetAllKeys from './baseGetAllKeys';
import getSymbols from './getSymbols';
import keys from './keys';

export default function getAllKeys<T extends object>(object: T): Array<string | symbol> {
  return baseGetAllKeys(object, keys, getSymbols);
}