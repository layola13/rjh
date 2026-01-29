interface PropertyDescriptor {
  value?: any;
  writable?: boolean;
  enumerable?: boolean;
  configurable?: boolean;
  get?(): any;
  set?(v: any): void;
}

function getOwnPropertyDescriptorPolyfill(
  target: object,
  property: PropertyKey
): PropertyDescriptor | undefined {
  const hasNativeSupport = typeof Object.getOwnPropertyDescriptor === 'function';
  const nativeGetOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
  
  const toIndexedObject = (obj: any): object => obj;
  const toPropertyKey = (key: any): PropertyKey => key;
  const hasOwnProperty = (obj: object, prop: PropertyKey): boolean => 
    Object.prototype.hasOwnProperty.call(obj, prop);
  const propertyIsEnumerableDescriptor = {
    f: Object.prototype.propertyIsEnumerable
  };
  const callPropertyIsEnumerable = (obj: object, prop: PropertyKey): boolean =>
    propertyIsEnumerableDescriptor.f.call(obj, prop);
  const createPropertyDescriptor = (
    enumerable: boolean,
    value: any
  ): PropertyDescriptor => ({
    enumerable,
    configurable: true,
    writable: true,
    value
  });
  
  const needsIEFallback = false;

  if (hasNativeSupport) {
    return nativeGetOwnPropertyDescriptor(target, property);
  }

  const indexedTarget = toIndexedObject(target);
  const key = toPropertyKey(property);

  if (needsIEFallback) {
    try {
      return nativeGetOwnPropertyDescriptor(indexedTarget, key);
    } catch (error) {
      // Fallback for IE8
    }
  }

  if (hasOwnProperty(indexedTarget, key)) {
    const isEnumerable = callPropertyIsEnumerable(indexedTarget, key);
    return createPropertyDescriptor(!isEnumerable, indexedTarget[key]);
  }

  return undefined;
}

export { getOwnPropertyDescriptorPolyfill as f };