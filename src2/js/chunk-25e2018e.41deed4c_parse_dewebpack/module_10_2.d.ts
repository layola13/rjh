/**
 * TypeScript helper functions for various language features.
 * This module provides runtime utilities for TypeScript compiled output.
 */

/**
 * Establishes inheritance between constructor functions.
 * Implements class extension at runtime.
 * @param derived - The derived class constructor
 * @param base - The base class constructor
 */
export function __extends(derived: Function, base: Function): void;

/**
 * Performs a shallow merge of properties from source objects to a target object.
 * Similar to Object.assign().
 * @param target - The target object to merge properties into
 * @param sources - Source objects to copy properties from
 * @returns The merged target object
 */
export function __assign<T, U>(target: T, source: U): T & U;
export function __assign<T, U, V>(target: T, source1: U, source2: V): T & U & V;
export function __assign<T, U, V, W>(target: T, source1: U, source2: V, source3: W): T & U & V & W;
export function __assign(target: object, ...sources: any[]): any;

/**
 * Extracts remaining properties from an object, excluding specified keys.
 * Implements object rest spread (...rest) syntax.
 * @param source - The source object
 * @param excludedKeys - Array of property keys to exclude
 * @returns A new object with remaining properties
 */
export function __rest<T extends object, K extends keyof T>(
  source: T,
  excludedKeys: K[]
): Omit<T, K>;

/**
 * Applies decorators to a class member.
 * @param decorators - Array of decorator functions
 * @param target - The target object (class prototype or constructor)
 * @param propertyKey - The property key being decorated
 * @param descriptor - Property descriptor (for methods/accessors)
 * @returns The modified descriptor or undefined
 */
export function __decorate(
  decorators: Function[],
  target: any,
  propertyKey?: string | symbol,
  descriptor?: PropertyDescriptor | null
): PropertyDescriptor | undefined;

/**
 * Creates a parameter decorator.
 * @param parameterIndex - The index of the parameter
 * @param decorator - The decorator function
 * @returns A function that applies the parameter decorator
 */
export function __param(
  parameterIndex: number,
  decorator: (target: Object, propertyKey: string | symbol, parameterIndex: number) => void
): (target: Object, propertyKey: string | symbol) => void;

/**
 * Emits type metadata for reflection (requires reflect-metadata library).
 * @param metadataKey - The metadata key
 * @param metadataValue - The metadata value
 * @returns Metadata decorator or undefined
 */
export function __metadata(
  metadataKey: string,
  metadataValue: any
): ((target: Function) => void) | ((target: Object, propertyKey: string | symbol) => void) | undefined;

/**
 * Wraps async functions to return a Promise.
 * Implements async/await syntax.
 * @param thisArg - The 'this' context
 * @param _arguments - Function arguments
 * @param P - Promise constructor
 * @param generator - Generator function
 * @returns A Promise that resolves with the async function result
 */
export function __awaiter<T = any>(
  thisArg: any,
  _arguments: any,
  P: PromiseConstructor | undefined,
  generator: (...args: any[]) => Iterator<any, T, any>
): Promise<T>;

/**
 * Creates a generator state machine.
 * Implements generator function (function*) syntax.
 * @param thisArg - The 'this' context
 * @param body - The generator body function
 * @returns An iterator object
 */
export function __generator(
  thisArg: any,
  body: (state: {
    label: number;
    sent: () => any;
    trys: any[];
    ops: any[];
  }) => Iterator<any>
): Iterator<any>;

/**
 * Creates a property binding for module exports.
 * @param target - The target exports object
 * @param source - The source module
 * @param sourceKey - The key in the source module
 * @param targetKey - The key in the target (defaults to sourceKey)
 */
export function __createBinding(
  target: object,
  source: object,
  sourceKey: string,
  targetKey?: string
): void;

/**
 * Exports all properties from a source module to a target.
 * Implements export * from syntax.
 * @param source - The source module
 * @param target - The target exports object
 */
