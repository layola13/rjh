interface PropertyDescriptor {
  configurable?: boolean;
  enumerable?: boolean;
  writable?: boolean;
  value?: any;
  get?: () => any;
  set?: (value: any) => void;
}

interface DefinePropertyFunction {
  (target: object, propertyKey: PropertyKey, attributes: PropertyDescriptor): object;
}

const ENUMERABLE = "enumerable";
const CONFIGURABLE = "configurable";
const WRITABLE = "writable";

function isNativeDefinePropertySupported(): boolean {
  // Implementation imported from module 63855
  return typeof Object.defineProperty === 'function';
}

function hasLegacyBehavior(): boolean {
  // Implementation imported from module 73016
  return false;
}

function shouldUseModernDescriptor(): boolean {
  // Implementation imported from module 23053
  return true;
}

function assertIsObject(value: unknown): asserts value is object {
  // Implementation imported from module 77064
  if (typeof value !== 'object' || value === null) {
    throw new TypeError('Value must be an object');
  }
}

function toPropertyKey(key: unknown): PropertyKey {
  // Implementation imported from module 83246
  if (typeof key === 'symbol' || typeof key === 'string') {
    return key;
  }
  return String(key);
}

const nativeDefineProperty = Object.defineProperty;
const nativeGetOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

const modernDefineProperty: DefinePropertyFunction = (
  target: object,
  propertyKey: PropertyKey,
  attributes: PropertyDescriptor
): object => {
  assertIsObject(target);
  const key = toPropertyKey(propertyKey);
  assertIsObject(attributes);

  if (
    typeof target === "function" &&
    key === "prototype" &&
    "value" in attributes &&
    WRITABLE in attributes &&
    !attributes.writable
  ) {
    const existingDescriptor = nativeGetOwnPropertyDescriptor(target, key);
    if (existingDescriptor?.writable) {
      (target as any)[key] = attributes.value;
      attributes = {
        configurable: CONFIGURABLE in attributes ? attributes.configurable : existingDescriptor.configurable,
        enumerable: ENUMERABLE in attributes ? attributes.enumerable : existingDescriptor.enumerable,
        writable: false
      };
    }
  }

  return nativeDefineProperty(target, key, attributes);
};

const fallbackDefineProperty: DefinePropertyFunction = (
  target: object,
  propertyKey: PropertyKey,
  attributes: PropertyDescriptor
): object => {
  assertIsObject(target);
  const key = toPropertyKey(propertyKey);
  assertIsObject(attributes);

  if (hasLegacyBehavior()) {
    try {
      return nativeDefineProperty(target, key, attributes);
    } catch (error) {
      // Continue to fallback implementation
    }
  }

  if ("get" in attributes || "set" in attributes) {
    throw new TypeError("Accessors not supported");
  }

  if ("value" in attributes) {
    (target as any)[key] = attributes.value;
  }

  return target;
};

export const f: DefinePropertyFunction = isNativeDefinePropertySupported()
  ? (shouldUseModernDescriptor() ? modernDefineProperty : nativeDefineProperty)
  : fallbackDefineProperty;