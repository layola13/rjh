import hasOwnProperty from './module_98324';
import getOwnPropertyNames from './module_88442';
import getOwnPropertyDescriptor from './module_1726';
import defineProperty from './module_66484';

/**
 * Copies properties from source object(s) to target object
 * @param target - The target object to copy properties to
 * @param source - The source object to copy properties from
 * @param fallbackSource - Optional fallback source object
 */
export function copyProperties(
  target: object,
  source: object,
  fallbackSource?: object
): void {
  const propertyNames = getOwnPropertyNames(source);
  const define = defineProperty.f;
  const getDescriptor = getOwnPropertyDescriptor.f;

  for (let index = 0; index < propertyNames.length; index++) {
    const propertyName = propertyNames[index];
    
    if (
      !hasOwnProperty(target, propertyName) &&
      (!fallbackSource || !hasOwnProperty(fallbackSource, propertyName))
    ) {
      define(target, propertyName, getDescriptor(source, propertyName));
    }
  }
}

export default copyProperties;