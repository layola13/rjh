interface PropertyDescriptorMap {
  [key: string]: PropertyDescriptor;
}

type DefinePropertiesFunction = (
  target: object,
  properties: PropertyDescriptorMap
) => object;

const nativeDefineProperties: DefinePropertiesFunction | undefined = 
  typeof Object.defineProperties === 'function' 
    ? Object.defineProperties 
    : undefined;

const hasNativeSupport: boolean = Boolean(nativeDefineProperties);
const requiresPolyfill: boolean = false; // Imported from module 23053

function toObject(value: unknown): object {
  if (value === null || value === undefined) {
    throw new TypeError('Cannot convert undefined or null to object');
  }
  return Object(value);
}

function defineProperty(
  target: object,
  propertyKey: PropertyKey,
  descriptor: PropertyDescriptor
): object {
  Object.defineProperty(target, propertyKey, descriptor);
  return target;
}

function toIndexedObject(value: unknown): object {
  return Object(value);
}

function getOwnPropertyKeys(obj: object): PropertyKey[] {
  return [
    ...Object.getOwnPropertyNames(obj),
    ...Object.getOwnPropertySymbols(obj)
  ];
}

export const defineProperties: DefinePropertiesFunction = 
  hasNativeSupport && !requiresPolyfill
    ? Object.defineProperties
    : function (target: object, properties: PropertyDescriptorMap): object {
        const obj = toObject(target);
        const props = toIndexedObject(properties);
        const keys = getOwnPropertyKeys(properties);
        const keysLength = keys.length;
        
        for (let index = 0; index < keysLength; index++) {
          const key = keys[index];
          const descriptor = props[key as keyof typeof props] as PropertyDescriptor;
          defineProperty(obj, key, descriptor);
        }
        
        return obj;
      };