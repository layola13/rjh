/**
 * Generator method definition helper
 * 
 * Defines methods on generator objects with proper property descriptors.
 * Supports both modern Object.defineProperty and legacy fallback for older environments.
 * 
 * @module GeneratorMethodDefiner
 */

/**
 * Defines a method on a target object with specified property descriptor settings
 * 
 * @param target - The target object to define the method on
 * @param methodName - The name of the method to define
 * @param methodImplementation - The function implementation for the method
 * @param isEnumerable - Whether the property should be enumerable (inverted in implementation)
 */
declare function defineGeneratorMethod(
  target: object,
  methodName: string,
  methodImplementation: unknown,
  isEnumerable: boolean
): void;

/**
 * Property descriptor configuration for generator methods
 */
interface GeneratorMethodDescriptor {
  /** The method implementation function */
  value: unknown;
  /** Whether the property appears in enumeration */
  enumerable: boolean;
  /** Whether the property descriptor can be changed */
  configurable: boolean;
  /** Whether the property value can be changed */
  writable: boolean;
}

/**
 * Generator instance with standard iterator methods
 */
interface GeneratorInstance {
  /**
   * Invokes a generator operation
   * 
   * @param method - The method name to invoke ('next' | 'throw' | 'return')
   * @param operationType - The operation type code (0 = next, 1 = throw, 2 = return)
   * @param value - The value to pass to the generator
   */
  _invoke(method: string, operationType: number, value: unknown): unknown;
}

export = defineGeneratorMethod;
export default defineGeneratorMethod;