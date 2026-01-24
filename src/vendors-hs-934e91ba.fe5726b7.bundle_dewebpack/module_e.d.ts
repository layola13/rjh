/**
 * Registers a class property accessor (getter/setter) for an Emscripten-bound C++ class.
 * 
 * @param classType - The constructor/class type to register the property on
 * @param propertyName - The name of the property (will be converted to ASCII)
 * @param getterReturnTypeId - Type ID for the getter's return type
 * @param getterSignature - Raw function pointer for the getter
 * @param getter - Wrapper function for invoking the getter
 * @param setterSignature - Raw function pointer for the setter (undefined if read-only)
 * @param setter - Wrapper function for invoking the setter (undefined if read-only)
 * @param setterArgumentTypeId - Type ID for the setter's argument (undefined if read-only)
 * 
 * @remarks
 * This function is part of Emscripten's embind system for binding C++ classes to JavaScript.
 * It sets up property descriptors with getters and optional setters that interact with WASM memory.
 * 
 * The implementation follows a two-phase approach:
 * 1. Immediately define a property that throws if accessed before types are resolved
 * 2. Once types are bound, replace with actual getter/setter that marshal values to/from WASM
 */
declare function registerClassProperty(
    classType: EmscriptenClassHandle,
    propertyName: string,
    getterReturnTypeId: TypeId,
    getterSignature: number,
    getter: WasmFunctionPointer,
    setterSignature: number | undefined,
    setter: WasmFunctionPointer | undefined,
    setterArgumentTypeId: TypeId | undefined
): void;

/**
 * Handle to an Emscripten-registered class constructor
 */
interface EmscriptenClassHandle {
    /** The class name */
    name: string;
    /** Metadata about the registered class */
    registeredClass: RegisteredClass;
}

/**
 * Metadata for a class registered with Emscripten's embind
 */
interface RegisteredClass {
    /** The prototype object that instances will inherit from */
    instancePrototype: object;
}

/**
 * Identifier for a type in Emscripten's type system
 */
type TypeId = number;

/**
 * Pointer to a function in WebAssembly linear memory
 */
type WasmFunctionPointer = number;

/**
 * Converts a string to ASCII format suitable for WASM interop
 * @param str - Input string
 * @returns ASCII-encoded string
 */
declare function CA(str: string): string;

/**
 * Creates a signature token for a WASM function
 * @param functionPointer - Pointer to the WASM function
 * @param signature - Function signature descriptor
 * @returns Signature token for later invocation
 */
declare function st(functionPointer: number, signature: number): unknown;

/**
 * Schedules callbacks to execute when specified types are fully bound
 * @param dependencies - Array of type IDs that must be resolved first
 * @param requiredTypes - Array of type IDs needed by the callback
 * @param callback - Function to execute once types are available
 */
declare function vA(
    dependencies: TypeId[],
    requiredTypes: TypeId[] | EmscriptenClassHandle[],
    callback: (resolvedTypes: unknown[]) => unknown[]
): void;

/**
 * Throws an error with a formatted message about unbound types
 * @param message - Error message
 * @param typeIds - Array of unbound type IDs
 */
declare function ft(message: string, typeIds: TypeId[]): never;

/**
 * Throws an error about attempting to modify a read-only property
 * @param message - Error message
 */
declare function yA(message: string): never;

/**
 * Validates and retrieves the C++ instance pointer from a JavaScript wrapper
 * @param jsObject - The JavaScript object wrapping the C++ instance
 * @param classType - Expected class type
 * @param context - Description of the current operation (for error messages)
 * @returns Pointer to the C++ instance in WASM memory
 */
declare function Qt(
    jsObject: unknown,
    classType: EmscriptenClassHandle,
    context: string
): number;

/**
 * Cleans up temporary objects allocated during WASM-to-JS value conversion
 * @param destructors - Array of destructor functions to call
 */
declare function lt(destructors: Array<() => void>): void;

/**
 * Represents a registered type with conversion methods
 */
interface RegisteredType {
    /**
     * Converts a value from WASM wire format to JavaScript
     * @param wireValue - Raw value from WASM memory
     * @returns JavaScript value
     */
    fromWireType(wireValue: unknown): unknown;
    
    /**
     * Converts a JavaScript value to WASM wire format
     * @param destructors - Array to collect cleanup callbacks
     * @param jsValue - JavaScript value to convert
     * @returns Wire-format value for WASM
     */
    toWireType(destructors: Array<() => void>, jsValue: unknown): unknown;
}