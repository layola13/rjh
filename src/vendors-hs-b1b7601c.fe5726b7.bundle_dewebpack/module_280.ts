import isPrototype from './module_5726';
import baseKeys from './module_6916';

const hasOwnProperty = Object.prototype.hasOwnProperty;

export default function keys(object: unknown): string[] {
  if (!isPrototype(object)) {
    return baseKeys(object);
  }
  
  const result: string[] = [];
  
  for (const key in Object(object)) {
    if (hasOwnProperty.call(object, key) && key !== 'constructor') {
      result.push(key);
    }
  }
  
  return result;
}