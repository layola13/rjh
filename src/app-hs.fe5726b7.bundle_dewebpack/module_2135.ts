import isPrototype from './module_8518';
import nativeKeys from './module_9813';

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