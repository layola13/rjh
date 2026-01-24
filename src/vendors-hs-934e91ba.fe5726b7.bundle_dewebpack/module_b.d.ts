/**
 * Registers a virtual method on a class prototype.
 * This function is typically part of an Embind-style binding system for exposing C++ classes to JavaScript.
 * 
 * @param classHandle - Handle to the registered class
 * @param methodName - Name of the method being registered
 * @param argCount - Number of arguments the method accepts
 * @param rawArgTypesAddr - Memory address pointing to raw argument type information
 * @param invokerSignature - Signature of the invoker function
 * @param rawInvoker - Raw function pointer to the native invoker
 * @param context - Additional context for method invocation
 * @param isPureVirtual - Whether this is a pure virtual function
 */
declare function registerVirtualMethod(
  classHandle: ClassHandle,
  methodName: string,
  argCount: number,
  rawArgTypesAddr: number,
  invokerSignature: InvokerSignature,
  rawInvoker: RawInvokerFunction,
  context: InvocationContext,
  isPureVirtual: boolean
): void;

/**
 * Handle representing a registered class in the type system
 */
interface ClassHandle {
  /** Fully qualified name of the class */
  name: string;
  /** Metadata about the registered class */
  registeredClass: RegisteredClass;
}

/**
 * Metadata for a class registered in the binding system
 */
interface RegisteredClass {
  /** Prototype object for class instances */
  instancePrototype: Record<string, MethodDescriptor | ((...args: unknown[]) => unknown)>;
  /** List of pure virtual functions that must be implemented */
  pureVirtualFunctions: string[];
}

/**
 * Descriptor for a method, potentially with multiple overloads
 */
interface MethodDescriptor {
  /** Number of arguments (excluding 'this') */
  argCount?: number;
  /** Name of the class this method belongs to */
  className?: string;
  /** Map from argument count to overloaded implementations */
  overloadTable?: Record<number, BoundMethod>;
}

/**
 * A bound method ready for invocation
 */
type BoundMethod = ((...args: unknown[]) => unknown) & {
  argCount: number;
  className: string;
  overloadTable?: Record<number, BoundMethod>;
};

/**
 * Signature information for method invocation
 */
type InvokerSignature = unknown;

/**
 * Context information passed during method invocation
 */
type InvocationContext = unknown;

/**
 * Raw function pointer to native code
 */
type RawInvokerFunction = unknown;

/**
 * Converts raw type information from memory into type objects
 */
declare function convertTypes(
  rawTypesAddr: number,
  count: number
): TypeInfo[];

/**
 * Type information object
 */
interface TypeInfo {
  name: string;
  fromWireType?: (value: unknown) => unknown;
  toWireType?: (destructors: Destructor[] | null, value: unknown) => unknown;
}

/**
 * Destructor function for cleanup
 */
type Destructor = () => void;

/**
 * Converts a string identifier to canonical form
 */
declare function canonicalizeString(str: string): string;

/**
 * Resolves a memory address to a type descriptor
 */
declare function resolveType(
  typeAddr: number,
  typeInfo: unknown
): TypeInfo;

/**
 * Defers execution until all specified types are registered
 */
declare function whenDependentTypesAreResolved(
  myTypes: unknown[],
  dependentTypes: (ClassHandle | TypeInfo)[],
  callback: (resolved: unknown[]) => unknown[]
): void;

/**
 * Creates a bound method wrapper with proper type conversion
 */
declare function createMethodFunction(
  humanName: string,
  argTypes: TypeInfo[],
  classType: ClassHandle,
  rawInvoker: RawInvokerFunction,
  context: InvocationContext
): BoundMethod;

/**
 * Reports an error for unbound types
 */
declare function throwUnboundTypeError(
  message: string,
  types: TypeInfo[]
): never;

/**
 * Ensures proper overload table structure on prototype
 */
declare function ensureOverloadTable(
  proto: Record<string, unknown>,
  methodName: string,
  humanName: string
): void;