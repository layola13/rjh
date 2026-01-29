type SetPrototypeFunction = (target: object, proto: object | null) => object;

const setPrototypeOf: SetPrototypeFunction | undefined = (() => {
  if (Object.setPrototypeOf) {
    return Object.setPrototypeOf;
  }

  if (!("__proto__" in {})) {
    return undefined;
  }

  let setter: ((target: object, proto: object | null) => void) | undefined;
  let isSupported = false;
  const testObject: Record<string, unknown> = {};

  try {
    setter = Object.getOwnPropertyDescriptor(Object.prototype, "__proto__")?.set as 
      ((target: object, proto: object | null) => void) | undefined;
    
    if (setter) {
      setter.call(testObject, []);
      isSupported = testObject instanceof Array;
    }
  } catch (error) {
    // Setter not supported
  }

  return (target: object, proto: object | null): object => {
    if (target === null || target === undefined) {
      throw new TypeError("Cannot set prototype of null or undefined");
    }

    if (typeof proto !== "object" && proto !== null) {
      throw new TypeError("Prototype must be an object or null");
    }

    if (isSupported && setter) {
      setter.call(target, proto);
    } else {
      (target as Record<string, unknown>).__proto__ = proto;
    }

    return target;
  };
})();

export default setPrototypeOf;