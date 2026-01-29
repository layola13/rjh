const hasOwnProperty = (obj: object, key: PropertyKey): boolean => {
  return Object.prototype.hasOwnProperty.call(obj, key);
};

const isCallable = (value: unknown): value is Function => {
  return typeof value === 'function';
};

const toObject = (value: unknown): object => {
  if (value == null) {
    throw new TypeError('Cannot convert undefined or null to object');
  }
  return Object(value);
};

const getSharedKey = (key: string): symbol | string => {
  // Placeholder for shared key mechanism (e.g., Symbol registry or string constant)
  return Symbol.for(`IE_PROTO_${key}`);
};

const IE_PROTO = getSharedKey('IE_PROTO');

const nativeGetPrototypeOf = Object.getPrototypeOf;

const supportsNativeGetPrototypeOf = typeof nativeGetPrototypeOf === 'function';

const objectPrototype = Object.prototype;

export const getPrototypeOf = (target: unknown): object | null => {
  const obj = toObject(target);
  
  if (hasOwnProperty(obj, IE_PROTO)) {
    return (obj as any)[IE_PROTO] as object | null;
  }
  
  const constructor = (obj as any).constructor;
  
  if (isCallable(constructor) && obj instanceof constructor) {
    return constructor.prototype as object | null;
  }
  
  if (obj instanceof Object) {
    return objectPrototype;
  }
  
  return null;
};

export default supportsNativeGetPrototypeOf ? nativeGetPrototypeOf : getPrototypeOf;