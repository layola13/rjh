/**
 * Utility functions for field definition, object traversal, type checking, and JSON serialization.
 * Provides decorators and helpers for entity field management, state binding, and ref-counting.
 */

// ============================================================================
// Type Definitions
// ============================================================================

/**
 * Equality comparison function type
 */
export type EqualityComparator<T = unknown> = (a: T, b: T) => boolean;

/**
 * Validation function type
 */
export type Validator<T = unknown> = (this: unknown, value: T) => boolean;

/**
 * Lifecycle callback type for field changes
 */
export type FieldChangeCallback<T = unknown> = (
  this: unknown,
  oldValue: T,
  newValue: T,
  fieldName: string,
  owner: unknown
) => void;

/**
 * Preprocessor function type for field values
 */
export type Preprocessor<T = unknown> = (this: unknown, value: T) => T;

/**
 * Material data binding callbacks
 */
export type MaterialBindCallback = (this: unknown) => void;
export type MaterialUnbindCallback = (this: unknown, data?: unknown) => void;

/**
 * Traversal callback for object tree walking
 */
export type TraversalCallback = (
  value: unknown,
  type: string,
  key?: string | number,
  parent?: unknown,
  root?: unknown
) => void;

// ============================================================================
// Field Definition Options
// ============================================================================

/**
 * Options for defining a basic field
 */
export interface DefineFieldOptions<T = unknown> {
  /** Custom getter function */
  get?: (this: unknown) => T;
  /** Custom setter function */
  set?: (this: unknown, value: T) => void;
  /** Validation function */
  validate?: Validator<T>;
  /** Equality comparison function */
  equals?: EqualityComparator<T>;
  /** Binary equality comparison (fast path) */
  binaryEqual?: EqualityComparator<T>;
  /** Initial field value */
  initialValue?: T;
  /** Callback before value changes */
  willChange?: FieldChangeCallback<T>;
  /** Callback after value changes */
  changed?: FieldChangeCallback<T>;
}

/**
 * Options for defining an entity field
 */
export interface DefineEntityFieldOptions<T = unknown> extends DefineFieldOptions<T> {
  /** Private field name prefix (default: "__") */
  prefix?: string;
  /** Partial setter for complex updates */
  partialSet?: (this: unknown, value: T) => void;
  /** Preprocessor for incoming values */
  preprocess?: Preprocessor<T>;
  /** Disable transaction wrapping */
  noTransaction?: boolean;
  /** Disable field change events */
  noEvent?: boolean;
  /** Callback before setting value */
  preSet?: (this: unknown) => void;
  /** Callback after setting value */
  postSet?: (this: unknown, oldValue: T, newValue: T) => void;
  /** Material data pre-set callback */
  preSetMaterial?: MaterialBindCallback;
  /** Material data post-set callback */
  postSetMaterial?: MaterialUnbindCallback;
  /** Field value type enum */
  fieldValueType?: unknown;
  /** Suppress transaction warnings */
  ignoreWarning?: boolean;
}

/**
 * Options for entity field decorator
 */
export interface EntityFieldDecoratorOptions<T = unknown> extends DefineEntityFieldOptions<T> {
  /** Default value when field is undefined */
  defaultValue?: T;
}

/**
 * Options for entity map field
 */
export interface EntityMapFieldOptions extends DefineEntityFieldOptions<Record<string, unknown>> {}

/**
 * Options for key-entity map field
 */
export interface KeyEntityMapFieldOptions extends DefineEntityFieldOptions<Record<string, unknown>> {}

/**
 * Options for state field definition
 */
