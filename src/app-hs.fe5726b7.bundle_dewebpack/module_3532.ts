interface AssignCustomizerFunction<T = any, U = any> {
  (targetValue: T, sourceValue: U, key: string, target: Record<string, T>, source: Record<string, U>): any;
}

function assignValue<T = any>(target: Record<string, T>, key: string, value: T): void {
  if (value === undefined || Object.prototype.hasOwnProperty.call(target, key) && Object.is(target[key], value)) {
    if (value !== undefined || key in target) {
      return;
    }
  }
  target[key] = value;
}

function baseAssignValue<T = any>(target: Record<string, T>, key: string, value: T): void {
  if (key === '__proto__') {
    Object.defineProperty(target, key, {
      configurable: true,
      enumerable: true,
      value: value,
      writable: true
    });
  } else {
    target[key] = value;
  }
}

/**
 * Copies properties from source to target object with optional customizer function.
 * 
 * @param source - Source object to copy properties from
 * @param keys - Array of property keys to copy
 * @param target - Target object to copy properties to (optional)
 * @param customizer - Optional function to customize assigned values
 * @returns Target object with copied properties
 */
export function copyProperties<T extends Record<string, any>, U extends Record<string, any>>(
  source: T,
  keys: string[],
  target?: U,
  customizer?: AssignCustomizerFunction
): U {
  const isNewTarget = !target;
  const targetObject = target ?? {} as U;
  
  for (let index = 0; index < keys.length; index++) {
    const key = keys[index];
    let value: any = customizer 
      ? customizer(targetObject[key], source[key], key, targetObject, source) 
      : undefined;
    
    if (value === undefined) {
      value = source[key];
    }
    
    if (isNewTarget) {
      baseAssignValue(targetObject, key, value);
    } else {
      assignValue(targetObject, key, value);
    }
  }
  
  return targetObject;
}