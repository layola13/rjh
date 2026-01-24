/**
 * Registers a C++ class constructor with JavaScript bindings
 * 
 * This function is part of the Emscripten/WebAssembly FFI (Foreign Function Interface) layer
 * that bridges C++ classes to JavaScript. It creates JavaScript wrapper classes that can
 * instantiate and interact with C++ objects compiled to WebAssembly.
 * 
 * @module ClassConstructorRegistration
 */

/**
 * Raw pointer type representing a memory address in the WebAssembly linear memory
 */
type RawPointer = number;

/**
 * Type ID used to identify registered types in the type system
 */
type TypeId = number;

/**
 * Represents a registered C++ class in the JavaScript runtime
 */
interface RegisteredClass {
  /** Prototype object for instances of this class */
  instancePrototype: object;
  /** Base class if this class inherits from another */
  baseClass?: RegisteredClass;
  /** Constructor function implementations keyed by parameter count */
  constructor_body?: Record<number, (...args: unknown[]) => unknown>;
}

/**
 * Metadata for handling class instances and their memory lifecycle
 */
interface ClassHandle {
  /** Human-readable class name */
  name: string;
  /** JavaScript constructor function */
  constructor: Function;
  /** Prototype for instances */
  instancePrototype: object;
  /** Destructor function for cleanup */
  destructor: TypeInfo;
  /** Parent class handle if inheritance is used */
  baseClass?: RegisteredClass;
  /** Downcast function to convert to pointer */
  downcast?: (ptr: RawPointer) => RawPointer;
  /** Upcast function to convert from pointer */
  upcast?: (ptr: RawPointer) => RawPointer;
  /** Pointer type converter */
  pureVirtualFunctions?: unknown[];
}

/**
 * Type information object containing conversion and validation functions
 */
interface TypeInfo {
  /** Human-readable type name */
  name: string;
  /** Convert from JavaScript value to C++ */
  toWireType?: (destructors: unknown[] | null, value: unknown) => RawPointer;
  /** Convert from C++ to JavaScript value */
  fromWireType?: (ptr: RawPointer) => unknown;
  /** Argument type validator */
  argPackAdvance?: number;
  /** Read value from wire */
  readValueFromPointer?: (ptr: RawPointer) => unknown;
  /** Destructor function */
  destructorFunction?: ((ptr: RawPointer) => void) | null;
}

/**
 * Global registry mapping type IDs to registered type information
 */
declare const registeredTypes: Record<TypeId, TypeInfo>;

/**
 * Global registry mapping type IDs to class metadata
 */
declare const registeredClasses: Record<TypeId, ClassHandle>;

/**
 * Ensures type dependencies are resolved before proceeding
 * 
 * @param typeIds - Array of type IDs that must be registered
 * @param callback - Function to call once all types are available
 */
declare function whenDependentTypesAreResolved(
  typeIds: TypeId[],
  dependencies: TypeId[],
  callback: (types: TypeInfo[]) => TypeInfo[]
): void;

/**
 * Converts a C++ mangled name to a human-readable JavaScript identifier
 * 
 * @param mangledName - C++ mangled type name
 * @returns Valid JavaScript identifier
 */
declare function makeJavaScriptIdentifier(mangledName: string): string;

/**
 * Creates a unified type representation from various type system components
 * 
 * @param typeInfo - Type metadata to unify
 * @returns Unified type object
 */
declare function unifyType(typeInfo: unknown): TypeInfo;

/**
 * Registers a JavaScript constructor as available for use
 * 
 * @param identifier - JavaScript function name
 * @param constructor - Constructor function to register
 */
declare function exposePublicSymbol(identifier: string, constructor: Function): void;

/**
 * Replaces a public symbol with a new implementation
 * 
 * @param identifier - Symbol name to replace
 * @param constructor - New constructor implementation
 */
declare function replacePublicSymbol(identifier: string, constructor: Function): void;

/**
 * Throws a binding error with context about unbound types
 * 
 * @param message - Error message
 * @param unboundTypes - Array of type IDs that are not yet bound
 */
declare function throwBindingError(message: string, unboundTypes: TypeId[]): never;

/**
 * Registers a C++ class constructor with the JavaScript type system
 * 
 * This is the main registration function that:
 * 1. Validates type dependencies and waits for them to be available
 * 2. Creates a JavaScript wrapper constructor
 * 3. Sets up prototype chain for inheritance
 * 4. Registers pointer types (T, T*, T const*)
 * 5. Exposes the constructor to JavaScript
 * 
 * @param rawType - Type ID for the class being registered
 * @param rawPointerType - Type ID for raw pointers to this class
 * @param rawConstPointerType - Type ID for const pointers to this class
 * @param baseClassRawType - Type ID of the base class (0 if no inheritance)
 * @param getActualType - Function to get the actual runtime type of an instance
 * @param upcast - Function to cast pointer to base class
 * @param downcast - Function to cast pointer from base class
 * @param className - Human-readable class name
 * @param destructorName - Name of the destructor function
 * @param rawDestructor - Raw pointer to the C++ destructor
 * @param constructorBody - Map of constructor overloads by parameter count
 * @param classTypeInfo - Additional type metadata
 * @param baseClassTypeInfo - Base class type metadata
 */
declare function registerClassConstructor(
  rawType: TypeId,
  rawPointerType: TypeId,
  rawConstPointerType: TypeId,
  baseClassRawType: TypeId,
  getActualType: (ptr: RawPointer) => TypeId,
  upcast: ((ptr: RawPointer) => RawPointer) | null,
  downcast: ((ptr: RawPointer) => RawPointer) | null,
  className: string,
  destructorName: string,
  rawDestructor: RawPointer,
  constructorBody: Record<number, (...args: unknown[]) => unknown>,
  classTypeInfo: unknown,
  baseClassTypeInfo: unknown
): void;

/**
 * Internal implementation of class constructor registration
 * 
 * The original minified function performs these steps:
 * 1. Unifies type information for constructor body, upcast, downcast, and destructor
 * 2. Makes a valid JavaScript identifier from the mangled class name
 * 3. Registers a temporary throwing constructor until types are resolved
 * 4. Waits for base class type to be registered (if inheritance is used)
 * 5. Creates the actual JavaScript constructor that:
 *    - Validates 'new' keyword usage
 *    - Checks constructor is accessible
 *    - Selects correct overload based on argument count
 *    - Invokes the appropriate C++ constructor
 * 6. Sets up prototype chain with proper constructor property
 * 7. Creates ClassHandle with all type metadata
 * 8. Registers three type variants: value (T), pointer (T*), const pointer (T const*)
 * 9. Stores in global registeredClasses registry
 * 10. Exposes constructor to JavaScript global scope
 * 
 * @returns Array of registered TypeInfo objects [valueType, pointerType, constPointerType]
 */
declare function _registerClassConstructor_internal(
  rawType: TypeId,
  rawPointerType: TypeId,
  rawConstPointerType: TypeId,
  baseClassRawType: TypeId,
  getActualType: (ptr: RawPointer) => TypeId,
  upcast: ((ptr: RawPointer) => RawPointer) | null,
  downcast: ((ptr: RawPointer) => RawPointer) | null,
  className: string,
  destructorName: string,
  rawDestructor: RawPointer,
  constructorBody: Record<number, (...args: unknown[]) => unknown>,
  classTypeInfo: unknown,
  baseClassTypeInfo: unknown
): [TypeInfo, TypeInfo, TypeInfo];

export {
  registerClassConstructor,
  RegisteredClass,
  ClassHandle,
  TypeInfo,
  RawPointer,
  TypeId
};