export interface StateFieldOptions<T = unknown> {
  /** Private field name prefix (default: "__") */
  prefix?: string;
  /** Custom state setter */
  setState?: (this: unknown, state: unknown) => void;
  /** Custom getter */
  get?: (this: unknown) => T;
  /** Custom setter */
  set?: (this: unknown, value: T) => void;
  /** Validation function */
  validate?: Validator<T>;
  /** Custom state getter */
  getState?: (this: unknown, createIfMissing?: boolean) => unknown;
  /** Equality comparison function */
  equals?: EqualityComparator<T>;
  /** Binary equality comparison */
  binaryEqual?: EqualityComparator<T>;
  /** Preprocessor for incoming values */
  preprocess?: Preprocessor<T>;
  /** Disable transaction wrapping */
  noTransaction?: boolean;
  /** Disable field change events */
  noEvent?: boolean;
  /** Callback before setting value */
  preSet?: (this: unknown) => void;
  /** Callback after setting value */
  postSet?: (this: unknown, oldValue: T, newValue: T) => void;
  /** Partial state setter */
  partialSetState?: (this: unknown, state: unknown) => void;
  /** Field value type enum */
  fieldValueType?: unknown;
  /** Whether the state is persistable */
  persistable?: boolean;
  /** Default value for the state */
  defaultValue?: T;
}

/**
 * Material data binding options
 */
export interface MaterialDataBindOptions {
  /** Disable transaction wrapping */
  noTransaction?: boolean;
  /** Disable field change events */
  noEvent?: boolean;
  /** Field value type enum */
  fieldValueType?: unknown;
  /** Pre-set callback */
  preSet?: MaterialBindCallback;
  /** Post-set callback */
  postSet?: MaterialUnbindCallback;
}

/**
 * Options for field batch definition
 */
export interface FieldDefinitions {
  [fieldName: string]: DefineFieldOptions & { readonly?: boolean };
}

// ============================================================================
// Ref-Counting and Disposable Interfaces
// ============================================================================

/**
 * Interface for reference-counted objects
 */
export interface RefCounted {
  /** Reference count */
  xRefCount: number;
  /** Increment reference count */
  xAddRef(): this;
  /** Decrement reference count and dispose if zero */
  xRelease(): this;
  /** Optional dispose method */
  dispose?(): void;
}

/**
 * Interface for disposable objects with signal support
 */
export interface Disposable {
  /** Disposal state flag */
  xIsDisposed: boolean;
  /** Signal dispatched on disposal */
  signalDisposed: unknown;
  /** Dispose the object */
  dispose(): this;
  /** Reset disposal state */
  xReset(): this;
  /** Append debug info (debug builds only) */
  xAppendDbgInfo(info: string): void;
  /** Debug stack trace (debug builds only) */
  xDebugInfo?: string;
}

// ============================================================================
// Core Field Definition Functions
// ============================================================================

/**
 * Define a basic field on an object with optional getter/setter
 * @param target - Target object
 * @param fieldName - Name of the field
 * @param options - Field configuration options
 */
export function defineField<T = unknown>(
  target: Record<string, unknown>,
  fieldName: string,
  options?: DefineFieldOptions<T>
): void;

/**
 * Define an entity field with transaction and event support
 * @param target - Target entity object
 * @param fieldName - Name of the field
 * @param initialValue - Initial value
 * @param options - Entity field options
 */
export function defineEntityField<T = unknown>(
  target: Record<string, unknown>,
  fieldName: string,
  initialValue?: T,
  options?: DefineEntityFieldOptions<T>
): void;

/**
 * Define an entity map field (object map)
 * @param target - Target entity object
 * @param fieldName - Name of the field
 * @param initialValue - Initial map value
 * @param options - Entity map field options
 */
export function defineEntityMapField(
  target: Record<string, unknown>,
  fieldName: string,
  initialValue?: Record<string, unknown>,
  options?: EntityMapFieldOptions
): void;

/**
 * Define a key-entity map field
 * @param target - Target entity object
 * @param fieldName - Name of the field
 * @param initialValue - Initial map value
 * @param options - Key-entity map field options
 */
export function defineKeyEntityMapField(
  target: Record<string, unknown>,
  fieldName: string,
  initialValue?: Record<string, unknown>,
  options?: KeyEntityMapFieldOptions
): void;

/**
 * Define a read-only field
 * @param target - Target object
 * @param fieldName - Name of the field
 * @param getterOrValue - Getter function or constant value
 */
