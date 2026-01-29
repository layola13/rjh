import hasOwnProperty from './module_791914';
import getOwnPropertyNames from './module_138408';
import getOwnPropertyDescriptor from './module_55264';
import objectDefineProperty from './module_656378';

/**
 * Copies properties from source object(s) to target object
 * @param target - The target object to copy properties to
 * @param source - The source object to copy properties from
 * @param fallback - Optional fallback object to check for properties
 */
export default function copyProperties(
  target: object,
  source: object,
  fallback?: object
): void {
  const propertyNames = getOwnPropertyNames(source);
  const defineProperty = objectDefineProperty.f;
  const getDescriptor = getOwnPropertyDescriptor.f;

  for (let i = 0; i < propertyNames.length; i++) {
    const propertyName = propertyNames[i];
    
    if (
      !hasOwnProperty(target, propertyName) &&
      !(fallback && hasOwnProperty(fallback, propertyName))
    ) {
      defineProperty(target, propertyName, getDescriptor(source, propertyName));
    }
  }
}