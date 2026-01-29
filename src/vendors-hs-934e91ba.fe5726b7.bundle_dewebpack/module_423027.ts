import isPrototype from './module_172834';
import nativeKeys from './module_616633';

const hasOwnProperty = Object.prototype.hasOwnProperty;

export default function keys(object: unknown): string[] {
  if (!isPrototype(object)) {
    return nativeKeys(object);
  }
  
  const result: string[] = [];
  
  for (const key in Object(object)) {
    if (hasOwnProperty.call(object, key) && key !== 'constructor') {
      result.push(key);
    }
  }
  
  return result;
}