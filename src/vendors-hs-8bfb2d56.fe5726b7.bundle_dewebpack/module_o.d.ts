/**
 * Module: module_o
 * Dynamically creates and caches emval allocator functions for constructing objects with varying argument counts.
 * Original ID: o
 */

/**
 * Cache for storing generated allocator functions indexed by argument count
 */
const allocatorCache: Record<number, EmvalAllocatorFunction> = {};

/**
 * Type definition for the dynamically generated emval allocator function
 * @param constructor - The constructor function pointer
 * @param argTypes - Pointer to argument type array in HEAP32
 * @param args - Pointer to arguments data
 * @returns Handle to the registered emval object
 */
type EmvalAllocatorFunction = (
  constructor: unknown,
  argTypes: number,
  args: number
) => number;

/**
 * Generates or retrieves a cached emval allocator function for the specified argument count
 * @param constructor - The constructor function to wrap
 * @param argumentCount - Number of constructor arguments
 * @param argTypesPointer - Pointer to argument types array in HEAP32
 * @param argsPointer - Pointer to serialized arguments data
 * @returns Handle to the newly constructed and registered emval object
 */
function createEmvalAllocator(
  constructor: unknown,
  argumentCount: number,
  argTypesPointer: number,
  argsPointer: number
): number {
  constructor = lookupType(constructor);
  
  let allocator = allocatorCache[argumentCount];
  
  if (!allocator) {
    allocator = generateAllocatorFunction(argumentCount);
    allocatorCache[argumentCount] = allocator;
  }
  
  return allocator(constructor, argTypesPointer, argsPointer);
}

/**
 * Dynamically generates an allocator function for constructing objects with a specific number of arguments
 * @param argumentCount - Number of constructor parameters
 * @returns Generated allocator function
 */
function generateAllocatorFunction(argumentCount: number): EmvalAllocatorFunction {
  // Build comma-separated parameter list: "arg0, arg1, arg2, ..."
  let parameterList = "";
  for (let index = 0; index < argumentCount; ++index) {
    parameterList += (index !== 0 ? ", " : "") + "arg" + index;
  }
  
  // Generate function body as string
  let functionBody = `return function emval_allocator_${argumentCount}(constructor, argTypes, args) {\n`;
  
  for (let index = 0; index < argumentCount; ++index) {
    functionBody += `var argType${index} = requireRegisteredType(Module['HEAP32'][(argTypes >> 2) + ${index}], "parameter ${index}");\n`;
    functionBody += `var arg${index} = argType${index}.readValueFromPointer(args);\n`;
    functionBody += `args += argType${index}['argPackAdvance'];\n`;
  }
  
  functionBody += `var obj = new constructor(${parameterList});\n`;
  functionBody += `return __emval_register(obj);\n`;
  functionBody += `}\n`;
  
  // Dynamically create and return the function
  return new Function(
    "requireRegisteredType",
    "Module",
    "__emval_register",
    functionBody
  )(requireRegisteredType, Module, registerEmval) as EmvalAllocatorFunction;
}

/**
 * External dependencies (assumed to be defined elsewhere)
 */
declare function lookupType(constructor: unknown): unknown;
declare function requireRegisteredType(typeId: number, context: string): TypeInfo;
declare function registerEmval(obj: unknown): number;
declare const Module: {
  HEAP32: Int32Array;
};

/**
 * Type information interface for registered types
 */
interface TypeInfo {
  readValueFromPointer(pointer: number): unknown;
  argPackAdvance: number;
}