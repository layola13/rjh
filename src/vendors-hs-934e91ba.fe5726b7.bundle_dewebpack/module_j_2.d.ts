/**
 * Registers an enum type with the WebAssembly type system.
 * 
 * @param handle - Type handle for registration
 * @param rawTypeName - The raw name of the enum type
 * @param typeSize - Size of the enum type in bytes
 * @param isSigned - Whether the enum uses signed integers
 */
declare function registerEnumType(
  handle: TypeHandle,
  rawTypeName: string,
  typeSize: number,
  isSigned: boolean
): void;

/**
 * Type handle used for WebAssembly type registration
 */
type TypeHandle = number;

/**
 * Enum constructor function that holds enum values
 */
interface EnumConstructor {
  /** Map of wire values to enum instances */
  values: Record<number, EnumInstance>;
}

/**
 * Instance of an enum value
 */
interface EnumInstance {
  /** The wire representation value */
  value: number;
}

/**
 * Type information for WebAssembly bindings
 */
interface TypeInfo {
  /** Human-readable type name */
  name: string;
  /** Constructor function for the type */
  constructor: EnumConstructor;
  /** Converts from WebAssembly wire format to JS value */
  fromWireType(wireValue: number): EnumInstance;
  /** Converts from JS value to WebAssembly wire format */
  toWireType(destructors: unknown, value: EnumInstance): number;
  /** Number of bytes to advance argument pointer */
  argPackAdvance: 8;
  /** Function to read value from pointer */
  readValueFromPointer: (pointer: number) => EnumInstance;
  /** Destructor function (null for enums) */
  destructorFunction: null;
}