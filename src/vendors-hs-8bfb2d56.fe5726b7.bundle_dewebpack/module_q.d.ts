/**
 * Type definitions for module_q
 * This module provides runtime type system for method calling with automatic marshalling
 */

/**
 * Represents a registered type in the runtime type system
 */
interface RegisteredType {
  /** Name of the type */
  name: string;
  /** Size in bytes required for advancing argument pointer */
  argPackAdvance: number;
  /** Whether this type represents void */
  isVoid?: boolean;
  /** Read a value from a pointer location */
  readValueFromPointer(pointer: number): unknown;
  /** Convert a value to wire format for transmission */
  toWireType(destructors: Destructor[] | null, value: unknown): unknown;
  /** Delete/cleanup an object instance */
  deleteObject?(object: unknown): void;
}

/**
 * Destructor callback for cleanup operations
 */
type Destructor = () => void;

/**
 * Global registry of registered types
 */
declare const registeredTypes: Record<number, RegisteredType>;

/**
 * Heap view for reading type IDs (32-bit integers)
 */
declare const HEAP32: Int32Array;

/**
 * Get a registered type by its ID
 * @param typeId - The numeric type identifier
 * @param parameterName - Description for error messages
 * @returns The registered type object
 */
declare function getRegisteredType(typeId: number, parameterName: string): RegisteredType;

/**
 * Create a safe identifier name from a string
 * @param name - The original name
 * @returns A sanitized identifier
 */
declare function makeLegalFunctionName(name: string): string;

/**
 * Construct a function from string parts
 * @param constructor - The Function constructor
 * @param parameterNames - Array of parameter names
 * @returns A new function
 */
declare function createFunction(constructor: FunctionConstructor, parameterNames: string[]): Function;

/**
 * Global array storing generated function implementations
 */
declare const functionTable: Function[];

/**
 * Register a function and return its index
 * @param func - The function to register
 * @returns The index in the function table
 */
declare function addFunctionToTable(func: Function): number;

/**
 * Creates a dynamic method caller function with type marshalling
 * 
 * Generates optimized JavaScript code at runtime to call methods with proper
 * type conversion between JavaScript and native (WebAssembly/C++) representations.
 * 
 * @param argumentCount - Total number of arguments (including return type)
 * @param typesPointer - Pointer to array of type IDs in HEAP32
 * @returns Index of the generated caller function in the function table
 * 
 * @remarks
 * - First type in array is return type
 * - Remaining types are parameter types
 * - Generated function signature: (handle, name, destructors, args) => wireValue
 * - Automatically manages memory and calls deleteObject for types that require cleanup
 * 
 * @example
 *