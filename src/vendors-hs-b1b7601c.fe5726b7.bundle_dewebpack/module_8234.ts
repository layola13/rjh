import getAllKeys from './module_8866';
import getSymbols from './module_9551';
import keys from './module_3674';

export default function(value: unknown): PropertyKey[] {
  return getAllKeys(value, keys, getSymbols);
}