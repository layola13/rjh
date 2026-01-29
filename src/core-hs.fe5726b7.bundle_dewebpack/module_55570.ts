import getSharedStore from './module_80880';
import generateUid from './module_38251';

const keys = getSharedStore('keys');

export default function getSharedKey(key: string): string {
  return keys[key] || (keys[key] = generateUid(key));
}