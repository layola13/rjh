import getOwnPropertySymbols from './module_3550';
import isArrayLike from './module_341';
import arrayLikeKeys from './module_5870';

export default function keys(value: any): string[] | symbol[] {
  return isArrayLike(value) ? arrayLikeKeys(value) : getOwnPropertySymbols(value);
}