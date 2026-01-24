/**
 * Registers a C++ class constructor with the Embind type system.
 * Handles class instantiation, inheritance, and pointer type registration.
 * 
 * @module ClassConstructorRegistration
 */

/**
 * Registers a class constructor with type dependencies and inheritance support.
 * This function is typically called during WebAssembly module initialization to
 * expose C++ classes to JavaScript.
 * 
 * @param rawType - The raw type identifier for the class
 * @param pointerType - The pointer type identifier
 * @param constPointerType - The const pointer type identifier
 * @param baseClassRawType - The base class raw type (for inheritance), or null
 * @param getActualTypeSignature - Signature for getting the actual type
 * @param getActualType - Function to get the actual type of an instance
 * @param upcastSignature - Signature for upcasting to base class
 * @param upcast - Function to upcast instance pointer
 * @param downcastSignature - Signature for downcasting from base class
 * @param downcast - Function to downcast instance pointer
 * @param constructorName - Human-readable name of the constructor
 * @param constructorSignature - Signature of the constructor function
 * @param destructorSignature - Signature of the destructor function
 */
export function registerClassConstructor(
  rawType: TypeId,
  pointerType: TypeId,
  constPointerType: TypeId,
  baseClassRawType: TypeId | null,
  getActualTypeSignature: Signature,
  getActualType: GetActualTypeFunction,
  upcastSignature: Signature | null,
  upcast: UpcastFunction | null,
  downcastSignature: Signature | null,
  downcast: DowncastFunction | null,
  constructorName: string,
  constructorSignature: Signature,
  destructorSignature: Signature
): void;

/**
 * Type identifier used in the type system.
 */
type TypeId = number;

/**
 * Function signature representation.
 */
type Signature = unknown;

/**
 * Function that returns the actual runtime type of an instance.
 */
type GetActualTypeFunction = (instance: unknown) => TypeId;

/**
 * Function that upcasts an instance pointer to its base class.
 */
type UpcastFunction = (pointer: number) => number;

/**
 * Function that downcasts a base class pointer to derived class.
 */
type DowncastFunction = (pointer: number) => number;

/**
 * Registered class information stored in the type registry.
 */
interface RegisteredClass {
  /** Human-readable class name */
  name: string;
  /** Constructor function callable from JavaScript */
  constructor: new (...args: unknown[]) => unknown;
  /** Prototype instance used for inheritance chain */
  instancePrototype: object;
  /** Raw type identifier */
  rawType: TypeId;
  /** Base class (if any) */
  baseClass?: RegisteredClass;
  /** Function to get actual type */
  getActualType?: GetActualTypeFunction;
  /** Upcast function */
  upcast?: UpcastFunction;
  /** Downcast function */
  downcast?: DowncastFunction;
  /** Destructor function */
  destructor?: (ptr: number) => void;
}

/**
 * Type information wrapper for registered types.
 */
interface RegisteredType {
  /** Type name */
  name: string;
  /** Registered class information */
  registeredClass?: RegisteredClass;
  /** Whether this is a reference type */
  isReference: boolean;
  /** Whether this is a const type */
  isConst: boolean;
  /** Whether this is a smart pointer */
  isSmartPointer: boolean;
}

/**
 * Constructor body mapping argument count to constructor implementation.
 */
interface ConstructorBody {
  [argumentCount: number]: (...args: unknown[]) => unknown;
}

/**
 * Class information passed to the registration callback.
 */
interface ClassRegistrationInfo {
  /** The registered class metadata */
  registeredClass: RegisteredClass;
  /** Prototype for instances */
  instancePrototype: object;
  /** Constructor body implementations */
  constructor_body: ConstructorBody;
}

/**
 * Pointer type registration entry.
 */
interface PointerTypeEntry {
  /** Non-const pointer type */
  pointerType: RegisteredType;
  /** Const pointer type */
  constPointerType: RegisteredType;
}

/**
 * Global registry mapping type IDs to pointer type information.
 */
declare const typeRegistry: Record<TypeId, PointerTypeEntry>;