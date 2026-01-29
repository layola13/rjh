function getOwnPropertyNames(value: unknown): string[] {
  if (!isPrototype(value)) {
    return getNativeKeys(value);
  }
  
  const result: string[] = [];
  
  for (const key in Object(value)) {
    if (hasOwnProperty.call(value, key) && key !== 'constructor') {
      result.push(key);
    }
  }
  
  return result;
}

const hasOwnProperty = Object.prototype.hasOwnProperty;

// Note: These functions are assumed to be imported from other modules
// Replace with actual imports based on your module structure:
// import { isPrototype } from './module_5726';
// import { getNativeKeys } from './module_6916';

declare function isPrototype(value: unknown): boolean;
declare function getNativeKeys(value: unknown): string[];

export default getOwnPropertyNames;