export function __exportStar(source: object, target: object): void;

/**
 * Creates an iterator from an iterable or array-like object.
 * @param iterable - The iterable object
 * @returns An iterator
 */
export function __values<T>(iterable: Iterable<T> | ArrayLike<T>): Iterator<T>;

/**
 * Reads values from an iterator into an array.
 * Implements array destructuring and iterator consumption.
 * @param iterator - The iterator to read from
 * @param count - Maximum number of elements to read (optional)
 * @returns An array of values
 */
export function __read<T>(iterator: Iterator<T> | Iterable<T>, count?: number): T[];

/**
 * Spreads multiple iterables into a single array.
 * Implements array spread syntax.
 * @deprecated Use native spread syntax or __spreadArrays
 * @param iterables - Iterables to spread
 * @returns A flattened array
 */
export function __spread<T>(...iterables: (T[] | Iterable<T>)[]): T[];

/**
 * Concatenates multiple array-like objects into a single array.
 * More efficient implementation of array spreading.
 * @param arrays - Array-like objects to concatenate
 * @returns A concatenated array
 */
export function __spreadArrays<T>(...arrays: (T[] | ArrayLike<T>)[]): T[];

/**
 * Wraps a value for use in async generators.
 * @param value - The value to wrap
 * @returns An awaitable wrapper object
 */
export function __await<T>(value: T): { __importDefault: T };

/**
 * Creates an async generator.
 * Implements async generator function (async function*) syntax.
 * @param thisArg - The 'this' context
 * @param _arguments - Function arguments
 * @param generator - The generator function
 * @returns An async iterable iterator
 */
export function __asyncGenerator<T = any>(
  thisArg: any,
  _arguments: any,
  generator: (...args: any[]) => Iterator<any>
): AsyncIterableIterator<T>;

/**
 * Delegates to another async iterator.
 * Implements yield* in async generators.
 * @param iterator - The iterator to delegate to
 * @returns An async iterator wrapper
 */
export function __asyncDelegator<T>(iterator: AsyncIterator<T> | Iterator<T>): AsyncIterator<T>;

/**
 * Creates an async iterator from an async iterable.
 * @param iterable - The async iterable
 * @returns An async iterator
 */
export function __asyncValues<T>(iterable: AsyncIterable<T>): AsyncIterator<T>;

/**
 * Creates a template object for tagged template literals.
 * @param cooked - The cooked (processed) string array
 * @param raw - The raw string array
 * @returns A template strings array
 */
export function __makeTemplateObject(
  cooked: TemplateStringsArray | string[],
  raw: readonly string[]
): TemplateStringsArray;

/**
 * Imports all exports from a module as a namespace object.
 * Implements import * as syntax.
 * @param module - The module to import
 * @returns A namespace object containing all exports
 */
export function __importStar<T>(module: T): T & { default?: T };

/**
 * Imports the default export from a module.
 * Implements import defaultExport from syntax.
 * @param module - The module to import
 * @returns An object with the default export
 */
export function __importDefault<T>(module: T | { default: T }): { default: T };

/**
 * Gets the value of a private class field.
 * Implements private field access (#field).
 * @param receiver - The class instance
 * @param privateMap - WeakMap storing the private field
 * @returns The private field value
 * @throws TypeError if attempting to access on non-instance
 */
export function __classPrivateFieldGet<T, V>(
  receiver: T,
  privateMap: WeakMap<T, V>
): V;

/**
 * Sets the value of a private class field.
 * Implements private field assignment (#field = value).
 * @param receiver - The class instance
 * @param privateMap - WeakMap storing the private field
 * @param value - The value to set
 * @returns The value that was set
 * @throws TypeError if attempting to set on non-instance
 */
export function __classPrivateFieldSet<T, V>(
  receiver: T,
  privateMap: WeakMap<T, V>,
  value: V
): V;