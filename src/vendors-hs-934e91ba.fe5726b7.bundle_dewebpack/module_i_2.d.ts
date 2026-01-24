/**
 * Module: module_i
 * Original ID: i
 * 
 * Registers a class constructor with embind, handling type binding and wire type conversion.
 * This module is part of the Emscripten embind system for C++/JavaScript interop.
 */

/**
 * Registers a constructor for a C++ class, enabling it to be called from JavaScript.
 * 
 * @param rawClassType - The raw pointer/handle to the C++ class type
 * @param argCount - The number of constructor parameters (including 'this' pointer)
 * @param rawArgTypesAddr - Memory address pointing to an array of raw argument type descriptors
 * @param invokerSignature - Signature/metadata for the invoker function
 * @param rawInvoker - The raw C++ constructor function to invoke
 * @param rawConstructor - Additional constructor context/pointer
 * 
 * @throws {Error} If multiple constructors with the same parameter count are registered
 * @throws {Error} If called with incorrect number of arguments
 * @throws {Error} If unbound types are encountered during construction
 */
declare function registerClassConstructor(
  rawClassType: unknown,
  argCount: number,
  rawArgTypesAddr: number,
  invokerSignature: unknown,
  rawInvoker: (...args: unknown[]) => unknown,
  rawConstructor: unknown
): void;

/**
 * Internal implementation type for bound class metadata
 */
interface RegisteredClass {
  /** The human-readable name of the C++ class */
  name: string;
  
  /** 
   * Array of constructor overloads, indexed by parameter count.
   * Each entry is a JavaScript function that wraps the C++ constructor.
   */
  constructor_body?: Array<((...args: unknown[]) => unknown) | undefined>;
}

/**
 * Internal type descriptor for embind type conversion
 */
interface TypeDescriptor<T = unknown> {
  /**
   * Converts a JavaScript value to the C++ wire format
   * @param destructors - Array to track objects that need cleanup
   * @param value - The JavaScript value to convert
   * @returns The wire-format value to pass to C++
   */
  toWireType(destructors: unknown[], value: T): unknown;
  
  /**
   * Converts a C++ wire format value back to JavaScript
   * @param wireValue - The value returned from C++
   * @returns The JavaScript representation
   */
  fromWireType(wireValue: unknown): T;
}

/**
 * Internal bound class handle wrapper
 */
interface BoundClassHandle {
  /** Reference to the registered class metadata */
  registeredClass: RegisteredClass;
  
  /** The class name */
  name: string;
}