export function defineReadonlyField<T = unknown>(
  target: Record<string, unknown>,
  fieldName: string,
  getterOrValue: (() => T) | T
): void;

/**
 * Define multiple fields at once
 * @param target - Target object
 * @param definitions - Map of field names to options
 */
export function defineFields(
  target: Record<string, unknown>,
  definitions?: FieldDefinitions
): void;

/**
 * Define a state field with state binding support
 * @param target - Target entity object
 * @param fieldName - Name of the field
 * @param defaultValue - Default value for the state
 * @param stateConstructor - Optional State class constructor
 * @param persistable - Whether the state is persistable (default: true)
 * @param options - State field options
 */
export function defineStateField<T = unknown>(
  target: Record<string, unknown>,
  fieldName: string,
  defaultValue?: T,
  stateConstructor?: new () => unknown,
  persistable?: boolean,
  options?: StateFieldOptions<T>
): void;

/**
 * Update a field value (handles both regular and state fields)
 * @param target - Target object
 * @param fieldName - Name of the field
 * @param value - New value
 */
export function updateField<T = unknown>(
  target: Record<string, unknown>,
  fieldName: string,
  value: T
): void;

/**
 * Bind fields by state configuration
 * @param target - Target object
 * @param fieldMap - Map of field names to state keys
 * @param stateObject - State object containing values
 */
export function bindFieldsByState(
  target: Record<string, unknown>,
  fieldMap?: Record<string, string | unknown[]>,
  stateObject?: Record<string, unknown>
): void;

// ============================================================================
// Decorators
// ============================================================================

/**
 * Entity field property decorator
 * @param options - Entity field decorator options
 * @returns Property decorator
 */
export function EntityField<T = unknown>(
  options?: EntityFieldDecoratorOptions<T>
): PropertyDecorator;

/**
 * Entity map field property decorator
 * @param options - Entity map field options
 * @returns Property decorator
 */
export function EntityMapField(options?: EntityMapFieldOptions): PropertyDecorator;

/**
 * Key-entity map field property decorator
 * @param options - Key-entity map field options
 * @returns Property decorator
 */
export function KeyEntityMapField(options?: KeyEntityMapFieldOptions): PropertyDecorator;

/**
 * State entity field property decorator
 * @param stateConstructor - State class constructor
 * @param options - State field options
 * @returns Property decorator
 */
export function StateEntityField<T = unknown>(
  stateConstructor?: new () => unknown,
  options?: StateFieldOptions<T>
): PropertyDecorator;

// ============================================================================
// Material Data Binding
// ============================================================================

/**
 * Bind material data to an owner object
 * @param owner - Owner object
 * @param fieldName - Field name on owner
 * @param materialData - Material data instance
 * @param options - Binding options
 */
export function bindMaterialData(
  owner: Record<string, unknown>,
  fieldName: string,
  materialData: unknown,
  options?: MaterialDataBindOptions
): void;

/**
 * Unbind material data from an owner object
 * @param owner - Owner object
 * @param materialData - Material data instance
 */
export function unbindMaterialData(
  owner: Record<string, unknown>,
  materialData: unknown
): void;

// ============================================================================
// Ref-Counting and Disposal
// ============================================================================

/**
 * Make an object reference-counted
 * @param target - Target object
 * @returns The target object with RefCounted methods
 */
export function makeRefCounted<T extends object>(target: T): T & RefCounted;

/**
 * Make an object disposable with signal support
 * @param target - Target object
 * @returns The target object with Disposable methods
 */
export function makeDisposable<T extends object>(target: T): T & Disposable;

// ============================================================================
// Object Traversal
// ============================================================================

/**
 * Recursively traverse an object tree
 * @param obj - Object to traverse
 * @param callback - Callback invoked for each node
 * @param includeRoot - Whether to invoke callback on root object
 * @param key - Current key (internal)
 * @param parent - Parent object (internal)
 * @param root - Root object (internal)
 */
