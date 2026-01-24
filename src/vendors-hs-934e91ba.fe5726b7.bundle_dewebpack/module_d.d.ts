/**
 * Registers an enum value to an enum constructor.
 * Creates a new enum instance with the given name and value, then adds it to the enum's values collection.
 * 
 * @param enumConstructor - The enum constructor object to extend
 * @param enumKey - The string key/name for the new enum member
 * @param enumValue - The numeric or string value for the enum member
 */
declare function registerEnumValue(
  enumConstructor: unknown,
  enumKey: string,
  enumValue: string | number
): void;

/**
 * Enum instance descriptor with value and constructor properties
 */
interface EnumInstanceDescriptor {
  /** The actual value of the enum member */
  value: {
    value: string | number;
  };
  /** Constructor function for the enum member */
  constructor: {
    value: Function;
  };
}

/**
 * Enum constructor with values dictionary and dynamic member access
 */
interface EnumConstructor {
  /** Prototype of the enum constructor */
  prototype: object;
  /** Dictionary mapping enum values to their instances */
  values: Record<string | number, object>;
  /** Dynamic enum member access */
  [key: string]: unknown;
}

/**
 * Helper function: Gets enum metadata (likely returns constructor info)
 */
declare function vt(target: unknown, type: "enum"): {
  constructor: EnumConstructor;
  name: string;
};

/**
 * Helper function: Converts/normalizes enum key to proper format
 */
declare function CA(key: string): string;

/**
 * Helper function: Creates a named constructor function
 * @param name - The name for the constructor
 * @param fn - The constructor function
 */
declare function hA(name: string, fn: Function): Function;