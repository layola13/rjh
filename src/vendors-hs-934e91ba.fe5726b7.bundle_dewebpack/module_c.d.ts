/**
 * Module: module_c
 * 
 * Registers a C/C++ function binding with type checking and deferred initialization.
 * This module handles the FFI (Foreign Function Interface) between JavaScript and native code.
 * 
 * @module module_c
 * @original-id c
 */

/**
 * Type representing an unbound type reference that will be resolved later
 */
type UnboundTypeReference = unknown;

/**
 * Type information array containing parameter and return types
 */
type TypeInfoArray = unknown[];

/**
 * Native function pointer or wrapper
 */
type NativeFunction = (...args: unknown[]) => unknown;

/**
 * Registers a native C/C++ function with the JavaScript runtime.
 * 
 * @param functionName - The JavaScript-accessible name for the exported function
 * @param typeInfoModule - Module identifier for type information
 * @param typeInfoExport - Export identifier for type information
 * @param argCount - Number of arguments the function accepts
 * @param invokerPointer - Pointer to the native invoker function
 * @param invokerSignatureIndex - Index into the invoker signature table
 * 
 * @remarks
 * This function:
 * 1. Collects type information from the provided module/export references
 * 2. Registers a temporary error handler if types are not yet bound
 * 3. Asynchronously resolves all type dependencies
 * 4. Creates and registers the final bound function with proper type conversions
 * 
 * @throws {Error} If the function is called before all required types are bound
 */
declare function registerNativeFunction(
  functionName: unknown,
  typeInfoModule: unknown,
  typeInfoExport: unknown,
  argCount: number,
  invokerPointer: unknown,
  invokerSignatureIndex: unknown
): void;

/**
 * Internal helper: Collects type information from module exports
 * 
 * @param module - Type information module reference
 * @param exportId - Specific export identifier
 * @returns Array of resolved type information
 */
declare function ct(module: unknown, exportId: unknown): TypeInfoArray;

/**
 * Internal helper: Converts function name to canonical form
 * 
 * @param name - Raw function name
 * @returns Canonicalized function name string
 */
declare function CA(name: unknown): string;

/**
 * Internal helper: Resolves signature information
 * 
 * @param pointer - Function pointer or signature reference
 * @param index - Index into signature table
 * @returns Resolved signature information
 */
declare function st(pointer: unknown, index: unknown): unknown;

/**
 * Internal helper: Registers a placeholder function that throws on premature invocation
 * 
 * @param functionName - The name of the function being registered
 * @param onUnbound - Callback to execute when function is called before types are bound
 * @param argCount - Number of arguments (used for validation)
 */
declare function OA(
  functionName: string,
  onUnbound: () => void,
  argCount: number
): void;

/**
 * Internal helper: Throws a descriptive error message
 * 
 * @param message - Error message to display
 * @param context - Additional context information (e.g., unbound types)
 */
declare function ft(message: string, context: unknown): never;

/**
 * Internal helper: Defers execution until type dependencies are resolved
 * 
 * @param dependencies - Array of type dependencies that must be resolved first
 * @param unboundTypes - Array of currently unbound type references
 * @param callback - Function to execute once all types are bound
 * @returns Empty array (standardized return for this pattern)
 */
declare function vA(
  dependencies: unknown[],
  unboundTypes: TypeInfoArray,
  callback: (types: TypeInfoArray) => unknown[]
): unknown[];

/**
 * Internal helper: Creates a bound function with proper argument/return type conversion
 * 
 * @param name - Function name for error messages and debugging
 * @param signature - Type signature including return type and parameter types
 * @param thisPtr - Optional 'this' context pointer for member functions
 * @param invokerInfo - Information about how to invoke the native function
 * @param invokerIndex - Index identifying the specific invoker to use
 * @returns Wrapper function that performs type conversion and invokes native code
 */
declare function Bt(
  name: string,
  signature: TypeInfoArray,
  thisPtr: unknown | null,
  invokerInfo: unknown,
  invokerIndex: unknown
): NativeFunction;

/**
 * Internal helper: Finalizes function registration after type resolution
 * 
 * @param functionName - The name under which to register the function
 * @param boundFunction - The fully-typed and bound native function wrapper
 * @param argCount - Number of arguments for validation
 */
declare function gt(
  functionName: string,
  boundFunction: NativeFunction,
  argCount: number
): void;