export function traverseObject(
  obj: unknown,
  callback?: TraversalCallback | null,
  includeRoot?: boolean,
  key?: string | number | null,
  parent?: unknown | null,
  root?: unknown | null
): void;

// ============================================================================
// Type Checking Utilities
// ============================================================================

/**
 * Get the type of a value as a string
 * @param value - Value to check
 * @returns Type string ("array", "object", "function", "number", etc.)
 */
export function typeOf(value: unknown): string;

/**
 * Check if a value is null
 * @param value - Value to check
 */
export function isNull(value: unknown): value is null;

/**
 * Check if a value is an array
 * @param value - Value to check
 */
export function isArray(value: unknown): value is unknown[];

/**
 * Check if a value is a string
 * @param value - Value to check
 */
export function isString(value: unknown): value is string;

/**
 * Check if a value is defined (not undefined)
 * @param value - Value to check
 */
export function isDef<T>(value: T | undefined): value is T;

/**
 * Check if a value is a boolean
 * @param value - Value to check
 */
export function isBoolean(value: unknown): value is boolean;

/**
 * Check if a value is a number
 * @param value - Value to check
 */
export function isNumber(value: unknown): value is number;

/**
 * Check if a value is a valid (finite) number
 * @param value - Value to check
 */
export function isValidNumber(value: unknown): value is number;

/**
 * Check if a value is an object (excluding null)
 * @param value - Value to check
 */
export function isObject(value: unknown): value is object;

// ============================================================================
// Utility Functions
// ============================================================================

/**
 * No-op function
 */
export function nullFunction(): void;

/**
 * Get value from nested object by path array
 * @param paths - Array of property keys
 * @param obj - Object to traverse
 * @param defaultValue - Value to return if path doesn't exist
 * @returns Value at path or default value
 */
export function getValueByPaths<T = unknown>(
  paths: string[],
  obj: Record<string, unknown>,
  defaultValue?: T
): T;

/**
 * Set a value if the key is undefined
 * @param obj - Target object
 * @param key - Property key
 * @param value - Value to set
 * @returns The final value (existing or newly set)
 */
export function setIfUndefined<T>(
  obj: Record<string, T>,
  key: string,
  value: T
): T;

/**
 * Get all keys from an object
 * @param obj - Source object
 * @returns Array of keys
 */
export function getKeys<T extends object>(obj: T): (keyof T)[];

/**
 * Create a set object from arguments
 * @param items - Items to add to set
 * @returns Set as object with keys
 */
export function createSet(...items: string[]): Record<string, boolean>;
export function createSet(items: string[]): Record<string, boolean>;

/**
 * Check if an object is empty
 * @param obj - Object to check
 * @returns True if object has no own properties
 */
export function isEmpty(obj: object): boolean;

/**
 * Compare two arrays for equality
 * @param a - First array
 * @param b - Second array
 * @param ordered - Whether order matters (default: true)
 * @param comparator - Custom equality comparator
 * @returns True if arrays are equal
 */
export function isSameArray<T>(
  a: T[],
  b: T[],
  ordered?: boolean,
  comparator?: EqualityComparator<T>
): boolean;

/**
 * Compare two maps or objects for equality
 * @param a - First map/object
 * @param b - Second map/object
 * @param comparator - Custom equality comparator
 * @returns True if maps are equal
 */
export function isSameMap<K extends string | number | symbol, V>(
  a: Map<K, V> | Record<K, V>,
  b: Map<K, V> | Record<K, V>,
  comparator?: EqualityComparator<V>
): boolean;

// ============================================================================
// JSON Serialization
// ============================================================================

/**
 * Parse JSON string with circular reference support
 * @param jsonString - JSON string to parse
 * @returns Parsed object
 */
export function JSONParse<T = unknown>(jsonString: string | T): T;

/**
 * Stringify object to JSON with circular reference handling
 * @param obj - Object to stringify
 * @returns JSON string
 */
export function JSONStringify(obj: unknown | string): string;