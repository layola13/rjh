/**
 * Binds a function or method with type checking and dependency resolution.
 * 
 * This function handles the registration and binding of callable entities (functions/methods)
 * with proper type validation, ensuring all required types are bound before execution.
 * 
 * @param functionName - The name/identifier of the function to be bound
 * @param typeArray - Array of type identifiers required by the function
 * @param typeRegistry - Registry object containing type definitions
 * @param parameterCount - Number of parameters the function accepts
 * @param parameterInfo - Additional parameter metadata or configuration
 * @param options - Optional configuration for the binding process
 * 
 * @remarks
 * The function performs the following steps:
 * 1. Resolves type identifiers from the type registry
 * 2. Converts the function name to internal representation
 * 3. Validates parameter information
 * 4. Sets up a placeholder that throws if called before types are bound
 * 5. Resolves type dependencies asynchronously
 * 6. Registers the fully typed function once all dependencies are ready
 * 
 * @internal This is likely part of an embind or WebAssembly type binding system
 */
declare function bindFunction(
  functionName: string | number,
  typeArray: unknown,
  typeRegistry: Record<string, unknown>,
  parameterCount: number,
  parameterInfo: unknown,
  options?: unknown
): void;

/**
 * Helper function: Resolves type identifiers to their actual type representations
 * @internal
 */
declare function Ke(typeArray: unknown, typeRegistry: Record<string, unknown>): unknown[];

/**
 * Helper function: Converts identifier to internal string representation
 * @internal
 */
declare function ee(identifier: string | number): string;

/**
 * Helper function: Validates and processes parameter information
 * @internal
 */
declare function Ye(parameterCount: number, parameterInfo: unknown): unknown;

/**
 * Helper function: Registers a callable entity with a placeholder implementation
 * @internal
 */
declare function Ce(
  name: string,
  placeholder: () => void,
  adjustedCount: number
): void;

/**
 * Helper function: Throws an error indicating unbound types
 * @internal
 */
declare function Je(message: string, unboundTypes: unknown[]): never;

/**
 * Helper function: Defers execution until specified types are available
 * @internal
 */
declare function de(
  dependencies: unknown[],
  requiredTypes: unknown[],
  callback: (resolvedTypes: unknown[]) => unknown[]
): void;

/**
 * Helper function: Creates the actual function implementation with type information
 * @internal
 */
declare function rt(
  name: string,
  typeSignature: unknown[],
  context: null,
  paramInfo: unknown,
  options: unknown
): unknown;

/**
 * Helper function: Registers the finalized function binding
 * @internal
 */
declare function Qe(
  name: string,
  implementation: unknown,
  adjustedCount: number
): void;