interface PropertyDescriptor {
  configurable?: boolean;
  enumerable?: boolean;
  writable?: boolean;
  value?: any;
  get?: () => any;
  set?: (value: any) => void;
}

interface DefinePropertyExports {
  f: (
    target: object,
    propertyKey: PropertyKey,
    attributes: PropertyDescriptor
  ) => object | void;
}

const ENUMERABLE = "enumerable";
const CONFIGURABLE = "configurable";
const WRITABLE = "writable";

function isObject(value: unknown): value is object {
  return typeof value === "object" && value !== null;
}

function toPropertyKey(argument: unknown): PropertyKey {
  if (typeof argument === "string" || typeof argument === "symbol") {
    return argument;
  }
  return String(argument);
}

function requireObjectCoercible(value: unknown): object {
  if (value == null) {
    throw new TypeError("Cannot convert undefined or null to object");
  }
  if (!isObject(value)) {
    throw new TypeError("Argument must be an object");
  }
  return value;
}

const hasNativeDefineProperty: boolean = (() => {
  try {
    Object.defineProperty({}, "test", { value: 42 });
    return true;
  } catch {
    return false;
  }
})();

const hasDescriptorBug: boolean = (() => {
  if (!hasNativeDefineProperty) return false;
  try {
    Object.defineProperty({}, "test", { get: () => 42 });
    return false;
  } catch {
    return true;
  }
})();

const needsIE8Fallback: boolean = !hasNativeDefineProperty;

function definePropertyModern(
  target: object,
  propertyKey: PropertyKey,
  attributes: PropertyDescriptor
): object {
  requireObjectCoercible(target);
  const key = toPropertyKey(propertyKey);
  requireObjectCoercible(attributes);

  if (
    typeof target === "function" &&
    key === "prototype" &&
    "value" in attributes &&
    WRITABLE in attributes &&
    !attributes.writable
  ) {
    const currentDescriptor = Object.getOwnPropertyDescriptor(target, key);
    if (currentDescriptor?.writable) {
      (target as any)[key] = attributes.value;
      attributes = {
        configurable:
          CONFIGURABLE in attributes
            ? attributes.configurable
            : currentDescriptor.configurable,
        enumerable:
          ENUMERABLE in attributes
            ? attributes.enumerable
            : currentDescriptor.enumerable,
        writable: false,
      };
    }
  }

  return Object.defineProperty(target, key, attributes);
}

function definePropertyFallback(
  target: object,
  propertyKey: PropertyKey,
  attributes: PropertyDescriptor
): object {
  requireObjectCoercible(target);
  const key = toPropertyKey(propertyKey);
  requireObjectCoercible(attributes);

  if (hasDescriptorBug) {
    try {
      return Object.defineProperty(target, key, attributes);
    } catch {
      // Fall through to manual assignment
    }
  }

  if ("get" in attributes || "set" in attributes) {
    throw new TypeError("Accessors not supported");
  }

  if ("value" in attributes) {
    (target as any)[key] = attributes.value;
  }

  return target;
}

export const f: DefinePropertyExports["f"] = hasNativeDefineProperty
  ? hasDescriptorBug
    ? definePropertyModern
    : Object.defineProperty
  : definePropertyFallback;