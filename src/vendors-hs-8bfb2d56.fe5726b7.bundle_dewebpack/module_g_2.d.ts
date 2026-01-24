/**
 * Registers a class method with support for method overloading.
 * Handles both pure virtual functions and concrete implementations.
 * 
 * @module ClassMethodRegistry
 */

/**
 * Type definition for a class constructor/registration handle
 */
interface ClassHandle {
  /** The name of the class */
  name: string;
  /** Registered class metadata */
  registeredClass: RegisteredClass;
}

/**
 * Registered class metadata including prototype and virtual functions
 */
interface RegisteredClass {
  /** The prototype instance of the registered class */
  instancePrototype: Record<string, MethodDescriptor | ((...args: unknown[]) => unknown)>;
  /** List of pure virtual function names that must be implemented */
  pureVirtualFunctions: string[];
}

/**
 * Method descriptor with overload support
 */
interface MethodDescriptor {
  /** Number of arguments the method accepts */
  argCount: number;
  /** Name of the class this method belongs to */
  className: string;
  /** Table of overloaded method implementations keyed by argument count */
  overloadTable?: Record<number, MethodDescriptor | ((...args: unknown[]) => unknown)>;
}

/**
 * Resolves type dependencies asynchronously
 * 
 * @param requiredTypes - Array of type IDs that must be resolved before execution
 * @param providedTypes - Array of type IDs that this operation provides
 * @param callback - Function to execute once all type dependencies are resolved
 */
declare function de(
  requiredTypes: unknown[],
  providedTypes: unknown[],
  callback: (resolvedTypes: unknown[]) => unknown[]
): void;

/**
 * Converts raw type IDs to their corresponding type objects
 * 
 * @param rawTypes - Raw type identifier array
 * @param typeCount - Number of types to convert
 * @returns Array of resolved type objects
 */
declare function Ke(rawTypes: unknown, typeCount: number): unknown[];

/**
 * Escapes or normalizes a method name string
 * 
 * @param name - Raw method name
 * @returns Escaped/normalized method name
 */
declare function ee(name: string): string;

/**
 * Processes invoker parameters and returns normalized array
 * 
 * @param invoker - The invoker function or configuration
 * @param options - Additional invoker options
 * @returns Normalized invoker parameter array
 */
declare function Ye(invoker: unknown, options: unknown): unknown[];

/**
 * Throws an error with the given message
 * 
 * @param message - Error message to throw
 * @param context - Additional context for the error
 */
declare function Je(message: string, context?: unknown): never;

/**
 * Sets up overload table for a method
 * 
 * @param prototype - The prototype object to modify
 * @param methodName - Name of the method
 * @param fullName - Full qualified method name (ClassName.methodName)
 */
declare function Oe(
  prototype: Record<string, unknown>,
  methodName: string,
  fullName: string
): void;

/**
 * Creates a runtime method implementation from type information
 * 
 * @param fullName - Full qualified method name
 * @param types - Resolved type information
 * @param classHandle - The class this method belongs to
 * @param invokerParams - Parameters for the method invoker
 * @param functionPointer - Pointer to the native function implementation
 * @returns Callable method implementation
 */
declare function rt(
  fullName: string,
  types: unknown[],
  classHandle: ClassHandle,
  invokerParams: unknown[],
  functionPointer: unknown
): MethodDescriptor | ((...args: unknown[]) => unknown);

/**
 * Registers a class method with overload support.
 * This function binds a native method to a JavaScript class prototype,
 * handling type resolution and method overloading.
 * 
 * @param classHandle - Handle to the target class
 * @param methodName - Name of the method to register
 * @param argCount - Total number of arguments (including hidden parameters)
 * @param rawArgTypes - Raw type IDs for method arguments
 * @param invoker - Function that will invoke the native implementation
 * @param invokerOptions - Additional options for the invoker
 * @param functionPointer - Pointer to the native function
 * @param isVirtual - Whether this is a pure virtual function
 */
declare function registerClassMethod(
  classHandle: ClassHandle,
  methodName: string,
  argCount: number,
  rawArgTypes: unknown,
  invoker: unknown,
  invokerOptions: unknown,
  functionPointer: unknown,
  isVirtual: boolean
): void;