/**
 * Registers a constructor for an Embind class with a specific number of parameters.
 * This function handles type resolution and parameter marshalling for class constructors.
 * 
 * @param classType - The class type handle to register the constructor for
 * @param argCount - Total argument count including the implicit 'this' parameter
 * @param rawArgTypes - Array of raw argument type identifiers
 * @param invokerSignature - Function signature information for the invoker
 * @param invoker - The native invoker function that calls the actual constructor
 * @param constructorPointer - Pointer to the native constructor function
 */
declare function registerClassConstructor(
  classType: TypeHandle,
  argCount: number,
  rawArgTypes: RawTypeId[],
  invokerSignature: InvokerSignature | null,
  invoker: NativeInvokerFunction,
  constructorPointer: number
): void;

/**
 * Represents a handle to a registered type in the Embind type system
 */
interface TypeHandle {
  /** The name of the type */
  name: string;
  /** The registered class information */
  registeredClass: RegisteredClass;
}

/**
 * Information about a registered C++ class
 */
interface RegisteredClass {
  /** Array of constructor implementations indexed by parameter count */
  constructor_body: ConstructorFunction[];
}

/**
 * Constructor function signature for registered classes
 */
type ConstructorFunction = (...args: unknown[]) => unknown;

/**
 * Raw type identifier used by Embind
 */
type RawTypeId = number | string;

/**
 * Function signature metadata for native invokers
 */
type InvokerSignature = unknown;

/**
 * Native function that invokes C++ constructors
 */
type NativeInvokerFunction = (...args: unknown[]) => unknown;

/**
 * Resolved type information with marshalling functions
 */
interface ResolvedType {
  /** Converts TypeScript value to C++ wire format */
  toWireType(destructors: Destructor[], value: unknown): unknown;
  /** Converts C++ wire format to TypeScript value */
  fromWireType(wireValue: unknown): unknown;
}

/**
 * Destructor function called to clean up allocated resources
 */
type Destructor = () => void;

/**
 * Throws an error for unbound types during registration
 */
declare function throwUnboundTypeError(message: string, unboundTypes: RawTypeId[]): never;

/**
 * Throws a binding error with the specified message
 */
declare function throwBindingError(message: string): never;

/**
 * Defers execution until all specified types are registered
 * 
 * @param dependencies - Types that must be registered before execution
 * @param unboundTypes - Types currently unbound
 * @param callback - Function to execute once all types are resolved
 */
declare function whenDependentTypesAreResolved(
  dependencies: RawTypeId[],
  unboundTypes: RawTypeId[],
  callback: (resolvedTypes: ResolvedType[]) => unknown[]
): void;

/**
 * Runs all registered destructors and clears the array
 * 
 * @param destructors - Array of destructor functions to execute
 */
declare function runDestructors(destructors: Destructor[]): void;