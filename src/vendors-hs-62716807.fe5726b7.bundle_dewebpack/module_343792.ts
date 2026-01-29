import getSharedStore from './module_367794';
import generateUid from './module_447753';

const sharedKeys = getSharedStore('keys');

export default function getSharedKey(key: string): string {
  return sharedKeys[key] ?? (sharedKeys[key] = generateUid(key));
}