/**
 * Module: module_y
 * Original ID: y
 * 
 * This module appears to handle WebAssembly memory initialization and type registration.
 * It performs various operations including:
 * - Registering wrapper types (w)
 * - Defining type relationships (R, D)
 * - Registering class/interface definitions (k)
 * - Setting up method bindings (M, y, v)
 * - Initializing memory allocations via Mt (memory allocator)
 */

/**
 * Represents a memory pointer address in the WebAssembly linear memory
 */
type MemoryPointer = number;

/**
 * Represents a type identifier used in the type registration system
 */
type TypeId = number;

/**
 * Allocates memory in the WebAssembly heap
 * @param size - Number of bytes to allocate
 * @returns Pointer to the allocated memory block
 */
declare function Mt(size: number): MemoryPointer;

/**
 * Registers a wrapper type mapping
 * @param id - Type identifier
 * @param paramCount - Number of parameters
 * @param namePtr - Pointer to type name string
 * @param basePtr - Pointer to base type
 * @param constId - Constant identifier
 * @param valueId - Value identifier
 */
declare function w(
  id: TypeId,
  paramCount: number,
  namePtr: MemoryPointer,
  basePtr: MemoryPointer,
  constId: number,
  valueId: number
): void;

/**
 * Registers a type relationship (inheritance or dependency)
 * @param typePtr - Pointer to type definition
 * @param id - Type identifier
 * @param paramCount - Number of parameters
 * @param flags - Type flags or modifiers
 */
declare function R(
  typePtr: MemoryPointer,
  id: TypeId,
  paramCount: number,
  flags: number
): void;

/**
 * Defines a derived type or type member
 * @param typePtr - Pointer to parent type
 * @param id - Member/derived type identifier
 * @param index - Member index or slot
 */
declare function D(
  typePtr: MemoryPointer,
  id: TypeId,
  index: number
): void;

/**
 * Registers a class or interface definition with complete metadata
 * @param baseTypePtr - Pointer to base type
 * @param namePtr - Pointer to class name
 * @param vtablePtr - Pointer to virtual table
 * @param parentPtr1 - First parent type pointer (0 if none)
 * @param marker1 - Type marker constant
 * @param typeId1 - First type identifier
 * @param marker2 - Second type marker
 * @param parentId2 - Second parent identifier
 * @param marker3 - Third type marker
 * @param parentId3 - Third parent identifier
 * @param constructorId - Constructor function identifier
 * @param marker4 - Fourth type marker
 * @param classId - Class identifier
 */
declare function k(
  baseTypePtr: MemoryPointer,
  namePtr: MemoryPointer,
  vtablePtr: MemoryPointer,
  parentPtr1: MemoryPointer,
  marker1: number,
  typeId1: TypeId,
  marker2: number,
  parentId2: number,
  marker3: number,
  parentId3: number,
  constructorId: number,
  marker4: number,
  classId: TypeId
): void;

/**
 * Registers a method binding with metadata
 * @param classPtr - Pointer to class definition
 * @param methodType - Method type (1=instance, 2=static, 3=virtual)
 * @param namePtr - Pointer to method name
 * @param marker - Type marker constant
 * @param returnTypeId - Return type identifier
 * @param metadataId - Method metadata identifier
 */
declare function M(
  classPtr: MemoryPointer,
  methodType: number,
  namePtr: MemoryPointer,
  marker: number,
  returnTypeId: TypeId,
  metadataId: number
): void;

/**
 * Binds a method with detailed signature and metadata
 * @param classPtr - Pointer to class definition
 * @param namePtr - Pointer to method name
 * @param paramCount - Number of parameters
 * @param signaturePtr - Pointer to signature string
 * @param returnTypePtr - Pointer to return type
 * @param methodId - Method identifier
 * @param metadataPtr - Pointer to method metadata
 * @param flags - Method flags
 */
declare function y(
  classPtr: MemoryPointer,
  namePtr: MemoryPointer,
  paramCount: number,
  signaturePtr: MemoryPointer,
  returnTypePtr: MemoryPointer,
  methodId: number,
  metadataPtr: MemoryPointer,
  flags: number
): void;

/**
 * Registers a value or property binding with type information
 * @param classPtr - Pointer to class definition
 * @param namePtr - Pointer to property name
 * @param typePtr1 - First type pointer
 * @param marker1 - First type marker
 * @param typeId1 - First type identifier
 * @param metadataPtr1 - First metadata pointer
 * @param typePtr2 - Second type pointer
 * @param marker2 - Second type marker
 * @param typeId2 - Second type identifier
 * @param metadataPtr2 - Second metadata pointer
 */
declare function v(
  classPtr: MemoryPointer,
  namePtr: MemoryPointer,
  typePtr1: MemoryPointer,
  marker1: number,
  typeId1: TypeId,
  metadataPtr1: MemoryPointer,
  typePtr2: MemoryPointer,
  marker2: number,
  typeId2: TypeId,
  metadataPtr2: MemoryPointer
): void;

/**
 * Global typed array for 32-bit integer access to WebAssembly memory
 * Indexed by byte offset divided by 4
 */
declare const a: Int32Array;

/**
 * Global execution environment or function registry
 * Array index 201 appears to be an initialization function
 */
declare const ge: Array<(id: number) => void>;

/**
 * Initializes the module's type system and memory structures
 * This function sets up all type registrations, class definitions,
 * and method bindings required by the module.
 */
declare function initializeModuleY(): void;